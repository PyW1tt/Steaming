import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useDataUser from "../hook/useDataUser";

function ProfilePage() {
  const [avatar, setAvatar] = useState({});

  const { data, getData } = useDataUser();

  useEffect(() => {
    getData();
  }, []);

  // const userDataString = localStorage.getItem("userData");

  // if (userDataString) {
  //   const userData = JSON.parse(userDataString);
  //   console.log(userData);
  // } else {
  //   console.error("userData is not available in localStorage");
  // }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      // นำออกไปเพื่อหลีกเลี่ยงการให้รูปภาพมี key ที่เป็น undefined
      const newAvatars = { ...avatar };

      // ถ้ามีรูปที่มี key เป็น 1 ให้ลบรูปเดิมออก
      if (newAvatars[1]) {
        URL.revokeObjectURL(newAvatars[1]);
        delete newAvatars[1];
      }

      // ใส่รูปภาพใหม่
      newAvatars[1] = selectedFile;

      setAvatar(newAvatars);
    }
  };
  console.log(avatar);

  //package
  const monthlyPrice = 4.99;
  const yearlyPrice = 49.99;
  const value =
    data?.package === 1 ? `${monthlyPrice}/month` : `${yearlyPrice}/year`;

  //date start
  // const isDate = new Date(data?.created_at);
  const isDate = new Date(data?.created_at ?? "");
  const yyyy = isDate.getFullYear();
  const mm = String(isDate.getMonth() + 1).padStart(2, "0");
  const dd = String(isDate.getDate()).padStart(2, "0");
  const start = `${dd}/${mm}/${yyyy}`;

  // date end
  const end = new Date(isDate);
  end.setDate(isDate.getDate() + 30);
  const endYYYY = end.getFullYear();
  const endMM = String(end.getMonth() + 1).padStart(2, "0");
  const endDD = String(end.getDate()).padStart(2, "0");
  const endFormatted = `${endDD}/${endMM}/${endYYYY}`;

  // const endFormatted = end.toLocaleDateString("en-GB", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });

  return (
    <div className="bg-[#28262d] h-screen">
      <Navbar>
        <div className="px-[100px] my-[80px] flex w-full justify-center">
          <div className=" bg-slate-400 w-[500px] h-[620px]  px-10 py-10 rounded-lg">
            <div className="w-[15rem] h-[15rem] rounded-full border-2 border-white flex justify-center items-center relative p-1">
              {Object.keys(avatar).length === 0 ? (
                <img
                  src="https://via.placeholder.com/148x148"
                  alt=""
                  className="w-full h-full rounded-full border border-white object-cover"
                />
              ) : (
                Object.keys(avatar).map((index) => (
                  <img
                    key={index}
                    className="w-full h-full rounded-full border border-white object-cover"
                    src={URL.createObjectURL(avatar[index])}
                    alt=""
                  />
                ))
              )}

              <label className=" bg-emerald-600 rounded-full border-2 border-neutral-950 w-[49.23px] h-[49.23px] flex justify-center items-center absolute bottom-0 right-5 hover:cursor-pointer hover:border-white">
                <img
                  src="../../icon/Camera.svg"
                  alt=""
                  className="w-[18.97px] h-[16.74px]"
                />
                <input type="file" onChange={handleFileUpload} hidden />
              </label>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mt-[20px]">
                <Label htmlFor="" className="text-md font-bold">
                  Package :
                </Label>
                <Input
                  type=""
                  id=""
                  placeholder=""
                  className="bg-[#28262d] w-[120px] "
                  defaultValue={value}
                  disabled
                />
              </div>
              <div className="flex items-center gap-1.5 mt-[10px]">
                <Label htmlFor="" className="text-md font-bold">
                  start :
                </Label>
                <Input
                  type=""
                  id=""
                  placeholder=""
                  className="bg-[#28262d] w-[120px]"
                  value={start}
                  disabled
                />
              </div>
              <div className="flex items-center gap-1.5 mt-[10px]">
                <Label htmlFor="" className="text-md font-bold">
                  end :
                </Label>
                <Input
                  type=""
                  id=""
                  placeholder=""
                  className="bg-[#28262d] w-[120px]"
                  value={endFormatted}
                  disabled
                />
              </div>
              <div className="flex items-center gap-1.5 mt-[10px]">
                <Label htmlFor="email" className="text-md font-bold">
                  Your Email :
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="bg-[#28262d] w-[230px]"
                  defaultValue={data?.email}
                  disabled
                />
              </div>
            </div>
            <div className=" flex justify-center">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-400 w-[218px] h-[46px] rounded-[10px] text-sm font-bold mt-[50px] "
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default ProfilePage;
