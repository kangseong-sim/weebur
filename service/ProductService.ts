import { Product } from "@/app/products/_components/ProductList";
import http from "@/lib/http";
import { ParsedQueryParams } from "@/utils/QueryString";

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

//  상품 목록 조회
const getProducts = (params: ParsedQueryParams) => {
  const hasQuery = !!params.q;
  const endpoint = hasQuery ? "/products/search" : "/products";
  return http.get<ProductResponse>(endpoint, { params });
};

const ProductService = {
  getProducts,
};

export default ProductService;
