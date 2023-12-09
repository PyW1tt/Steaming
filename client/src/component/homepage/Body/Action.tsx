import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "./Swiper.css";

interface streaming {
  img: string | string[];
}

const stream: streaming[] = [
  {
    img: "../../../logo/disney.svg",
  },
  {
    img: "../../../logo/image 7.svg",
  },
  {
    img: ["../../../logo/image 10.svg", "../../../logo/image 9.svg"],
  },
  {
    img: "../../../logo/image 8.svg",
  },
  {
    img: "../../../logo/marvel.svg",
  },
  {
    img: "../../../logo/star-wars.svg",
  },
  {
    img: "../../../logo/national-geographic.svg",
  },
];

function Action(): JSX.Element {
  return (
    // <div className=" pt-10 flex justify-between px-[100px]">
    //   {stream.map((item, index) => {
    //     return (
    //       <div
    //         key={index}
    //         className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200"
    //       >
    //         {Array.isArray(item.img) ? (
    //           <div className="flex w-[177px] h-[88px] pl-[5px] py-4 bg-zinc-950 rounded-2xl gap-6 cursor-pointer justify-center items-center  border border-neutral-950 hover:border-emerald-600">
    //             <div className="flex justify-start items-center">
    //               {item.img.map((imgSrc, imgIndex) => (
    //                 <img key={imgIndex} src={imgSrc} alt="" />
    //               ))}
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="flex w-[177px] h-[88px] px-8 py-4 bg-zinc-950 rounded-2xl justify-center items-center gap-6 cursor-pointer border border-neutral-950 hover:border-emerald-600">
    //             <img src={item.img} alt="" />
    //           </div>
    //         )}
    //       </div>
    //     );
    //   })}
    // </div>

    <div className=" pt-10 flex justify-between px-[100px]">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flex w-full"
      >
        {stream.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="px-[40px] transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 h-[150px] flex items-center"
            >
              {Array.isArray(item.img) ? (
                <div className="flex w-[177px] h-[88px] pl-[5px] py-4 bg-zinc-950 rounded-2xl gap-6 cursor-pointer justify-center items-center  border border-neutral-950 hover:border-emerald-600">
                  <div className="flex justify-start items-center">
                    {item.img.map((imgSrc, imgIndex) => (
                      <img key={imgIndex} src={imgSrc} alt="" />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex w-[177px] h-[88px] px-8 py-4 bg-zinc-950 rounded-2xl justify-center items-center gap-6 cursor-pointer border border-neutral-950 hover:border-emerald-600">
                  <img src={item.img} alt="" />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Action;
