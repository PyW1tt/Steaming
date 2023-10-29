import React from "react";
import { useState } from "react";
import "./RegisterPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const eyeOutline: string = "../../../icon/eyeOutline.svg";
  const eyeSolid: string = "../../../icon/eyeSolid.svg";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(username);
    console.log(password);
    console.log(email);
  }

  interface FormValues {
    username: string;
    email: string;
    password: string;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(10, "Must be 10 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  {
    return (
      <>
        <form action="" onSubmit={submit}>
          <p className=" text-center font-semibold text-2xl mb-6">Register</p>
          <div className="mb-2 h-24">
            <Label className="font-semibold text-base" htmlFor="">
              Username
            </Label>
            <Input
              className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className=" text-red-600 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="mb-2 h-24">
            <Label className="font-semibold text-base" htmlFor="">
              Email
            </Label>
            <Input
              className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className=" text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-6 h-24 relative">
            <Label className="font-semibold text-base" htmlFor="">
              Password
            </Label>
            <Input
              className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <img
              src={showPassword ? eyeOutline : eyeSolid}
              alt="Eye Icon"
              className="absolute right-0 bottom-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => {
                setShowPassword((show) => !show);
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className=" text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <Button
            className="bg-emerald-600 hover:bg-emerald-400 w-full rounded-[10px] text-sm font-bold "
            disabled={
              !formik.isValid ||
              Object.values(formik.values).some((value) => value === "")
            }
          >
            Continue
          </Button>
          <p className="text-gray-400 text-sm font-normal text-center mt-6">
            Already have an account? &nbsp;
            <a
              href="#"
              className=" text-white text-sm font-bold hover:text-emerald-500"
            >
              Login
            </a>
          </p>
        </form>
      </>
    );
  }
}

export default Register;