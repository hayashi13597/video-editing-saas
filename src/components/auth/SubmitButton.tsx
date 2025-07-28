import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  className?: string;
}

const SubmitButton = ({ isSubmitting, text, className }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn("button-submit", className)}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};

export default SubmitButton;
