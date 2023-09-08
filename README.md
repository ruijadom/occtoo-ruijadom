# Technical Challenge at Occtoo by Ruijadom

## Table of Contents

- [Technical Challenge at Occtoo by Ruijadom](#technical-challenge-at-occtoo-by-ruijadom)
  - [Table of Contents](#table-of-contents)
  - [Deployed:](#deployed)
  - [Description](#description)
    - [Additional notes:](#additional-notes)
  - [Solution](#solution)
    - [How to run](#how-to-run)
    - [Structure](#structure)
    - [How it works](#how-it-works)
    - [Tasks Required](#tasks-required)
    - [Additional notes:](#additional-notes-1)

## Deployed: 
https://occtoo-ruijadom.vercel.app/

## Description

This is a technical challenge for Occtoo. The challenge is to create an infinite loader component, with the following requirements:

- The code should be written in Typescript, using the latest React paradigms.
- The infinite loader should be generic, meaning it needs to work with any API which supports pagination and it needs to be able to render any kind of content the consumer of the component requires (e.g. client side pagination).
- On scrolling to the end of the view, it should fetch and render the next results.
- The component needs to take performance into consideration.

### Additional notes:

- Writing tests is not a requirement here.
- You can share the result in any place that works for you (github link, code sandbox etc)
- This does not need to be a production ready component, aside from implementing the requirements, mentioning any additional options you would bake into the component, and how, is enough.
- You could use any API you want, but if you’re out of ideas (we could reformulate this part with out of ideas), you could use this one: https://picsum.photos/v2/list

## Solution

### How to run

- Clone the repo
- Run `pnpm install`
- Run `pnpm dev`
- Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
- Scroll down to see the infinite loader in action. 

### Structure

- `src/components/InfiniteLoader` contains the component itself.
- `src/hooks/useIntersectionObserver.ts` contains the hook that handles the intersection observer.
- `src/pages/home.page.tsx` contains the page that uses the component.
- `src/services/dummy-api.ts` contains the dummy API used to fetch the data.

### How it works

The component uses the `useIntersectionObserver` hook to detect when the user has scrolled to the bottom of the page. When that happens, the component calls the callback passed. The callback is responsible for fetching the next page of data and updating the state of the component. The component then renders the new data.

### Tasks Required
- [x] The code should be written in Typescript, using the latest React paradigms. 
  > The code is written in TypeScript, as indicated by the file extensions .tsx and the use of type annotations (interface, React.FC, InfiniteLoaderProps, etc.).
  > It uses modern React paradigms such as functional components, hooks (useState, useEffect, useCallback, and custom hooks). 
- [x] The infinite loader should be generic, meaning it needs to work with any API which supports pagination and it needs to be able to render any kind of content the consumer of the component requires (e.g. client side pagination).
  > The InfiniteLoader component is designed to be generic and reusable. It accepts a fetchFn function to fetch more items, a renderItems function to render items, and other optional props to customize its behavior.
- [x]  On scrolling to the end of the view, it should fetch and render the next results.
  > The InfiniteLoader component uses the Intersection Observer API (useIntersectionObserver custom hook) to detect when the user scrolls to the end of the view.
  > When the user reaches the end, it calls the fetchMoreItems function to load more data asynchronously.
- [x]  The component needs to take performance into consideration.
  > The code takes performance into consideration by not initiating multiple concurrent fetch requests (isFetching check in fetchMoreItems).
  > It efficiently updates the state using setItems to append new items without unnecessary re-renders.

### Additional notes:
- [x] The component could be improved by adding a loading state to the API call.
  > Added the `loadingElement` prop is an optional prop you can include in your component. It expects a React node, which can be any valid React component or JSX. This node will be displayed in place of the regular content while the API call is in progress. Essentially, it serves as a visual indicator to the user that something is happening in the background.
- [ ] The component could be improved by adding a loading state and a retry button in case the API call fails.
- [ ] The component could be improved by adding a debounce to the intersection observer callback to avoid making too many API calls.
  
Thanks for reading! 