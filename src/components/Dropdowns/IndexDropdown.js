import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Menu
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400 "
          }
        >
          Main Layout
        </span>
        <Link
          to="/"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blue-500"
        >
          Dashboard
        </Link>
        <Link
          to="/references"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blue-500"
        >
          References
        </Link>
        <Link
          to="/equations"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blue-500"
        >
          Equations
        </Link>
        <Link
          to="/topics"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blue-500"
        >
          Topics
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default IndexDropdown;
