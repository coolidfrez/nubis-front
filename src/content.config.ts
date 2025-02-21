// 1. Importer des utilitaires depuis `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Définir votre/vos collection(s)
const blog = defineCollection({
    type: 'content', // 'content' est implicite pour les fichiers .md/.mdx
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        image: z.string()
    })
});

// 3. Exporter un seul objet « collections » pour enregistrer votre/vos collection(s)
export const collections = {
    blog
};