"use client";
import Image from "next/image";
import { Input, Button } from "antd";
import "../../app/globals.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between items-center gap-6 px-4 md:px-6 lg:px-10 py-5 bg-white border-b border-[#E5E8EB]">
        {/* Logo and Menus */}
        <div className="flex gap-8 justify-center items-center">
          <Image alt="" src={"/logo.svg"} className="cursor-pointer" height={24} width={140} onClick={()=>router.push('/')}/>
          <div className="hidden lg:flex gap-8 justify-center items-center">
            <a className="text-[#0D121C] text-sm leading-normal">Home</a>
            <a className="text-[#0D121C] text-sm leading-normal">Featured</a>
            <a className="text-[#0D121C] text-sm leading-normal">Recent</a>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-8">
          <Input
            addonBefore={
              <Image
              alt=""
                src={"/icons/search.svg"}
                height={24}
                width={24}
                className="absolute mt-[-9px]"
              />
            }
            placeholder="Search"
            variant="filled"
            className="noBorder h-10 rounded-xl w-[260px]"
          />
          <div className="flex gap-2 justify-center itemes-center">
            <Button className="hover:bg-[#1C6EF2] bg-[#1C6EF2] rounded-lg hover:text-white text-white text-sm leading-normal font-medium hover:border-none border-none py-3 px-5 hover:outline-none outline-none h-10 flex justify-center items-center">
              Log in
            </Button>
            <Button className="hover:bg-[#E8EDF5] bg-[#E8EDF5] rounded-lg hover:text-[#0D121C] text-[#0D121C] text-sm leading-normal font-medium hover:border-none border-none py-3 px-5 hover:outline-none outline-none h-10 flex justify-center items-center">
              Sign up
            </Button>
          </div>
        </div>
        <FiMenu
          className="block lg:hidden text-black h-6 w-6"
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="click"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            id="dropdown"
            className="absolute top-[45px] mt-[20px] right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Recent
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
