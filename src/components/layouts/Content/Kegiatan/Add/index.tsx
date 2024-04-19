import { useState, useEffect } from "react";
import FormInput from "@/components/elements/FormInput";
import Button from "@/components/elements/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import { Penerima } from "@/components/type";

const ContentAddKegiatan = () => {
  const router = useRouter();
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [deskripsiKegiatan, setDeskripsiKegiatan] = useState("");
  const [tanggalMulaiKegiatan, setTanggalMulaiKegiatan] = useState("");
  const [tanggalSelesaiKegiatan, setTanggalSelesaiKegiatan] = useState("");
  const [levelPenerima, setLevelPenerima] = useState("Pilih Level");
  const [authUrl, setAuthUrl] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const response = await axios.get("/api/googleAuth");
        setAuthUrl(response.data.url);
      } catch (error) {
        console.log("Error fetching auth URL:", error);
      }
    };

    fetchAuthUrl();
  }, []);

  useEffect(() => {
    const { access_token, refresh_token } = router.query;
    setAccessToken(access_token as string);
    setRefreshToken(refresh_token as string);
  }, [router.query]);

  const handleAdd = async () => {
    if (!accessToken) {
      window.location.href = authUrl;
      return;
    }
    if (
      !judulKegiatan ||
      !deskripsiKegiatan ||
      !tanggalMulaiKegiatan ||
      !tanggalSelesaiKegiatan ||
      !levelPenerima
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Isi data dengan lengkap",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const startDateTime = new Date(tanggalMulaiKegiatan).toISOString();
      const endDateTime = new Date(tanggalSelesaiKegiatan).toISOString();

      const event : {
        summary: string;
        description: string;
        start: { dateTime: string; timeZone: string };
        end: { dateTime: string; timeZone: string };
        attendees: { email: string }[];
        reminders: { useDefault: boolean; overrides: { method: string; minutes: number }[] };
      } = {
        summary: judulKegiatan,
        description: deskripsiKegiatan,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Jakarta",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Jakarta",
        },
        attendees: [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        }
      }

      if (levelPenerima !== "Pilih Level") {
        try {
          const response = await axios.get(
            `http://localhost/api_sirtaru/penerima/read_level.php?level=${levelPenerima}`
          );
          if (response.data && response.data.length > 0) {
            response.data.forEach((penerima: Penerima) => {
              event.attendees.push({
                email: penerima.email_penerima,
              });
            });
          }
        } catch (error) {
          console.error("Error fetching penerima:", error);
        }
      }

      const response = await axios.post(
        "http://localhost/api_sirtaru/kegiatan/add.php",
        {
          judulKegiatan,
          deskripsiKegiatan,
          tanggalMulaiKegiatan,
          tanggalSelesaiKegiatan,
          levelPenerima,
        }
      );

      const responseEvent = await axios.post(
        "/api/googleCalendarEvent", {
          accessToken,
          refreshToken,
          event
        }
      )

      console.log(responseEvent)

      if (response.data === "New record created successfully") {

        Swal.fire({
          title: "Berhasil!",
          text: "Kegiatan baru berhasil ditambahkan",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/kegiatan";
          }
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 max-h-screen w-full overflow-hidden">
      <div className="flex mb-10">
        <div className="flex flex-col h-full w-full bg-white-color p-5 rounded-lg">
          <div className="flex w-full mb-10">
            <p className="text-lg font-medium">Tambah Kegiatan</p>
          </div>

          <div className="flex flex-col">
            <span className="text-sm mb-2 text-text-color">
              Judul Kegiatan*
            </span>
            <FormInput
              id="judulKegiatan"
              name="judulKegiatan"
              type="text"
              placeholder="Judul Kegiatan"
              required
              value={judulKegiatan}
              onChange={(e) => setJudulKegiatan(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            />
            <span className="text-sm mb-2 text-text-color">
              Deskripsi Kegiatan*
            </span>
            <FormInput
              id="deskripsiKegiatan"
              name="deskripsiKegiatan"
              type="text"
              placeholder="Deskripsi Kegiatan"
              required
              value={deskripsiKegiatan}
              onChange={(e) => setDeskripsiKegiatan(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            />
            <div className="flex flex-between">
              <div className="flex flex-col mr-5">
                <span className="text-sm mb-2 text-text-color">
                  Tanggal Mulai Kegiatan*
                </span>
                <FormInput
                  id="tanggalMulaiKegiatan"
                  name="tanggalMulaiKegiatan"
                  type="datetime-local"
                  placeholder="Tanggal Mulai Kegiatan"
                  required
                  value={tanggalMulaiKegiatan}
                  onChange={(e) => setTanggalMulaiKegiatan(e.target.value)}
                  className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm mb-2 text-text-color">
                  Tanggal Selesai Kegiatan*
                </span>
                <FormInput
                  id="tanggalSelesaiKegiatan"
                  name="tanggalSelesaiKegiatan"
                  type="datetime-local"
                  placeholder="Tanggal Selesai Kegiatan"
                  required
                  value={tanggalSelesaiKegiatan}
                  onChange={(e) => setTanggalSelesaiKegiatan(e.target.value)}
                  className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
                />
              </div>
            </div>
            <span className="text-sm mb-2 text-text-color">Penerima*</span>
            <div className="relative mb-5">
              <select
                className="block appearance-none text-sm w-full bg-white-color border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 text-text-color py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white-color focus:border-secondary-color"
                id="grid-level"
                required
                value={levelPenerima}
                onChange={(e) => setLevelPenerima(e.target.value)}
              >
                <option disabled selected>
                  Pilih Level
                </option>
                <option>Pengurus</option>
                <option>Anggota</option>
                <option>Semua</option>
              </select>
              <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <Button
              className="mt-5 text-sm w-fit bg-secondary-color text-white-color py-2 px-3 rounded-lg"
              type="button"
              onClick={handleAdd}
            >
              Tambah
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAddKegiatan;
