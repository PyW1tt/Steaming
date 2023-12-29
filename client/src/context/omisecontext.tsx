import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface OmiseCard {
  cardNumber: string;
  cardName: string;
  month: string;
  year: string;
  cvc: string;
  totalAmount: string;
}

interface OmiseContextProps {
  setOmiseCard: Dispatch<SetStateAction<OmiseCard>>;
  omiseCard: OmiseCard;
  // setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  // status: boolean;
  omiseCardHandler: () => Promise<void>;
}

const omiseContext = React.createContext<OmiseContextProps | undefined>(
  undefined
);

function OmiseProvider(props: React.PropsWithChildren<object>) {
  const navigate = useNavigate();
  // const [status, setStatus] = useState(false);
  const [omiseCard, setOmiseCard] = useState<OmiseCard>({
    cardNumber: "",
    cardName: "",
    month: "",
    year: "",
    cvc: "",
    totalAmount: "",
  });

  const omiseCardHandler = async () => {
    // Swal.fire({
    //   title: "Please Wait!",
    //   html: "Currently paying",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    // setStatus(true);
    console.log(omiseCard);
    const bodyFormData = new FormData();

    bodyFormData.append("card[expiration_month]", omiseCard.month);
    bodyFormData.append("card[expiration_year]", omiseCard.year);
    bodyFormData.append("card[name]", omiseCard.cardName);
    bodyFormData.append("card[number]", omiseCard.cardNumber);

    console.log(omiseCard, "");

    try {
      console.log(0);
      const token = await axios.post(
        `https://vault.omise.co/tokens`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: "pkey_test_5x5w3xryolrnev4hk37",
            password: "",
          },
        }
      );
      console.log(token.data.id);
      console.log(1);
      const result = await axios.post(`pamentGateway`, {
        amount: Number(omiseCard.totalAmount) * 100,
        token: token.data.id,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.data.message == "successful") {
        // setStatus(false);
        // Swal.close();
        await Swal.fire("Payment Successful", "", "success");
        navigate("/login");
      }
    } catch (error) {
      await Swal.fire("Payment Failed", "", "error");
    }
  };

  return (
    <omiseContext.Provider
      value={{
        omiseCard,
        setOmiseCard,
        omiseCardHandler,
        // setStatus,
        // status,
      }}
    >
      {props.children}
    </omiseContext.Provider>
  );
}

const useOmise = () => {
  const context = React.useContext(omiseContext);
  if (!context) {
    throw new Error("useOmise must be used within an OmiseProvider");
  }
  return context;
};

export { useOmise, OmiseProvider };
