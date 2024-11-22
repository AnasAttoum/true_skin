import { Link } from "react-router-dom";
import { product } from "../constants/types";
import { Tooltip } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/slices/cartSlice";

export default function ProductCard({product:{id,image,name,price}}:{product:product}) {

  const [cart,setCart]=useState(true)
  const dispatch = useDispatch()

  const handleAddToCart = (e:SyntheticEvent) => {
    e.preventDefault()
    setCart(false)
    dispatch(addToCart({id:id, quantity:+1}))

    setTimeout(()=>{
      setCart(true)
    },1000)
  };

  return (
    <Link to={`/products/${id}`} className="flex flex-col items-center gap-3 bg-[--secondary] hover:bg-[--primary] p-1 rounded-md text-gray-800 hover:text-white transition-all relative" style={{width:'250px'}}>
        <div className="bg-white" style={{width:'240px',height:'240px'}}>
            <img src={image} alt={name} className="rounded-md" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
        </div>
        <div className="text-sm text-center" style={{display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{name}</div>
        <div className="text-sm text-center"><span className="font-bold">{price}</span> $</div>
        <Tooltip title='Add to cart' onClick={handleAddToCart}>
          {cart?
          <svg className="absolute bottom-2 right-3" xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24"><path fill="black" fillRule="evenodd" d="M1.566 4a.75.75 0 0 1 .75-.75h1.181a2.25 2.25 0 0 1 2.228 1.937l.061.435h13.965a2.25 2.25 0 0 1 2.063 3.148l-2.668 6.128a2.25 2.25 0 0 1-2.063 1.352H7.722a2.25 2.25 0 0 1-2.228-1.937L4.24 5.396a.75.75 0 0 0-.743-.646h-1.18a.75.75 0 0 1-.75-.75m4.431 3.122l.982 6.982a.75.75 0 0 0 .743.646h9.361a.75.75 0 0 0 .688-.45l2.667-6.13a.75.75 0 0 0-.687-1.048z" clipRule="evenodd"></path><path fill="black" d="M6.034 19.5a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0m10.286-1.75a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5"></path></svg>
          :
          <svg className="absolute bottom-2 right-3" xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24"><path fill="black" d="m3.72 2.788l.55 1.862h14.654c1.84 0 3.245 1.717 2.715 3.51l-1.655 5.6c-.352 1.194-1.471 1.99-2.715 1.99H8.113c-1.244 0-2.362-.796-2.715-1.99L2.281 3.213a.75.75 0 1 1 1.438-.425m11.372 6.151a.75.75 0 0 0-1.216-.878l-1.713 2.371l-.599-.684a.75.75 0 1 0-1.128.988l1.034 1.181a.974.974 0 0 0 1.522-.07zM8.5 17.25a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5m8 0a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"></path></svg>
          }
        </Tooltip>
    </Link>
  )
}