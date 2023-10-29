import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";

function Payment() {
  return (
    <form>
      <p className=" text-center font-semibold text-2xl mb-6">Payment</p>
      <div className="mb-2 h-24">
        <Label className="font-semibold text-base" htmlFor="">
          Card Number
        </Label>
        <Input
          type="text"
          placeholder="xxx xxx xxxx xxxx"
          className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
        />
      </div>
      <div className="mb-2 h-24">
        <Label className="font-semibold text-base" htmlFor="">
          Card Owner
        </Label>
        <Input
          type="text"
          placeholder="Card owner name"
          className="rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
        />
      </div>
      <div className="flex justify-between mb-2 h-24">
        <div className=" w-[150px]">
          <Label className="font-semibold text-base" htmlFor="">
            Expiry Date
          </Label>
          <Input
            type="text"
            placeholder="mm/yy"
            className=" w-full rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
          />
        </div>
        <div className="w-[150px]">
          <Label className="font-semibold text-base" htmlFor="">
            CVC/CVV
          </Label>
          <Input
            type="text"
            placeholder="xxx"
            className=" w-full rounded bg-neutral-900 border border-zinc-800 hover:border-emerald-300 focus:border-emerald-600 mt-1"
          />
        </div>
      </div>
      <Button
        className="bg-emerald-600 hover:bg-emerald-400 w-full rounded-[10px] text-sm font-bold"
        // disabled={
        //   !formik.isValid ||
        //   Object.values(formik.values).some((value) => value === "")
        // }
      >
        Register
      </Button>
    </form>
  );
}

export default Payment;
