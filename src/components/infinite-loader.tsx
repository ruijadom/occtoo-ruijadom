import React, { HTMLAttributes, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

/**
 * Props for the InfiniteLoader component.
 * @template T - The type of items loaded by the component.
 */
interface InfiniteLoaderProps<T> {
  /**
   * A function to fetch more items.
   * @param skip - The number of items to skip.
   * @param limit - The number of items to fetch.
   * @returns A Promise that resolves to an array of items of type T.
   */
  fetchFn: (skip?: number, limit?: number) => Promise<T[]>;

  /**
   * A boolean indicating whether there are more pages to load.
   */
  hasNextPage: boolean;

  /**
   * A function to render the loaded items.
   * @param items - An array of items of type T to render.
   * @returns A React node representing the rendered items.
   */
  renderItems: (items: T[]) => React.ReactNode;

  /**
   * (Optional) A React node to display when there are no more items to load.
   */
  noMoreItems?: React.ReactNode;

  /**
   * (Optional) HTML attributes for the `<ul>` element.
   */
  ulNativeProps?: HTMLAttributes<HTMLUListElement>;

  /**
   * (Optional) HTML attributes for the `<li>` elements.
   */
  liNativeProps?: HTMLAttributes<HTMLLIElement>;
}

/**
 * A component for infinite scrolling and loading more items.
 * @template T - The type of items loaded by the component.
 * @param {InfiniteLoaderProps<T>} props - The component's props.
 */
function InfiniteLoader<T>({
  fetchFn,
  hasNextPage,
  renderItems,
  noMoreItems,
  ulNativeProps,
  liNativeProps
}: InfiniteLoaderProps<T>): React.ReactElement {
  const [items, setItems] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /**
   * Fetch more items asynchronously.
   * @param skip - The number of items to skip.
   * @returns A Promise that resolves to an array of new items.
   */
  const fetchMoreItems = async (skip: number) => {
    if (isFetching) return;

    setIsFetching(true);

    try {
      const newItems = await fetchFn(skip);
      return newItems;
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  /**
   * A reference to the last product element in the list, used for intersection observing.
   */

  const loadMore = useIntersectionObserver<HTMLDivElement>(() => {
    void fetchMoreItems(items.length).then(
      (newItems) => newItems && setItems((items) => [...items, ...newItems])
    );
  }, [hasNextPage, !isFetching]);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" {...ulNativeProps}>
        {React.Children.toArray(renderItems(items)).map((item, index) => {
          return (
            <li key={index} {...liNativeProps}>
              {item}
            </li>
          );
        })}
      </ul>
      <div ref={loadMore}></div>
      {!hasNextPage && noMoreItems}
    </>
  );
}

export default InfiniteLoader;
