"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  Grid,
  // Film,
  Battery,
  // Clock,
  // Calendar,
  // Aperture,
  // Settings,
  // Info,
  Wifi,
} from "lucide-react";

interface PhotoMetadata {
  aperture: string;
  iso: string;
  shutterSpeed: string;
  focalLength: string;
  fileSize: string;
  exposureComp: string;
  shootingMode: string;
  whiteBalance: string;
  fileFormat: string;
}

// interface Photo {
//   id: number;
//   title: string;
//   duration: string;
//   date: string;
//   thumbnail: string;
//   metadata: PhotoMetadata;
// }

// Mock data for photos with DSLR-specific metadata
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

const DSLRGallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPhoto =
    selectedPhoto !== null ? photos.find((p) => p.id === selectedPhoto) : null;

  const formatDateTime = (date: Date): string => {
    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  const generateHistogram = (): JSX.Element => (
    <svg className="h-full w-full" viewBox="0 0 100 40">
      <path
        d="M0 40 L5 35 L10 38 L15 30 L20 25 L25 35 L30 20 L35 15 L40 25 L45 30 L50 35 L55 25 L60 20 L65 15 L70 25 L75 30 L80 35 L85 25 L90 20 L95 35 L100 40 Z"
        fill="rgba(255, 255, 255, 0.5)"
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  );

  const ViewfinderScreen: React.FC = () => (
    <div className="relative h-screen w-full bg-black pt-20 font-mono">
      <div className="flex h-full">
        {/* Left metrics panel */}
        <div className="w-16 border-r border-gray-800 p-2 text-white">
          <div className="space-y-4 text-xs">
            <div>{currentPhoto?.metadata.shootingMode}-★</div>
            <div>ISO</div>
            <div>{currentPhoto?.metadata.whiteBalance}</div>
            <div>8 FPS</div>
          </div>
        </div>

        {/* Main image area */}
        <div className="relative flex-1 p-4">
          {/* Top info bar */}
          <div className="mb-2 flex justify-between text-xs text-white">
            <div className="flex items-center space-x-4">
              <span>
                {currentPhoto
                  ? `${photos.indexOf(currentPhoto) + 1}/${photos.length}`
                  : "0/0"}
              </span>
              <Battery className="h-4 w-4" />
              <span>100%</span>
              <Wifi className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-2">
              <span>{formatDateTime(currentTime)}</span>
              <span>100-0118</span>
            </div>
          </div>

          {/* Main image with overlays */}
          <div className="relative h-5/6 w-full">
            <img
              src={currentPhoto?.thumbnail}
              alt={currentPhoto?.title}
              className="h-full w-full border border-gray-800 object-cover"
            />

            {/* Focus point overlay */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-50">
              {Array(25)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <div className="h-1 w-1 border border-white"></div>
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom metrics bar */}
          <div className="mt-2 flex justify-between text-xs text-white">
            <div className="flex space-x-4">
              <span>{currentPhoto?.metadata.aperture}</span>
              <span>{currentPhoto?.metadata.shutterSpeed}</span>
              <span>ISO {currentPhoto?.metadata.iso}</span>
              <span>{currentPhoto?.metadata.exposureComp}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{currentPhoto?.metadata.focalLength}</span>
              <span>{currentPhoto?.metadata.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Right panel with histogram */}
        <div className="w-32 border-l border-gray-800 p-2">
          <div className="h-32 w-full">{generateHistogram()}</div>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-gray-800 bg-black bg-opacity-75 p-2 text-xs text-white">
        <button
          onClick={() => setSelectedPhoto(null)}
          className="rounded border border-gray-600 px-3 py-1 hover:bg-gray-800"
        >
          Back
        </button>
        <div className="flex space-x-4">
          <span>{currentPhoto?.metadata.fileFormat}</span>
          <span>CARD 1</span>
        </div>
      </div>
    </div>
  );

  const GalleryScreen: React.FC = () => (
    <div className="min-h-screen bg-black p-4 text-white">
      {/* Gallery Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
        <h1 className="flex items-center font-mono text-2xl">
          <Camera className="mr-2" />
          DSLR Gallery
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{photos.length} Images</span>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="rounded border border-gray-600 p-2 hover:bg-gray-800"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        className={`grid ${isGridView ? "grid-cols-3" : "grid-cols-1"} gap-6`}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo.id)}
            className="group relative cursor-pointer"
          >
            <img
              src={photo.thumbnail}
              alt={photo.title}
              className="aspect-video w-full border border-gray-800 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 font-mono opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex justify-between text-xs">
                <span>{photo.title}</span>
                <span>{photo.metadata.aperture}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>ISO {photo.metadata.iso}</span>
                <span>{photo.metadata.focalLength}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      {selectedPhoto ? <ViewfinderScreen /> : <GalleryScreen />}
    </div>
  );
};

export default DSLRGallerySection;
