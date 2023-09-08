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
      `/products?limit=${limit}&skip=${skip}`
    );

    const data: ProductResponse = response.data;

    if (data.total <= skip + limit) setHasNextPage(false);

    return data.products;
  };

  const renderElements = (items: Product[]) => {
    return items.map((product: Product) => (
      <div key={product.id} className="relative border h-60">
        <img
          className="flex h-full w-full object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="absolute bottom-0 px-3 py-2 w-full bg-black opacity-80 text-white capitalize">
          <h2 className=" font-semibold text-md truncate">{product.title}</h2>
          <p className=" font-extralight text-sm">{product.brand}</p>
        </div>
      </div>
    ));
  };

  const noMoreElement = <p className="text-center">No more items</p>;

  const loadingElement = Array.from(Array(currentLimit).keys()).map(
    (_, index) => (
      <div key={index} className="animate-pulse relative border h-60">
        <div className="flex h-full w-full bg-gray-200"></div>
      </div>
    )
  );

  return (
    <div className="min-h-screen w-full">
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Infinite Loader component</h2>
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
