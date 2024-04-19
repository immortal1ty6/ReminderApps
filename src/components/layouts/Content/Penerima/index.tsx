import Button from "@/components/elements/Button";
import { IoIosAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Penerima } from "@/components/type";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ContentPenerima = () => {
  const [penerimas, setPenerimas] = useState<Penerima[]>([]);
  const [show, setShow] = useState(false);
  const [selectedPenerimas, setSelectedPenerimas] = useState<Penerima | null>(
    null
  );
  const [levels, setLevels] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost/api_sirtaru/penerima/read.php"
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPenerimas(data);
      }

      const levelsResponse = await fetch(
        "http://localhost/api_sirtaru/level/read.php"
      );
      const levelsData = await levelsResponse.json();
      setLevels(levelsData);
    }

    fetchData();
  }, []);

  const handleAdd = async () => {
    router.push("/penerima/add")
  }
  const handleDelete = async (id_penerima: number) => {
    const result = await Swal.fire({
      title: "Anda yakin akan menghapus data ini?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `http://localhost/api_sirtaru/penerima/delete.php?id_penerima=${String(
          id_penerima
        )}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedPenerimas = penerimas.filter(
          (penerima) => penerima.id_penerima !== id_penerima
        );
        setPenerimas(updatedPenerimas);
      }
    }
  };

  const handleEdit = async (penerimas: Penerima) => {
    setSelectedPenerimas(penerimas);
    router.push(`/penerima/edit?id_penerima=${penerimas.id_penerima}`);
  };

  return (
    <div className="p-10 max-h-screen w-full overflow-hidden">
      <div className="flex mb-10">
        <div className="flex flex-col h-96 w-full bg-white-color p-5 rounded-lg">
          {/* Header */}
          <div className="flex w-full items-center mb-5">
            <p className="text-lg font-medium">Penerima</p>
            <div className="flex ml-auto items-center">
              <Button
                id="filter"
                name="filter"
                type="button"
                className="rounded-md text-white-color opacity-75 bg-secondary-color p-2 w-full ml-auto hover:opacity-100"
                onClick={handleAdd}
              >
                <div className="flex items-center">
                  <IoIosAdd className="text-xl text-primary-color" />
                  <span className="text-sm font-regular me-1">
                    Tambah Penerima
                  </span>
                </div>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-y-auto">
            <table className="table-fixed w-full">
              <thead className="border-b">
                <tr>
                  <th className="py-3 text-left text-sm font-medium">No</th>
                  <th className="py-3 text-left text-sm font-medium">
                    Nama Penerima
                  </th>
                  <th className="py-3 text-left text-sm font-medium">Email</th>
                  <th className="py-3 text-left text-sm font-medium">Level</th>
                  <th className="py-3 text-left text-sm font-medium">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td className="py-3 text-sm text-center" colSpan={5}>
                      {error}
                    </td>
                  </tr>
                ) : (
                  penerimas.map((penerima, index) => (
                    <tr className="border-b" key={penerima.id_penerima}>
                      <td className="py-3 text-sm">{index+1}</td>
                      <td className="py-3 text-sm">{penerima.nama_penerima}</td>
                      <td className="py-3 text-sm">
                        {penerima.email_penerima}
                      </td>
                      <td className="py-3 text-sm">
                        {
                          levels.find(
                            (level) => level.id_level === penerima.id_level
                          )?.nama_level
                        }
                      </td>
                      <td className="py-3 text-sm">
                        <div className="w-20 flex justify-between items-center">
                          <FiEdit
                            className="text-lg cursor-pointer text-text-color opacity-75 hover:opacity-100"
                            onClick={() => handleEdit(penerima)}
                          />
                          <AiOutlineDelete
                            className="text-xl text-red-400 hover:text-red-500 cursor-pointer"
                            onClick={() => handleDelete(penerima.id_penerima)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPenerima;
