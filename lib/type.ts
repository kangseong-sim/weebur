export type ViewMode = "list" | "grid";

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Review {
  rating: number;
  comment: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  availabilityStatus: string;
  dimensions?: Dimensions;
  weight?: number;
  sku: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  tags?: string[];
  meta?: Meta;
  reviews: Review[] | number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsParams {
  skip: number;
  limit: number;
  query?: string;
  sortByRating?: boolean;
}
