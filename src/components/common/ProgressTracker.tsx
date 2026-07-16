export default function ProjectOverviewCard() {
  const completed = 16;
  const total = 24;
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-[8px] lg:p-6 p-3 border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">

      <div className="mb-8">
        <h2 className="text-[17px] font-semibold text-[#111827]">
          Downtown Office Complex
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">PRJ-001</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-10 gap-6">
        <div>
          <h3 className="text-[14px] font-bold mb-4">Task Progress</h3>

          <div className="flex justify-between text-sm text-[#6B7280] mb-2">
            <span>Completed Tasks</span>
            <span className="text-[#000] font-medium">
              {completed}/{total}
            </span>
          </div>

          <div className="h-2.5 bg-[#E5E7EB] rounded-full mb-6">
            <div
              className="h-2.5 bg-[#3AB449] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-12 mb-8">
            <div className="text-center flex-1 sm:flex-none">
              <p className="text-[#3AB449] text-[17px] font-bold">
                {completed}
              </p>
              <p className="text-[#6B7280] text-sm">Completed</p>
            </div>

            <div className="text-center flex-1 sm:flex-none">
              <p className="text-[#1D51A4] text-[17px] font-bold">5</p>
              <p className="text-[#6B7280] text-sm">In Progress</p>
            </div>

            <div className="text-center flex-1 sm:flex-none">
              <p className="text-[#111827] text-[17px] font-bold">3</p>
              <p className="text-[#6B7280] text-sm">Pending</p>
            </div>
          </div>

          <h3 className="text-[14px] text-[#111827] font-semibold mb-4">Timeline Status</h3>

          <div className="bg-[#F9FAFB] rounded-[10px] p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Planned Completion</span>
              <span className="font-medium text-[#000] text-sm">
                2024-06-30
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Current Estimate</span>
              <span className="font-medium text-[#000] text-sm">
                2024-06-30
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Status</span>
              <span className="font-medium text-[#3AB449] text-sm">
                On Track
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[17px] text-[#111827] font-semibold mb-6">
            Project Milestones
          </h3>

          <div className="space-y-6">
            {[
              {
                title: "Foundation Complete",
                status: "Completed",
                color: "#1D4ED8",
              },
              {
                title: "Structure Complete",
                status: "In progress",
                color: "#22C55E",
              },
              {
                title: "Interior Work",
                status: "Pending",
                color: "#D1D5DB",
              },
              {
                title: "Final Inspection",
                status: "Pending",
                color: "#FB923C",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-start"
              >
                <div className="flex gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-semibold text-[14px] text-[#4B5563]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#4B5563]">
                      {item.status}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-[#6B7280]">
                  2024-02-15
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
