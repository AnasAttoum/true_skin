import { useEffect, useState } from "react";
import Title from "../components/Title";
import BasicTextField from "../components/inputs/BasicTextField";
import BasicPasswordField from "../components/inputs/BasicPasswordField";
import { useInView } from "react-intersection-observer";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { validateSignUp } from "../validations/validation";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../lib/slices/userSlice";
import { RootState } from "../lib/store";
import { users } from "../constants/data";
import HelmetDetails from "../components/HelmetDetails";

export default function SignUp() {
const { ref: title, entry: titleEntry, inView: titleInView } = useInView();
const { ref: image, entry: imageEntry, inView: imageInView } = useInView();

const dispatch = useDispatch()
const navigate= useNavigate()

const { isLogged }=useSelector((state:RootState)=>state.user)

useEffect(() => {
    if (titleInView && titleEntry) {
    (titleEntry.target as HTMLElement).style.animation =
        "toLeftAnimation 1s 1.5s forwards";
    }
    if (imageInView && imageEntry) {
    (imageEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s .5s forwards";
    }
}, [titleInView, titleEntry, imageInView, imageEntry]);

useEffect(()=>{
    if(isLogged)
        navigate('/')
},[isLogged,navigate])

  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState({
      name: "",
      email: "",
      address: "",
      password: "",
    });
  const [errorFromBackend,setErrorFromBackend]=useState('')
  const [signUpText, setSignUpText] = useState('Sign Up')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    setSignUpText("Loading...")
    setError({
      name: "",
      email: "",
      address: "",
      password: "",
    });
    setErrorFromBackend('')
    try {
      await validateSignUp.validate(data, { abortEarly: false });
      if(!users.find((user)=>{return user.email===data.email.toLowerCase()}))
        dispatch(loggedIn({...data, isAdmin:false}))
      else
        setErrorFromBackend('This email is already taken')

    } catch (error: any) {
      error.inner.forEach(
        ({ path, message }: { path: string; message: string }) => {
          setError((prev) => ({ ...prev, [path]: message }));
        }
      );
    }
    setSignUpText("Sign Up");
  };

  return (
    <>
      <HelmetDetails
        title="Sign Up"
        href="/signup"
        description="Sign Up now to True Skin"
      />
      <div className="flex items-center justify-between relative">
        <div
          className="flex max-md:absolute max-md:w-full max-md:min-h-screen max-md:opacity-5 justify-start w-1/2 h-screen opacity-0"
          ref={image}
        >
          <img
            src="/images/Skin Products Wallpaper.jpeg"
            alt="True Skin"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-5 w-full md:w-1/2 max-md:bg-[#fff9] max-md:backdrop-blur-sm max-md:min-h-screen">
          <div>
            <Title title="Welcome To True Skin" />
            <Title title="Sign Up" />
          </div>

          <div className="flex flex-col opacity-0" ref={title}>
            <BasicTextField
              val={data.name}
              handleChange={handleChange}
              error={error.name}
              name="name"
              label="Name"
            />
            <BasicTextField
              val={data.email}
              handleChange={handleChange}
              error={error.email}
              name="email"
              label="Email"
            />
            <BasicTextField
              val={data.address}
              handleChange={handleChange}
              error={error.address}
              name="address"
              label="Address"
            />
            <BasicPasswordField
              val={data.password}
              handleChange={handleChange}
              error={error.password}
              name="password"
            />

            <div className="text-center text-red-500">{errorFromBackend}</div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-center mt-5">
                <div className="btn" onClick={handleSignUp}>
                  {signUpText}
                </div>
              </div>

              <Divider />
              <div className="text-center text-gray-800">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-[--primary] font-bold underline"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
