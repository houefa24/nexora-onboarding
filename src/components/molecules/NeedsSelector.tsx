import { Checkbox } from "@/components/atoms/Checkbox";
import { projectNeedsOptions } from "@/lib/schemas";

interface NeedsSelectorProps {
    selected: string[];
    onChange: (values: string[]) => void;
    error?: string;
}

export function NeedsSelector({ selected, onChange, error }: NeedsSelectorProps) {
    const toggle = (need: string) => {
        if (selected.includes(need)) {
            onChange(selected.filter((n) => n !== need));
        } else {
            onChange([...selected, need]);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectNeedsOptions.map((need) => (
                    <div
                        key={need}
                        data-cy={`need-${need.replace(/\s+/g, "-").toLowerCase()}`}
                        className={`px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${selected.includes(need)
                            ? "border-[#e05a2b] bg-[#fdf4f0]"
                            : "border-[#e7e5e4] bg-white hover:border-[#d6d3d1]"
                            }
  `}
                    >
                        <Checkbox
                            label={need}
                            checked={selected.includes(need)}
                            onChange={() => toggle(need)}
                        />
                    </div>
                ))}
            </div>
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
}