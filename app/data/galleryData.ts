export interface GalleryImage {
    id: number;
    src: string;
    category: "HIGHLIGHTS" | "CONCERTS" | "EVENTS" | "TEAM" | "OTHERS"; // User can expand this
    caption?: string;
    size?: "wide" | "tall" | "normal"; // For masonry layout hints
}

// Generating 63 images (1.jpg to 63.jpg)
// NOTE TO USER: You can manually change the 'category' for specific IDs to enable filtering!
export const galleryImages: GalleryImage[] = Array.from({ length: 63 }, (_, i) => ({
    id: i + 1,
    src: `/Gallery/${i + 1}.jpg`,
    category: "HIGHLIGHTS", // Default category
    size: (i % 3 === 0) ? "tall" : (i % 4 === 0) ? "wide" : "normal" // Pseudo-random sizing for Masonry demo
}));
