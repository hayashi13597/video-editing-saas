"use client";

import RequiredBadge from "@/components/form/RequiredBadge";
import { Label } from "@/components/ui/label";
import { cn, formatSize } from "@/lib/utils";
import { uploadFileField } from "@/types/form";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { DynamicFormData } from "../validate";
import { uploadFileToS3, deleteFileFromS3 } from "@/lib/upload";

interface UploadFileProps {
  form: UseFormReturn<DynamicFormData>;
  name: uploadFileField;
  label?: string;
  requiredBadge?: boolean;
  maxFiles?: number;
  acceptedFileTypes?: { [key: string]: string[] };
  multiple?: boolean;
}

const UploadFile = ({
  form,
  name,
  label,
  requiredBadge,
  maxFiles = 1,
  acceptedFileTypes = { "image/*": [] },
  multiple = false
}: UploadFileProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [fileKeys, setFileKeys] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (selectedFiles && selectedFiles.length + acceptedFiles.length > maxFiles) {
        toast.error("一度にアップロードできるファイルは5つまでです。");
        return;
      }
      setSelectedFiles(prev => {
        if (!prev) return acceptedFiles;
        return [...prev, ...acceptedFiles];
      });

      for (const file of acceptedFiles) {
        const { fileUrl, key } = await uploadFileToS3({
          file,
          purpose: "project"
        });
        form.setValue(name, [...(form.getValues(name) || []), fileUrl]);
        setFileKeys(prev => [...prev, key]);
      }
    },
    [selectedFiles, maxFiles, form, name]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      if (rejectedFiles.length + (selectedFiles?.length || 0) > maxFiles) {
        toast.error(`一度にアップロードできるファイルは${maxFiles}つまでです。`);
      } else {
        toast.error("許可されていないファイル形式、またはファイルサイズが大きすぎます。");
      }
    }
  }, [maxFiles, selectedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    multiple,
    accept: acceptedFileTypes,
    maxFiles,
    disabled: (!!selectedFiles && selectedFiles.length >= maxFiles)
  });

  const removeFile = async (index: number) => {
    if (!selectedFiles) return;

    // Get the S3 key for this file and delete from S3
    const keyToDelete = fileKeys[index];
    if (keyToDelete) {
      try {
        await deleteFileFromS3(keyToDelete);
      } catch {
        toast.error("ファイルの削除に失敗しました。");
        return;
      }
    }

    // Update selectedFiles state
    setSelectedFiles(prev => {
      if (!prev) return null;
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles.length > 0 ? newFiles : null;
    });

    // Update fileKeys state
    setFileKeys(prev => {
      const newKeys = [...prev];
      newKeys.splice(index, 1);
      return newKeys;
    });

    // Update form values (remove the URL at the same index)
    const currentUrls = form.getValues(name) || [];
    const newUrls = [...currentUrls];
    newUrls.splice(index, 1);
    form.setValue(name, newUrls);
  };

  return (
    <div className="space-y-2">
      <Label className="leading-[1.75] mb-1">
        {label || "プロフィール画像"}
        {requiredBadge ? (
          <RequiredBadge required={true} />
        ) : requiredBadge === false ? (
          <RequiredBadge required={false} />
        ) : null}
      </Label>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            "border border-stroke border-dashed rounded-6 py-4 px-3 cursor-pointer",
            {
              "cursor-default": selectedFiles && selectedFiles.length >= maxFiles,
              "border-red": (form.formState.errors as Record<string, any>)[name]
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
          {selectedFiles && selectedFiles.length > 0 && (
            <div className="space-y-2 w-full">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex-between p-2 bg-light-gray rounded-6 cursor-default px-3 py-1.5"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col">
                    <span className="body-text-bold">
                      {file.name}
                    </span>
                    <span className="small-text text-gray">{formatSize(file.size)}</span>
                  </div>
                  <button type="button" className="text-red" onClick={() => removeFile(index)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {(form.formState.errors as Record<string, any>)[name] && (
        <p className="body-text text-red">
          {(form.formState.errors as Record<string, any>)[name]?.message}
        </p>
      )}
    </div>
  );
};

export default UploadFile;
