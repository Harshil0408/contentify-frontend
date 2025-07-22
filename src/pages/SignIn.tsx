import { GoogleIcon } from "@/assets/svg/svg"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SIGNUP_IMAGE_URL } from "@/constants/constants"
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { signInThunk } from "@/store/thunks/authThunk"
import { ROUTER } from "@/routes"

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
})

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading } = useSelector((state: RootState) => state.auth)
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("called")
            await dispatch(signInThunk(values))
            console.log("Called")
            navigate(ROUTER.HOME)
        }
    })


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
            <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white/90">
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 items-center justify-center p-8">
                    <img
                        src={SIGNUP_IMAGE_URL}
                        alt="Modern sign in visual"
                        className="rounded-xl shadow-lg object-cover w-full h-96 max-h-[420px] border-4 border-white/30"
                    />
                </div>
                <div className="flex w-full md:w-1/2 flex-col items-center justify-center p-8">
                    <Card className="w-full border-none shadow-none bg-transparent p-0">
                        <CardHeader className="px-0">
                            <CardTitle className="text-3xl font-bold text-gray-800 mb-1">Sign in to your account</CardTitle>
                            <CardDescription className="text-gray-500 mb-4">Welcome back! Please enter your details to sign in.</CardDescription>
                            <CardAction>
                                <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </CardAction>
                        </CardHeader>
                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <CardContent className="px-0">
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your email"
                                            aria-invalid={!!(formik.touched.email && formik.errors.email)}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <p className="text-destructive text-sm mt-1">{formik.errors.email}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your password"
                                            aria-invalid={!!(formik.touched.password && formik.errors.password)}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                            <p className="text-destructive text-sm mt-1">{formik.errors.password}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-3 px-0 mt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all text-base py-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                    <div className="flex flex-col items-center w-full mt-6">
                        <div className="flex items-center w-full mb-4">
                            <div className="flex-grow h-px bg-gray-300" />
                            <span className="mx-3 text-gray-400 text-sm font-medium">or</span>
                            <div className="flex-grow h-px bg-gray-300" />
                        </div>
                        <Button onClick={() => {
                            window.location.href = "http://localhost:8000/auth/google";
                        }} variant="outline" disabled={isLoading} className="w-full flex items-center gap-2 border-blue-400 hover:bg-blue-50">
                            <span><GoogleIcon /></span> Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
