import React from "react";
import Navbar from "../Navbar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import BackToTop from "../BackToTop";

function HomePageAfter() {
  return (
    <>
      <Navbar>
        <Header />
      </Navbar>
      <Body />
      <Footer />
    </>
  );
}

export default HomePageAfter;
