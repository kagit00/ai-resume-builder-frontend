export default function PlanCard({ title, price, features, buttonLabel, onClick, isActive }) {
  return (
    <div className="bg-transparent p-3 rounded-lg shadow-lg w-full max-w-sm flex flex-col justify-between">
      <div className="p-2">
        <h4 className="text-md font-thin mb-1 text-white">{title}</h4>
        <p className="text-gray-300 text-xs mb-2">{price}</p>
        <ul className="text-left text-gray-400 mb-2 font-semibold text-xs space-y-1 list-disc">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClick}
        className={`${
          isActive
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:scale-105 transition-transform duration-300'
        } text-white py-1 px-2 rounded-md shadow-sm text-xs font-semibold`}
        disabled={isActive}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
