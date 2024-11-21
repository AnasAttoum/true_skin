import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initCart } from '../lib/slices/cartSlice'
import { initUser } from '../lib/slices/userSlice'

export default function Auth({children}:{children:ReactNode}) {

  const dispatch = useDispatch()
  
  useEffect(()=>{
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(initCart(cart))
      const user = JSON.parse(localStorage.getItem("user") || "[]");
      dispatch(initUser(user));
    },[dispatch])

  return (
    <>{children}</>
  )
}