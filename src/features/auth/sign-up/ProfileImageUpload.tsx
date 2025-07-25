"use client";

import RequiredBadge from "@/components/form/RequiredBadge";
import { Label } from "@/components/ui/label";
import { cn, formatSize } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ProfileImageUploadProps {
  // eslint-disable-next-line
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
    accept: { "image/png": [], "image/jpeg": [] },
    maxSize: maxFileSize
  });

  const filePreview = selectedFile ? URL.createObjectURL(selectedFile) : null;
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
              "flex-col-center": !filePreview && !file,
              "flex-between": filePreview || file
            }
          )}
        >
          {filePreview && file ? (
            <>
              <Image
                src={filePreview}
                alt="Profile Image"
                width={90}
                height={90}
                className="w-24 h-24 object-cover"
              />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-text body-text">{file.name}</p>
                  <p className="small-text text-gray text-center">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="p-2 cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedFile(null);
                  onFileSelect?.(null);
                }}
              >
                <Image
                  src="/icons/cross.svg"
                  alt="remove"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
