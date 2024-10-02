import { useState, useEffect } from "react";

export const useInView = (
  ref: React.RefObject<HTMLElement>,
  thresholds: number[] = [0.1],
  onChange?: (entry: IntersectionObserverEntry) => void
) => {
  const [isInView, setIsInView] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
        if (onChange) onChange(entry);
      },
      { threshold: thresholds }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, thresholds, onChange]);

  return { isInView, intersectionRatio };
};
