"use client";

import ProductService from "@/service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ProductDetail from "./_components/ProductDetail";
import Loading from "./loading";

export default function ProductIdPage() {
  const params = useParams(); // 클라이언트용 훅
  const productId = params?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => ProductService.getProductDetail(productId),
    enabled: !!productId,
  });

  const product = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="cus-container py-5 mx-auto">
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
