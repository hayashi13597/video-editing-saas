import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ImageFallbackProps {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

const ImageFallback = ({ src, alt, name, className }: ImageFallbackProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="w-full h-full object-cover" />
      <AvatarFallback className="bg-green-main text-white">
        {name ? name.charAt(0) : "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default ImageFallback;
