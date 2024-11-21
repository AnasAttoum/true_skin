import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initCart } from '../lib/slices/cartSlice'
import { initUser } from '../lib/slices/userSlice'
import { initProducts } from '../lib/slices/productSlice'
import { products } from '../constants/data'

export default function Auth({children}:{children:ReactNode}) {

  const dispatch = useDispatch()
  
  useEffect(()=>{
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(initCart(cart))
      const user = JSON.parse(localStorage.getItem("user") || "[]");
      dispatch(initUser(user));
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      if (!allProducts.length)
        dispatch(initProducts(products));
      else
        dispatch(initProducts(allProducts));
    },[dispatch])

  return (
    <>{children}</>
  )
}