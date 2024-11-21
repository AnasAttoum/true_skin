import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../constants/data";
import QuantityInput from "../components/inputs/QualityInput";
import { useInView } from "react-intersection-observer";

export default function ProductDetails() {
  const { ref: title, entry: titleEntry, inView: titleInView } = useInView();
  const { ref: image, entry: imageEntry, inView: imageInView } = useInView();

  const { productId } = useParams();
  const [data, setData] = useState({
    name: "",
    price: 0,
    stock: 0,
    image: "",
    description: "",
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      const found = products.find((product) => {
        return product.id === parseInt(productId);
      });
      if (found) setData(found);
    }
  }, [productId]);

  useEffect(() => {
    if (titleInView && titleEntry) {
      (titleEntry.target as HTMLElement).style.animation =
        "toLeftAnimation 1s .5s forwards";
    }
    if (imageInView && imageEntry) {
      (imageEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s 1.5s forwards";
    }
  }, [titleInView, titleEntry, imageInView, imageEntry]);

  const handleAddToCart = () => {
    console.log(quantity);
  };

  return (
    <div className="flex max-lg:flex-col-reverse justify-center gap-5">
      <div className="flex justify-center w-full lg:w-1/2 h-screen opacity-0" ref={image}>
        <img
          src={data.image}
          alt={data.name}
          className="h-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-evenly gap-5 w-full lg:w-1/2 p-5 opacity-0" ref={title}>
        <div className="text-3xl text-[--primary] font-extrabold">
          {data.name}
        </div>
        <div className="text-justify">
          <p className="text-[--primary] font-bold">Description:</p>
          {data.description}
        </div>
        <div className="flex flex-col gap-7">
          <div className="text-justify">
            <span className="text-[--primary] font-bold">Price: </span>
            <span className="font-bold">{data.price}</span>$
          </div>

          {data.stock ? (
            <>
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={data.stock}
              />

              <div className="flex">
                <div className="btn" onClick={handleAddToCart}>
                  Add To Cart
                </div>
              </div>
            </>
          ) : (
            <div className="text-red-500">-- No more in Stock --</div>
          )}
        </div>
      </div>
    </div>
  );
}
