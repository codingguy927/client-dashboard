import ClientDashboard from "@/components/ClientDashboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Unauthorized from "@/components/Unauthorized";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  return <ClientDashboard session={session} />;
}
