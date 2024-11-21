import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initCart } from '../lib/slices/cartSlice'

export default function Auth({children}:{children:ReactNode}) {

  const dispatch = useDispatch()
  
  useEffect(()=>{
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        dispatch(initCart(cart))
    },[dispatch])

  return (
    <>{children}</>
  )
}