import * as Yup from 'yup'

export const validateSignUp = Yup.object({
    name: Yup.string().min(3,'Name must be at least 3 characters').required('Invalid Name'),
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    address: Yup.string().min(10,'Address must be at least 10 characters').required('Invalid Address'),
    password: Yup.string().min(7, 'Password must be more at least 7 characters').required('Invalid Password'),
})

export const validateLogIn = Yup.object({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().required('Invalid Password'),
})

export const validateProduct = Yup.object({
  image: Yup.string().notOneOf(["/favicon.ico"],"Please select product image").required("Invalid Image"),
  name: Yup.string().min(3,"Product name must be at least 3 characters").required("Invalid Name"),
  price: Yup.number().min(1, "Product price must be at least 1 $").required("Invalid Name"),
  stock: Yup.number().min(1, "Number of products in the stock must be at least 1 product").required("Invalid Name"),
  description: Yup.string().min(15,"Product name must be at least 15 characters").required("Invalid Description"),
});

export const validateProfile = Yup.object({
  name: Yup.string().min(3,'Name must be at least 3 characters').required('Invalid Name'),
  address: Yup.string().min(10,'Address must be at least 10 characters').required('Invalid Address'),
});