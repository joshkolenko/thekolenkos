import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import image1 from "@/images/engagement/engagement-1.jpg";
import image2 from "@/images/engagement/engagement-2.jpg";
import image3 from "@/images/engagement/engagement-3.jpg";
import image4 from "@/images/engagement/engagement-4.jpg";
import image5 from "@/images/engagement/engagement-5.jpg";
import image6 from "@/images/engagement/engagement-6.jpg";
import image7 from "@/images/engagement/engagement-7.jpg";
import image8 from "@/images/engagement/engagement-8.jpg";
import clsx from "clsx";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

export function EngagementCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: true,
    loop: true,
  });

  const [loaded, setLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setLoaded(true);
  }, [emblaApi]);

  const onInit = useCallback(() => {
    console.log("Embla initialized");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("init", onInit);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("init", onInit);
    };
  }, [emblaApi, onSelect, onInit]);

  return (
    <div className="embla h-[400px] md:h-[600px]" ref={emblaRef}>
      {!loaded ? (
        <div></div>
      ) : (
        <div className="embla__container animate-fade h-full">
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  "flex-none h-full transition-opacity duration-500",
                  i === selectedIndex ? "opacity-100" : "opacity-50"
                )}
              >
                <img
                  src={image.src}
                  alt={`Engagement image ${i + 1}`}
                  className="h-full w-auto object-cover pointer-events-none select-none"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
