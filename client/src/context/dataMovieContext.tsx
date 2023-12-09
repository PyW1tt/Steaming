import React, { useState } from "react";
import { DataMovie } from "../model/Data";

interface DataMovieContextProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setDataMovie: React.Dispatch<React.SetStateAction<DataMovie | null>>;
  dataMovie: DataMovie | null;
}

const dataMovieContext = React.createContext<DataMovieContextProps | undefined>(
  undefined
);

function DataMovieProvider(props: React.PropsWithChildren<{}>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataMovie, setDataMovie] = useState<DataMovie | null>(null);
  return (
    <dataMovieContext.Provider
      value={{ setIsModalOpen, isModalOpen, setDataMovie, dataMovie }}
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
