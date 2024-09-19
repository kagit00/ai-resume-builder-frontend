export default function PlanCard({ title, price, features, buttonLabel, onClick, isActive }) {
  return (
    <div className="bg-transparent p-4 rounded-lg shadow-md border border-blue-700 w-full max-w-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div className="p-3">
        {/* Title and Price */}
        <h4 className="text-md font-medium mb-2 text-white">{title}</h4>
        <p className="text-gray-100 text-xs mb-3">{price}</p>
        
        {/* Features List */}
        <ul className="text-left text-white mb-4 font-medium text-xs space-y-1 list-disc pl-5">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className=" bg-opacity-30 rounded-md p-1 transition-colors duration-300 hover:bg-opacity-50"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className={`${
          isActive
            ? 'bg-gray-600 cursor-not-allowed text-white'
            : 'bg-blue-950 hover:bg-blue-600 transform hover:scale-105 transition-transform duration-300 text-white'
        } py-2 px-3 rounded-full shadow-xl text-xs font-semibold`}
        disabled={isActive}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
