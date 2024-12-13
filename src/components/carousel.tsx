import useEmblaCarousel from "embla-carousel-react";
import { Character } from "../mock/data";
import { useCallback, useEffect, useRef } from "react";
import { DotButton, useDotButton } from "./dot-button";
import { cn } from "./utils";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";

interface EmblaCarouselProps {
  characters: Character[];
  onSelect: (index: number) => void;
}

const TWEEN_FACTOR_BASE = 0.2;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function EmblaCarousel({ characters, onSelect }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__img") as HTMLElement;
    });
  }, []);
  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];

          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  const currentCharacter = characters[selectedIndex];

  useEffect(() => {
    onSelect(selectedIndex);
  }, [selectedIndex, onSelect]);

  return (
    <div className="embla">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {characters.map((character) => (
            <div
              key={character.id}
              className="embla__slide flex-shrink-0 flex-grow-0 basis-6/12 flex items-center justify-center"
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
      <div className="flex items-center text-center justify-center mt-4">
        {currentCharacter.mood}
      </div>
      <div className="embla__dots flex flex-wrap justify-center items-center gap-[9px] mt-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "embla__dot w-4 h-4 rounded-full",
              index === selectedIndex
                ? "bg-gray-700 embla__dot--selected"
                : "bg-gray-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}
