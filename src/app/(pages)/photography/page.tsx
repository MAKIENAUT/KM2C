import FilmStrip from "@/components/FilmStrip";
import { vt323 } from "@/lib/fonts";
import { PHOTO_VALUES } from "@/lib/values";

export default function PhotographyPage() {
  return (
    <section className="h-[1000px] bg-cream py-2">
      <h1 className={`${vt323.className} mb-4 px-16 text-8xl text-maroon`}>
        PHOTOGRAPHY
      </h1>
      <div className="no-scrollbar flex w-full overflow-x-scroll">
        {PHOTO_VALUES.map(({ tailwindUrl, url, imgPosition, slug }) => (
          <FilmStrip
            key={url}
            tailwindUrl={tailwindUrl}
            imgPosition={imgPosition}
            slug={slug}
          />
        ))}
      </div>
      <div className="no-scrollbar flex w-full flex-row-reverse overflow-x-scroll">
        {PHOTO_VALUES.reverse().map(
          ({ tailwindUrl, url, imgPosition, slug }) => (
            <FilmStrip
              key={url}
              tailwindUrl={tailwindUrl}
              imgPosition={imgPosition}
              slug={slug}
            />
          )
        )}
      </div>
    </section>
  );
}
