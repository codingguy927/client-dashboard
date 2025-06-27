import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientPage from "./ClientPage";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <ClientPage session={session} />;
}
