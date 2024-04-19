import Button from "@/components/elements/Button";
import FormInput from "@/components/elements/FormInput";
import { CiSearch } from "react-icons/ci";
import { Kegiatan } from "@/components/type";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const ContentKegiatan = () => {
  const router = useRouter();
  const [totalKegiatan, setTotalKegiatan] = useState(0);
  const [kegiatans, setKegiatans] = useState<Kegiatan[]>([]);
  const [selectedKegiatans, setSelectedKegiatans] = useState<Kegiatan | null>(
    null
  )

  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKegiatans = kegiatans.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost/api_sirtaru/kegiatan/read.php"
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setTotalKegiatan(data.length);
        setKegiatans(data);
      }
    }

    fetchData();
  }, []);
  

  const handleEdit = async (kegiatans: Kegiatan) => {
    setSelectedKegiatans(kegiatans);
    router.push(`/kegiatan/edit?id_kegiatan=${kegiatans.id_kegiatan}`);
  };

  const handleDelete = async (id_kegiatan: number) => {
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
        `http://localhost/api_sirtaru/kegiatan/delete.php?id_kegiatan=${String(
          id_kegiatan
        )}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedKegiatans = kegiatans.filter(
          (kegiatan) => kegiatan.id_kegiatan !== id_kegiatan
        );
        setKegiatans(updatedKegiatans); 
      }
      
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch(`http://localhost/api_sirtaru/kegiatan/filter.php?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setKegiatans(data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-10 max-h-screen w-full overflow-hidden">
      <div className="flex mb-10">
        <div className="flex flex-col h-96 w-full bg-white-color p-5 rounded-lg">
          <div className="flex w-full items-center mb-5">
            <p className="text-lg font-medium">Kegiatan</p>
            <div className="flex justify-between ml-auto w-96  items-center">
              <FormInput
                id="startDate"
                name="startDate"
                type="date"
                className="text-xs text-text-color bg-white-color p-1.5 w-full mr-2 focus:border-b focus:border-text-color focus:outline-none"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-sm">to</span>
              <FormInput
                id="endDate"
                name="endDate"
                type="date"
                className="text-xs text-text-color bg-white-color p-1.5 w-full mr-2 focus:border-b focus:border-text-color focus:outline-none"
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button
                id="filter"
                name="filter"
                type="button"
                className="rounded-md text-white-color opacity-75 bg-secondary-color p-2 w-full ml-auto hover:opacity-100"
                onClick={handleFilter}
              >
                <CiSearch className="text-xl text-primary-color" />
              </Button>
            </div>
          </div>
          <div className="overflow-y-auto">
            <table className="table-fixed w-full">
              <thead className="border-b">
                <tr>
                  <th className="py-3 text-left text-sm font-medium">No</th>
                  <th className="py-3 text-left text-sm font-medium">Judul</th>
                  <th className="py-3 text-left text-sm font-medium">
                    Deskripsi
                  </th>
                  <th className="py-3 text-left text-sm font-medium">
                    Tanggal Mulai
                  </th>
                  <th className="py-3 text-left text-sm font-medium">
                    Tanggal Selesai
                  </th>
                  <th className="py-3 text-left text-sm font-medium">
                    Penerima
                  </th>
                  <th className="py-3 text-left text-sm font-medium">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                   <tr>
                   <td className="py-3 text-sm text-center" colSpan={7}>
                     {error}
                   </td>
                 </tr>
                ) : (
                  paginatedKegiatans.map((kegiatan, index) => (
                    <tr className="border-b" key={kegiatan.id_kegiatan}>
                    <td className="py-3 text-sm ">{startIndex + index + 1}</td>
                    <td className="py-3 text-sm">{kegiatan.judul_kegiatan}</td>
                    <td className="py-3 text-sm">
                      {kegiatan.deskripsi_kegiatan}
                    </td>
                    <td className="py-3 text-sm">
                      {kegiatan.tanggal_mulai_kegiatan}
                    </td>
                    <td className="py-3 text-sm">
                      {kegiatan.tanggal_selesai_kegiatan}
                    </td>
                    <td className="py-3 text-sm">
                      {kegiatan.penerima}
                    </td>
                    <td className="py-3 text-sm">
                      <div className="w-20 flex justify-between items-center">
                        <FiEdit
                          className="text-lg cursor-pointer text-text-color opacity-75 hover:opacity-100"
                          onClick={() => handleEdit(kegiatan)}
                        />
                        <AiOutlineDelete
                          className="text-xl text-red-400 hover:text-red-500 cursor-pointer"
                          onClick={() => handleDelete(kegiatan.id_kegiatan)}
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
      <div className="flex float-right">
        {Array.from(
          { length: Math.ceil(totalKegiatan / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-secondary-color text-white"
                  : "bg-primary-color text-text-color"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ContentKegiatan;
