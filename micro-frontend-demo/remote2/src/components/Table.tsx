interface AppInfo {
  name: string;
  type: string;
  port: number;
  exposes: string;
  description: string;
}

const Table = () => {
  const appInfo: AppInfo[] = [
    {
      name: "Host",
      type: "Host Application",
      port: 5173,
      exposes: "N/A",
      description: "Main application that consumes remote modules",
    },
    {
      name: "Remote1",
      type: "Remote Application",
      port: 5174,
      exposes: "Header Component",
      description: "Provides a beautiful header component with navigation",
    },
    {
      name: "Remote2",
      type: "Remote Application",
      port: 5175,
      exposes: "Table Component",
      description: "Provides this informative table component",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Micro-Frontend Architecture Overview
      </h2>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Application</th>
              <th className="px-6 py-4 text-left font-semibold">Type</th>
              <th className="px-6 py-4 text-left font-semibold">Port</th>
              <th className="px-6 py-4 text-left font-semibold">Exposes</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appInfo.map((app, index) => (
              <tr
                key={app.name}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {app.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      app.type === "Host Application"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {app.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">:{app.port}</td>
                <td className="px-6 py-4 text-gray-700">{app.exposes}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {app.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This table demonstrates how Module Federation
          enables micro-frontends to share components dynamically at runtime,
          allowing for independent deployment and development.
        </p>
      </div>
    </div>
  );
};

export default Table;
