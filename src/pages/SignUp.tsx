import { GoogleIcon } from "@/assets/svg/svg"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar } from "@/components/ui/avatar"
import { useFormik } from 'formik'
import { signUpValidation } from "@/utils/validation"
import type { SignUpFormValues } from "@/types/types"
import React, { useRef, useState } from "react"
import { SIGNUP_IMAGE_URL } from "@/constants/constants"
import { Loader2 } from 'lucide-react'
import { signUpThunk } from "@/store/thunks/authThunk"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { ROUTER } from "@/routes"

const initialValues = {
    avatar: null,
    fullname: '',
    username: '',
    email: '',
    password: ''
}

const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { isLoading } = useSelector((state: RootState) => state.auth)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik<SignUpFormValues>({
        initialValues,
        validationSchema: signUpValidation,
        onSubmit: async (values) => {
            await dispatch(signUpThunk(values))
            navigate(ROUTER.ONBOARDING)
        }
    })

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setAvatarUrl(imageUrl)
            setFieldValue('avatar', file)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
            <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white/90">
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 items-center justify-center p-8">
                    <img
                        src={SIGNUP_IMAGE_URL}
                        alt="Modern signup visual"
                        className="rounded-xl shadow-lg object-cover w-full h-96 max-h-[420px] border-4 border-white/30"
                    />
                </div>
                <div className="flex w-full md:w-1/2 flex-col items-center justify-center p-8">
                    <Card className="w-full border-none shadow-none bg-transparent p-0">
                        {/* CardHeader OUTSIDE form */}
                        <CardHeader className="px-0">
                            <CardTitle className="text-3xl font-bold text-gray-800 mb-1">Create your account</CardTitle>
                            <CardDescription className="text-gray-500 mb-4">Join our community and enjoy exclusive features.</CardDescription>
                            <CardAction>
                                <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => navigate('/signin')}>Sign In</Button>
                            </CardAction>
                        </CardHeader>
                        <form onSubmit={handleSubmit} className="w-full">
                            <CardContent className="px-0">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col items-center gap-2 mb-2">
                                        <Label htmlFor="avatar" className="text-sm font-medium mb-1">Avatar</Label>
                                        <div
                                            className="relative group cursor-pointer"
                                            onClick={handleAvatarClick}
                                        >
                                            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-blue-400 shadow-md transition-all hover:shadow-lg hover:scale-105 bg-muted">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Avatar preview" className="object-cover w-full h-full rounded-full" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold select-none">+</div>
                                                )}
                                            </Avatar>
                                            <Input
                                                id="avatar"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                ref={fileInputRef}
                                                onChange={handleAvatarChange}
                                            />
                                            <span className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">Edit</span>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullname">Full name</Label>
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            value={values.fullname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your Fullname"
                                            aria-invalid={!!(touched.fullname && errors.fullname)}
                                        />
                                        {touched.fullname && errors.fullname && (<p className="text-destructive text-sm mt-1">{errors.fullname}</p>)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="m@example.com"
                                            aria-invalid={!!(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (<p className="text-destructive text-sm mt-1">{errors.email}</p>)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your username"
                                            aria-invalid={!!(touched.username && errors.username)}
                                        />
                                        {touched.username && errors.username && (<p className="text-destructive text-sm mt-1">{errors.username}</p>)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your password"
                                            aria-invalid={!!(touched.password && errors.password)}
                                        />
                                        {touched.password && errors.password && (<p className="text-destructive text-sm mt-1">{errors.password}</p>)}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-3 px-0 mt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all text-base py-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
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
                            <span><GoogleIcon /></span> Sign up with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
