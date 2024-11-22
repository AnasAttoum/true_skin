import { Link } from "react-router-dom";
import Title from "../components/Title";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { addToCart, deleteFromCart } from "../lib/slices/cartSlice";
import { useRef, useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import HelmetDetails from "../components/HelmetDetails";

export default function Cart() {

  const products = useSelector((state: RootState) => state.product);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch()
  const idRef=useRef<number>()

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (id:number) => {
    idRef.current=id
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleDelete = () => { 
    if(idRef.current)
      dispatch(deleteFromCart(idRef.current));
    handleCloseDeleteModal()
   }

  return (
    <>
      <HelmetDetails
        title="Cart"
        href="/cart"
        description="True Skin cart"
      />

      {!cart.length ? (
        <div className="flex flex-col justify-center items-center w-full p-5">
          <Title title="Your Cart is Empty" />
          <iframe
            src="/images/empty.svg"
            title="Your Cart is Empty"
            style={{ height: "calc(100vh - 200px)", width: "100vw" }}
          />
        </div>
      ) : (
        <div style={{ minHeight: "calc(100vh - 200px)" }}>
          <Title title="My Cart" />

          <div className="flex justify-evenly max-sm:text-xs w-screen bg-[--primary] text-center text-white py-5 font-bold">
            <div className="w-1/6">Image</div>
            <div className="w-1/6">Name</div>
            <div className="w-1/6">Price</div>
            <div className="w-1/6">Quantity</div>
            <div className="w-1/6">Total Price</div>
            <div className="w-1/6">Action</div>
          </div>

          {cart.map(({ id, quantity }) => {
            const data = products.find((product) => {
              return product.id === id;
            });
            return (
              <div
                key={id}
                className="flex items-center justify-evenly max-sm:text-xs text-center text-gray-800 w-screen bg-[--secondary]"
              >
                <div className="w-1/6 h-28 bg-white">
                  <img
                    src={data?.image}
                    alt={data?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6">{data?.name}</div>
                <div className="w-1/6">{data?.price} $</div>
                {data?.stock && (
                  <div className="flex justify-center items-center gap-1 sm:gap-5 w-1/6">
                    <svg
                      style={
                        quantity >= 2
                          ? { cursor: "pointer" }
                          : { cursor: "pointer", visibility: "hidden" }
                      }
                      onClick={() => {
                        if (data?.id && quantity >= 2)
                          dispatch(addToCart({ id: data?.id, quantity: -1 }));
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#3b82f6"
                        d="M18 16H6c-1.654 0-3-1.346-3-3s1.346-3 3-3h12c1.654 0 3 1.346 3 3s-1.346 3-3 3M6 12c-.551 0-1 .449-1 1s.449 1 1 1h12c.551 0 1-.449 1-1s-.449-1-1-1z"
                      />
                    </svg>
                    {quantity}
                    <svg
                      style={
                        quantity < data?.stock
                          ? { cursor: "pointer" }
                          : { cursor: "pointer", visibility: "hidden" }
                      }
                      onClick={() => {
                        if (data?.id && quantity <= data.stock)
                          dispatch(addToCart({ id: data?.id, quantity: +1 }));
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="#3b82f6"
                          d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4zm4 0h-2v5a1 1 0 0 1-1 1H5v2h5a1 1 0 0 1 1 1v5h2v-5a1 1 0 0 1 1-1h5v-2h-5a1 1 0 0 1-1-1z"
                        />
                      </g>
                    </svg>
                  </div>
                )}
                {data?.price && (
                  <div className="w-1/6">
                    {(data?.price * quantity).toFixed(2)} $
                  </div>
                )}
                <div className="flex justify-center sm:gap-5 w-1/6">
                  <Link to={`/products/${id}`}>
                    <Tooltip title="Show Product" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="gray"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                        ></path>
                      </svg>
                    </Tooltip>
                  </Link>
                  <Tooltip
                    title="Delete Product"
                    className="cursor-pointer"
                    onClick={() => {
                      handleOpenDeleteModal(id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#f50a10"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteDialog
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleAgree={handleDelete}
        text="Are you sure that you want to remove this product?"
      />
    </>
  );
}
