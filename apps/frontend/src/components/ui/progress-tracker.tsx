import { Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Step {
  number: number;
  label: string;
  status: "completed" | "current" | "upcoming";
  path: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  showBackButton?: boolean;
}

export function ProgressTracker({
  steps,
  currentStep,
  showBackButton = true,
}: ProgressTrackerProps) {
  const router = useRouter();

  const handleBack = () => {
    const previousStep = steps.find((step) => step.number === currentStep - 1);
    if (previousStep) {
      router.push(previousStep.path);
    }
  };

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="relative">
          {/* Back Button */}
          {showBackButton && currentStep > 1 && (
            <button
              onClick={handleBack}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
          )}

          {/* Steps */}
          <div className="flex items-center justify-center gap-3">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                {/* Step Circle */}
                <div className="flex items-center gap-2 group">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
                      step.status === "completed"
                        ? "bg-green-500 text-white scale-110"
                        : step.status === "current"
                        ? "border-2 border-green-500 text-green-500 scale-110"
                        : "border-2 border-gray-200 text-gray-400"
                    )}
                  >
                    {step.status === "completed" ? (
                      <Check className="h-5 w-5 animate-scale-check" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm transition-colors duration-300",
                      step.status === "completed" || step.status === "current"
                        ? "font-medium text-gray-900"
                        : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-[2px] mx-3 transition-colors duration-300",
                      step.status === "completed"
                        ? "bg-green-200"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
