"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  FastForward,
  Loader2,
  Pause,
  Play,
  Rewind,
  Settings,
  SkipBack,
  SkipForward
} from "lucide-react";
// import ReactPlayer from "react-player";
import { cn, formatTimeCode } from "@/lib/utils";
import TooltipComponent from "@/components/common/TooltipComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import dynamic from "next/dynamic";
import Image from "next/image";
// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-transparent rounded-t-md flex items-center justify-center">
      <div className="text-white">Loading video player...</div>
    </div>
  )
});

interface VideoPlayerProps {
  src: string;
  onTimeUpdate?: (_time: number) => void;
}

export default function CustomVideo({
  src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  onTimeUpdate
}: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buffered, setBuffered] = useState(false);
  // popover state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [qualityOpen, setQualityOpen] = useState(false);
  const [quality, setQuality] = useState(720);

  // hover preview
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [lastCapturedTime, setLastCapturedTime] = useState<number>(-1);

  // Local state for component-specific functionality
  const [mounted, setMounted] = useState(false);
  const seekerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When metadata loads, get video duration
  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration || 0);
    }
  };

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleRewind = useCallback(() => {
    if (playerRef.current) {
      const newTime = Math.max(playerRef.current.currentTime - 10, 0);
      playerRef.current.currentTime = newTime;
      setCurrentVideoTime(newTime);
    }
  }, [setCurrentVideoTime]);

  const handleFastForward = useCallback(() => {
    if (playerRef.current) {
      const duration = playerRef.current.duration || 0;
      const newTime = Math.min(playerRef.current.currentTime + 10, duration);
      playerRef.current.currentTime = newTime;
      setCurrentVideoTime(newTime);
    }
  }, [setCurrentVideoTime]);

  // Frame navigation handlers
  const handleFrameBackward = () => {
    if (playerRef.current) {
      const frameTime = 1 / 30;
      const newTime = Math.max(playerRef.current.currentTime - frameTime, 0);
      playerRef.current.currentTime = newTime;
      setCurrentVideoTime(newTime);
    }
  };

  const handleFrameForward = () => {
    if (playerRef.current) {
      const frameTime = 1 / 30;
      const duration = playerRef.current.duration || 0;
      const newTime = Math.min(
        playerRef.current.currentTime + frameTime,
        duration
      );
      playerRef.current.currentTime = newTime;
      setCurrentVideoTime(newTime);
    }
  };

  const handleProgress = () => {
    if (playerRef.current) {
      setCurrentVideoTime(playerRef.current.currentTime);
      onTimeUpdate?.(playerRef.current.currentTime);
    }
  };

  const handleSpeedChange = (value: string) => {
    if (playerRef.current) {
      const speed = parseFloat(value);
      playerRef.current.playbackRate = speed;
      setPlaybackRate(speed);
    }
  };

  // Seeker interaction handlers
  const handleSeekerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekerRef.current || !playerRef.current) return;
    const rect = seekerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * (playerRef.current.duration || 0);
    playerRef.current.currentTime = newTime;
    setCurrentVideoTime(newTime);
  };

  const handleSeekerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    handleSeekerClick(e);
  };

  const handleSeekerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekerRef.current || !playerRef.current) return;

    const rect = seekerRef.current.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, posX / rect.width));
    const time = percentage * (playerRef.current.duration || 0);

    setHoverTime(time);
    setHoverX(posX);

    // Only capture thumbnail when moving into a new 2-second interval
    const roundedTime = Math.floor(time / 2) * 2;
    if (roundedTime !== lastCapturedTime) {
      captureThumbnail(roundedTime);
      setLastCapturedTime(roundedTime);
    }

    if (isDragging) handleSeekerClick(e);
  };

  const handleSeekerMouseLeave = () => {
    setHoverTime(null);
    setThumbnail(null);
  };

  const captureThumbnail = useCallback((time: number) => {
    if (!previewVideoRef.current || !canvasRef.current) return;

    const video = previewVideoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    video.currentTime = time;

    // Wait for the frame to update
    const onSeeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/jpeg"));
      video.removeEventListener("seeked", onSeeked);
    };

    video.addEventListener("seeked", onSeeked);
  }, []);

  const handleSeekerMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile support
  const handleSeekerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    const touch = e.touches[0];
    const fakeMouseEvent = {
      stopPropagation: e.stopPropagation.bind(e),
      clientX: touch.clientX
    } as React.MouseEvent<HTMLDivElement>;
    handleSeekerClick(fakeMouseEvent);
  };

  const handleSeekerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    const fakeMouseEvent = {
      stopPropagation: e.stopPropagation.bind(e),
      clientX: touch.clientX
    } as React.MouseEvent<HTMLDivElement>;
    handleSeekerClick(fakeMouseEvent);
  };

  const handleSeekerTouchEnd = () => {
    setIsDragging(false);
  };
  // Global mouse up handler for when dragging outside the seeker
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalTouchEnd);
      document.addEventListener("touchcancel", handleGlobalTouchEnd);

      return () => {
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.removeEventListener("touchend", handleGlobalTouchEnd);
        document.removeEventListener("touchcancel", handleGlobalTouchEnd);
      };
    }
  }, [isDragging, setIsDragging]);

  const handleStartBuffer = () => {
    setBuffered(true);
  };

  // handle end buffering
  const handleEndBuffer = ({ playedSeconds }: { playedSeconds: number }) => {
    setBuffered(false);
    // Update current video time if the video is not playing
    if (!isPlaying) {
      setCurrentVideoTime(playedSeconds);
    }
    // If the video is playing, ensure the current time is updated
    if (playerRef.current) {
      const duration = playerRef.current.duration;
      if (duration && playedSeconds < duration) {
        setCurrentVideoTime(playedSeconds);
      }
    }
  };

  // press arrow keys to control video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      switch (e.key) {
        case "ArrowLeft":
          handleRewind();
          break;
        case "ArrowRight":
          handleFastForward();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRewind, handleFastForward]);

  return (
    <>
      {/* video */}
      <div className="relative w-full rounded-6">
        {mounted && (
          <>
            <div className="relative w-full max-w-3xl mx-auto h-fit rounded-6 group">
              <ReactPlayer
                ref={playerRef}
                src={src}
                width="100%"
                height="100%"
                loop={false}
                playing={isPlaying}
                volume={0.8}
                controls={false}
                onTimeUpdate={handleProgress}
                playbackRate={playbackRate}
                onLoadedMetadata={handleLoadedMetadata}
                onWaiting={handleStartBuffer}
                onPlaying={() =>
                  handleEndBuffer({ playedSeconds: currentVideoTime })
                }
                className="rounded-6"
              />
              {/* Hidden video & canvas for thumbnail generation */}
              <video
                ref={previewVideoRef}
                src={src}
                muted
                preload="auto"
                className="hidden"
                crossOrigin="anonymous"
              />
              <canvas ref={canvasRef} className="hidden" />
              {/* Buffering indicator */}
              {buffered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
                  <Loader2 className="animate-spin text-white" size={32} />
                </div>
              )}
              {/* Hover overlay play/pause button */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                <div
                  className="bg-red w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause
                      size={30}
                      color="#FFFFFF"
                      className="hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <Play
                      size={30}
                      color="#FFFFFF"
                      className="hover:opacity-80 transition-opacity"
                    />
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "absolute bottom-3 left-3 right-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100 flex flex-col gap-1",
                  {
                    "opacity-100": settingsOpen
                  }
                )}
              >
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center">
                  {/* seeker */}
                  <div
                    ref={seekerRef}
                    className="relative w-full h-1.5 bg-white/50 cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={handleSeekerMouseLeave}
                    onMouseDown={handleSeekerMouseDown}
                    onMouseMove={handleSeekerMouseMove}
                    onMouseUp={handleSeekerMouseUp}
                    onTouchStart={handleSeekerTouchStart}
                    onTouchMove={handleSeekerTouchMove}
                    onTouchEnd={handleSeekerTouchEnd}
                    onClick={handleSeekerClick}
                  >
                    {/* Hover Preview */}
                    {hoverTime !== null && thumbnail && (
                      <div
                        className="absolute bottom-full mb-2 flex flex-col items-center z-50 w-full"
                        style={{
                          left: `${hoverX}px`,
                          transform: "translateX(-50%)"
                        }}
                      >
                        <Image
                          src={thumbnail}
                          alt="thumbnail preview"
                          width={170}
                          height={106}
                          className="w-[170px] h-[106px] object-cover rounded-6"
                        />
                        <span className="text-xs text-white mt-1 bg-black/70 px-2 py-0.5 rounded-6">
                          {formatTimeCode(hoverTime)}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div
                      className="h-full bg-red relative"
                      style={{
                        width: `${(currentVideoTime / (duration || 1)) * 100}%`
                      }}
                    >
                      {(isHovering || isDragging) && (
                        <div
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red rounded-full"
                          style={{
                            right: -8
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* duration */}
                  <p className="small-text text-white">
                    {formatTimeCode(duration)}
                  </p>

                  {/* settings */}
                  <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
                    <PopoverTrigger asChild>
                      <Settings
                        size={16}
                        className="text-white cursor-pointer"
                        onClick={e => e.stopPropagation()}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="end"
                      className="bg-black/80 rounded-6 w-(--radix-popover-trigger-width: 100%) max-w-[219px] p-4 space-y-2"
                      sideOffset={12}
                      onClick={e => e.stopPropagation()}
                    >
                      <Popover open={speedOpen} onOpenChange={setSpeedOpen}>
                        <PopoverTrigger asChild>
                          <div className="flex-between text-white cursor-pointer">
                            <span className="body-text">再生速度調整</span>
                            <div className="flex-center gap-2">
                              <span>x{speed}</span>
                              {speedOpen ? (
                                <ChevronDown
                                  className="rotate-180 transition-transform"
                                  size={16}
                                />
                              ) : (
                                <ChevronDown
                                  className="rotate-0 transition-transform"
                                  size={16}
                                />
                              )}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
                          align="end"
                          className="bg-black/80 rounded-6 w-(--radix-popover-trigger-width: 100%) max-w-[38px] p-2 space-y-2"
                          sideOffset={20}
                          alignOffset={-16}
                          onClick={e => e.stopPropagation()}
                        >
                          {[0.5, 1, 1.5, 2].map(s => (
                            <button
                              key={s}
                              onClick={() => {
                                setSpeed(s);
                                setSpeedOpen(false);
                                handleSpeedChange(s.toString());
                              }}
                              className="text-white small-text cursor-pointer flex-center w-full"
                            >
                              {s}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>

                      <Popover open={qualityOpen} onOpenChange={setQualityOpen}>
                        <PopoverTrigger asChild>
                          <div className="flex-between text-white cursor-pointer">
                            <span className="body-text">解像度切替</span>
                            <div className="flex-center gap-2">
                              <span>{quality}p</span>
                              {qualityOpen ? (
                                <ChevronDown
                                  className="rotate-180 transition-transform"
                                  size={16}
                                />
                              ) : (
                                <ChevronDown
                                  className="rotate-0 transition-transform"
                                  size={16}
                                />
                              )}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          side="top"
                          align="end"
                          className="bg-black/80 rounded-6 w-(--radix-popover-trigger-width: 100%) max-w-[52px] p-2 space-y-2"
                          sideOffset={53}
                          alignOffset={-16}
                          onClick={e => e.stopPropagation()}
                        >
                          {[144, 240, 360, 480, 720, 1080].reverse().map(s => (
                            <button
                              key={s}
                              onClick={() => {
                                setQuality(s);
                                setQualityOpen(false);
                              }}
                              className="text-white small-text cursor-pointer flex-center w-full"
                            >
                              {s}p
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-full flex-center px-4 py-[5px] gap-4">
                  <TooltipComponent information="前のフレーム">
                    <SkipBack
                      size={24}
                      color="#FFFFFF"
                      fill="#FFFFFF"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={handleFrameBackward}
                    />
                  </TooltipComponent>
                  <TooltipComponent information="10秒戻る">
                    <Rewind
                      size={24}
                      color="#FFFFFF"
                      fill="#FFFFFF"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={handleRewind}
                    />
                  </TooltipComponent>
                  {isPlaying ? (
                    <TooltipComponent information="一時停止">
                      <Pause
                        size={24}
                        color="#FFFFFF"
                        fill="#FFFFFF"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={handlePlayPause}
                      />
                    </TooltipComponent>
                  ) : (
                    <TooltipComponent information="再生">
                      <Play
                        size={24}
                        color="#FFFFFF"
                        fill="#FFFFFF"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={handlePlayPause}
                      />
                    </TooltipComponent>
                  )}
                  <TooltipComponent information="10秒進む">
                    <FastForward
                      size={24}
                      color="#FFFFFF"
                      fill="#FFFFFF"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={handleFastForward}
                    />
                  </TooltipComponent>
                  <TooltipComponent information="次のフレーム">
                    <SkipForward
                      size={24}
                      color="#FFFFFF"
                      fill="#FFFFFF"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={handleFrameForward}
                    />
                  </TooltipComponent>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
