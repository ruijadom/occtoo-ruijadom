import { useState } from "react";

import InfiniteLoader from "@/components/infinite-loader";
import dummyApi from "@/services/dummy-api";
import { Card } from "@/components/ui/card";

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
      <Card key={product.id}>
        <Card.Media src={product.thumbnail} alt={product.title} />
        <Card.Content>
          <div>
            <div className="flex flex-row justify-between">
              <h3 className="text-md truncate font-semibold">
                {product.title}
              </h3>
              <div>★ {product.rating}</div>
            </div>
            <p className="text-sm font-extralight">{product.brand}</p>
          </div>
          <p className="text-sm">{product.price} €</p>
        </Card.Content>
      </Card>
    ));
  };

  const noMoreElement = <p className="text-center">No more items</p>;

  const loadingElement = Array.from(Array(currentLimit).keys()).map(
    (_, index) => (
      <Card key={index} className="animate-pulse">
        <div>
          <div className="h-80 w-full animate-pulse rounded-xl border bg-gray-200"></div>
        </div>

        <Card.Content>
          <div>
            <div className="flex flex-row justify-between">
              <div className="h-6 w-1/2 rounded bg-gray-200"></div>
              <div className="h-5 w-1/4 rounded bg-gray-200"></div>
            </div>
            <div className="mt-2 h-4 w-1/4 rounded bg-gray-200"></div>
          </div>
          <div className="mt-2 h-4 w-1/6 rounded bg-gray-200"></div>
        </Card.Content>
      </Card>
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
