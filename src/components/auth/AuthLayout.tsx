import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  descriptionClassName?: string;
  footer?: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  descriptionClassName,
  footer,
  className = ""
}) => {
  return (
    <main className="flex-center h-screen bg-bright-green px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md relative">
        {/* Decorative shapes */}
        <div className="top-shape" />
        <div className="bottom-shape">
          <div className="inner-box"></div>
        </div>

        <Card
          className={`w-full max-w-md py-12 relative bg-white border-none ${className}`}
        >
          <CardHeader className="gap-6 px-12">
            <CardTitle className="flex-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={165}
                height={35}
                className="h-9 w-auto"
              />
            </CardTitle>

            {/* Custom title/description or default description */}
            {title || description ? (
              <CardDescription className="flex-col-center gap-1">
                {title && (
                  <div className="medium-title-no-bold text-text">{title}</div>
                )}
                {description && (
                  <p
                    className={`body-text text-gray whitespace-pre-wrap ${descriptionClassName}`}
                  >
                    {description}
                  </p>
                )}
              </CardDescription>
            ) : null}
          </CardHeader>

          <CardContent className="px-12">{children}</CardContent>

          {footer && <CardFooter className="px-12">{footer}</CardFooter>}
        </Card>
      </div>
    </main>
  );
};

export default AuthLayout;
