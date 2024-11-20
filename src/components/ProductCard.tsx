import { Link } from "react-router-dom";
import { product } from "../constants/types";

export default function ProductCard({product:{id,image,name,price}}:{product:product}) {
  return (
    <Link to={`/products/${id}`} className="flex flex-col items-center gap-3 bg-[--secondary] hover:bg-[--primary] p-1 rounded-md text-gray-800 hover:text-white transition-all" style={{width:'250px'}}>
        <div className="bg-white" style={{width:'240px',height:'240px'}}>
            <img src={image} alt={name} className="rounded-md" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
        </div>
        <div className="text-sm text-center" style={{display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{name}</div>
        <div className="text-sm text-center"><span className="font-bold">{price}</span> $</div>
    </Link>
  )
}