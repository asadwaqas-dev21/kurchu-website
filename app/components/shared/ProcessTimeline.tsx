/**
 * Visual process timeline.
 * Numbered steps with title, description, and optional bullet list.
 */
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  items?: string[];
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mt-14">
      {/* Vertical connector line */}
      <div className="absolute left-5 top-0 hidden h-full w-px bg-black/[0.08] lg:block" />

      <div className="grid grid-cols-1 gap-12 lg:gap-16">
        {steps.map((step) => (
          <div key={step.number} className="relative grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] lg:gap-12">
            {/* Number */}
            <div className="flex items-start gap-4 lg:justify-end">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0b1220] text-[13px] font-semibold text-white">
                {step.number}
              </span>
              <h3 className="text-[17px] font-semibold text-[#0b1220] lg:hidden">
                {step.title}
              </h3>
            </div>

            {/* Content */}
            <div className="lg:pt-1">
              <h3 className="hidden text-[19px] font-semibold text-[#0b1220] lg:block">
                {step.title}
              </h3>
              <p className="mt-2 max-w-lg text-[14px] leading-6 text-black/55">
                {step.description}
              </p>
              {step.items && step.items.length > 0 && (
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] leading-5 text-black/60">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          stroke="#1e8fe0"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
