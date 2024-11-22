import { ChangeEvent, useEffect, useState } from "react";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BasicTextField from "../../components/inputs/BasicTextField";
import { validateProduct } from "../../validations/validation";
import { Button, FormHelperText } from "@mui/material";
import { addProduct } from "../../lib/slices/productSlice";
import { useInView } from "react-intersection-observer";

export default function AddProduct() {

  const { ref: form, entry: formEntry, inView: formInView } = useInView();
  const { ref: image, entry: imageEntry, inView: imageInView } = useInView();

  useEffect(() => {
    if (formInView && formEntry) {
      (formEntry.target as HTMLElement).style.animation =
        "toLeftAnimation 1s 1s forwards";
    }
    if (imageInView && imageEntry) {
      (imageEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s .5s forwards";
    }
  }, [formInView, formEntry, imageInView, imageEntry]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
      name: "",
      price: 0,
      stock: 0,
      image: "/favicon.ico",
      description: "",
    });
    const [error, setError] = useState({
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchImage = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newPic = e.target.files[0];
        
        const reader = new FileReader();
        reader.readAsDataURL(newPic);
        
        reader.onloadend = function () {
            setData((prev) => ({ ...prev, image: reader.result as string }));
        };
      }
    };

    const handleAdd = async() => {
      setError({
        name: "",
        price: "",
        stock: "",
        image: "",
        description: "",
      });
      try {
        await validateProduct.validate(data, { abortEarly: false });
          dispatch(addProduct(data))
          navigate('/dashboard')
      } catch (error: any) {
        if(error.inner)
          error.inner.forEach(
            ({ path, message }: { path: string; message: string }) => {
              setError((prev) => ({ ...prev, [path]: message }));
            }
          );
        else
          setError((prev)=>({...prev,image:error.message+" try to change the image"}))
      }
    };

  return (
    <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

            <div className="w-screen md:w-2/3 bg-white rounded-none md:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Product" />

                <div className="flex max-sm:flex-col justify-evenly p-5">
                    <div className="flex flex-col justify-center items-center gap-5 w-full sm:w-1/4 opacity-0" ref={image}>
                        <img src={data.image} alt={data.name} className="rounded-md h-28" />
                        <Button variant="contained" component="label" sx={{
                            backgroundColor: 'var(--primary)',
                            color:"white",
                            fontSize:"small",
                            textAlign:'center'
                        }}>
                            Upload Product Image
                            <input type="file" accept="image/*" hidden onChange={handleSwitchImage} />
                        </Button>
                        <FormHelperText sx={{ color: '#d32f2f', textAlign:'center' }}>{error.image}</FormHelperText>
                    </div>
                
                    <div className="w-full sm:w-3/4 opacity-0" ref={form}>
                        <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                        <BasicTextField val={data.price} handleChange={handleChange} error={error.price} name="price" label="Price ($)" />
                        <BasicTextField val={data.stock} handleChange={handleChange} error={error.stock} name="stock" label="In Stock" />
                        <BasicTextField val={data.description} handleChange={handleChange} error={error.description} name="description" label="Description" />
                    </div>
                </div>

                <div className="flex justify-center my-5">
                    <div className="btn" onClick={handleAdd}>Add Product</div>
                </div>
                

            </div>

        </div>
  )
}