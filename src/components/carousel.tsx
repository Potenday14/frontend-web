import useEmblaCarousel from "embla-carousel-react";
import { Character } from "../mock/data";
import { useEffect } from "react";
import { DotButton, useDotButton } from "./dot-button";
import { cn } from "./utils";

interface EmblaCarouselProps {
  characters: Character[];
  onSelect: (index: number) => void;
}

export function EmblaCarousel({ characters, onSelect }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi
      .on("init", () => {
        console.log("Embla Carousel initialized");
        onSelect(0);
      })
      .on("select", () => {
        const currentSlide = emblaApi.selectedScrollSnap();
        onSelect(currentSlide);
        console.log("Selected index:", characters[currentSlide].mood);
      });
  }, [emblaApi, onSelect, characters]);

  return (
    <div className="embla">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {characters.map((character) => (
            <div
              key={character.id}
              className="embla__slide flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center"
            >
              <img
                src={character.image}
                alt={character.mood}
                className="embla__slide__img select-none"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots flex flex-wrap justify-center items-center gap-[9px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "embla__dot w-4 h-4 rounded-full",
              index === selectedIndex
                ? "bg-[#898989] embla__dot--selected"
                : "bg-[#d9d9d9]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
