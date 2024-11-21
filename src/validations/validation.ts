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