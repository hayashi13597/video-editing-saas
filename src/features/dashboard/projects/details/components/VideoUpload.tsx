"use client";

import { Button } from "@/components/ui/button";
import { cn, formatSize } from "@/lib/utils";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

const VideoUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (selectedFiles && selectedFiles.length + acceptedFiles.length > 5) {
        toast.error("一度にアップロードできるファイルは5つまでです。");
        return;
      }
      setSelectedFiles(prev => {
        if (!prev) return acceptedFiles;
        return [...prev, ...acceptedFiles];
      });
    },
    [selectedFiles]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const totalSize = rejectedFiles.reduce(
      (acc, file) => acc + file.file.size,
      0
    );
    if (totalSize > 3 * 1024 * 1024 * 1024) {
      // 3GB in bytes
      toast.error("合計ファイルサイズが3GBを超えています。");
    }
    if (rejectedFiles.length > 5) {
      toast.error("一度にアップロードできるファイルは5つまでです。");
    }
  }, []);

  const maxFileSize = 3 * 1024 * 1024 * 1024; // 3GB in bytes

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: true,
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    },
    maxSize: maxFileSize,
    maxFiles: 5,
    disabled: uploading || (!!selectedFiles && selectedFiles.length >= 5)
  });

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();

    if (!selectedFiles || selectedFiles.length === 0) {
      setUploading(false);
      return;
    }

    selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      // Replace with your actual API endpoint
    } catch {
      toast.error("アップロードに失敗しました。");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      if (!prev) return null;
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles.length > 0 ? newFiles : null;
    });
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "text-center w-full aspect-[3/2] p-8 border rounded-12 border-dashed flex-col-center gap-5",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray",
          selectedFiles && selectedFiles.length >= 5
            ? "cursor-default"
            : "cursor-pointer"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">
            ここにファイルをドロップしてください...
          </p>
        ) : (
          <div className="flex-col-center">
            <p className="small-title">動画をアップロード</p>
            <p>ファイルをドラッグ＆ドロップ</p>
            <p className="very-small-text text-gray mt-2">
              MP4・MOV・AVI形式、かつ3GB以下のファイルのみ <br />
              アップロードできます。
            </p>
          </div>
        )}

        {selectedFiles && selectedFiles.length > 0 && (
          <div className="space-y-2 w-full">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex-between p-2 bg-light-gray rounded-6 cursor-default"
                onClick={e => e.stopPropagation()}
              >
                <span>
                  {file.name} ({formatSize(file.size)})
                </span>
                <button className="text-red" onClick={() => removeFile(index)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {!isDragActive && (!selectedFiles || selectedFiles.length < 5) && (
          <Button className="button-submit w-fit bg-light-gray text-text hover:bg-light-gray hover:text-text">
            Select file
          </Button>
        )}

        {selectedFiles && selectedFiles.length > 0 && (
          <div onClick={e => e.stopPropagation()}>
            <Button
              className="button-submit w-fit"
              onClick={handleUpload}
              disabled={
                uploading || selectedFiles.length === 0 || !selectedFiles
              }
            >
              {uploading ? "アップロード中..." : "ファイルをアップロード"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
