"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OVERLAY_TEXT_DEFAULT = "読み込み中。。。";

export enum LoadingTypeEnum {
  TOP_BAR = "top-bar",
  OVERLAY = "overlay",
  SPINNER = "spinner",
  NONE = "none"
}

// Define loading types
type LoadingType = LoadingTypeEnum;

interface ProgressContextType {
  isLoading: boolean;
  startLoading: (overlayText?: string) => void;
  stopLoading: () => void;
  setLoadingType: (type: LoadingType) => void;
  loadingType: LoadingType;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

interface ProgressProviderProps {
  children: React.ReactNode;
  defaultType?: LoadingType;
  color?: string;
  height?: number;
  delay?: number;
}

function NavigationEvents({
  startLoading,
  stopLoading
}: {
  startLoading: () => void;
  stopLoading: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // React to route changes
  useEffect(() => {
    startLoading();

    // Wait for next tick to avoid race conditions
    const timer = setTimeout(() => {
      stopLoading();
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, startLoading, stopLoading]);

  return null;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  children,
  defaultType = LoadingTypeEnum.TOP_BAR,
  color = "#2D97E4", // blue-500
  height = 4,
  delay = 300
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<LoadingType>(defaultType);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const [overlayText, setOverlayText] = useState<string>(OVERLAY_TEXT_DEFAULT);

  // Start fake progress
  const startLoading = useCallback(
    (overlayText?: string) => {
      setOverlayText(overlayText ?? OVERLAY_TEXT_DEFAULT);
      setIsLoading(true);
      setProgress(0);

      // Delayed rendering to avoid flashes for quick loads
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);

      return () => clearTimeout(timer);
    },
    [delay]
  );

  // Reset and finish loading
  const stopLoading = useCallback(() => {
    setProgress(100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShouldRender(false);
      setProgress(0);
    }, 200); // Small delay for transition

    return () => clearTimeout(timer);
  }, []);

  // Run fake progress animation
  useEffect(() => {
    if (!isLoading || progress >= 90) return;

    const timer = setTimeout(() => {
      // Slow down progress as it increases
      const increment = Math.max(1, (90 - progress) / 10);
      setProgress(prev => Math.min(prev + increment, 90));
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, progress]);

  return (
    <ProgressContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        loadingType,
        setLoadingType
      }}
    >
      {children}

      {/* Separate component with navigation hooks wrapped in React.Suspense */}
      <React.Suspense fallback={null}>
        <NavigationEvents
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </React.Suspense>

      {/* Top bar progress loader */}
      {shouldRender && loadingType === LoadingTypeEnum.TOP_BAR && (
        <div
          className="fixed top-0 left-0 z-50 h-1 transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            height: `${height}px`
          }}
        />
      )}

      {/* Full screen overlay loader */}
      {shouldRender && loadingType === LoadingTypeEnum.OVERLAY && (
        <div className="overlay-container fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full animate-fadeOpacity-slow"></div>
            <p className="mt-4 text-white">{overlayText}</p>
          </div>
        </div>
      )}

      {/* Simple spinner */}
      {shouldRender && loadingType === LoadingTypeEnum.SPINNER && (
        <div
          className={cn(
            "fixed z-50 transition-opacity duration-300",
            "top-4 right-4" // Position in corner
          )}
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </ProgressContext.Provider>
  );
};

// Custom hook for using the progress context
export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);

  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }

  return context;
};
