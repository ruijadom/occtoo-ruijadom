import { useState } from "react";

import InfiniteLoader from "@/components/infinite-loader";
import dummyApi from "@/services/dummy-api";

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

function App() {
  const [hasNextPage, setHasNextPage] = useState(true);
  const currentLimit = 9;

  const fetchApi = async (skip = 0, limit = currentLimit) => {
    const response = await dummyApi.get(
      `/products?limit=${limit}&skip=${skip}`,
    );

    const data: ProductResponse = response.data;

    if (data.total <= skip + limit) setHasNextPage(false);

    return data.products;
  };

  const renderElements = (items: Product[]) => {
    return items.map((product: Product) => (
      <div key={product.id} className="relative h-60 border">
        <img
          className="h-48 w-full object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className=" absolute bottom-0 w-full bg-black px-3 py-2 capitalize text-white opacity-80">
          <h2 className="text-md truncate font-semibold">{product.title}</h2>
          <p className=" text-sm font-extralight">{product.brand}</p>
        </div>
      </div>
    ));
  };

  const noMoreElement = <p className="text-center">No more items</p>;

  const loadingElement = Array.from(Array(currentLimit).keys()).map(
    (_, index) => (
      <div key={index} className="relative h-60 animate-pulse border">
        <div className="flex h-full w-full bg-gray-200"></div>
      </div>
    ),
  );

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold">Infinite Loader component</h2>
        <InfiniteLoader
          fetchFn={fetchApi}
          hasNextPage={hasNextPage}
          renderItems={renderElements}
          noMoreElement={noMoreElement}
          loadingElement={loadingElement}
        />
      </div>
    </div>
  );
}

export default App;
