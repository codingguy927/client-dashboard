"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ClientsTable from "@/components/ClientsTable";
import { Users, DollarSign, ClipboardList } from "lucide-react";

export default function ClientPage({ session }) {
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

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar session={session} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome back, {session.user.name} 👋
          </h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard title="Clients" value="50" icon={<Users className="w-6 h-6" />} />
            <StatCard title="Revenue" value="$120k" icon={<DollarSign className="w-6 h-6" />} />
            <StatCard title="Tasks" value="8" icon={<ClipboardList className="w-6 h-6" />} />
          </section>
          <ClientsTable />
        </main>
      </div>
    </div>
  );
}
