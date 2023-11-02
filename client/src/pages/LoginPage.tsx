import React, { useState } from "react";
import "../component/register/RegisterPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormValues } from "../model/FormValues";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const eyeOutline: string = "../../../icon/eyeOutline.svg";
  const eyeSolid: string = "../../../icon/eyeSolid.svg";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(10, "Must be 10 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <section className="login">
        <div className="form-wrapper">
          <form action="" onSubmit={submit} className="">
            <p className=" text-center font-semibold text-2xl mb-6">Login</p>
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
                  // setEmail(e.target.value);
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
            <div className=" h-24 relative">
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
                  // setPassword(e.target.value);
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
            <div className=" w-full flex justify-center">
              <Link to="#" className="text-sm font-bold ">
                <p className=" hover:text-emerald-500 ">Forgot password</p>
              </Link>
            </div>

            <Button
              className="bg-emerald-600 hover:bg-emerald-400 w-full rounded-[10px] text-sm font-bold mt-6"
              disabled={
                !formik.isValid ||
                Object.values(formik.values).some((value) => value === "")
              }
              onClick={() => {
                // prop.setStep("package");
              }}
            >
              Continue
            </Button>
            <p className="text-gray-400 text-sm font-normal text-center mt-6">
              Don’t have an account? &nbsp;
              <Link
                to="http://localhost:5173/register"
                className="text-sm font-bold hover:text-emerald-500 text-white"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
