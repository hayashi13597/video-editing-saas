interface CircularProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function CircularProgress({
  currentStep,
  totalSteps,
  progress,
  size = 200,
  strokeWidth = 12,
  className = ""
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#CFCFCF"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#43BE7A"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="medium-title-no-bold text-green-main">
            {currentStep}
          </span>
          <span className="Body text text-placeholder">/{totalSteps}</span>
        </div>
      </div>
    </div>
  );
}
