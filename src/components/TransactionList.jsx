export default function TransactionList({
  transactions,
  deleteTransaction
}) {

  if (!transactions.length)
    return <p>No transactions yet</p>;

  return (
    <div className="card">

      <h3 className="font-semibold mb-4">
        Transaction History
      </h3>

      {transactions.map(t => (
        <div
          key={t.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-medium">{t.category}</p>
            <span className="text-sm text-gray-400">
              {t.type}
            </span>
          </div>

          <div className="flex items-center gap-3">

            <p
              className={
                t.type === "Income"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              ₹{t.amount}
            </p>

            <button
              onClick={()=>deleteTransaction(t.id)}
              className="delete-btn"
            >
              Delete
            </button>

          </div>
        </div>
      ))}

    </div>
  );
}