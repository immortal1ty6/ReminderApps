import { useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronLeft, BsChevronDown, BsCalendar3 } from "react-icons/bs";
import { MdCalendarToday, MdDashboard } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/router";

const Sidebar = ({
  activeMenu,
  activeSubMenu,
}: {
  activeMenu: string;
  activeSubMenu: string;
}) => {
  const [open, setOpen] = useState(true);
  // const [activeMenu, setActiveMenu] = useState("Dashboard");
  // const [activeSubMenu, setActiveSubMenu] = useState("");
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const router = useRouter();

  const Menus = [
    { title: "Dashboard", id: "Dashboard" },
    {
      title: "Kegiatan",
      id: "Kegiatan",
      icon: <MdCalendarToday className="ml-1 text-2xl block float-left" />,
      submenu: true,
      submenuItem: [
        { title: "Daftar Kegiatan", id: "DaftarKegiatan" },
        { title: "Tambah Kegiatan", id: "TambahKegiatan" },
        { title: "Penerima", id: "Penerima" },
      ],
    },
    {
      title: "Logout",
      id: "Logout",
      spacing: true,
      icon: <TbLogout2 className="ml-1 text-2xl block float-left" />,
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === "Logout") {
      router.push("/auth");
    } else if (menuId === "Kegiatan") {
      setSubMenuOpen(!subMenuOpen);
    } else if (menuId === "Dashboard") {
      router.push("/dashboard");
    }
  };
  const handleSubMenuClick = (submenuId: string) => {
    if (submenuId === "TambahKegiatan") {
      router.push("/kegiatan/add");
    } else if (submenuId === "Penerima") {
      router.push("/penerima");
    } else if (submenuId === "DaftarKegiatan") {
      router.push("/kegiatan");
    }

    if (activeMenu === "Kegiatan") {
      setSubMenuOpen(!subMenuOpen);
    }
  };

  return (
    <div className="flex">
      <div
        className={`bg-secondary-color h-full p-6 ${
          open ? "w-72" : "w-24"
        } duration-300 text-primary-color relative`}
      >
        <BsChevronLeft
          className={`bg-primary-color p-1 text-secondary-color text-2xl rounded-full absolute -right-3 top-7 cursor-pointer duration-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex items-center">
          <Image
            src="/assets/undraw_developer.svg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded cursor-pointer block float-left ml-2"
          />
          <h1
            className={`ml-4 text-primary-color origin-left font-bold text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            SIRTARU
          </h1>
        </div>
        <hr className="bg-secondary-color h-0.5 w-full mt-4 mb-4 rounded" />
        <ul>
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                onClick={() => handleMenuClick(menu.id)}
                className={`text-md flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-primary-color hover:text-secondary-color ${
                  activeMenu === menu.id
                    ? "text-primary-color"
                    : "text-inactive-color"
                } ${menu.spacing ? "mt-9" : ""} `}
              >
                <span>
                  {menu.icon ? (
                    menu.icon
                  ) : (
                    <MdDashboard className="ml-1 text-2xl block float-left" />
                  )}
                </span>
                <span
                  className={`font-regular text-md flex-1 text-left duration-100 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`text-xl duration-300 ${
                      subMenuOpen && "rotate-180"
                    }`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && subMenuOpen && open && (
                <ul>
                  {menu.submenuItem.map((submenuItem, index) => (
                    <li
                      key={index}
                      onClick={() => handleSubMenuClick(submenuItem.id)}
                      className={`duration-300 ml-8 text-inactive-color p-2 px-5 text-sm flex items-center gap-x4 cursor-pointer p-2 rounded-md mt-2 hover:bg-primary-color hover:text-secondary-color ${
                        activeSubMenu === submenuItem.id
                          ? "text-primary-color"
                          : "text-inactive-color"
                      }`}
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
