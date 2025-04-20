import { Suspense } from "react";
import Products from "./_components/ProductList";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}
