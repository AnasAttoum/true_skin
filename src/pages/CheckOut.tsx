import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import Title from "../components/Title";
import { Divider } from "@mui/material";
import BasicTextField from "../components/inputs/BasicTextField";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { addOrder } from "../lib/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../lib/slices/cartSlice";

export default function CheckOut() {
  const { ref: delivery, entry: deliveryEntry, inView: deliveryInView } = useInView();
  const { ref: billing, entry: billingEntry, inView: billingInView } = useInView();

  useEffect(() => {
    if (deliveryInView && deliveryEntry) {
      (deliveryEntry.target as HTMLElement).style.animation =
        "toRightAnimation 1s 1s forwards";
    }
    if (billingInView && billingEntry) {
      (billingEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s .5s forwards";
    }
  }, [deliveryInView, deliveryEntry, billingInView, billingEntry]);

  const products = useSelector((state: RootState) => state.product);
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!cart.length)
        navigate('/products')
  },[navigate,cart])

    const [data, setData] = useState({
      address: "",
      orderNote: "",
    });
    const [error, setError] = useState({
      address: "",
      orderNote: "",
    });

    useEffect(()=>{
        setData({address:user.address,orderNote:""})
    },[user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrder = () => {
        setError({
          address: "",
          orderNote: "",
        });
        if(data.address.length>=10){
            dispatch(
              addOrder({
                cart: cart,
                address: data.address,
                orderNotes: data.orderNote,
                date: new Date(),
              })
            );
            dispatch(resetCart())
        }
    };

  return (
    <div style={{ minHeight: "calc(100vh - 120px)" }}>
      <Title title="CheckOut" />

      <div className="flex max-lg:flex-col-reverse justify-evenly">
        <div className="w-full lg:w-1/2 opacity-0" ref={delivery}>
          <Title title="Delivery Details" />
          <BasicTextField
            val={data.address}
            handleChange={handleChange}
            error={error.address}
            name="address"
            label="Address"
          />
          <BasicTextField
            val={data.orderNote}
            handleChange={handleChange}
            error={error.orderNote}
            name="orderNote"
            label="Order Notes"
          />
          <div className="flex justify-center my-5">
            <div className="btn" onClick={handleOrder}>
              Order Now
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 opacity-0" ref={billing}>
          <Title title="Billing Details" />

          <div className="flex flex-col items-center justify-center p-5 max-sm:text-xs">
            {cart.map((el) => {
              const data = products.find((product) => {
                return product.id === el.id;
              });
              return (
                <div className="flex justify-between w-3/4 lg:w-1/2">
                  <div className="text-gray-800">
                    {data?.name}{" "}
                    <span className="font-bold"> x {el.quantity}</span>
                  </div>
                  <div className="font-bold">
                    {el.quantity * (data?.price || 1)}
                  </div>
                </div>
              );
            })}
          </div>

          <Divider />
          <div className="flex flex-col items-center justify-center p-5 max-sm:text-xs">
            <div className="flex justify-between w-3/4 lg:w-1/2">
              <div className="text-gray-800">Products:</div>
              <div className="font-bold">{cart.length}</div>
            </div>
            <div className="flex justify-between w-3/4 lg:w-1/2">
              <div className="text-gray-800">Items:</div>
              <div className="font-bold">
                {cart.reduce((acc, el) => {
                  return acc + el.quantity;
                }, 0)}
              </div>
            </div>
            <div className="flex justify-between w-3/4 lg:w-1/2">
              <div className="text-gray-800">Total:</div>
              <div className="font-bold">
                {cart.reduce((acc, el) => {
                  const data = products.find((product) => {
                    return product.id === el.id;
                  });
                  return acc + el.quantity * (data?.price || 1);
                }, 0)}{" "}
                $
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}