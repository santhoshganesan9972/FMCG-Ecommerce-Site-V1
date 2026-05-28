const orders = [
  { id: "#1024", customer: "Arun Kumar", total: "Rs 2,450", status: "Delivered" },
  { id: "#1025", customer: "Priya", total: "Rs 1,120", status: "Pending" },
  { id: "#1026", customer: "Sanjay", total: "Rs 890", status: "Processing" },
];

export default function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Operations
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Recent Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 table-row-hover hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4 font-black">{order.id}</td>
                <td className="px-4 py-4 font-semibold">{order.customer}</td>
                <td className="px-4 py-4 font-bold">{order.total}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-black text-[#0c831f]">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
