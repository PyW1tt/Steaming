import React, { useEffect, useState } from "react";
import "./Admin.css";
import useInputType from "../../hook/adminHook/useInputType";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useMedia from "../../hook/adminHook/useMedia";
import { LoadingPageAdmin } from "../../pages/LoadingPage";
import NotFoundPage from "../../pages/NotFoundPage";

function UpdateMovie() {
  const navigate = useNavigate();
  const param = useParams();
  const { genres, MPA, type } = useInputType();
  const {
    getMoviesById,
    dataMovieId,
    setDataMovieId,
    updateDatamovieId,
    loading,
    isError,
    handleDeleteMovie,
  } = useMedia();

  const [isModalMovie, setIsModalMovie] = useState(false);
  const [thumbnail, setThumbnail] = useState({});
  const [poster, setPoster] = useState({});
  const [video, setVideo] = useState({});

  const [divs, setDivs] = useState<JSX.Element[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target;
    setDataMovieId((prevInputValues) => {
      const updatedCastNames = [...prevInputValues.cast_names];
      updatedCastNames[key] = { ...updatedCastNames[key], cast_name: value };
      return {
        ...prevInputValues,
        cast_names: updatedCastNames,
      };
    });
  };
  const handleAddDiv = () => {
    const newDivs = [
      ...divs,
      <Input
        key={divs.length}
        type="text"
        id={`Cast-${divs.length}`}
        placeholder="Cast name"
        className="text-black mb-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e, divs.length.toString())
        }
      />,
    ];
    setDivs(newDivs);

    setDataMovieId((prevData) => ({
      ...prevData,
      cast_names: [
        ...prevData.cast_names,
        { id: "", movie_id: "", cast_name: "" },
      ],
    }));
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

    console.log(selectedFile);

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
    console.log({ [key]: value });
    setDataMovieId((prevData) => ({
      ...prevData,
      [key]: value || "",
    }));
  };

  useEffect(() => {
    getMoviesById(param.id);
  }, []);

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
              value={dataMovieId.title}
            />
          </div>
          <div className="max-w-xs mb-3">
            <Label htmlFor="Author" className="text-black text-base">
              Producer
            </Label>
            <Input
              type="text"
              id=" Producer"
              placeholder=" Producer name"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("author", e.target.value);
              }}
              value={dataMovieId.author}
            />
          </div>
          <div className="max-w-xs mb-3">
            <Label htmlFor="Release Date" className="text-black text-base">
              Release Date
            </Label>
            <Input
              type="text"
              id="Release Date"
              placeholder="YYYY-MM-DD"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("release_date", e.target.value);
              }}
              value={dataMovieId.release_date}
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
                value={dataMovieId.hours}
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
                value={dataMovieId.min}
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
              max="10"
              step="0.1"
              id=""
              placeholder="Rating"
              className="text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("rating", e.target.value);
              }}
              value={dataMovieId.rating || ""}
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.preventDefault();
                handleChange("description", e.target.value);
              }}
              value={dataMovieId.description || ""}
            />
          </div>
          <div className=" flex gap-2 mb-3">
            <Select
              onValueChange={(value: string) => handleChange("type", value)}
              value={dataMovieId.type || ""}
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
              value={dataMovieId.genres}
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
              onValueChange={(value: string) => handleChange("mpa", value)}
              value={dataMovieId.mpa}
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
            {dataMovieId.cast_names.map((cast, index) => (
              <Input
                key={index}
                type="text"
                id={`Cast-${index}`}
                placeholder="Cast name"
                className="text-black mb-1"
                value={cast.cast_name || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, index.toString())
                }
              />
            ))}
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
                  src={
                    dataMovieId.thumbnail_url
                      ? dataMovieId.thumbnail_url
                      : "https://via.placeholder.com/148x148"
                  }
                  alt=""
                  className=" w-[250px] h-[300px]"
                />
              ) : (
                Object.keys(thumbnail).map((index) => (
                  <img
                    key={index}
                    className=" w-[250px] h-[300px]"
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
                className="hover:cursor-pointer max-w-[250px] text-black mt-2"
              />
            </div>

            <div className="">
              <Label htmlFor="" className="text-black text-lg">
                Posters
              </Label>
              {Object.keys(poster).length === 0 ? (
                <img
                  src={
                    dataMovieId.poster_url
                      ? dataMovieId.poster_url
                      : "https://via.placeholder.com/148x148"
                  }
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
                dataMovieId.video_url === "" ? (
                  <img
                    src="https://via.placeholder.com/148x148"
                    alt=""
                    className="w-[400px] h-[200px]"
                  />
                ) : (
                  <video
                    controls
                    src={dataMovieId.video_url}
                    className="w-[400px] h-[200px]"
                  />
                )
              ) : (
                Object.keys(video).map((index) => (
                  <video
                    controls
                    key={index}
                    className="w-[400px] h-[200px]"
                    src={URL.createObjectURL(video[index])}
                  ></video>
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
          <div className="mt-24 w-full flex justify-between">
            <Button
              className="bg-blue-700 hover:bg-blue-500"
              onClick={() => {
                navigate("/adminSearch");
              }}
            >
              Back
            </Button>

            <div>
              <Button
                className=" bg-red-600 hover:bg-red-400 mr-5"
                onClick={() => {
                  setIsModalMovie(!isModalMovie);
                }}
              >
                Delete
              </Button>
              {isModalMovie && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-40 "
                  style={{ background: "rgba(0, 0, 0,0.35 )" }}
                >
                  <div className="w-[400px] h-[208px] bg-slate-100 rounded-xl relative z-50">
                    <div className="text-black text-xl font-bold px-6 py-4">
                      Delete Episodes
                    </div>
                    <hr className="w-full text-slate-500 text-center" />
                    <div className="p-6">
                      <p className="text-slate-500 text-base font-bold ">
                        Are you sure to delete episodes {dataMovieId.title} ?
                      </p>

                      <div className="flex justify-between mt-8">
                        <Button
                          className="  bg-red-700 hover:bg-red-400 text-base "
                          onClick={() => {
                            setIsModalMovie(!isModalMovie);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="text-base  bg-emerald-600 hover:bg-emerald-400"
                          onClick={async () => {
                            await handleDeleteMovie(
                              dataMovieId.id,
                              dataMovieId.poster_name,
                              dataMovieId.thumbnail_name,
                              dataMovieId.video_name
                            );

                            setIsModalMovie(!isModalMovie);
                          }}
                        >
                          Yes, I’m sure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Button
                className=" bg-emerald-600 hover:bg-emerald-400 "
                onClick={() => {
                  updateDatamovieId(
                    param.id,
                    dataMovieId,
                    thumbnail[1] ?? "",
                    poster[1] ?? "",
                    video[1] ?? ""
                  );
                }}
              >
                Update Movie
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateMovie;
