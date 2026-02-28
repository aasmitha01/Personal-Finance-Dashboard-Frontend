export default function StatCard({
  title,
  amount,
  change,
  positive,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        ${amount}
      </h2>

      <p
        className={`mt-2 text-sm font-medium ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </p>
      <div className="
  bg-white dark:bg-gray-800
  text-gray-800 dark:text-white
  rounded-2xl p-6 shadow-sm
"></div>
    </div>
  );
}