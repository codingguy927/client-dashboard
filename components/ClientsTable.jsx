// ClientsTable.jsx

"use client";

import { useState, useMemo, useEffect } from "react";
import { Download, Edit, Trash2, Moon, Sun, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ClientModal from "./ClientModal";
import ClientTasksModal from "./ClientTasksModal";

const initialClients =
  typeof window !== "undefined" && localStorage.getItem("clients")
    ? JSON.parse(localStorage.getItem("clients"))
    : [
        { id: 1, name: "Rob Snyder", email: "rob@example.com", status: "Active", tasks: [] },
        { id: 2, name: "Richard Gosen", email: "richard@example.com", status: "Inactive", tasks: [] },
        { id: 3, name: "Halley Johns", email: "halley@example.com", status: "Active", tasks: [] },
        { id: 4, name: "John Fridkson", email: "john@example.com", status: "Active", tasks: [] },
        { id: 5, name: "Lana Griggs", email: "lana@example.com", status: "Inactive", tasks: [] },
        { id: 6, name: "Derek White", email: "derek@example.com", status: "Active", tasks: [] },
        { id: 7, name: "Meghan Fox", email: "meghan@example.com", status: "Inactive", tasks: [] },
      ];

export default function ClientsTable() {
  const [clients, setClients] = useState(initialClients);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleExportCSV = () => {
    const headers = "Name,Email,Status,Tasks Completed\n";
    const rows = clients
      .map((c) => {
        const completed = c.tasks?.filter(t => t.completed).length || 0;
        const total = c.tasks?.length || 0;
        return `${c.name},${c.email},${c.status},${completed}/${total}`;
      })
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "clients_with_tasks.csv";
    link.click();
    toast.success("Exported to CSV");
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this client?");
    if (confirmed) {
      setClients(clients.filter((c) => c.id !== id));
      toast.success("Client deleted");
    }
  };

  const handleAdd = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const client = clients.find((c) => c.id === id);
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleViewTasks = (client) => {
    setSelectedClient(client);
    setIsTaskModalOpen(true);
  };

  const handleSaveClient = (data) => {
    if (editingClient) {
      setClients(
        clients.map((c) =>
          c.id === editingClient.id ? { ...c, ...data } : c
        )
      );
      toast.success("Client updated");
    } else {
      setClients([...clients, { id: uuidv4(), ...data, tasks: [] }]);
      toast.success("Client added");
    }
  };

  const filteredClients = useMemo(() => {
    return clients
      .filter((client) =>
        (client?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
      )
      .filter((client) =>
        filterStatus === "All" ? true : client?.status === filterStatus
      )
      .sort((a, b) => {
        const valueA = (a?.[sortKey] || "").toLowerCase();
        const valueB = (b?.[sortKey] || "").toLowerCase();
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [clients, searchQuery, filterStatus, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const chartData = useMemo(() => {
    const active = clients.filter(c => c.status === "Active").length;
    const inactive = clients.filter(c => c.status === "Inactive").length;
    return [
      { name: "Active", value: active },
      { name: "Inactive", value: inactive },
    ];
  }, [clients]);

  const COLORS = ["#4ade80", "#f87171"];
  return (
    <>
      <Toaster position="top-right" />
      <motion.section layout className="mt-10 bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition duration-300 ease-in-out">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <div className="flex items-center gap-3">
            <button 
  onClick={handleAdd} 
  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1 transition transform hover:scale-105 active:scale-95"
>
  <Plus size={16} /> Add
</button>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={handleExportCSV} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200} className="mb-6">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("status")}>Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((client) => {
              const completed = client.tasks?.filter(t => t.completed).length || 0;
              const total = client.tasks?.length || 0;
              const ratio = total > 0 ? completed / total : 0;

              let badgeColor =
                total === 0 ? "bg-red-200 text-red-700" :
                ratio === 1 ? "bg-green-200 text-green-700" :
                "bg-yellow-200 text-yellow-700";

              return (
                <tr
             key={client.id} 
             className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3">
                    {client.name}
                    <div className="text-xs mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {total === 0 ? "No tasks" : `${completed}/${total} completed`}
                      </span>
                      {total > 0 && (
                        <div className="w-full h-1 mt-1 bg-gray-200 rounded">
                          <div
                            className="h-1 bg-green-500 rounded transition-all duration-500"
                            style={{ width: `${ratio * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{client.email}</td>
                  <td className="px-4 py-3">{client.status}</td>
                  <td className="px-4 py-3 flex gap-2 items-center">
                    <button onClick={() => handleViewTasks(client)} title="Manage Tasks">🧾</button>
                    <button onClick={() => handleEdit(client.id)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        initialData={editingClient}
      />

      <ClientTasksModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        client={selectedClient}
        onSave={(id, tasks) => {
          setClients((prev) =>
            prev.map((c) => (c.id === id ? { ...c, tasks } : c))
          );
        }}
      />
    </>
  );
}
