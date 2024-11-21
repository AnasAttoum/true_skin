import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import Intro from "../sections/Intro";
import Tale from "../sections/Tale";
import HelmetDetails from "../components/HelmetDetails";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

export default function Home() {

  const products = useSelector((state:RootState) => state.product)

  return (
    <>
      <HelmetDetails
        title=""
        href="/"
        description="True Skin is here to help you achieve your best skin yet. We make skincare fun, easy, and effective. Explore our products and find your perfect match!"
      />

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
