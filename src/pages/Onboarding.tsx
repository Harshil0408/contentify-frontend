import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { hobby, LANGUAGE } from "@/constants/constants"
import type { OnboardingForm } from "@/types/types"
import { Label } from "@radix-ui/react-label"
import { useFormik } from "formik"
import { X } from "lucide-react"
import * as Yup from 'yup'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/store"
import { onboardingThunk } from "@/store/thunks/authThunk"
import { useNavigate } from "react-router-dom"
import { ROUTER } from "@/routes"

const initialValues = {
    age: null,
    language: '',
    city: '',
    phoneNo: null,
    hobby: []

}

const validationSchema = Yup.object({
    age: Yup.number().required("Age is requierd"),
    language: Yup.string().required("Language is required"),
    city: Yup.string().required("String is required"),
    phoneNo: Yup.number().required("Phone number is required").min(10, "Phone number should have 10 digit"),
    hobby: Yup.array().required("Hobby is requierd")
})

const Onboarding = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { loggedInUser } = useSelector((state: RootState) => state.auth)
    const [formSubmitted, setFormSubmitted] = React.useState(false)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik<OnboardingForm>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setFormSubmitted(true)
            const response = await dispatch(onboardingThunk(values))
            if (onboardingThunk.fulfilled.match(response)) {
                navigate(ROUTER.HOME)
            } else {
                console.log("Something went wrong")
            }
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 relative">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-indigo-100 rounded-full p-3 mb-3">
                            <img src={loggedInUser?.avatar} className="w-16 h-16 rounded-full" alt="" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Onboarding</h2>
                        <p className="text-gray-500 text-center text-sm">Complete your onboarding to get started!</p>
                    </div>
                    <form onSubmit={e => { e.preventDefault(); setFormSubmitted(true); handleSubmit(e) }} className="space-y-5">
                        <div>
                            <Label htmlFor="age" className="font-medium text-gray-700">Age</Label>
                            <Input
                                id="age"
                                name="age"
                                value={values.age ?? ''}
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your age"
                                className={`mt-1 w-full rounded-lg border-2 ${errors.age && (touched.age || formSubmitted) ? 'border-red-400' : 'border-gray-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50`}
                            />
                            {errors.age && (touched.age || formSubmitted) && (
                                <span className="text-xs text-red-500 mt-1 block">{errors.age}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="language" className="font-medium text-gray-700">Language</Label>
                            <Select value={values.language} onValueChange={(value) => setFieldValue('language', value)}>
                                <SelectTrigger className={`mt-1 w-full rounded-lg border-2 ${errors.language && (touched.language || formSubmitted) ? 'border-red-400' : 'border-gray-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50`}>
                                    <SelectValue placeholder="Select your language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.entries(LANGUAGE).map(([Key, value]) => (
                                            <SelectItem value={Key} key={Key}>{value}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            {errors.language && (touched.language || formSubmitted) && (
                                <span className="text-xs text-red-500 mt-1 block">{errors.language}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="city" className="font-medium text-gray-700">City</Label>
                            <Input
                                id="city"
                                name="city"
                                type="text"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter city"
                                required
                                className={`mt-1 w-full rounded-lg border-2 ${errors.city && (touched.city || formSubmitted) ? 'border-red-400' : 'border-gray-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50`}
                            />
                            {errors.city && (touched.city || formSubmitted) && (
                                <span className="text-xs text-red-500 mt-1 block">{errors.city}</span>
                            )}
                        </div>
                        <div>
                            <Label className="font-medium text-gray-700">Hobby</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`mt-1 w-full justify-start text-left font-normal rounded-lg border-2 ${errors.hobby && (touched.hobby || formSubmitted) ? 'border-red-400' : 'border-gray-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50`}>
                                        {values.hobby.length > 0 ? "Change Hobbies" : "Select your hobbies"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 bg-white rounded-xl shadow-lg border-0">
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(hobby).map(([key, label]) => (
                                            <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                <Checkbox
                                                    checked={values.hobby.includes(key)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setFieldValue('hobby', [...values.hobby, key])
                                                        } else {
                                                            setFieldValue('hobby', values.hobby.filter(item => item !== key))
                                                        }
                                                    }}
                                                    id={key}
                                                />
                                                <span>{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {errors.hobby && (touched.hobby || formSubmitted) && (
                                <span className="text-xs text-red-500 mt-1 block">{errors.hobby}</span>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {values.hobby.map((key) => (
                                    <div key={key} className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm bg-indigo-50 text-indigo-700">
                                        {hobby[key]}
                                        <button
                                            type="button"
                                            onClick={() => setFieldValue("hobby", values.hobby.filter(item => item !== key))}
                                            className="ml-1 text-red-500 hover:text-red-700"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phoneNo" className="font-medium text-gray-700">Phone Number</Label>
                            <Input
                                id="phoneNo"
                                name="phoneNo"
                                type="number"
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNo ?? ''}
                                className={`mt-1 w-full rounded-lg border-2 ${errors.phoneNo && (touched.phoneNo || formSubmitted) ? 'border-red-400' : 'border-gray-200'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-gray-50`}
                            />
                            {errors.phoneNo && (touched.phoneNo || formSubmitted) && (
                                <span className="text-xs text-red-500 mt-1 block">{errors.phoneNo}</span>
                            )}
                        </div>
                        <Button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-md transition-all mt-2">
                            Complete Onboarding
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Onboarding
