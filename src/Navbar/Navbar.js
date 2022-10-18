import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-black shadow-xl">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        {/* <a className="btn btn-ghost normal-case text-xl">Kopeetearia</a> */}
        <div className="avatar">
          <img src="./header-img.png" />
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;
