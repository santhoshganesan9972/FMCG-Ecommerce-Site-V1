const orders = [
  { id: "#1204", customer: "Rahul", status: "Preparing" },
  { id: "#1205", customer: "Priya", status: "Out For Delivery" },
  { id: "#1206", customer: "Karthik", status: "Packed" },
];

export default function LiveOrders() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
            Real-Time
          </p>
          <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
            Live Orders
          </h2>
        </div>
        <div className="h-3 w-3 rounded-full bg-[#0c831f]" />
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] p-3 transition-all duration-200 hover:bg-[#f0f1f3] hover:shadow-sm"
          >
            <div>
              <p className="text-sm font-black text-[#1a1a1a]">{order.id}</p>
              <p className="text-xs text-[#666]">{order.customer}</p>
            </div>
            <span className="rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-black text-[#0c831f]">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
