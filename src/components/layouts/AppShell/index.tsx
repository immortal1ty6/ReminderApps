import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type AppShellProps = {
  children: React.ReactNode;
};
const AppShell = (props: AppShellProps) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const { children } = props;
  useEffect(() => {
    const path = router.pathname;
    if (path === "/dashboard") {
      setActiveMenu("Dashboard");
    } else if (path === "/kegiatan") {
      setActiveMenu("Kegiatan");
      setActiveSubMenu("DaftarKegiatan");
    } else if (path === "/kegiatan/add") {
      setActiveMenu("Kegiatan");
      setActiveSubMenu("TambahKegiatan");
    } else if (path === "/penerima") {
      setActiveMenu("Kegiatan");
      setActiveSubMenu("Penerima");
    } else if (path === "/penerima/add"){
      setActiveMenu("Kegiatan");
      setActiveSubMenu("Penerima");
    }
  }, [router.pathname]);
  return (
    <div
      className={`flex min-h-screen h-screen bg-primary-color ${inter.className}`}
    >
      <Sidebar activeMenu={activeMenu} activeSubMenu={activeSubMenu} />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex-grow max-h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default AppShell;
