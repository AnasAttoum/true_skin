import ProductCard from "../components/ProductCard";
import ProductsPagination from "../components/ProductsPagination";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import HelmetDetails from "../components/HelmetDetails";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import BasicTextField from "../components/inputs/BasicTextField";

export default function Products() {

  const products = useSelector((state: RootState) => state.product);

  const [searchInput, setSearchInput] = useState("");
  const [searchedProducts, setSearcedProduct] = useState(products);

  useEffect(()=>{
    setSearcedProduct(products)
  },[products])

  const [page, setPage] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
    setSearcedProduct(
      products.filter((product) => {
        return (
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.description.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  return (
    <>
      <HelmetDetails
        title="Products"
        href="/products"
        description="True Skin Products"
      />

      <Title title="Our Products" />

      <BasicTextField
        val={searchInput}
        handleChange={handleChange}
        error={""}
        name="search"
        label="Search ..."
      />

      {!searchedProducts.length ? (
        <div className="flex flex-col justify-center items-center w-full p-5">
          <Title title="No Result" />
          <iframe
            src="/images/empty.svg"
            title="Your Cart is Empty"
            style={{ height: "calc(100vh - 400px)", width: "100vw" }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-5 p-5">
            {searchedProducts
              .slice((page - 1) * 20, 20 + (page - 1) * 20)
              .map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </div>

          <ProductsPagination
            products={searchedProducts}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
}
