import React, { useState } from "react";
import "./Admin.css";
import useInputType from "../../hook/adminHook/useInputType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMedia from "../../hook/adminHook/useMedia";
import { LoadingPageAdmin } from "../../pages/LoadingPage";
import NotFoundPage from "../../pages/NotFoundPage";
function CreateMovie() {
  const { genres, MPA, type } = useInputType();
  const { postDatamovie, loading, isError } = useMedia();

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [date, setDate] = useState("");
  // const [hours, setHours] = useState("");
  // const [min, setMin] = useState("");
  // const [rating, setRating] = useState("");
  // const [description, setDescription] = useState("");
  // const [type, setType] = useState("");
  // const [genres, setGenres] = useState("");
  // const [MPA, setMPA] = useState("");

  const [movieData, setMovieData] = useState({
    title: "",
    author: "",
    date: "",
    hours: "",
    min: "",
    rating: "",
    description: "",
    type: "",
    genres: "",
    MPA: "",
  });

  const [thumbnail, setThumbnail] = useState({});
  const [poster, setPoster] = useState({});
  const [video, setVideo] = useState({});

  const [cast, setCast] = useState<{ [key: string]: string }>({});
  // const [cast, setCast] = useState<string[]>([]);
  const [divs, setDivs] = useState<JSX.Element[]>([
    <Input
      type="text"
      id="Cast"
      placeholder="Cast name"
      key="0"
      className="text-black mb-1"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e, "0")
      }
    />,
  ]);

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const { value } = event.target;

  //   setCast((prevInputValues) => {
  //     const newInputValues = [...prevInputValues];
  //     newInputValues[index] = value;
  //     return newInputValues;
  //   });
  // };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target;

    setCast((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  const handleAddDiv = () => {
    // สร้าง div ใหม่ที่มี input ภายใน
    const newDiv = (
      <Input
        id="Cast"
        type="text"
        placeholder="Cast name"
        key={divs.length}
        className="text-black mb-1"
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, divs.length.toString())
          // handleInputChange(e, divs.length)
        }
      />
    );
    // อัพเดท state เพื่อเพิ่ม div ใหม่
    // setDivs((prevDivs) => [...prevDivs, newDiv]);
    const newDivs = [...divs, newDiv];
    setDivs(newDivs);
  };
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const newThumbnail = { ...thumbnail };

      if (newThumbnail[1]) {
        URL.revokeObjectURL(newThumbnail[1]);
        delete newThumbnail[1];
      }
      newThumbnail[1] = selectedFile;
      setThumbnail(newThumbnail);
    }
  };
  const handlePoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const newPoster = { ...poster };

      if (newPoster[1]) {
        URL.revokeObjectURL(newPoster[1]);
        delete newPoster[1];
      }
      newPoster[1] = selectedFile;
      setPoster(newPoster);
    }
  };
  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    // console.log(selectedFile);

    if (selectedFile) {
      const newVideo = { ...video };

      if (newVideo[1]) {
        URL.revokeObjectURL(newVideo[1]);
        delete newVideo[1];
      }
      newVideo[1] = selectedFile;
      setVideo(newVideo);
    }
  };
  const handleChange = (key: string, value: string) => {
    setMovieData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  // const uniqueId = Date.now();
  const data = {
    ...movieData,
    cast: cast,
    // thumbnailName: `${uniqueId}`,
    // thumbnailFile: thumbnail,
    // posterName: `${uniqueId}`,
    // posterFile: poster,
    // videoName: uniqueId,
    // videoFile: video,
  };

  const handleSubmit = () => {
    // console.log(data);
    // console.log(movieData);
    // console.log(cast);
    // console.log(thumbnail);
    // console.log(poster);
    // console.log(video);
    console.log(data);
  };

  return (
    <div className="">
      {loading ? (
        <LoadingPageAdmin />
      ) : isError ? (
        <NotFoundPage />
      ) : (
        <>
          <div className=" max-w-lg mb-3">
            <Label htmlFor="title" className="text-black text-base">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter the movie title"
              className="text-black "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("title", e.target.value);
              }}
            />
          </div>
          <div className="max-w-xs mb-3">
            <Label htmlFor="Author" className="text-black text-base">
              Author
            </Label>
            <Input
              type="text"
              id="Author"
              placeholder="Author name"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("author", e.target.value);
              }}
            />
          </div>
          <div className="max-w-xs mb-3">
            <Label htmlFor="Release Date" className="text-black text-base">
              Release Date
            </Label>
            <Input
              type="date"
              id="Release Date"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                const parts = e.target.value.split("-");
                const sqlFormattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                handleChange("date", sqlFormattedDate);
              }}
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="Duration" className="text-black text-base">
              Duration
            </Label>
            <div className="flex gap-2 max-w-xs">
              <Input
                type="number"
                id="Duration"
                placeholder="Hours"
                className="text-black"
                min="0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  handleChange("hours", e.target.value);
                }}
              />
              <Input
                type="number"
                id="Duration"
                placeholder="Minutes"
                className="text-black"
                min="0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  handleChange("min", e.target.value);
                }}
              />
            </div>
          </div>

          <div className="max-w-24 mb-3">
            <Label htmlFor="" className="text-black text-base">
              Rating
            </Label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              id=""
              placeholder="Rating"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("rating", e.target.value);
              }}
            />
          </div>
          <div className="max-w-full mb-3">
            <Label htmlFor="Description" className="text-black text-base">
              Description
            </Label>
            <Textarea
              placeholder="Write a brief description of the movie, including its plot, characters, and key themes."
              id="Description"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("description", e.target.value);
              }}
            />
          </div>
          <div className=" flex gap-2 mb-3">
            <Select
              onValueChange={(value: string) => handleChange("type", value)}
            >
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel className="text-black">Type</SelectLabel>
                  {type.map((type, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={type}
                        className="text-black"
                      >
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: string) => handleChange("genres", value)}
            >
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Select Genres" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel className="text-black">Genres</SelectLabel>
                  {genres.sort().map((genres, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={genres}
                        className="text-black"
                      >
                        {genres}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: string) => handleChange("MPA", value)}
            >
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Select MPA ratings" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel className="text-black">
                    MPA film ratings
                  </SelectLabel>
                  {MPA.map((MPA, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={MPA}
                        className="text-black"
                      >
                        {MPA}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" max-w-xs mb-3">
            <Label htmlFor="Cast" className="text-black text-base">
              Cast
            </Label>
            {divs}
          </div>
          <Button className="mb-3" onClick={handleAddDiv}>
            + Add Cast
          </Button>

          <div className="flex gap-20 mt-5">
            <div>
              <Label htmlFor="" className="text-black text-lg">
                Thumbnail
              </Label>
              {Object.keys(thumbnail).length === 0 ? (
                <img
                  src="https://via.placeholder.com/148x148"
                  alt=""
                  className=" w-[400px] h-[200px]"
                />
              ) : (
                Object.keys(thumbnail).map((index) => (
                  <img
                    key={index}
                    className=" w-[400px] h-[200px]"
                    src={URL.createObjectURL(thumbnail[index])}
                    alt=""
                  />
                ))
              )}
              <Input
                type="file"
                id=""
                placeholder=""
                onChange={handleThumbnail}
                className="hover:cursor-pointer max-w-[400px] text-black mt-2"
              />
            </div>

            <div className="">
              <Label htmlFor="" className="text-black text-lg">
                Posters
              </Label>
              {Object.keys(poster).length === 0 ? (
                <img
                  src="https://via.placeholder.com/148x148"
                  alt=""
                  className="w-[400px] h-[200px]"
                />
              ) : (
                Object.keys(poster).map((index) => (
                  <img
                    key={index}
                    className=" w-[400px] h-[200px]"
                    src={URL.createObjectURL(poster[index])}
                    alt=""
                  />
                ))
              )}
              <Input
                type="file"
                id=""
                placeholder=""
                onChange={handlePoster}
                className="hover:cursor-pointer max-w-[400px] text-black mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="" className="text-black text-lg">
                Video
              </Label>
              {Object.keys(video).length === 0 ? (
                <img
                  src="https://via.placeholder.com/148x148"
                  className=" w-[400px] h-[200px]"
                />
              ) : (
                Object.keys(video).map((index) => (
                  <video
                    controls
                    key={index}
                    className="w-[400px] h-[200px]"
                    src={URL.createObjectURL(video[index])}
                  >
                    {/* <source
                  src={URL.createObjectURL(video[index])}
                  type="video/mp4"
                /> */}
                  </video>
                ))
              )}
              <Input
                type="file"
                accept="video/*"
                id=""
                placeholder=""
                onChange={handleVideo}
                className="hover:cursor-pointer max-w-[400px] text-black mt-2"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              className="mt-24 bg-emerald-600 hover:bg-emerald-400 "
              onClick={() => {
                postDatamovie(data, thumbnail[1], poster[1], video[1]);
                handleSubmit();
              }}
            >
              Create Movie
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateMovie;
