const Star = ({ fillPercent }: { fillPercent: number }) => (
  <span
    className="relative inline-block text-gray-300"
    style={{ width: "1em" }}
  >
    <span
      className="absolute left-0 top-0 text-yellow-400 overflow-hidden"
      style={{ width: `${fillPercent}%` }}
    >
      ★
    </span>
    ★
  </span>
);

export default Star;
