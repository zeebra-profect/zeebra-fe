import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(onIntersect: () => void) {
  const targetRef = useRef(null);
  const memoizedOnIntersect = useCallback(onIntersect, [onIntersect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          memoizedOnIntersect();
        }
      },
      { threshold: 1.0 }
    );
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [memoizedOnIntersect]);
  return targetRef;
}
