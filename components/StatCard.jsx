export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-card p-6 flex items-center gap-5 transition-all hover:scale-[1.03] hover:shadow-2xl duration-200 border border-gray-200 dark:border-gray-700 group">
      <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full shadow-inner transition-all group-hover:rotate-6 group-hover:scale-105">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
          {title}
        </h3>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
