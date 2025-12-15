const { z } = require("zod");

// Signup Schema
const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Enter Name")
    .min(3, "Name Must Be At Least 3 Characters Long"),

  email: z
    .string()
    .nonempty("Enter Email")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email Format"),

  password: z
    .string()
    .nonempty("Enter Password")
    .min(6, "Password Must Be At Least 6 Characters Long"),

  phone: z
    .string()
    .nonempty("Enter Phone Number")
    .regex(/^[0-9]{10}$/, "Phone Number Must Be 10 Digits"),
});

// Signin Schema
const signinSchema = z.object({
 email: z
   .string()
   .nonempty("Enter Email")
   .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email Format"),

  password: z
    .string()
    .nonempty("Enter Password")
    .min(6, "Password Must Be At Least 6 Characters Long"),
});

// Message Schema
const msgSchema = z.object({
  name: z
    .string()
    .nonempty("Enter Name")
    .min(3, "Name Must Be At Least 3 Characters Long"),

 email: z
   .string()
   .nonempty("Enter Email")
   .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email Format"),

  message: z
    .string()
    .nonempty("Enter Message")
    .min(10, "Message Must Be At Least 10 Characters Long"),
});

module.exports = { signupSchema, signinSchema, msgSchema };
