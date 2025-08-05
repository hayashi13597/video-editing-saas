import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface TooltipComponentProps {
  children: React.ReactNode;
  information: string;
}

const TooltipComponent = ({ children, information }: TooltipComponentProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{information}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
