import FilmographySection from "@/components/organisms/FilmographySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KM2C - Filmography",
};

export default function FilmographyPage() {
  return <FilmographySection />;
}

const photos = [
  {
    id: 1,
    title: "Mountain Sunrise",
    duration: "02:34",
    date: "2024-03-15",
    thumbnail: "/portraits/Junior.jpg",
    metadata: {
      aperture: "f/2.8",
      iso: "100",
      shutterSpeed: "1/1000",
      focalLength: "24mm",
      fileSize: "40.7MB",
      exposureComp: "0 EV",
      shootingMode: "P",
      whiteBalance: "AUTO",
      fileFormat: "RAW+JPEG",
    },
  },
  {
    id: 2,
    title: "City Lights",
    duration: "03:45",
    date: "2024-03-14",
    thumbnail: "/i-went-home/8-Biking with my brother.jpg",
    metadata: {
      aperture: "f/1.8",
      iso: "800",
      shutterSpeed: "1/60",
      focalLength: "50mm",
      fileSize: "42.1MB",
      exposureComp: "-0.3 EV",
      shootingMode: "A",
      whiteBalance: "5500K",
      fileFormat: "RAW+JPEG",
    },
  },
  {
    id: 3,
    title: "Ocean Waves",
    duration: "01:56",
    date: "2024-03-13",
    thumbnail: "/i-went-home/18-I went to the DMV .jpg",
    metadata: {
      aperture: "f/8",
      iso: "200",
      shutterSpeed: "1/250",
      focalLength: "70mm",
      fileSize: "39.8MB",
      exposureComp: "+0.3 EV",
      shootingMode: "M",
      whiteBalance: "CLOUD",
      fileFormat: "RAW+JPEG",
    },
  },
  {
    id: 4,
    title: "Forest Walk",
    duration: "04:12",
    date: "2024-03-12",
    thumbnail: "/Kirsten.jpeg",
    metadata: {
      aperture: "f/4",
      iso: "400",
      shutterSpeed: "1/500",
      focalLength: "35mm",
      fileSize: "41.2MB",
      exposureComp: "0 EV",
      shootingMode: "S",
      whiteBalance: "AUTO",
      fileFormat: "RAW+JPEG",
    },
  },
];
