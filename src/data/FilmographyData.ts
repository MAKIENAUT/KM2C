import {
  GalleryItem,
  VideoItem,
  SlideshowItem,
} from "@/types/Filmography_Types";

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "35mm in Boston",
    date: "2021",
    type: "Video",
    thumbnail: "/Filmography/35mm_in_Boston/shot_1.png",
    videoSrc: "https://www.youtube.com/embed/_dZ_Df-pdWg?si=cSzwpHO66a1c_jPy",
    duration: "25:00",
    role: "Director, Cinematographer",
    synopsis: "A visual journey through Boston captured on 35mm film.",
    metadata: {
      format: "35mm Film",
      camera: "Arri 35",
      processing: "Developed at Cinelab",
    },
    complementaryShots: [
      "/Filmography/35mm_in_Boston/shot_1.png",
      "/Filmography/35mm_in_Boston/shot_2.png",
      "/Filmography/35mm_in_Boston/shot_3.png",
    ],
    information: {
      title: "following the sky",
      year: 2021,
      totalRunningTime: "25 minutes",
      type: "Narrative",
      role: "Director, writer",
      synopsis:
        "A coming-of-age film centered on Rooster, a naive young woman who, after graduating college, returns to her hometown. As she delivers food on her bicycle, she encounters a series of strange individuals who bring her deepest fears to the surface.",
    },
  } as VideoItem,
  {
    id: 2,
    title: "Diskarte",
    date: "2022",
    type: "Slideshow",
    images: [
      "/Filmography/Diskarte/DISKARTE_1.jpg",
      "/Filmography/Diskarte/DISKARTE_2.jpg",
      "/Filmography/Diskarte/DISKARTE_3.jpg",
      "/Filmography/Diskarte/DISKARTE_4.jpg",
      "/Filmography/Diskarte/DISKARTE_5.jpg",
      "/Filmography/Diskarte/Poster.jpg",
    ],
    information: {
      title: "Diskarte",
      year: 2024,
      totalRunningTime: "25 minutes",
      type: "Documentary",
      role: "Director, cinematographer, editor",
      synopsis:
        "Diskarte traces the director's exploration of the Filipino diaspora, centered around the concept of *diskarte*. The film explores the experiences of Overseas Filipino Workers (OFWs) across Europe, offering a diary style documentary on the meaning of home and belonging.",
    },
  } as SlideshowItem,
  {
    id: 3,
    title: "God Got Us",
    date: "2023",
    type: "Slideshow",
    images: [
      "/Filmography/God_Got_Us/GGU_1.jpg",
      "/Filmography/God_Got_Us/GGU_2.jpg",
      "/Filmography/God_Got_Us/GGU_3.jpg",
      "/Filmography/God_Got_Us/GGU_4.jpg",
      "/Filmography/God_Got_Us/GGU_5.jpg",
      "/Filmography/God_Got_Us/GGU_6.jpg",
    ],
    information: {
      title: "God Got Us",
      year: 2023,
      totalRunningTime: "14 minutes",
      type: "Documentary",
      role: "Researcher, cinematographer, editor",
      synopsis:
        "Collaborated as a fellow researcher, cinematographer and editor in the 14 minute film, God Got Us, an exploration of self identity in the medium of paintings. It seeks the discovery of the importance within black ideology.",
    },
  } as SlideshowItem,
  {
    id: 4,
    title: "Underachiever",
    date: "2024",
    type: "Slideshow",
    images: [
      "/Filmography/Underachiever/Underachiever_1.jpg",
      "/Filmography/Underachiever/Underachiever_2.jpg",
      "/Filmography/Underachiever/Underachiever_3.jpg",
      "/Filmography/Underachiever/Underachiever_4.jpg",
      "/Filmography/Underachiever/Underachiever_5.jpg",
    ],
    information: {
      title: "Underachiever",
      year: 2022,
      totalRunningTime: "25 minutes",
      type: "Narrative",
      role: "Director, writer",
      synopsis:
        "A coming-of-age film centered on Rooster, a naive young woman who, after graduating college, returns to her hometown. As she delivers food on her bicycle, she encounters a series of strange individuals who bring her deepest fears to the surface.",
    },
  } as SlideshowItem,
];
