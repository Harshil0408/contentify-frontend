import React, { useState } from "react";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { publishVideoThunk } from "@/store/thunks/videoThunk";
import type { PublishVideoForm, UploadVideoProps } from "@/types/types";


const categories = [
    "Education",
    "Entertainment",
    "Music",
    "Sports",
    "Gaming",
    "News",
    "Other",
];

const validationSchema = Yup.object().shape({
    videoFile: Yup.mixed().required("Video file is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
});

const initialValues: PublishVideoForm = {
    videoFile: null,
    title: "",
    description: "",
    category: categories[0],
    thumbnail: null,
};

const UploadVideo: React.FC<UploadVideoProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [step, setStep] = useState(1);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            await dispatch(publishVideoThunk(values))
            handleClose();
            resetForm();
        },
        enableReinitialize: true,
    });

    function handleClose() {
        setStep(1);
        onClose();
        formik.resetForm();
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-lg rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30 animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 bg-white rounded-t-xl">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-xl text-muted-foreground hover:text-foreground"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <CardContent className="pt-12 pb-8 px-10 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gradient-blue-green scrollbar-track-white/30 scrollbar-thumb-rounded-full">
                    <div className="flex justify-center items-center gap-8 mb-12">
                        <div className="flex flex-col items-center">
                            <div className={`w-14 h-14 flex items-center justify-center rounded-full border-4 shadow-xl transition-all duration-300
                                ${step === 1 ? "bg-gradient-to-tr from-blue-500 to-purple-500 border-blue-400 scale-110" : "bg-white/80 border-gray-200"}
                            `}>
                                <span className={`text-3xl ${step === 1 ? "text-white" : "text-gray-400"}`}>📤</span>
                            </div>
                            <span className={`mt-3 text-sm font-bold tracking-wide uppercase ${step === 1 ? "text-blue-700" : "text-gray-400"}`}>
                                Upload
                            </span>
                        </div>
                        <div className={`h-1 w-16 rounded-full transition-all duration-300
                            ${step === 2 ? "bg-gradient-to-r from-blue-400 to-green-400" : "bg-gray-200"}
                        `}></div>
                        <div className="flex flex-col items-center">
                            <div className={`w-14 h-14 flex items-center justify-center rounded-full border-4 shadow-xl transition-all duration-300
                                ${step === 2 ? "bg-gradient-to-tr from-green-400 to-blue-400 border-green-400 scale-110" : "bg-white/80 border-gray-200"}
                            `}>
                                <span className={`text-3xl ${step === 2 ? "text-white" : "text-gray-400"}`}>📝</span>
                            </div>
                            <span className={`mt-3 text-sm font-bold tracking-wide uppercase ${step === 2 ? "text-green-700" : "text-gray-400"}`}>
                                Details
                            </span>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                        {step === 1 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-base mb-2">Upload Video File</label>
                                    <div className="flex flex-col items-center justify-center">
                                        <label
                                            htmlFor="video-upload"
                                            className="w-full flex flex-col items-center justify-center cursor-pointer rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors h-40 max-w-xs mx-auto shadow-lg border-4 border-dashed border-blue-200 group"
                                        >
                                            <span className="text-5xl mb-2 text-white group-hover:scale-110 transition-transform">📹</span>
                                            <span className="text-white font-semibold text-lg">Click or Drag & Drop to Upload</span>
                                            <input
                                                id="video-upload"
                                                name="videoFile"
                                                type="file"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={e => formik.setFieldValue("videoFile", e.currentTarget.files ? e.currentTarget.files[0] : null)}
                                            />
                                        </label>
                                        {formik.touched.videoFile && formik.errors.videoFile && (
                                            <div className="text-xs text-red-500 mt-2">{formik.errors.videoFile}</div>
                                        )}
                                        {formik.values.videoFile && (
                                            <div className="text-primary text-xs mt-3 text-center font-medium">{formik.values.videoFile.name}</div>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    className="mt-6 w-full"
                                    disabled={!formik.values.videoFile}
                                    onClick={() => setStep(2)}
                                    type="button"
                                >
                                    Next
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-base">Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        placeholder="Enter video title"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <div className="text-xs text-red-500 mt-1">{formik.errors.title}</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-base">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter video description"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-base h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <div className="text-xs text-red-500 mt-1">{formik.errors.description}</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-base">Category</label>
                                    <select
                                        name="category"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={categories.includes(formik.values.category) ? formik.values.category : "Other"}
                                        onChange={e => {
                                            if (e.target.value === "Other") {
                                                formik.setFieldValue("category", "");
                                            } else {
                                                formik.setFieldValue("category", e.target.value);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {(!categories.includes(formik.values.category)) && (
                                        <input
                                            type="text"
                                            placeholder="Enter custom category"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base mt-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={formik.values.category}
                                            onChange={e => formik.setFieldValue("category", e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    )}
                                    {formik.touched.category && formik.errors.category && (
                                        <div className="text-xs text-red-500 mt-1">{formik.errors.category}</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium text-base">Thumbnail Image</label>
                                    <div className="flex flex-col items-center justify-center">
                                        <label
                                            htmlFor="thumbnail-upload"
                                            className="w-full flex flex-col items-center justify-center cursor-pointer rounded-full bg-gradient-to-tr from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 transition-colors h-32 max-w-xs mx-auto shadow-lg border-4 border-dashed border-green-200 group p-4"
                                        >
                                            <span className="text-4xl mb-1 text-white group-hover:scale-110 transition-transform">🖼️</span>
                                            <span className="text-white font-semibold text-base">Click or Drag & Drop Thumbnail</span>
                                            <input
                                                id="thumbnail-upload"
                                                name="thumbnail"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={e => formik.setFieldValue("thumbnail", e.currentTarget.files ? e.currentTarget.files[0] : null)}
                                            />
                                        </label>
                                        {formik.touched.thumbnail && formik.errors.thumbnail && (
                                            <div className="text-xs text-red-500 mt-2">{formik.errors.thumbnail}</div>
                                        )}
                                        {formik.values.thumbnail && (
                                            <div className="text-primary text-xs mt-3 text-center font-medium">{formik.values.thumbnail.name}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4 mt-8">
                                    <Button variant="outline" type="button" onClick={() => setStep(1)}>
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={
                                            formik.isSubmitting ||
                                            !formik.values.title ||
                                            !formik.values.description ||
                                            !formik.values.category ||
                                            !formik.values.thumbnail ||
                                            !formik.values.videoFile
                                        }
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>
                </CardContent>
            </div>
        </div>
    );
};

export default UploadVideo;
