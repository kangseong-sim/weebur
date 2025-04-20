"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { parseSearchParamsToObject } from "@/utils/QueryString";
import ProductService from "@/service/ProductService";
import { SyncLoader } from "react-spinners";
import Star from "./Star";
import ListItem from "./ListItem";
import GridItem from "./GridItem";
import TopBtn from "@/components/TopBtn";

export type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Array<number>;
};

type ViewType = "list" | "grid";

const getRandomViewType = (): ViewType => {
  const type = localStorage.getItem("view-type");
  const timestamp = localStorage.getItem("view-type-timestamp");

  if (type && timestamp) {
    const now = Date.now();
    const saved = parseInt(timestamp);
    const diff = now - saved;

    if (diff < 1000 * 60 * 60 * 24) {
      return type as ViewType;
    }
  }

  const newType = Math.random() > 0.5 ? "list" : "grid";
  localStorage.setItem("view-type", newType);
  localStorage.setItem("view-type-timestamp", Date.now().toString());
  return newType;
};

export const StarRating = (rating: number) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = rating - i;
    const percent = diff >= 1 ? 100 : diff > 0 ? diff * 100 : 0;
    return <Star key={i} fillPercent={percent} />;
  });

  return <div className="flex gap-0.5">{stars}</div>;
};

export default function ProductList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryBody = parseSearchParamsToObject(searchParams);

  const [viewType, setViewType] = useState<ViewType>("grid");
  const sortOrder = queryBody.sort === "asc" ? "asc" : "desc";

  const { ref, inView } = useInView();

  const LIMIT = 20;

  const updateSort = (order: "asc" | "desc") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", order);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      { products: Product[]; total: number; skip: number; limit: number },
      Error
    >({
      queryKey: ["products", JSON.stringify(queryBody)],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await ProductService.getProducts({
          skip: pageParam as number,
          limit: LIMIT,
          sortBy: "rating",
          order: sortOrder,
          ...queryBody,
        });
        return res.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { skip, products, total, limit } = lastPage;
        const nextSkip = skip + products.length;

        return total === 0 || limit < LIMIT ? undefined : nextSkip;
      },
    });

  const allProducts = data?.pages.flatMap((page) => page?.products) || [];
  const totalCount = data?.pages[0]?.total ?? 0;
  const isEmpty = allProducts.length === 0;

  useEffect(() => {
    const type = getRandomViewType();
    setViewType(type);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="cus-container py-5 mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-5">
        <h1 className="text-2xl font-bold mb-4">상품리스트</h1>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-md font-semibold">총 {totalCount}개</p>
        <div className="flex items-center gap-2">
          <button
            className={`text-md cursor-default ${
              sortOrder === "asc" ? "font-semibold" : "text-gray-400"
            }`}
            onClick={() => updateSort("asc")}
          >
            오름차순
          </button>
          <button
            className={`text-md cursor-default ${
              sortOrder === "desc" ? "font-semibold" : "text-gray-400"
            }`}
            onClick={() => updateSort("desc")}
          >
            내림차순
          </button>
        </div>
      </div>

      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 sm:grid-cols-[repeat(4,_276px)] gap-8 overflow-scroll"
            : "flex flex-col"
        }
      >
        {allProducts.map((product) =>
          viewType === "list" ? (
            <ListItem key={product.id} product={product} />
          ) : (
            <GridItem key={product.id} product={product} />
          )
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <SyncLoader
            color="#4175F5"
            loading
            margin={4}
            size={8}
            speedMultiplier={1}
          />
        </div>
      )}

      {!isLoading && isEmpty && (
        <div className="flex flex-col items-center justify-center gap-4 pt-[230px] pb-[200px] ">
          <Image
            src="/icons/warning.svg"
            alt={"일치하는 결과가 없습니다."}
            width={90}
            height={90}
            priority={false}
          />
          <p className="text-center font-semibold">일치하는 결과가 없습니다.</p>
        </div>
      )}

      {isFetchingNextPage ? (
        <div className="py-10 text-center">
          <SyncLoader
            color="#4175F5"
            loading
            margin={4}
            size={8}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div ref={ref} />
      )}
      {!isFetchingNextPage && !hasNextPage && allProducts.length > 0 && (
        <div className="py-10 text-center">더 이상 불러올 수 없습니다.</div>
      )}
      <TopBtn />
    </div>
  );
}
