import React from "react";
import Container from "../Container/Container";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";
import OrderList from "../Order/OrderList";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container classNameCustom="px-20 my-5">
        <div className="bg-black mb-5">
          <marquee width="100%" direction="left" className="text-white">
            5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!
          </marquee>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <Menu></Menu>
              <OrderList></OrderList>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
