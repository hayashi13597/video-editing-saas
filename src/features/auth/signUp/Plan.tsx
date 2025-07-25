import { useForm } from "react-hook-form";
import { profileSchemaType } from "./validate";
import RequiredBadge from "@/components/form/RequiredBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PlanProps {
  form: ReturnType<typeof useForm<profileSchemaType>>;
}

const Plan = ({ form }: PlanProps) => {
  const [plan, setPlan] = useState<string>(form.getValues("plan") || "");
  const handlePlanChange = (selectedPlan: string) => {
    form.setValue("plan", selectedPlan);
    setPlan(selectedPlan);
  };

  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm leading-none font-medium select-none text-primary">
        プラン <RequiredBadge required={true} text="必須" />
      </label>
      <div className="grid grid-cols-3 gap-3">
        <Button
          className={cn("cursor-pointer hover:text-white", {
            "bg-accent text-white": plan === "A"
          })}
          type="button"
          variant="outline"
          onClick={() => handlePlanChange("A")}
        >
          プランA
        </Button>
        <Button
          className={cn("cursor-pointer hover:text-white", {
            "bg-accent text-white": plan === "B"
          })}
          type="button"
          variant="outline"
          onClick={() => handlePlanChange("B")}
        >
          プランB
        </Button>
        <Button
          className={cn("cursor-pointer hover:text-white", {
            "bg-accent text-white": plan === "C"
          })}
          type="button"
          variant="outline"
          onClick={() => handlePlanChange("C")}
        >
          プランC
        </Button>
      </div>
      {form.formState.errors.plan && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.plan.message}
        </p>
      )}
    </div>
  );
};

export default Plan;
