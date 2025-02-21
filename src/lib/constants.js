// src/lib/constants.js
export const API_CONFIG = {
    BASE_URL: 'https://nubis.bis-sorbonne.fr/api',
    KEY_IDENTITY: import.meta.env.VITE_OMEKA_KEY_IDENTITY,
    KEY_CREDENTIAL: import.meta.env.VITE_OMEKA_KEY_CREDENTIAL,
};

export const SITE_CONFIG = {
    title: 'Nubis',
    description: 'Description du site',
    defaultLang: 'fr'
};