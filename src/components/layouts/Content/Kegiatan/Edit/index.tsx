import { useState } from "react";
import { useRouter } from "next/router";
import FormInput from "@/components/elements/FormInput";
import Button from "@/components/elements/Button";
import Swal from "sweetalert2";
import axios from "axios";

const ContentEditKegiatan = ({ kegiatans }: { kegiatans: any }) => {
  const [idKegiatan, setIdKegiatan] = useState(kegiatans.id_kegiatan);
  const [judulKegiatan, setJudulKegiatan] = useState(kegiatans.judul_kegiatan);
  const [deskripsiKegiatan, setDeskripsiKegiatan] = useState(
    kegiatans.deskripsi_kegiatan
  );
  const [tanggalMulaiKegiatan, setTanggalMulaiKegiatan] = useState(
    kegiatans.tanggal_mulai_kegiatan
  );
  const [tanggalSelesaiKegiatan, setTanggalSelesaiKegiatan] = useState(
    kegiatans.tanggal_selesai_kegiatan
  );
  const [penerimaKegiatan, setPenerimaKegiatan] = useState(kegiatans.penerima);
  const router = useRouter();

  const handleEdit = async () => {
    if (
      !judulKegiatan ||
      !deskripsiKegiatan ||
      !tanggalMulaiKegiatan ||
      !tanggalSelesaiKegiatan ||
      !penerimaKegiatan
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
      const response = await axios.post(
        "http://localhost/api_sirtaru/kegiatan/edit.php",
        {
          idKegiatan,
          judulKegiatan,
          deskripsiKegiatan,
          tanggalMulaiKegiatan,
          tanggalSelesaiKegiatan,
          penerimaKegiatan,
        }
      );

      if (response.data === "Data berhasil diupdate.") {
        Swal.fire({
          title: "Berhasil!",
          text: "Kegiatan berhasil diperbarui",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/kegiatan");
          }
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-10 max-h-screen w-full overflow-hidden">
      <div className="flex mb-10">
        <div className="flex flex-col h-full w-full bg-white-color p-5 rounded-lg">
          <div className="flex w-full mb-5">
            <p className="text-lg font-medium">Edit Kegiatan</p>
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
            <div className="flex flex-between">
              <div className="flex flex-col mr-5">
                <span className="text-sm mb-2 text-text-color">
                  Tanggal Mulai Kegiatan*
                </span>
                <FormInput
                  id="tanggalMulaiKegiatan"
                  name="tanggalMulaiKegiatan"
                  type="text"
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
                  type="text"
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
                value={penerimaKegiatan}
                onChange={(e) => setPenerimaKegiatan(e.target.value)}
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
            {/* <FormInput
              id="penerima"
              name="penerima"
              type="text"
              placeholder="Penerima"
              required
              value={penerimaKegiatan}
              onChange={(e) => setPenerimaKegiatan(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            /> */}
            <span className="text-sm mb-2 text-text-color">
              Deskripsi Kegiatan*
            </span>
            <FormInput
              id="deskripsi"
              name="deskripsi"
              type="text"
              placeholder="Deskripsi Kegiatan"
              required
              value={deskripsiKegiatan}
              onChange={(e) => setDeskripsiKegiatan(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            />
            <Button
              className=" text-sm w-fit bg-secondary-color text-white-color py-2 px-3 rounded-lg"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditKegiatan;
