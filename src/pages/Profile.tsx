import { useEffect, useState } from "react";
import HelmetDetails from "../components/HelmetDetails";
import Title from "../components/Title";
import BasicTextField from "../components/inputs/BasicTextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { validateProfile } from "../validations/validation";
import { updateUser } from "../lib/slices/userSlice";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.product);
  const orders = useSelector((state: RootState) => state.order);
  const [changeText, setChangeText] = useState("Change");
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  const [error, setError] = useState({
    name: "",
    address: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleChangeProfile = async () => {
    try {
      await validateProfile.validate(data, { abortEarly: false });
      dispatch(updateUser(data));
      setChangeText("Done");
      setTimeout(() => {
        setChangeText("Change");
      }, 1500);
    } catch (error: any) {
      error.inner.forEach(
        ({ path, message }: { path: string; message: string }) => {
          setError((prev) => ({ ...prev, [path]: message }));
        }
      );
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 100px)" }}>
      <HelmetDetails title="Profile" href="/profile" description="My profile" />
      <div className="flex justify-center items-center mt-10 mb-24">
        <div
          className="w-screen md:w-2/3 bg-white rounded-none md:rounded-2xl"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Title title="My Profile" />

          <BasicTextField
            val={data.name}
            handleChange={handleChange}
            error={error.name}
            name="name"
            label="Name"
          />
          <BasicTextField
            val={data.address}
            handleChange={handleChange}
            error={error.address}
            name="address"
            label="Address"
          />

          <div className="flex justify-center my-5">
            <div className="btn" onClick={handleChangeProfile}>
              {changeText}
            </div>
          </div>
        </div>
      </div>

      {!!orders.length && (
        <>
          <Title title="My Orders" />
          {orders.map((order, index) => {
            const date = new Date(order.date);
            return (
              <div
                key={index}
                className="flex justify-center items-center my-5"
              >
                <div
                  className="w-screen md:w-2/3 bg-white rounded-none md:rounded-2xl p-5"
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  }}
                >
                  <Title title={`Order Number #${index + 1}`} />
                  <div className="flex justify-between">
                    <div>
                      <span className="text-[--primary]">Address:</span>{" "}
                      {order.address}
                    </div>
                    <div className="text-right text-gray-500">{`${date.getFullYear()} / ${
                      date.getMonth() + 1
                    } / ${date.getDate()}`}</div>
                  </div>
                  {order.orderNotes !== "" && (
                    <div>
                      <span className="text-[--primary]">Order Notes:</span>{" "}
                      {order.orderNotes}
                    </div>
                  )}

                  <div className="flex gap-5 my-3">
                    {order.cart.map((element, index) => {
                      const data = products.find((product) => {
                        return product.id === element.id;
                      });
                      return (
                        <Link
                          to={`/products/${element.id}`}
                          key={index}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={data?.image}
                            alt={data?.name}
                            className="w-16 h-16 object-contain"
                          />{" "}
                          x {element.quantity}
                        </Link>
                      );
                    })}
                  </div>
                  <Divider />
                  <div className="my-5">
                    <span className="text-[--primary]">Total: </span>
                    {order.cart.reduce((acc, el) => {
                      const data = products.find((product) => {
                        return product.id === el.id;
                      });
                      return acc + el.quantity * (data?.price || 1);
                    }, 0)}{" "}
                    $
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
