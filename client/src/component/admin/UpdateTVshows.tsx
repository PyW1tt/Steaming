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
import { LoadingPageAdmin } from "../../pages/LoadingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import useMedia from "../../hook/adminHook/useMedia";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateTVshows() {
  const param = useParams();
  const {
    loading,
    isError,
    getSeriesById,
    dataSeriesId,
    setDataSeriesId,
    dataEpisodeId,
    setDataEpisodeId,
    updateDataSeries,
    updateDataEpisodes,
    setloading,
    handleDeleteEpisodes,
    handleDeleteSeries,
    handleDeleteMedia,
  } = useMedia();
  const navigate = useNavigate();
  const { genres, MPA, type } = useInputType();
  const [isModalEpisodes, setIsModalEpisodes] = useState(false);
  const [isModalSeries, setIsModalSeries] = useState(false);
  const [idEpisodes, setIdEpisodes] = useState("");
  // const [thumbnailName, setThumbnailName] = useState("");
  const [coverName, setCoverName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [episodesName, setEpisodesName] = useState("");
  // const [movieData, setMovieData] = useState({
  //   title: "",
  //   author: "",
  //   date: "",
  //   rating: "",
  //   description: "",
  //   type: "",
  //   genres: "",
  //   MPA: "",
  // });
  const [thumbnail, setThumbnail] = useState({});
  // const [cast, setCast] = useState<{ [key: string]: string }>({});
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

  // const [episodes, setEpisodes] = useState<
  //   Array<{
  //     cover: File | null;
  //     video: File | null;
  //     episode: string | null;
  //     hours: string | null;
  //     min: string | null;
  //     details: string | null;
  //     // idSeries: string | null;
  //   }>
  // >([
  //   {
  //     cover: null,
  //     video: null,
  //     episode: null,
  //     hours: null,
  //     min: null,
  //     details: null,
  //     // idSeries: null,
  //   },
  // ]);

  const handleEpisodesCover = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type:
      | "NewCover"
      | "NewVideo"
      | "episodeName"
      | "episode"
      | "hours"
      | "min"
      | "details"
  ) => {
    const files = event.target.files;
    if (
      files &&
      files.length > 0 &&
      (type === "NewCover" || type === "NewVideo")
    ) {
      const updatedEpisodes = [...dataEpisodeId];

      updatedEpisodes[index][type] = files[0];
      // console.log(updatedEpisodes);
      setDataEpisodeId(updatedEpisodes);
    }
    // console.log(event.target.value);

    // console.log(index);

    if (
      type === "episode" ||
      type === "episodeName" ||
      type === "hours" ||
      type === "min" ||
      type === "details"
    ) {
      const updatedEpisodes = [...dataEpisodeId];
      updatedEpisodes[index].series_id = dataEpisodeId[0].series_id;
      updatedEpisodes[index][type] = event.target.value;

      setDataEpisodeId(updatedEpisodes);
      // console.log([index]);
      // console.log([type]);
      // console.log(updatedEpisodes[index][type]);

      // setDataEpisodeId({
      //   ...dataEpisodeId,
      //   episodeName: event.target.value,
      // })
    }
    // console.log(files);
  };
  // console.log(dataEpisodeId);

  const handleAddDivEpisodes = () => {
    setDataEpisodeId((prevEpisodes) => [
      ...prevEpisodes,
      {
        id: "",
        episode: "",
        episodeName: "",
        hours: "",
        min: "",
        series_id: "",
        details: "",
        coverName: "",
        coverUrl: "",
        videoName: "",
        videoUrl: "",
        NewCover: null,
        NewVideo: null,
      },
    ]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target;

    setDataSeriesId((prevInputValues) => {
      const updatedCastNames = [...prevInputValues.cast_names];
      updatedCastNames[key] = { ...updatedCastNames[key], cast_name: value };
      return {
        ...prevInputValues,
        cast_names: updatedCastNames,
      };
    });
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
    const newDivs = [...divs, newDiv];
    setDivs(newDivs);
    setDataSeriesId((prevData) => ({
      ...prevData,
      cast_names: [
        ...prevData.cast_names,
        { id: "", series_id: "", cast_name: "" }, // เพิ่ม cast name ใหม่
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
  const handleChange = (key: string, value: string) => {
    console.log({ [key]: value });

    setDataSeriesId((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    getSeriesById(param.id);
  }, []);

  const simplifiedData = dataEpisodeId.map(
    ({
      id,
      episode,
      episodeName,
      details,
      hours,
      min,
      coverName,
      coverUrl,
      series_id,
      videoName,
      videoUrl,
      NewCover,
      NewVideo,
    }) => ({
      id,
      episode,
      episodeName,
      details,
      hours,
      min,
      coverName,
      coverUrl,
      series_id,
      videoName,
      videoUrl,
      NewCover,
      NewVideo,
    })
  );
  const mediaData = dataEpisodeId.map(({ coverName, videoName }) => ({
    coverName,
    videoName,
  }));

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
              value={dataSeriesId.title || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("title", e.target.value);
              }}
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
              value={dataSeriesId.author || ""}
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
              placeholder="YYYY-MM-DD"
              className="text-black"
              value={dataSeriesId.release_date || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                // const parts = e.target.value.split("-");
                // const sqlFormattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                handleChange("release_date", e.target.value);
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
              max="10"
              step="0.1"
              id=""
              placeholder="Rating"
              className="text-black"
              value={dataSeriesId.rating || ""}
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
              value={dataSeriesId.description || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleChange("description", e.target.value);
              }}
            />
          </div>
          <div className=" flex gap-2 mb-3">
            <Select
              value={dataSeriesId.type || ""}
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
              value={dataSeriesId.genres || ""}
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
              value={dataSeriesId.mpa || ""}
              onValueChange={(value: string) => handleChange("mpa", value)}
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
            {dataSeriesId.cast_names.map((item, index) => {
              // console.log(dataSeriesId.cast_names);

              return (
                <Input
                  key={index}
                  type="text"
                  id={`Cast-${index}`}
                  placeholder="Cast name"
                  className="text-black mb-1"
                  value={item.cast_name || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, index.toString())
                  }
                />
              );
            })}
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
                  src={
                    dataSeriesId.thumbnail_url
                      ? dataSeriesId.thumbnail_url
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
          </div>

          <div className="mb-3 mt-5">
            <Label htmlFor="Episodes" className="text-black text-xl">
              Episodes
            </Label>
            <div className="">
              {dataEpisodeId.map((episode, index) => (
                <div
                  key={index}
                  className="flex w-full border-b border-gray-400 pr-5 py-5 hover:bg-slate-100 relative"
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

                    {episode.NewCover ? (
                      <img
                        key={index}
                        src={URL.createObjectURL(episode.NewCover)}
                        alt=""
                        className="w-[270px] h-[150px] rounded-md mb-1"
                      />
                    ) : (
                      <img
                        src={
                          episode.coverUrl
                            ? episode.coverUrl
                            : "https://via.placeholder.com/148x148"
                        }
                        alt=""
                        className="w-[270px] h-[150px] rounded-md mb-1"
                      />
                    )}

                    <Input
                      type="file"
                      id={`episodeFile-${index}`}
                      placeholder=""
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEpisodesCover(event, index, "NewCover")
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

                    {episode.NewVideo ? (
                      <video
                        controls
                        key={index}
                        src={URL.createObjectURL(episode.NewVideo)}
                        className="w-[270px] h-[150px] rounded-md mb-1"
                      ></video>
                    ) : episode.videoUrl ? (
                      <video
                        controls
                        key={index}
                        src={episode.videoUrl}
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
                        handleEpisodesCover(event, index, "NewVideo")
                      }
                      className="text-black"
                    />
                  </div>
                  <div className="flex flex-col justify-end w-full">
                    <div className="flex">
                      <Input
                        type="text"
                        name={`episode-${index}`}
                        id={`episode-${index}`}
                        placeholder="Episode"
                        value={episode.episode || ""}
                        className="w-20 mb-3 text-black mr-2"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleEpisodesCover(event, index, "episode")}
                      />
                      <Input
                        type="text"
                        name={`episodeName-${index}`}
                        id={`episodeName-${index}`}
                        value={episode.episodeName || ""}
                        placeholder="Episode Name"
                        className="w-80 mb-3 text-black "
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleEpisodesCover(event, index, "episodeName")}
                      />
                    </div>

                    <div className="mb-3">
                      <div className="flex gap-2 max-w-52">
                        <Input
                          type="number"
                          id="Duration"
                          value={episode.hours || ""}
                          placeholder="Hours"
                          className="text-black "
                          min="0"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleEpisodesCover(event, index, "hours")}
                        />
                        <Input
                          type="number"
                          id="Duration"
                          value={episode.min || ""}
                          placeholder="Minutes"
                          className="text-black"
                          min="0"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleEpisodesCover(event, index, "min")}
                        />
                      </div>
                    </div>
                    <Textarea
                      name={`episodeDescription-${index}`}
                      id={`episodeDescription-${index}`}
                      value={episode.details || ""}
                      placeholder="Episode details"
                      className=" text-black "
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEpisodesCover(event, index, "details")
                      }
                    />
                  </div>

                  <button
                    className="absolute top-5 right-5 bg-slate-400 hover:bg-slate-300 hover:text-slate-600 w-[25px] h-[25px] rounded-full flex justify-center items-center"
                    onClick={() => {
                      setIsModalEpisodes(!isModalEpisodes);
                      setIdEpisodes(episode.id);
                      setEpisodesName(episode.episodeName);
                      setCoverName(episode.coverName);
                      setVideoName(episode.videoName);
                    }}
                  >
                    X
                  </button>
                  {isModalEpisodes && (
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
                            Are you sure to delete episodes {episodesName} ?
                          </p>

                          <div className="flex justify-between mt-8">
                            <Button
                              className="  bg-red-700 hover:bg-red-400 text-base "
                              onClick={() => {
                                setIsModalEpisodes(!isModalEpisodes);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="text-base  bg-emerald-600 hover:bg-emerald-400"
                              onClick={async () => {
                                await handleDeleteEpisodes(
                                  idEpisodes,
                                  coverName,
                                  videoName
                                );
                                await getSeriesById(param.id);
                                setIsModalEpisodes(!isModalEpisodes);
                              }}
                            >
                              Yes, I’m sure
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button className="mb-3" onClick={handleAddDivEpisodes}>
            + Add Episodes
          </Button>

          <div className="w-full flex justify-between mt-24">
            <Button
              className="bg-blue-700 hover:bg-blue-500"
              onClick={() => {
                navigate("/createTVshows");
              }}
            >
              Back
            </Button>

            <div>
              <Button
                className=" bg-red-600 hover:bg-red-400 mr-5"
                onClick={() => {
                  setIsModalSeries(!isModalSeries);
                }}
              >
                Delete
              </Button>
              {isModalSeries && (
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
                        Are you sure to delete episodes {dataSeriesId.title} ?
                      </p>

                      <div className="flex justify-between mt-8">
                        <Button
                          className="  bg-red-700 hover:bg-red-400 text-base "
                          onClick={() => {
                            setIsModalSeries(!isModalSeries);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="text-base  bg-emerald-600 hover:bg-emerald-400"
                          onClick={async () => {
                            await handleDeleteSeries(
                              dataSeriesId.id,
                              dataSeriesId.thumbnail_name
                            );
                            for (const data of mediaData) {
                              await handleDeleteMedia(data);
                            }
                            setIsModalSeries(!isModalSeries);
                            setloading(false);
                            await Swal.fire({
                              // position: "top-end",
                              icon: "success",
                              title: "Delete Successful",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            navigate("/adminSearch");
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
                onClick={async () => {
                  await updateDataSeries(
                    thumbnail[1] ?? "",
                    param.id,
                    dataSeriesId
                  );
                  // console.log(dataEpisodeId);
                  for (const data of simplifiedData) {
                    await updateDataEpisodes(data);
                  }
                  setloading(false);
                  await Swal.fire({
                    icon: "success",
                    title: "Create Successful",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
              >
                Update Series
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateTVshows;
