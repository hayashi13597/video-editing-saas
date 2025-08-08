import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface PasswordAlertProps {
  watchedPassword: string;
}

const PasswordAlert = ({ watchedPassword }: PasswordAlertProps) => {
  const validateLength = (password: string) =>
    password.length >= 8 && password.length <= 20;
  const validateComplexity = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password);
  const validateSpecialChars = (password: string) =>
    /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]/.test(password);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-4 h-4 rounded-full border flex-center",
            !watchedPassword
              ? "border-gray-300 bg-white"
              : validateLength(watchedPassword)
                ? "border-green-500 bg-green-500 text-white"
                : "border-red-500 bg-red-500 text-white"
          )}
        >
          {!watchedPassword ? null : validateLength(watchedPassword) ? (
            <Check size={8} />
          ) : (
            <X size={8} />
          )}
        </div>
        <p className="small-text">8文字以上20文字以内で入力してください。</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-4 h-4 rounded-full border flex-center",
            !watchedPassword
              ? "border-gray-300 bg-white"
              : validateComplexity(watchedPassword)
                ? "border-green-500 bg-green-500 text-white"
                : "border-red-500 bg-red-500 text-white"
          )}
        >
          {!watchedPassword ? null : validateComplexity(watchedPassword) ? (
            <Check size={8} />
          ) : (
            <X size={8} />
          )}
        </div>
        <p className="small-text">
          半角の大文字・小文字の英字および数字を含めてください。
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-4 h-4 rounded-full border flex-center",
            !watchedPassword
              ? "border-gray-300 bg-white"
              : validateSpecialChars(watchedPassword)
                ? "border-green-500 bg-green-500 text-white"
                : "border-red-500 bg-red-500 text-white"
          )}
        >
          {!watchedPassword ? null : validateSpecialChars(watchedPassword) ? (
            <Check size={8} />
          ) : (
            <X size={8} />
          )}
        </div>
        <p className="small-text">
          次の記号も任意で使用可能です。!&quot;#$%&apos;()*+,-./:;&lt;=&gt;?@[]^_&#96;
          {"{}"}|~
        </p>
      </div>
    </div>
  );
};

export default PasswordAlert;
