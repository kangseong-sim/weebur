export default function TopBtn() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[80px] right-[40px] text-sm bg-white border p-4 rounded-full shadow-lg hover:bg-blue-700 hover:text-white transition"
    >
      TOP
    </button>
  );
}
