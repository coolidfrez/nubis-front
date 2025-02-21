const API_BASE_URL = 'https://nubis.bis-sorbonne.fr/api';

export async function fetchAPI(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez ici les headers d'authentification si nécessaire
            }
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Fonctions spécifiques pour chaque type de ressource
export const api = {
    // Collections
    getCollections: (params = {}) => fetchAPI('/item_sets', params),
    getCollection: (id) => fetchAPI(`/item_sets/${id}`),
    
    // Items
    getItems: (params = {}) => fetchAPI('/items', params),
    getItem: async (id) => {
        const response = await fetchAPI(`/items/${id}`);
        console.log('Item Response:', response); // Debug item
        return response;
    },
    
    // Sites
    getSites: (params = {}) => fetchAPI('/sites', params),
    getSitePages: (siteId) => fetchAPI(`/sites/${siteId}/pages`)
};

export const getFeaturedCollections = async () => {
    const params = {
        'property[0][property]': 'curation:featured',
        'property[0][type]': 'eq',
        'property[0][text]': 'En vedette'
    };
    
    try {
        const response = await fetchAPI('/item_sets', params);
        return response;
    } catch (error) {
        console.error('Error fetching featured collections:', error);
        throw error;
    }
};