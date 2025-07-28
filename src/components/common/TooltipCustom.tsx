import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface TooltipCustomProps {
  children: React.ReactNode;
  content: string;
  isCollapsed?: boolean;
}

const TooltipCustom = ({
  children,
  content,
  isCollapsed
}: TooltipCustomProps) => {
  if (!isCollapsed) {
    return <>{children}</>;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipCustom;
