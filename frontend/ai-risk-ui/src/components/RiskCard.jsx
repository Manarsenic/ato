export default function RiskCard({ title, value, status }) {

  const getColor = () => {
    if (status === "high") return "text-red-400";
    if (status === "medium") return "text-yellow-400";
    if (status === "low") return "text-green-400";
    return "text-blue-400";
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-md hover:scale-105 transition-all">

      <p className="text-gray-400 text-sm mb-2">
        {title}
      </p>

      <h2 className={`text-3xl font-bold ${getColor()}`}>
        {value}
      </h2>

      {status && (
        <p className="text-xs text-gray-400 mt-2 uppercase">
          {status} risk
        </p>
      )}

    </div>
  );
}