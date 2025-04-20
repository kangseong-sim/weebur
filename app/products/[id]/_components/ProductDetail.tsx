"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/type";
import ProductReviews from "./ProductReviews";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);

  const discountedPrice =
    product.price - product.price * (product.discountPercentage / 100);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(
      product.minimumOrderQuantity || 1,
      Math.min(value, product.stock)
    );
    setQuantity(newQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 이미지 갤러리 */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedImage(product.thumbnail)}
              className={`relative w-20 h-20 rounded-md border overflow-hidden flex-shrink-0 cursor-pointer ${
                selectedImage === product.thumbnail
                  ? "border-[1px] border-gray-800"
                  : ""
              }`}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                className="object-cover"
              />
            </button>

            {product.images &&
              product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 rounded-md border overflow-hidden flex-shrink-0 ursor-pointer ${
                    selectedImage === image
                      ? "border-[1px] border-gray-800"
                      : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`상품 이미지 ${index + 1}`}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    className="object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <div className="hover:underline">
                {product.category
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
              <ChevronRight className="w-4 h-4" />
              <span>{product.title}</span>
            </div>

            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">
                리뷰{" "}
                {Array.isArray(product.reviews) ? product.reviews.length : 0}개
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-end gap-2">
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-3xl font-bold">
                    ₩
                    {discountedPrice.toLocaleString("ko-KR", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₩
                    {product.price.toLocaleString("ko-KR", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {product.discountPercentage.toFixed(0)}% 할인
                  </Badge>
                </>
              )}
              {product.discountPercentage === 0 && (
                <span className="text-3xl font-bold">
                  ₩
                  {product.price.toLocaleString("ko-KR", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Badge
                variant="outline"
                className={
                  product.stock > 0
                    ? "text-green-600 border-green-600"
                    : "text-red-600 border-red-600"
                }
              >
                {product.availabilityStatus}
              </Badge>
              {product.stock > 0 && (
                <span className="text-gray-500">재고: {product.stock}개</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">배송 정보</p>
                  <p className="text-sm text-gray-500">
                    {product.shippingInformation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">반품 정책</p>
                  <p className="text-sm text-gray-500">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">보증 정보</p>
                  <p className="text-sm text-gray-500">
                    {product.warrantyInformation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 text-gray-600">수량</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= (product.minimumOrderQuantity || 1)}
                  className="cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {product.minimumOrderQuantity > 1 && (
                <span className="ml-4 text-sm text-gray-500">
                  최소 주문 수량: {product.minimumOrderQuantity}개
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 gap-2 cursor-pointer">
                <ShoppingCart className="w-5 h-5" />
                장바구니에 추가
              </Button>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b justify-start rounded-none">
            <TabsTrigger value="description" className="cursor-pointer">
              상품 설명
            </TabsTrigger>
            <TabsTrigger value="specifications" className="cursor-pointer">
              상세 사양
            </TabsTrigger>
            <TabsTrigger value="reviews" className="cursor-pointer">
              리뷰 (
              {Array.isArray(product.reviews) ? product.reviews.length : 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p className="text-lg">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">제품 사양</h3>
                <div className="space-y-2">
                  {product.dimensions && (
                    <div className="flex">
                      <span className="w-32 text-gray-600">크기 (WxHxD)</span>
                      <span>
                        {product.dimensions.width} x {product.dimensions.height}{" "}
                        x {product.dimensions.depth} cm
                      </span>
                    </div>
                  )}

                  {product.weight && (
                    <div className="flex">
                      <span className="w-32 text-gray-600">무게</span>
                      <span>{product.weight} g</span>
                    </div>
                  )}

                  <div className="flex">
                    <span className="w-32 text-gray-600">SKU</span>
                    <span>{product.sku}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">추가 정보</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-32 text-gray-600">카테고리</span>
                    <span>
                      {product.category
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </div>

                  {product.meta && (
                    <div className="flex">
                      <span className="w-32 text-gray-600">바코드</span>
                      <span>{product.meta.barcode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <ProductReviews
              reviews={Array.isArray(product.reviews) ? product.reviews : []}
              productId={product.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
