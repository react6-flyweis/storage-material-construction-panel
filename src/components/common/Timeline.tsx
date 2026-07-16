
interface TimelineStep {
  title: string;
  date: string;
  status: 'completed' | 'inprogress' | 'upcoming';
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900">Project Timeline (Overall)</h3>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          View Full Timeline
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Connector line */}
            {idx !== steps.length - 1 && (
              <div className="absolute left-[11px] top-6 w-[2px] h-12 bg-gray-100" />
            )}
            
            <div className={`mt-1 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border ${
              step.status === 'completed' ? 'bg-green-50 border-green-200' : 
              step.status === 'inprogress' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}>
              {step.status === 'completed' && (
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {step.status === 'inprogress' && (
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              )}
              {step.status === 'upcoming' && (
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              )}
            </div>

            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>{step.title}</p>
                <p className="text-xs text-gray-400 font-medium">{step.date}</p>
              </div>
              
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                step.status === 'completed' ? 'bg-green-100 text-green-700' : 
                step.status === 'inprogress' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
              }`}>
                {step.status === 'inprogress' ? 'Inprogress' : step.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
