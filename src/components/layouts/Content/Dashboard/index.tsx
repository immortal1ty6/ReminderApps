import { PiUsersLight, PiClockLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Kegiatan } from "@/components/type";
const ContentDashboard = () => {
  const [kegiatans, setKegiatans] = useState<Kegiatan[]>([]);
  const [totalKegiatan, setTotalKegiatan] = useState(0);
  const [totalPenerima, setTotalPenerima] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKegiatans = kegiatans.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost/api_sirtaru/kegiatan/read.php"
      );
      const data = await response.json();
      setKegiatans(data);

      const penerimaResponse = await fetch(
        "http://localhost/api_sirtaru/penerima/read.php"
      );
      const dataPenerima = await penerimaResponse.json();
      setTotalPenerima(dataPenerima.length);
      setTotalKegiatan(data.length);
    }

    fetchData();
  }, []);

  return (
    <div className={`p-10 max-h-screen w-full overflow-hidden`}>
      {/* Container Card */}
      <div className="flex mb-5">
        {/* Card 1 */}
        <div className="flex flex-col bg-tertiary-color w-56 h-32 rounded-lg p-5 text-primary-color">
          <div className="flex justify-between">
            <h5 className="text-md">Total Kegiatan</h5>
            <PiClockLight className="text-3xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-medium mt-1 ">{totalKegiatan}</h1>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col bg-white-color w-56 h-32 rounded-lg p-5 text-text-color ms-10">
          <div className="flex justify-between">
            <h5 className="text-sm">Total Penerima</h5>
            <PiUsersLight className="text-3xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-medium mt-1">{totalPenerima}</h1>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="flex mb-5">
        <div className="flex flex-col h-80 w-full bg-white-color p-5 rounded-lg overflow-hidden">
          <div className="flex">
            <p className="text-lg font-medium mb-5">Kegiatan</p>
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
                </tr>
              </thead>
              <tbody>
                {paginatedKegiatans.map((kegiatan, index) => (
                  <tr className="border-b" key={kegiatan.id_kegiatan}>
                    <td className="py-3 text-sm">{startIndex + index + 1}</td>
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
                  </tr>
                ))}
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

export default ContentDashboard;
