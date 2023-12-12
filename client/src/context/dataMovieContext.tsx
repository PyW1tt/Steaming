import React, { useState } from "react";
import { DataMovie } from "../model/Data";

interface DataMovieContextProps {
  setIsModalMovieOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalMovieOpen: boolean;
  setIsModalSeriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalSeriesOpen: boolean;
  setDataMovie: React.Dispatch<React.SetStateAction<DataMovie>>;
  dataMovie: DataMovie;
}

const dataMovieContext = React.createContext<DataMovieContextProps | undefined>(
  undefined
);

function DataMovieProvider(props: React.PropsWithChildren<object>) {
  const [isModalMovieOpen, setIsModalMovieOpen] = useState<boolean>(false);
  const [isModalSeriesOpen, setIsModalSeriesOpen] = useState<boolean>(false);
  const [dataMovie, setDataMovie] = useState<DataMovie>({
    id: "",
    title: "",
    thumbnailUrl: "",
    duration: "",
    uploadTime: "",
    views: "",
    author: "",
    videoUrl: "",
    description: "",
    subscriber: "",
    genres: "",
  });
  return (
    <dataMovieContext.Provider
      value={{
        setIsModalMovieOpen,
        isModalMovieOpen,
        setDataMovie,
        dataMovie,
        isModalSeriesOpen,
        setIsModalSeriesOpen,
      }}
    >
      {props.children}
    </dataMovieContext.Provider>
  );
}
const useDataMovie = () => {
  const context = React.useContext(dataMovieContext);
  if (!context) {
    throw new Error("useDataMovie must be used within a DataMovieProvider");
  }
  return context;
};
export { DataMovieProvider, useDataMovie };
