import AppShell from "@/components/layouts/AppShell";
import DashboardContent from "@/components/layouts/Content/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";

const DashboardPage = () => {
  return (
    <AppShell>
        <DashboardContent />
    </AppShell>
  );
};

export default DashboardPage;
