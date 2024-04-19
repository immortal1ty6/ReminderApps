import FormInput from "@/components/elements/FormInput";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";

import Image from "next/image";

const Navbar = () => {
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <div className="h-20 bg-white-color w-full flex justify-left items-center">
      {/* Search Box */}
      {/* <div className="relative ms-10">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <CiSearch
            className={`pointer-events-none ml-1 mr-1 h-5 w-5 ${
              inputFocused ? "fill-text-color" : "fill-slate-300"
            }`}
            viewBox="0 0 24 24"
          />
        </span>
        <FormInput
          id="search"
          name="search"
          type="text"
          placeholder="Cari Kegiatan"
          className="placeholder:italic placeholder:text-slate-300 block w-96 py-3 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm bg-primary-color rounded-lg"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </div> */}
      <div className="flex ml-auto me-10 items-center">
        {/* Notification */}
        <IoNotificationsOutline
          className="text-xl text-text-color me-5"
          onClick={() => {}}
        />
        {/* Profile */}
        <h1 className="text-text-color font-regular text-md">Admin</h1>
        <Image
          src="/assets/undraw_developer.svg"
          alt="Logo"
          width={32}
          height={32}
          className="rounded block float-left ml-2"
        />
        <MdArrowDropDown className="text-2xl text-text-color ms-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
