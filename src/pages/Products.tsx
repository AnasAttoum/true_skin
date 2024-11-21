import ProductCard from "../components/ProductCard";
import ProductsPagination from "../components/ProductsPagination";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import HelmetDetails from "../components/HelmetDetails";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

export default function Products() {

  const products = useSelector((state: RootState) => state.product);

  const [page, setPage] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <HelmetDetails title="Products" href="/products" description="True Skin Products"/>

      <Title title="Our Products" />

      <div className="flex flex-wrap justify-center gap-5 p-5">
        {products
          .slice((page - 1) * 20, 20 + (page - 1) * 20)
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>

      <ProductsPagination products={products} page={page} setPage={setPage} />
    </>
  );
}
