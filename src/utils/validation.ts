import * as Yup from 'yup'

export const signUpValidation = Yup.object({
    avatar: Yup.string().notRequired(),
    fullname: Yup.string()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters"),
    username: Yup.string()
        .required("Username is required")
        .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
        .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
            "Password must contain at least one letter and one number"
        ),
})