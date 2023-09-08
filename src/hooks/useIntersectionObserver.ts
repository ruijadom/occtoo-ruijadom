import { DependencyList, useCallback, useRef } from "react";

/**
 * A custom React hook that creates an IntersectionObserver to monitor
 * when a target element enters the viewport and invokes a callback function.
 *
 * @param callback - The callback function to be invoked when the target element
 * enters the viewport.
 * @param deps - The dependency array that triggers the creation of the IntersectionObserver.
 * @returns A function ref that should be assigned to the target DOM element.
 */
export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList,
  options?: IntersectionObserverInit
) {
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * The callback function for the ref.
   *
   * @param node - The target DOM element to observe.
   */

  const ref = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback();
        }, options);

        if (node) observer.current.observe(node);
      }
    },
    [deps, callback, options]
  );

  return ref;
}
