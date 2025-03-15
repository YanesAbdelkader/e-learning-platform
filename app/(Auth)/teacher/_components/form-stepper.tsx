import { CheckCircle2 } from "lucide-react"

interface Step {
  title: string
  completed: boolean
}

interface FormStepperProps {
  steps: Step[]
  currentStep: number
}

export default function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
          >
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${
                    index < currentStep
                      ? "bg-primary text-primary-foreground border-primary"
                      : index === currentStep
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
              >
                {index < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{index + 1}</span>}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-full w-[calc(100%-2.5rem)] h-0.5 -translate-y-1/2 
                    ${index < currentStep ? "bg-primary" : "bg-muted-foreground"}`}
                  style={{ width: "calc(100vw / steps.length - 3rem)" }}
                ></div>
              )}
            </div>

            <span className="mt-2 text-xs font-medium text-center hidden sm:block">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

