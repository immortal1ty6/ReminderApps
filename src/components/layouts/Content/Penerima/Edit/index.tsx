import FormInput from "@/components/elements/FormInput";
import Button from "@/components/elements/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { Penerima } from "@/components/type";

const ContentEditPenerima = ({ penerimas }: { penerimas: Penerima }) => {
  const [idPenerima, setIdPenerima] = useState(penerimas.id_penerima);
  const [namaPenerima, setNamaPenerima] = useState(penerimas.nama_penerima);
  const [emailPenerima, setEmailPenerima] = useState(penerimas.email_penerima);
  const [levelPenerima, setLevelPenerima] = useState(penerimas.id_level);
  const router = useRouter();

  const handleEdit = async () => {
    if (!namaPenerima || !emailPenerima || !levelPenerima) {
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
        "http://localhost/api_sirtaru/penerima/edit.php",
        {
          idPenerima,
          namaPenerima,
          emailPenerima,
          levelPenerima,
        }
      );

      if (response.data === "Data berhasil diupdate.") {
        Swal.fire({
          title: "Berhasil!",
          text: "Penerima berhasil diperbarui",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/penerima");
          }
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
            <p className="text-lg font-medium">Edit Penerima</p>
          </div>

          <div className="flex flex-col">
            <span className="text-sm mb-2 text-text-color">Nama Penerima*</span>
            <FormInput
              id="namaPenerima"
              name="namaPenerima"
              type="text"
              placeholder="Nama Penerima"
              required
              value={namaPenerima}
              onChange={(e) => setNamaPenerima(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            />
            <span className="text-sm mb-2 text-text-color">
              Email Penerima*
            </span>
            <FormInput
              id="emailPenerima"
              name="emailPenerima"
              type="text"
              placeholder="Email Penerima"
              required
              value={emailPenerima}
              onChange={(e) => setEmailPenerima(e.target.value)}
              className="mb-5 w-full py-3 px-4 text-sm rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            />
            <span className="text-sm mb-2 text-text-color">
              Level Penerima*
            </span>
            <div className="relative mb-5">
              <select
                className="block appearance-none text-sm w-full bg-white-color border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 text-text-color py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white-color focus:border-secondary-color"
                id="grid-level"
                required
                value={levelPenerima}
                onChange={(e) => setLevelPenerima(parseInt(e.target.value))}
              >
                <option disabled >
                  Pilih Level
                </option>
                <option value="1" selected={levelPenerima === 1}>Pengurus</option>
                <option value="2" selected={levelPenerima === 2}>Anggota</option>
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
              className="text-sm w-fit bg-secondary-color text-white-color py-2 px-3 rounded-lg"
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

export default ContentEditPenerima;
