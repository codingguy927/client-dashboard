import { Home, Users, DollarSign, Settings } from "lucide-react";

const navItems = [
  { label: "Overview", icon: <Home className="w-5 h-5" /> },
  { label: "Clients", icon: <Users className="w-5 h-5" /> },
  { label: "Revenue", icon: <DollarSign className="w-5 h-5" /> },
  { label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-10">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-blue-500">
        <h1 className="text-3xl font-extrabold tracking-wide">⚡ DashPro</h1>
        <p className="text-sm text-blue-200 mt-1">Client Management</p>
      </div>

      {/* Nav Items */}
      <nav className="mt-6 px-4 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-700/70 bg-white/10 transition w-full"
          >
            <span className="text-white">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
