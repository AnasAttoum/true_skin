import Title from "../components/Title";
import { products } from "../constants/data";
import ProductCard from "../components/ProductCard";
import Intro from "../sections/Intro";
import Tale from "../sections/Tale";

export default function Home() {
  return (
    <>
      <Intro />

      <Title title="Popular Products" />

      <div className="flex flex-wrap justify-center gap-5 p-5">
        {products.slice(0, 4).map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>

      <Tale />
    </>
  );
}
