import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
        <img
          src={session.user.image}
          alt={session.user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300 dark:border-gray-600"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {session.user.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{session.user.email}</p>
      </div>
    </div>
  );
}
