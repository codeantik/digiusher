const InstanceCard = ({ instance }) => {
    return (
      <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-white flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
        {/* Instance Image */}
        <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden mb-4">
          <img
            src={instance.image || "/assets/aws-instance.webp"}
            alt={instance.id}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Instance Details */}
        <div className="mt-2 w-full text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-medium text-gray-800">Cloud:</span> {instance.cloudType}
          </p>
          <p>
            <span className="font-medium text-gray-800">Region:</span> {instance.region}
          </p>
          <p>
            <span className="font-medium text-gray-800">RAM:</span> {instance.memory} GB
          </p>
          <p>
            <span className="font-medium text-gray-800">CPU:</span> {instance.vcpu} vCPUs
          </p>
          <p>
            <span className="font-medium text-gray-800">Location:</span> {instance.location}
          </p>
        </div>
  
        {/* Price Tag */}
        <div className="mt-4 py-2 px-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-full shadow-md">
          ${instance.pricePerUnit}/{instance.unit}
        </div>
      </div>
    );
  };
  
  export default InstanceCard;
  