import { cn } from "@/lib/utils";
import Image from "next/image"

interface ImageFallbackProps {
  className?: string;
  src?: string;
  alt?: string;
}

const ImageFallback = ({
  className,
  src = "/images/placeholder.png",
  alt = "image fallback"
}: ImageFallbackProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={cn("rounded-full w-10 h-10", className)}
    />
  )
}

export default ImageFallback