import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { useOmise } from "../../context/omisecontext";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../pages/Loading";

function Payment(): JSX.Element {
  // const [cardNumber, setCardNumber] = useState<string>("");
  // const [cardName, setCardName] = useState<string>("");
  // const [month, setMonth] = useState<string>("");
  // const [year, setYear] = useState<string>("");
  // const [cvc, setCvc] = useState<string>("");
  const { register, dataRegister } = useAuth();
  const { setOmiseCard } = useOmise();
  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  interface FormValues {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvc: string;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvc: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .transform((value) => value.replace(/\s/g, ""))
        .matches(/^\d{16}\s?$/, "Card number must be exactly 16 digits")
        .required("Required"),
      cardName: Yup.string()
        .min(5, "Must be 5 characters or more")
        .matches(/^[A-Z\s]+$/, "Name should start to end with a capital letter")
        .required("Required"),
      expiryDate: Yup.string()
        .transform((value) => value.replace(/\s/g, ""))
        .matches(/^\d{2}\/\d{2}$/, "Must be MM/YY")
        .required("Required"),
      cvc: Yup.string()
        .matches(/^\d{3}$/, "Must be 3 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
    // onSubmit={() => {
    //   omiseCardHandler(omiseCard);
    // }}
    >
      <p className=" text-center font-semibold text-2xl mb-6">Payment</p>
      <div className="mb-2 h-24 relative">
        <Label className="font-semibold text-base" htmlFor="">
          Card Number
        </Label>
        <Input
          id="cardNumber"
          type="text"
          {...getCardNumberProps({
            onBlur: formik.handleBlur,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(e);
              // setCardNumber(e.target.value.replace(/\s/g, ""));
              setOmiseCard((prevOmiseCard) => ({
                ...prevOmiseCard,
                cardNumber: e.target.value.replace(/\s/g, ""),
              }));
            },
          })}
          className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
          maxLength="19"
        />
        <svg
          {...getCardImageProps({ images })}
          className="absolute right-0 bottom-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
        {formik.touched.cardNumber && formik.errors.cardNumber ? (
          <div className=" text-red-600 text-sm mt-1">
            {formik.errors.cardNumber}
          </div>
        ) : null}
      </div>

      <div className="mb-2 h-24">
        <Label className="font-semibold text-base" htmlFor="">
          Card Owner
        </Label>
        <Input
          id="cardName"
          type="text"
          placeholder="Card owner name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(e);
            setOmiseCard((prevOmiseCard) => ({
              ...prevOmiseCard,
              cardName: e.target.value,
            }));
          }}
          onBlur={formik.handleBlur}
          value={formik.values.cardName}
          className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
        />
        {formik.touched.cardName && formik.errors.cardName ? (
          <div className=" text-red-600 text-sm mt-1">
            {formik.errors.cardName}
          </div>
        ) : null}
      </div>

      <div className="flex justify-between mb-2 h-24">
        <div className=" w-[150px]">
          <Label className="font-semibold text-base" htmlFor="">
            Expiry Date
          </Label>
          <Input
            id="expiryDate"
            type="text"
            {...getExpiryDateProps({
              onBlur: formik.handleBlur,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                try {
                  const matchResult = e.target.value
                    .replace(/\s/g, "")
                    .replace(/\//g, "")
                    .match(/.{1,2}/g);
                  if (matchResult) {
                    const [month, year] = matchResult;
                    setOmiseCard((prevOmiseCard) => ({
                      ...prevOmiseCard,
                      month: month,
                      year: year,
                    }));
                  } else {
                    console.log("Invalid format");
                  }
                } catch (error) {
                  console.error(error);
                }
              },
            })}
            className=" w-full rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
          />

          {formik.touched.expiryDate && formik.errors.expiryDate ? (
            <div className=" text-red-600 text-sm mt-1">
              {formik.errors.expiryDate}
            </div>
          ) : null}
        </div>

        <div className="w-[150px]">
          <Label className="font-semibold text-base" htmlFor="">
            CVC/CVV
          </Label>
          <Input
            id="cvc"
            type="text"
            {...getCVCProps({
              onBlur: formik.handleBlur,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                setOmiseCard((prevOmiseCard) => ({
                  ...prevOmiseCard,
                  cvc: e.target.value,
                }));
              },
            })}
            className=" w-full rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
            maxLength="3"
          />
          {formik.touched.cvc && formik.errors.cvc ? (
            <div className=" text-red-600 text-sm mt-1">
              {formik.errors.cvc}
            </div>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-400 w-full rounded-[10px] text-sm font-bold"
        onClick={() => {
          register(dataRegister);
        }}
        // disabled={
        //   !formik.isValid ||
        //   Object.values(formik.values).some((value) => value === "")
        // }
        // disabled={status === false}
      >
        Register
      </Button>
      {/* {status && <Loading />} */}
    </div>
  );
}

export default Payment;
