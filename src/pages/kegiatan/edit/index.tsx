import AppShell from "@/components/layouts/AppShell";
import ContentEditKegiatan from "@/components/layouts/Content/Kegiatan/Edit";
import { GetServerSideProps } from "next";

const EditKegiatanPage = ({ kegiatans }: { kegiatans: any }) => {
  return (
    <AppShell>
      <ContentEditKegiatan kegiatans={kegiatans} />
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_kegiatan } = context.query;
  const response = await fetch(
    `http://localhost/api_sirtaru/kegiatan/read_id.php?id_kegiatan=${id_kegiatan}`
  );

  const kegiatans: any = await response.json();
  
  return {
    props: {
      kegiatans,
    },
  };
};

export default EditKegiatanPage;