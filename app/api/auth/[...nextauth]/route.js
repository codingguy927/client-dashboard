import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientDashboard from "@/components/ClientDashboard"; // NEW

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Unauthorized</h1>
          <p>Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return <ClientDashboard session={session} />;
}
