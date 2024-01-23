import React from "react";
import ReactLoading from "react-loading";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingPage() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 w-full"
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      <ReactLoading
        type="bubbles"
        color="#10b981"
        height={"10%"}
        width={"10%"}
      />
    </div>
  );
}

export function LoadingPageAdmin() {
  return (
    <div className="h-[709px] w-full flex justify-center items-center">
      <ReactLoading
        type="bubbles"
        color="#10b981"
        height={"10%"}
        width={"10%"}
      />
      <div
        className="fixed inset-0 flex items-center justify-center z-50 w-full"
        style={{ background: "rgba(0, 0, 0, 0.75)" }}
      ></div>
    </div>
  );
}
export function LoadingPopular() {
  return (
    <div className="flex">
      <div className="w-[377px] h-[176] px-[20px] py-6 relative flex justify-center">
        <div className="mx-3">
          <Skeleton className="w-[107px] h-32 rounded-2xl" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-[40px] rounded-2xl" />
          <Skeleton className="h-4 w-[150px] rounded-2xl" />
          <Skeleton className="h-4 w-[50px] rounded-2xl" />
          <Skeleton className="h-4 w-[90px] rounded-2xl" />
        </div>
      </div>
      <div className="w-[377px] h-[176] px-[20px] py-6 relative flex justify-center">
        <div className="mx-3">
          <Skeleton className="w-[107px] h-32 rounded-2xl" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-[40px] rounded-2xl" />
          <Skeleton className="h-4 w-[150px] rounded-2xl" />
          <Skeleton className="h-4 w-[50px] rounded-2xl" />
          <Skeleton className="h-4 w-[90px] rounded-2xl" />
        </div>
      </div>
      <div className="w-[377px] h-[176] px-[20px] py-6 relative flex justify-center">
        <div className="mx-3">
          <Skeleton className="w-[107px] h-32 rounded-2xl" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-[40px] rounded-2xl" />
          <Skeleton className="h-4 w-[150px] rounded-2xl" />
          <Skeleton className="h-4 w-[50px] rounded-2xl" />
          <Skeleton className="h-4 w-[90px] rounded-2xl" />
        </div>
      </div>
      <div className="w-[377px] h-[176] px-[20px] py-6 relative flex justify-center">
        <div className="mx-3">
          <Skeleton className="w-[107px] h-32 rounded-2xl" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-[40px] rounded-2xl" />
          <Skeleton className="h-4 w-[150px] rounded-2xl" />
          <Skeleton className="h-4 w-[50px] rounded-2xl" />
          <Skeleton className="h-4 w-[90px] rounded-2xl" />
        </div>
      </div>
      <div className="w-[377px] h-[176] px-[20px] py-6 relative flex justify-center">
        <div className="mx-3">
          <Skeleton className="w-[107px] h-32 rounded-2xl" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-[40px] rounded-2xl" />
          <Skeleton className="h-4 w-[150px] rounded-2xl" />
          <Skeleton className="h-4 w-[50px] rounded-2xl" />
          <Skeleton className="h-4 w-[90px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
export function LoadingRelease() {
  return (
    <div className="flex  py-6 justify-between pl-[33px] pr-[30px]">
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
      <Skeleton className="w-[220px] h-[300px] rounded-2xl" />
    </div>
  );
}
export function LoadingWatchist() {
  return (
    <div className="flex justify-between py-7  pl-[35px] pr-[25px]">
      <div className="flex flex-col">
        <Skeleton className="w-[280px] h-[160px] rounded-2xl" />
        <Skeleton className="h-4 w-[200px] rounded-2xl mt-3" />
        <Skeleton className="h-4 w-[150px] rounded-2xl mt-2" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[280px] h-[160px] rounded-2xl" />
        <Skeleton className="h-4 w-[200px] rounded-2xl mt-3" />
        <Skeleton className="h-4 w-[150px] rounded-2xl mt-2" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[280px] h-[160px] rounded-2xl" />
        <Skeleton className="h-4 w-[200px] rounded-2xl mt-3" />
        <Skeleton className="h-4 w-[150px] rounded-2xl mt-2" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[280px] h-[160px] rounded-2xl" />
        <Skeleton className="h-4 w-[200px] rounded-2xl mt-3" />
        <Skeleton className="h-4 w-[150px] rounded-2xl mt-2" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-[280px] h-[160px] rounded-2xl" />
        <Skeleton className="h-4 w-[200px] rounded-2xl mt-3" />
        <Skeleton className="h-4 w-[150px] rounded-2xl mt-2" />
      </div>
    </div>
  );
}
export function LoadingGenres() {
  return (
    <div className="w-full h-[738px] py-[100px]  px-[100px] flex justify-center items-center bg-gradient-to-t from-[#28262d] from-5% via-zinc-950 to-black">
      <ReactLoading type="spin" color="#10b981" height={"5%"} width={"5%"} />
    </div>
  );
}
export function LoadingHeader() {
  return (
    <div className="w-full h-[648px] bg-gradient-to-t from-[#28262d] from-5% via-zinc-950 to-black absolute top-0 flex justify-center items-center">
      <ReactLoading type="spin" color="#10b981" height={"5%"} width={"5%"} />
    </div>
  );
}
export default LoadingPage;
