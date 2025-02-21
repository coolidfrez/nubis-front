// 1. Importer des utilitaires depuis `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Importer un ou plusieurs chargeurs
import { glob, file } from 'astro/loaders';

// 3. Définir votre/vos collection(s)

const blog = defineCollection({
    loader: glob({ pattern: ['*.md', '*.mdx'], base: "./src/content/blog" }),
    schema: schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        image: z.string()
    })
  });

// 4. Exporter un seul objet « collections » pour enregistrer votre/vos collection(s)
export const collections = { blog };