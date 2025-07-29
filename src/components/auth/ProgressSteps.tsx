import CircularProgress from "../dasboard/CircularProgress";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => (
  <section className="space-x-4 flex items-center">
    <CircularProgress currentStep={currentStep} totalSteps={2} progress={currentStep / 2 * 100} size={60} strokeWidth={5} />
    <div className="space-y-0">
      <h3 className="medium-title-no-bold leading-normal">アカウント登録</h3>
      <p className="body-text text-gray leading-normal">{currentStep === 1 ? "ユーザー情報を入力" : "ユーザー情報を入力"}</p>
    </div>
  </section>
);

export default ProgressSteps;
