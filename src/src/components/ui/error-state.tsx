import { TriangleAlert } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="rounded-3xl bg-[#fff0f6] border border-[#ff4f8b]/25 p-10 text-center">

      <div className="w-20 h-20 rounded-full bg-[#ff4f8b]/15 flex items-center justify-center mx-auto">

        <TriangleAlert className="w-10 h-10 text-[#ff4f8b]" />

      </div>

      <h2 className="text-3xl font-bold mt-8 text-[#ff4f8b]">
        Something Went Wrong
      </h2>

      <p className="text-gray-400 mt-4">
        Unable to fetch data. Please try again later.
      </p>

      <button className="mt-8 h-12 px-6 rounded-2xl bg-[#ff4f8b] hover:bg-[#e63872] transition text-white">

        Retry

      </button>

    </div>
  );
}
