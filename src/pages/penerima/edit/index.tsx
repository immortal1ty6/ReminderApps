import AppShell from "@/components/layouts/AppShell";
import ContentEditPenerima from "@/components/layouts/Content/Penerima/Edit";
import { GetServerSideProps } from "next";

const EditPenerimaPage = ({ penerimas }: { penerimas: any }) => {
  return (
    <AppShell>
      <ContentEditPenerima penerimas={penerimas} />
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_penerima } = context.query;
  const response = await fetch(
    `http://localhost/api_sirtaru/penerima/read_id.php?id_penerima=${id_penerima}`
  );
  const penerimas: any = await response.json();

  return {
    props: {
      penerimas,
    },
  };
};
export default EditPenerimaPage;
