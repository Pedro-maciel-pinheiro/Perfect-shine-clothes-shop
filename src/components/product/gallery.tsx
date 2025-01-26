"use client";

import Image from "next/image";
import { useProduct, useUpdateURL } from "./product-context";
import { GridTileImage } from "../grid/tile";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Media } from "@/lib/shopify/types";

// Define a type that covers both image and video media
type MediaItem = 
  | ({ type: 'image'; src: string; altText: string })
  | ({ 
      type: 'video'; 
      id: string; 
      sources: Array<{ url: string; mimeType: string }>;
      previewImage?: { url: string };
    });

export function Gallery({
  images,
  media,
}: {
  images: { src: string; altText: string }[];
  media?: Media[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();

  // Transform media into a consistent MediaItem type
  const combinedMedia: MediaItem[] = [
    ...(media?.filter((m) => m.mediaContentType === "VIDEO").map(m => ({
      type: 'video' as const,
      id: m.id,
      sources: m.sources || [],
      previewImage: m.previewImage
    })) || []),
    ...images.map(img => ({ type: 'image' as const, ...img }))
  ];

  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex =
    imageIndex + 1 < combinedMedia.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? combinedMedia.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  const renderMedia = () => {
    const currentMedia = combinedMedia[imageIndex];

    if (currentMedia.type === 'video') {
      return (
        <video
          key={currentMedia.id}
          poster={currentMedia.previewImage?.url}
          autoPlay
          loop
          className="h-full w-full object-contain"
        >
          {currentMedia.sources.map((source) => (
            <source key={source.url} src={source.url} type={source.mimeType} />
          ))}
        </video>
      );
    }

    return (
      <Image
        className="h-full w-full object-contain"
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        alt={currentMedia.altText}
        src={currentMedia.src}
        priority={true}
      />
    );
  };

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {combinedMedia[imageIndex] && renderMedia()}

        {combinedMedia.length > 1 ? (
          <div className="absolute bottom-[5%] flex w-full justify-center">
            <div
              className="mx-auto flex h-11 items-center rounded-full border
             border-white bg-neutral-50/80 text-neutral-500 backdrop-blur
              dark:border-black dark:bg-neutral-900/80"
            >
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {combinedMedia.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {combinedMedia.map((media, index) => {
            const isActive = index === imageIndex;
            const thumbnailSrc =
              media.type === 'video' && media.previewImage
                ? media.previewImage.url
                : media.type === 'image'
                ? media.src
                : '';

            return (
              <li key={thumbnailSrc} className="h-20 w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={media.type === 'image' ? media.altText : ''}
                    src={thumbnailSrc}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}