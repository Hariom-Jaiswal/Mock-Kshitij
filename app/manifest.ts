import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Mithibai Kshitij',
        short_name: 'Kshitij',
        description: 'The Official Website of Mithibai Kshitij 2025 - An International Intercollegiate Cultural Festival.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ebb609',
        icons: [
            {
                src: '/icon.svg',
                sizes: '192x192 512x512',
                type: 'image/svg+xml',
                purpose: 'any'
            },
            {
                src: '/LogoThisYear.jpg',
                sizes: '512x512',
                type: 'image/jpeg',
                purpose: 'maskable'
            },
        ],
    };
}
