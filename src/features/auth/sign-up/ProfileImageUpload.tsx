"use client";

import RequiredBadge from "@/components/form/RequiredBadge";
import { Label } from "@/components/ui/label";
import { cn, formatSize } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ProfileImageUploadProps {
  onFileSelect?: (file: File | null) => void;
  label?: string;
}

const ProfileImageUpload = ({
  onFileSelect,
  label
}: ProfileImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    maxSize: maxFileSize,
    maxFiles: 1,
    disabled: selectedFile !== null
  });

  const file = selectedFile;

  return (
    <div className="space-y-2">
      <Label className="!body-text">
        {label || "プロフィール画像"}
        <RequiredBadge required={false} text="任意" />
      </Label>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            "border border-stroke border-dashed rounded-6 py-4 px-3 cursor-pointer",
            {
              "cursor-default": selectedFile !== null
            }
          )}
        >
          <div className="flex-col-center">
            <Image
              src="/icons/upload.svg"
              alt="upload"
              width={45}
              height={35}
              className="w-auto h-auto object-contain"
            />
            <p className="medium-title mt-2 mb-[3px]">
              ドラッグ＆ドロップでアップロード
            </p>
            <p className="small-text text-green-main">またはファイルを選択</p>
          </div>
          {file ? (
            <div className="flex-between bg-light-gray rounded-6 px-3 py-1.5 mt-2.5">
              <div>
                <p className="body-text-bold">{file.name}</p>
                <p className="small-text text-gray">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                className="p-2 cursor-pointer hover:text-red"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedFile(null);
                  onFileSelect?.(null);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
