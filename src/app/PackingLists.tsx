import { Search, ChevronDown, Download, ArrowUpDown, ListChecks } from "lucide-react";

export default function PackingLists() {
  const stats = [
    { title: "Total Packing List", value: "24", trend: "5.62%", isUp: true, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Loads Ready For Dispatch", value: "15", trend: "11.4%", isUp: true, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Bundles Assigned", value: "58", trend: "8.52%", isUp: true, color: "text-yellow-600", bg: "bg-yellow-50" },
    { title: "Leads Dispatch Today", value: "3", trend: "7.45%", isUp: false, color: "text-red-600", bg: "bg-red-50" },
  ];

  const packingLists = [
    { id: "PKL-001", load: "LOAD-001", truck: "TX-4582", bundles: 5, weight: "18,500 LBS", destination: "Site A", status: "Loading" },
    { id: "PKL-002", load: "LOAD-002", truck: "TX-2345", bundles: 8, weight: "37,700 LBS", destination: "Site A", status: "Ready" },
    { id: "PKL-003", load: "LOAD-003", truck: "TX-4582", bundles: 6, weight: "21,400 LBS", destination: "Site B", status: "Loading" },
    { id: "PKL-004", load: "LOAD-004", truck: "TX-2345", bundles: 5, weight: "18,500 LBS", destination: "Site C", status: "Ready" },
    { id: "PKL-005", load: "LOAD-005", truck: "TX-4582", bundles: 8, weight: "37,700 LBS", destination: "Site A", status: "Loading" },
    { id: "PKL-006", load: "LOAD-006", truck: "TX-2345", bundles: 6, weight: "21,400 LBS", destination: "Site A", status: "Ready" },
    { id: "PKL-007", load: "LOAD-007", truck: "TX-4582", bundles: 3, weight: "18,500 LBS", destination: "Site B", status: "Loading" },
    { id: "PKL-008", load: "LOAD-008", truck: "TX-2345", bundles: 4, weight: "37,700 LBS", destination: "Site C", status: "Ready" },
    { id: "PKL-009", load: "LOAD-009", truck: "TX-4582", bundles: 2, weight: "21,400 LBS", destination: "Site C", status: "Loading" },
    { id: "PKL-010", load: "LOAD-010", truck: "TX-2345", bundles: 4, weight: "18,500 LBS", destination: "Site A", status: "Ready" },
    { id: "PKL-011", load: "LOAD-011", truck: "TX-4582", bundles: 5, weight: "37,700 LBS", destination: "Site A", status: "Loading" },
    { id: "PKL-012", load: "LOAD-012", truck: "TX-2345", bundles: 8, weight: "21,400 LBS", destination: "Site T", status: "Ready" },
    { id: "PKL-013", load: "LOAD-013", truck: "TX-4582", bundles: 6, weight: "18,500 LBS", destination: "Site A", status: "Loading" },
    { id: "PKL-014", load: "LOAD-014", truck: "TX-2345", bundles: 8, weight: "37,700 LBS", destination: "Site A", status: "Loading" },
  ];

  return (
    <div className="mx-auto pb-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Packing List</h1>
          <p className="text-sm font-medium text-gray-500 max-w-2xl">View and manage packing lists for truckloads to verify bundles before loading and dispatch.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
              <Download className="w-4 h-4" />
              Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <ListChecks className={`w-5 h-5 ${stat.color}`} />
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
            placeholder="Search packing lists..."
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

      {/* Table */}
      <div className="bg-white rounded-[24px] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto scroll-hide">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 w-12">
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-md cursor-pointer hover:border-blue-400" />
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Packing List</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Load</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Truck</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer group">
                      Bundles <ArrowUpDown className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer group">
                      Total Weight <ArrowUpDown className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {packingLists.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                      <div className={`w-5 h-5 border-2 rounded-md transition-all cursor-pointer ${i === 0 ? "bg-[#1D51A4] border-[#1D51A4]" : "border-gray-200 group-hover:border-blue-400"}`} />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.id}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-400">{row.load}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.truck}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.bundles}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-900">{row.weight}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{row.destination}</td>
                  <td className="px-6 py-5">
                    <span className={`
                      px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit
                      ${row.status === "Loading" ? "bg-yellow-50 text-yellow-600" : "bg-blue-50 text-blue-600"}
                    `}>
                      {row.status} {row.status === "Loading" && <span className="text-[10px] font-bold opacity-50">🕗</span>}
                      {row.status === "Ready" && <span className="text-[10px] font-bold opacity-50">⚙️</span>}
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
