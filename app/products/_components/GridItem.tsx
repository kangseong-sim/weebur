import Image from "next/image";
import { Product, StarRating } from "./ProductList";

type ItemProps = {
  product: Product;
};

const GridItem = ({ product }: ItemProps) => (
  <div
    key={product.id}
    className="rounded-xl flex sm:flex-col gap-2 cursor-pointer"
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
        <div className="text-sm text-gray-500">({product.reviews.length})</div>
      </div>
    </div>
  </div>
);

export default GridItem;
