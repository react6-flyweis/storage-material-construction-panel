import { Search, ChevronDown, Download, ArrowUpDown, QrCode, Keyboard } from "lucide-react";

export default function BundleScan() {
  const stats = [
    { title: "Bundles Scanned", value: "3", trend: "5.62%", isUp: true, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Bundles Remaining", value: "2", trend: "11.4%", isUp: true, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Bundles Loaded", value: "1", trend: "8.52%", isUp: true, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  const bundleHistory = [
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-001", parts: "STL-B12", weight: "18,500 LBS", time: "10:32 AM", status: "Staging" },
    { site: "Riverside Office Build", location: "Construction Site B", id: "BND-002", parts: "STL-B13", weight: "37,700 LBS", time: "10:32 AM", status: "Ready" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-003", parts: "STL-B14", weight: "21,400 LBS", time: "10:32 AM", status: "Staging" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-004", parts: "STL-B12", weight: "18,500 LBS", time: "10:32 AM", status: "Ready" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-005", parts: "STL-B13", weight: "37,700 LBS", time: "10:32 AM", status: "Staging" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-006", parts: "STL-B14", weight: "21,400 LBS", time: "10:32 AM", status: "Ready" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-007", parts: "STL-B12", weight: "18,500 LBS", time: "10:32 AM", status: "Staging" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-008", parts: "STL-B13", weight: "37,700 LBS", time: "10:32 AM", status: "Ready" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-009", parts: "STL-B14", weight: "21,400 LBS", time: "10:32 AM", status: "Planning" },
    { site: "ABC Construction LLC.", location: "Construction Site A", id: "BND-010", parts: "STL-B12", weight: "18,500 LBS", time: "10:32 AM", status: "Ready" },
  ];

  return (
    <div className="mx-auto pb-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Bundle Scan</h1>
          <p className="text-sm font-medium text-gray-500 max-w-2xl">Scan bundle QR codes to verify staging, loading, and dispatch readiness.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
              <Download className="w-4 h-4" />
              Export
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-100 hover:opacity-90 transition-all">
              <QrCode className="w-4 h-4" />
              Scan QR Code
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6366F1] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-100 hover:opacity-90 transition-all">
              <Keyboard className="w-4 h-4" />
              Manual Entry
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <QrCode className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] sm:text-xs font-bold ${stat.isUp ? "text-emerald-500" : "text-red-500"}`}>
                {stat.isUp ? "▲" : "▼"} {stat.trend}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search bundle history..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none shadow-sm focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <ChevronDown className="w-4 h-4" />
            Filter
          </button>
          <div className="bg-white border border-gray-100 rounded-xl px-4 py-2 flex items-center justify-between sm:justify-start gap-3 shadow-sm relative">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Sort by :</span>
             <select className="appearance-none bg-transparent text-xs font-bold text-gray-900 pr-4 outline-none cursor-pointer">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Weight</option>
             </select>
             <ChevronDown className="w-3 h-3 text-gray-900 absolute right-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[24px] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="px-4 sm:px-8 py-5 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Bundle scan History</h3>
        </div>
        <div className="overflow-x-auto scroll-hide">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 w-12">
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-md cursor-pointer hover:border-blue-400" />
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Project / Site</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bundle ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Parts</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer group">
                      Total Weight <ArrowUpDown className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bundleHistory.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-md cursor-pointer group-hover:border-blue-400 transition-all" />
                  </td>
                  <td className="px-6 py-5">
                      <p className="text-xs font-bold text-gray-900 mb-1 leading-tight">{row.site}</p>
                      <p className="text-[10px] font-bold text-gray-400">{row.location}</p>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-400">{row.id}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.parts}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.weight}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{row.time}</td>
                  <td className="px-6 py-5">
                    <span className={`
                      px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit
                      ${row.status === "Staging" ? "bg-yellow-50 text-yellow-600" : 
                        row.status === "Ready" ? "bg-blue-50 text-blue-600" : 
                        "bg-orange-50 text-orange-600"}
                    `}>
                      {row.status} {row.status === "Staging" && <span className="text-[10px] font-bold opacity-50">🕗</span>}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="bg-[#1D51A4] text-white px-5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-800 transition-all shadow-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-8 py-6 bg-gray-50/30 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 order-2 sm:order-1">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Showing</p>
             <select className="bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm outline-none cursor-pointer">
                <option>10</option>
             </select>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Results</p>
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-100">1</button>
              <button className="w-9 h-9 rounded-xl text-gray-400 text-xs font-bold hover:bg-white hover:text-gray-900 transition-all">2</button>
              <button className="w-9 h-9 rounded-xl text-gray-400 text-xs font-bold hover:bg-white hover:text-gray-900 transition-all">3</button>
            </div>
            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
