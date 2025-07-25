interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => (
  <section className="space-y-2.5">
    <div className="space-y-1.5">
      <h2 className="small-text text-gray">Step {currentStep}</h2>
      <p className="intro-text">
        {currentStep === 1 ? "ユーザー情報を入力" : "会社情報を入力"}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <div className={`w-full h-2 bg-green-main rounded-full`}></div>
      <div
        className={`w-full h-2 ${currentStep !== 1 ? "bg-green-main" : "bg-light-green"} rounded-full`}
      ></div>
    </div>
  </section>
);

export default ProgressSteps;
