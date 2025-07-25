import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon, Mail } from "lucide-react";

interface NotificationModalProps {
  isOpen?: boolean;
  onOpenChange?: (_open: boolean) => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  LucideIcon?: LucideIcon;
  classNameIcon?: string;
}

function NotificationModal({
  isOpen = false,
  onOpenChange,
  title = "メールアドレスを確認してください",
  description = "確認リンクをメールアドレス宛に送信しました。受信箱を確認し、リンクをクリックしてアカウントを認証してください。",
  actionLabel = "閉じる",
  onAction,
  LucideIcon,
  classNameIcon
}: NotificationModalProps) {
  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange?.(newOpen);
  };

  const handleAction = () => {
    onAction?.();
    if (!onAction) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleAction}>
      <DialogContent className="sm:max-w-md bg-white">
        <div className="flex-center w-full my-6">
          <div className="rounded-full bg-blue-50 p-3">
            {LucideIcon ? (
              <LucideIcon
                className={cn("h-8 w-8 text-blue-600", classNameIcon)}
              />
            ) : (
              <Mail className="h-8 w-8 text-blue-600" />
            )}
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center pt-2 text-gray">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={handleAction} className="mt-2 cursor-pointer">
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationModal;
