import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ImageFallbackProps {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
  classNameFallback?: string;
}

const ImageFallback = ({ src, alt, name, className, classNameFallback }: ImageFallbackProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="w-full h-full object-cover" />
      <AvatarFallback className={cn("bg-green-main text-white", classNameFallback)}>
        {name ? name.charAt(0) : "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default ImageFallback;
