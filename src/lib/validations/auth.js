
import { z } from "zod";

const currentYear = new Date().getFullYear();

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password cannot exceed 128 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.");

const emailSchema = z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((email) => email.toLowerCase());

const termsSchema = z
    .boolean()
    .refine(
        (value) => value === true,
        "Please accept the terms and conditions."
    );

export const studentRegisterSchema = z
    .object({
        name: z.string().trim().min(2, "Name must contain at least 2 characters.").max(80),
        email: emailSchema,
        college: z.string().trim().min(2, "College name must contain at least 2 characters.").max(120),
        degree: z.string().trim().min(1, "Please select your degree."),
        graduationYear: z.coerce
            .number()
            .int("Graduation year must be a whole number.")
            .min(currentYear, `Graduation year cannot be before ${currentYear}.`)
            .max(currentYear + 10, "Select a valid graduation year."),
        password: passwordSchema,
        confirmPassword: z.string(),
        terms: termsSchema,
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

export const recruiterRegisterSchema = z
    .object({
        fullName: z.string().trim().min(2, "Name must contain at least 2 characters.").max(80),
        workEmail: emailSchema,
        companyName: z.string().trim().min(2, "Company name must contain at least 2 characters.").max(120),
        companyWebsite: z.preprocess(
            (value) => {
                if (typeof value !== "string") return value;

                const website = value.trim();

                if (!website) return "";

                return /^https?:\/\//i.test(website)
                    ? website
                    : `https://${website}`;
            },
            z.union([
                z.literal(""),
                z.string().url("Enter a valid company website."),
            ])
        ),
        jobTitle: z.string().trim().min(2, "Job title must contain at least 2 characters.").max(120),
        password: passwordSchema,
        confirmPassword: z.string(),
        terms: termsSchema,
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

export const loginSchema = z.object({
    email: emailSchema,
    password: z
        .string()
        .min(1, "Password is required.")
        .max(128, "Invalid email or password."),
});
