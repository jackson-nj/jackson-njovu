
import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  delay?: number;
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  const { root = null, rootMargin = '0px', threshold = 0, once = false, delay = 0 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => {
              setIsInView(true);
            }, delay);
          } else {
            setIsInView(true);
          }
          
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, root, rootMargin, threshold, once, delay]);

  return isInView;
}
