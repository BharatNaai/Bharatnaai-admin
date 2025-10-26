
const KPIcard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default KPIcard;
