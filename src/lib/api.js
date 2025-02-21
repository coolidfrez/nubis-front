const API_CONFIG = {
    BASE_URL: 'https://nubis.bis-sorbonne.fr/api',
    KEY_IDENTITY: import.meta.env.PUBLIC_API_KEY_IDENTITY,
    KEY_CREDENTIAL: import.meta.env.PUBLIC_API_KEY_CREDENTIAL
};

// Gestion centralisée des erreurs
const handleAPIError = (error, context) => {
    console.error(`API Error in ${context}:`, error);
    throw {
        message: error.message,
        status: error.status || 500,
        context,
        timestamp: new Date().toISOString()
    };
};

export async function fetchAPI(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_CONFIG.BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
   
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${API_CONFIG.KEY_IDENTITY}:${API_CONFIG.KEY_CREDENTIAL}`)}`
            }
        });
       
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
       
        return await response.json();
    } catch (error) {
        handleAPIError(error, endpoint);
    }
}

export const api = {
    // Collections
    getCollections: async (params = {}) => {
        try {
            return await fetchAPI('/item_sets', params);
        } catch (error) {
            handleAPIError(error, 'getCollections');
        }
    },

    getCollection: async (id) => {
        try {
            return await fetchAPI(`/item_sets/${id}`);
        } catch (error) {
            handleAPIError(error, 'getCollection');
        }
    },

    getCollectionWithRelations: async (id) => {
        try {
            const collection = await fetchAPI(`/item_sets/${id}`);
            const items = await fetchAPI('/items', { 'item_set_id': id });
            
            let subCollections = [];
            let parentCollection = null;

            if (collection['dcterms:hasPart']) {
                subCollections = await Promise.all(
                    collection['dcterms:hasPart'].map(async (part) => {
                        const subCollectionId = part.value_resource_id;
                        return await fetchAPI(`/item_sets/${subCollectionId}`);
                    })
                );
            }

            if (collection['dcterms:isPartOf']) {
                const parentId = collection['dcterms:isPartOf'][0].value_resource_id;
                parentCollection = await fetchAPI(`/item_sets/${parentId}`);
            }

            return {
                collection,
                items,
                subCollections,
                parentCollection
            };
        } catch (error) {
            handleAPIError(error, 'getCollectionWithRelations');
        }
    },

    // Featured Collections
    getFeaturedCollections: async () => {
        try {
            return await fetchAPI('/item_sets', {
                'property[0][property]': 'curation:featured',
                'property[0][type]': 'eq',
                'property[0][text]': 'En vedette'
            });
        } catch (error) {
            handleAPIError(error, 'getFeaturedCollections');
        }
    },
   
    // Items
    getItems: async (params = {}) => {
        try {
            return await fetchAPI('/items', params);
        } catch (error) {
            handleAPIError(error, 'getItems');
        }
    },

    getItem: async (id) => {
        try {
            const response = await fetchAPI(`/items/${id}`);
            return response;
        } catch (error) {
            handleAPIError(error, 'getItem');
        }
    },
   
    // Sites
    getSites: async (params = {}) => {
        try {
            return await fetchAPI('/sites', params);
        } catch (error) {
            handleAPIError(error, 'getSites');
        }
    },

    getSitePages: async (siteId) => {
        try {
            return await fetchAPI(`/sites/${siteId}/pages`);
        } catch (error) {
            handleAPIError(error, 'getSitePages');
        }
    },

    getAsset: async (id) => {
        try {
            return await fetchAPI(`/assets/${id}`);
        } catch (error) {
            handleAPIError(error, 'getAsset');
        }
    }
};