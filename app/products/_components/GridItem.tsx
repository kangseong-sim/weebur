'use client";';

import Image from "next/image";
import { StarRating } from "./ProductList";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/type";

type ItemProps = {
  product: Product;
};

const GridItem = ({ product }: ItemProps) => {
  const router = useRouter();

  return (
    <div
      key={product.id}
      className="rounded-xl flex sm:flex-col gap-2 cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        className="object-cover rounded-md border"
      />
      <div className="flex flex-col justify-between gap-2 p-2.5 sm:p-0">
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-sm text-gray-600 ellipsis2">{product.description}</p>
        <div className="flex items-center justify-start gap-1">
          {StarRating(product.rating)}
          <div className="text-sm text-gray-500">
            (
            {typeof product.reviews === "number"
              ? product.reviews
              : product.reviews.length}
            )
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
