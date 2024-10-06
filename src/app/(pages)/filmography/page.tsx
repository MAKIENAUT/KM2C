"use client";

import React, { useState } from "react";
import { Camera, Grid, Film, Battery, Clock, Calendar } from "lucide-react";

// Mock data for videos
const videos = [
  {
    id: 1,
    title: "Mountain Sunrise",
    duration: "02:34",
    date: "2024-03-15",
    thumbnail: "/api/placeholder/320/180",
  },
  {
    id: 2,
    title: "City Lights",
    duration: "03:45",
    date: "2024-03-14",
    thumbnail: "/api/placeholder/320/180",
  },
  {
    id: 3,
    title: "Ocean Waves",
    duration: "01:56",
    date: "2024-03-13",
    thumbnail: "/api/placeholder/320/180",
  },
  {
    id: 4,
    title: "Forest Walk",
    duration: "04:12",
    date: "2024-03-12",
    thumbnail: "/api/placeholder/320/180",
  },
  {
    id: 5,
    title: "Desert Storm",
    duration: "02:23",
    date: "2024-03-11",
    thumbnail: "/api/placeholder/320/180",
  },
  {
    id: 6,
    title: "Northern Lights",
    duration: "05:18",
    date: "2024-03-10",
    thumbnail: "/api/placeholder/320/180",
  },
];

const Filmography = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  const currentVideo =
    selectedVideo !== null ? videos.find((v) => v.id === selectedVideo) : null;

  const ViewfinderScreen = () => (
    <div className="relative h-full w-full bg-black p-4 font-mono text-green-500">
      <div className="absolute left-4 top-4 flex items-center space-x-2">
        <Battery className="h-4 w-4" />
        <span className="text-sm">100%</span>
      </div>

      <div className="absolute right-4 top-4 flex items-center space-x-2">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{currentVideo?.duration}</span>
      </div>

      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <img
          src={currentVideo?.thumbnail}
          alt={currentVideo?.title}
          className="aspect-video w-full max-w-2xl border-2 border-green-500 object-cover"
        />

        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Film className="h-4 w-4" />
            <span>{currentVideo?.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{currentVideo?.date}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSelectedVideo(null)}
        className="absolute bottom-4 left-4 rounded bg-green-500 px-4 py-2 text-black hover:bg-green-400"
      >
        Back to Gallery
      </button>
    </div>
  );

  const GalleryScreen = () => (
    <div className="min-h-screen bg-black p-4 text-green-500">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center font-mono text-2xl">
          <Camera className="mr-2" />
          Filmography
        </h1>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="rounded p-2 hover:bg-green-500 hover:text-black"
        >
          <Grid className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`grid ${isGridView ? "grid-cols-3" : "grid-cols-1"} gap-4`}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.id)}
            className="group relative cursor-pointer"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="aspect-video w-full border border-green-500 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 font-mono opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex justify-between text-sm">
                <span>{video.title}</span>
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      {selectedVideo ? <ViewfinderScreen /> : <GalleryScreen />}
    </div>
  );
};

export default Filmography;
