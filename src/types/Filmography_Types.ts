export interface Information {
  title: string;
  year: number;
  totalRunningTime: string;
  type: string;
  role: string;
  synopsis: string;
}

export interface VideoItem {
  id: number;
  title: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoSrc: string;
  type: "Video";
  role: string;
  synopsis: string;
  metadata: {
    [key: string]: string;
  };
  complementaryShots: string[];
  information: Information;
}

export interface SlideshowItem {
  id: number;
  title: string;
  date: string;
  type: "Slideshow";
  images: string[];
  information: Information;
}

export type GalleryItem = VideoItem | SlideshowItem;
