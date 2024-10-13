"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera, Grid, Battery, Wifi } from "lucide-react";
import { galleryItems } from "@/data/FilmographyData";
import {
  SlideshowItem,
  VideoItem,
  GalleryItem,
} from "@/types/Filmography_Types";

const VideoGallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  // const videoRef = useRef<HTMLVideoElement>(null);

  const currentGalleryItem =
    selectedItem !== null
      ? galleryItems.find((item) => item.id === selectedItem)
      : null;

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (currentGalleryItem?.type === "Slideshow") {
      slideInterval = setInterval(() => {
        changeSlide(
          (currentSlide + 1) %
            (currentGalleryItem as SlideshowItem).images.length
        );
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(slideInterval);
  }, [currentGalleryItem, currentSlide]);

  const changeSlide = (newSlide: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(newSlide);
      setIsTransitioning(false);
    }, 300); // Match this with the transition duration in CSS
  };

  const ViewfinderScreen: React.FC = () => {
    if (!currentGalleryItem) return null;

    return (
      <div className="relative h-screen w-full bg-black pt-20 font-mono">
        <div className="flex h-full">
          {/* Main content area */}
          <div className="relative flex-1 p-4">
            {/* Top info bar */}
            <div className="mb-2 flex justify-between text-xs text-white">
              <div className="flex items-center space-x-4">
                <span>{`${galleryItems.indexOf(currentGalleryItem) + 1}/${galleryItems.length}`}</span>
                <Battery className="h-4 w-4" />
                <span>100%</span>
                <Wifi className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-2">
                <span>2024-10-12 15:30:00</span>
                <span>100-0118</span>
              </div>
            </div>

            {/* Content display */}
            <div className="relative flex h-5/6 w-full justify-center overflow-hidden rounded-md border border-gray-800">
              {currentGalleryItem.type === "Video" ? (
                <>
                  {/* <YouTube
                    videoId={(currentGalleryItem as VideoItem).videoSrc}
                    // opts={opts}
                    // onReady={this._onReady}
                    className="aspect-video w-full self-stretch md:min-h-96"
                  /> */}
                  <iframe
                    src={(currentGalleryItem as VideoItem).videoSrc}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="aspect-video w-full self-stretch md:min-h-96"
                  />
                  {/* Complementary shots */}
                  <div className="absolute left-4 top-24 flex-col space-y-2">
                    {(currentGalleryItem as VideoItem).complementaryShots.map(
                      (shot, index) => (
                        <div
                          key={index}
                          className="h-20 w-20 border border-gray-800"
                          style={{
                            backgroundImage: `url(${shot})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )
                    )}
                  </div>
                </>
              ) : (
                <div className="relative h-full w-full rounded-md border border-gray-800">
                  <div
                    className={`absolute inset-0 bg-contain bg-center bg-no-repeat bg-origin-content transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                    style={{
                      backgroundImage: `url(${(currentGalleryItem as SlideshowItem).images[currentSlide]})`,
                    }}
                  />
                  {/* Preview of previous and next slides */}
                  <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between">
                    <div
                      className="h-20 w-20 cursor-pointer border border-gray-800 bg-cover bg-center opacity-50 transition-all hover:opacity-100"
                      style={{
                        backgroundImage: `url(${(currentGalleryItem as SlideshowItem).images[(currentSlide - 1 + (currentGalleryItem as SlideshowItem).images.length) % (currentGalleryItem as SlideshowItem).images.length]})`,
                      }}
                      onClick={() =>
                        changeSlide(
                          (currentSlide -
                            1 +
                            (currentGalleryItem as SlideshowItem).images
                              .length) %
                            (currentGalleryItem as SlideshowItem).images.length
                        )
                      }
                    />
                    <div
                      className="h-20 w-20 cursor-pointer border border-gray-800 bg-cover bg-center opacity-50 transition-all hover:opacity-100"
                      style={{
                        backgroundImage: `url(${(currentGalleryItem as SlideshowItem).images[(currentSlide + 1) % (currentGalleryItem as SlideshowItem).images.length]})`,
                      }}
                      onClick={() =>
                        changeSlide(
                          (currentSlide + 1) %
                            (currentGalleryItem as SlideshowItem).images.length
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right panel with description */}
          <div className="w-96 overflow-y-auto border-l border-gray-800 p-4 text-white">
            <h2 className="mb-4 text-2xl font-bold">
              {currentGalleryItem.information.title}
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <strong>Year:</strong> {currentGalleryItem.information.year}
              </div>
              <div>
                <strong>Total running time:</strong>{" "}
                {currentGalleryItem.information.totalRunningTime}
              </div>
              <div>
                <strong>Type:</strong> {currentGalleryItem.information.type}
              </div>
              <div>
                <strong>Role:</strong> {currentGalleryItem.information.role}
              </div>
              <div>
                <strong>Synopsis:</strong>
                <p className="mt-2">
                  {currentGalleryItem.information.synopsis}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom control bar */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-gray-800 bg-black bg-opacity-75 p-2 text-xs text-white">
          <button
            onClick={() => setSelectedItem(null)}
            className="rounded border border-gray-600 px-3 py-1 hover:bg-gray-800"
          >
            Back
          </button>
          <span>CARD 1</span>
        </div>
      </div>
    );
  };

  const GalleryScreen: React.FC = () => (
    <div className="min-h-screen bg-black p-2 text-white sm:p-4">
      {/* Gallery Header */}
      <div className="mb-4 flex flex-col items-start justify-between border-b border-gray-800 pb-4 sm:mb-6 sm:flex-row sm:items-center">
        <h1 className="mb-2 flex items-center font-mono text-xl sm:mb-0 sm:text-2xl">
          <Camera className="mr-2" />
          Gallery
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{galleryItems.length} Items</span>
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
        className={`grid ${
          isGridView
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        } gap-4 sm:gap-6`}
      >
        {galleryItems.map((item: GalleryItem) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className="group relative cursor-pointer"
          >
            <img
              src={
                item.type === "Video"
                  ? (item as VideoItem).thumbnail
                  : (item as SlideshowItem).images[0]
              }
              alt={item.title}
              className="aspect-video w-full border border-gray-800 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 font-mono opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex justify-between text-xs">
                <span>{item.title}</span>
                {item.type === "Video" && (
                  <span>{(item as VideoItem).duration}</span>
                )}
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>{item.date}</span>
                <span>{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      {selectedItem ? <ViewfinderScreen /> : <GalleryScreen />}
    </div>
  );
};

export default VideoGallerySection;
