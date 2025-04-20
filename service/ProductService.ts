import http from "@/lib/http";
import { Product, ProductsResponse } from "@/lib/type";
import { ParsedQueryParams } from "@/utils/QueryString";

//  상품 목록 조회
const getProducts = (params: ParsedQueryParams) => {
  const hasQuery = !!params.q;
  const endpoint = hasQuery ? "/products/search" : "/products";
  return http.get<ProductsResponse>(endpoint, { params });
};

//  상품 상세 조회
const getProductDetail = (id: string) => {
  return http.get<Product>(`products/${id}`);
};

const ProductService = {
  getProducts,
  getProductDetail,
};

export default ProductService;
