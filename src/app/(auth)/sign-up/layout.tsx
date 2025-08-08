import Image from "next/image";

export default function SignUpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-[33.33%_1fr] h-screen">
      <div className="flex-center p-9 bg-bright-green relative">
        <Image
          src="/images/sign-up-image.png"
          alt="image"
          width={405}
          height={465}
          className="w-auto h-auto object-contain"
          priority
        />
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={20}
          className="absolute top-5 left-5 w-auto h-auto object-contain"
        />
      </div>
      <div className="flex-center bg-white py-[55px]">{children}</div>
    </main>
  );
}
