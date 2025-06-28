import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Unauthorized</h1>
          <p>
            <a href="/api/auth/signin" className="text-blue-500 underline">
              Click here to sign in
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.name} 👋</h1>
    </div>
  );
}
