import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function UpdateTVshows() {
  const navigate = useNavigate();
  const { genres, MPA, type } = useInputType();
  const [movieData, setMovieData] = useState({
    title: "",
    author: "",
    date: "",
    // hours: "",
    // min: "",
    rating: "",
    description: "",
    type: "",
    genres: "",
    MPA: "",
  });
  const [thumbnail, setThumbnail] = useState({});
  const [cast, setCast] = useState<{ [key: string]: string }>({});
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

  const [episodes, setEpisodes] = useState<
    Array<{
      cover: File | null;
      video: File | null;
      episode: string | null;
      hours: string | null;
      min: string | null;
      details: string | null;
    }>
  >([
    {
      cover: null,
      video: null,
      episode: null,
      hours: null,
      min: null,
      details: null,
    },
  ]);

  const handleEpisodesCover = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "cover" | "video" | "episode" | "hours" | "min" | "details"
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && (type === "cover" || type === "video")) {
      const updatedEpisodes = [...episodes];

      updatedEpisodes[index][type] = files[0];

      setEpisodes(updatedEpisodes);
    }

    if (
      type === "episode" ||
      type === "hours" ||
      type === "min" ||
      type === "details"
    ) {
      const updatedEpisodes = [...episodes];

      updatedEpisodes[index][type] = event.target.value;

      setEpisodes(updatedEpisodes);
    }
    // console.log(files);
  };

  const handleAddDivEpisodes = () => {
    setEpisodes([
      ...episodes,
      {
        cover: null,
        video: null,
        episode: null,
        hours: null,
        min: null,
        details: null,
      },
    ]);
  };

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
  const handleChange = (key: string, value: string) => {
    setMovieData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleSubmit = () => {
    // console.log(movieData);
    // console.log(cast);
    // console.log(thumbnail);
    // console.log(episodes);
    const data = {
      ...movieData,
      cast: cast,
      thumbnail: thumbnail,
      episodes: episodes,
    };
    console.log(data);
  };

  return (
    <div className="">
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
          type="text"
          id="Release Date"
          placeholder="DD-MM-YYYY"
          className="text-black"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const parts = e.target.value.split("-");
            const sqlFormattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            handleChange("date", sqlFormattedDate);
          }}
        />
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
        <Select onValueChange={(value: string) => handleChange("type", value)}>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel className="text-black">Type</SelectLabel>
              {type.map((type, index) => {
                return (
                  <SelectItem key={index} value={type} className="text-black">
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
                  <SelectItem key={index} value={genres} className="text-black">
                    {genres}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(value: string) => handleChange("MPA", value)}>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Select MPA ratings" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel className="text-black">MPA film ratings</SelectLabel>
              {MPA.map((MPA, index) => {
                return (
                  <SelectItem key={index} value={MPA} className="text-black">
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

      <div className="flex">
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
      </div>

      <div className="mb-3 mt-5">
        <Label htmlFor="Episodes" className="text-black text-base">
          Episodes
        </Label>
        <div className="">
          {episodes.map((episode, index) => (
            <div
              key={index}
              className="flex w-full border-b border-gray-400 pr-5 py-5 hover:bg-slate-100"
            >
              <div className="flex flex-col justify-center m-2">
                <p className=" text-black text-xl font-bold">{index + 1}</p>
              </div>

              <div className="flex flex-col mr-2">
                <Label
                  htmlFor={`episodeFile-${index}`}
                  className=" text-black text-base"
                >
                  Cover
                </Label>
                {episode.cover ? (
                  <img
                    key={index}
                    src={URL.createObjectURL(episode.cover)}
                    alt=""
                    className="w-[270px] h-[150px] rounded-md mb-1"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/148x148"
                    alt=""
                    className="w-[270px] h-[150px] rounded-md mb-1"
                  />
                )}

                <Input
                  type="file"
                  id={`episodeFile-${index}`}
                  placeholder=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleEpisodesCover(event, index, "cover")
                  }
                  className="text-black"
                />
              </div>
              <div className="flex flex-col mr-2">
                <Label
                  htmlFor={`episodeFile-${index}`}
                  className=" text-black text-base"
                >
                  Video
                </Label>
                {episode.video ? (
                  <video
                    controls
                    key={index}
                    src={URL.createObjectURL(episode.video)}
                    className="w-[270px] h-[150px] rounded-md mb-1"
                  ></video>
                ) : (
                  <img
                    src="https://via.placeholder.com/148x148"
                    alt=""
                    className="w-[270px] h-[150px] rounded-md mb-1"
                  />
                )}

                <Input
                  type="file"
                  accept="video/*"
                  id={`episodeFile-${index}`}
                  placeholder=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleEpisodesCover(event, index, "video")
                  }
                  className="text-black"
                />
              </div>
              <div className="flex flex-col justify-end w-full">
                <Input
                  type="text"
                  name={`episodeName-${index}`}
                  id={`episodeName-${index}`}
                  placeholder="Episode Name"
                  className="w-80 mb-3 text-black "
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleEpisodesCover(event, index, "episode")
                  }
                />
                <div className="mb-3">
                  <div className="flex gap-2 max-w-52">
                    <Input
                      type="number"
                      id="Duration"
                      placeholder="Hours"
                      className="text-black "
                      min="0"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEpisodesCover(event, index, "hours")
                      }
                    />
                    <Input
                      type="number"
                      id="Duration"
                      placeholder="Minutes"
                      className="text-black"
                      min="0"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEpisodesCover(event, index, "min")
                      }
                    />
                  </div>
                </div>
                <Textarea
                  name={`episodeDescription-${index}`}
                  id={`episodeDescription-${index}`}
                  placeholder="Episode details"
                  className=" text-black "
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleEpisodesCover(event, index, "details")
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className="mb-3" onClick={handleAddDivEpisodes}>
        + Add Episodes
      </Button>

      <div className="w-full flex justify-between">
        <Button
          className="mt-24 bg-red-600 hover:bg-red-400 "
          onClick={() => {
            navigate("/createTVshows");
          }}
        >
          Back
        </Button>
        <Button
          className="mt-24 bg-emerald-600 hover:bg-emerald-400 "
          onClick={handleSubmit}
        >
          Update Series
        </Button>
      </div>
    </div>
  );
}

export default UpdateTVshows;
