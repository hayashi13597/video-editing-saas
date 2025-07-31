"use client";

import ImageFallback from "@/components/dashboard/ImageFallback";
import Camera from "@/../public/icons/camera.svg";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn, getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { uploadFileToS3 } from "@/lib/upload";

interface UpdateImageProps {
  src: string;
  name: string;
  role?: "CLIENT" | "FREELANCER" | "ADMIN";
  setAvatarUrlHandler?: (_url: string) => void;
}

const UpdateImage = ({
  src,
  name,
  role,
  setAvatarUrlHandler
}: UpdateImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    onDrop
  });

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setUploading(true);
      if (!selectedFile) {
        toast.error("画像ファイルを選択してください");
        return;
      }

      const { fileUrl } = await uploadFileToS3({
        file: selectedFile,
        entityType: "user",
        purpose: "avatar"
      });

      if (setAvatarUrlHandler) {
        setAvatarUrlHandler(fileUrl);
      }
      setUploadedImage(fileUrl);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error as ApiError,
        "画像のアップロード中にエラーが発生しました"
      );
      toast.error(errorMessage);
    } finally {
      setDialogOpen(false);
      setSelectedFile(null);
      setUploading(false);
    }
  };

  const filePreview = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <>
      <div className="relative">
        <ImageFallback
          src={uploadedImage || src}
          alt="avatar"
          className="w-[120px] h-[120px]"
          name={name}
          classNameFallback="text-5xl"
        />
        <Dialog
          open={dialogOpen}
          onOpenChange={open => {
            if (uploading) return; // Prevent closing while uploading
            setDialogOpen(open);
            if (!open) setSelectedFile(null);
          }}
        >
          <DialogTrigger asChild>
            <div className="absolute bottom-0 right-0 w-9 aspect-square bg-light-gray rounded-full flex-center cursor-pointer">
              <Camera />
            </div>
          </DialogTrigger>
          <DialogContent className="border-none p-5 !max-w-2xl">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="medium-title">
                  {role === "CLIENT" ? "会社ロゴ" : "プロフィール画像"}編集
                </CardTitle>
                <CardDescription className="text-gray">
                  画像をアップロードするには、以下の領域にドラッグ＆ドロップしてください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <div
                  {...getRootProps()}
                  className={cn(
                    "border border-stroke border-dashed rounded-6 py-10 px-3 cursor-pointer flex-col-center focus-within:outline-none",
                    {
                      "cursor-not-allowed": uploading
                    }
                  )}
                >
                  <input {...getInputProps()} disabled={uploading} />
                  {filePreview && selectedFile ? (
                    <>
                      <Image
                        src={filePreview}
                        alt="preview"
                        width={96}
                        height={96}
                        className="w-24 h-24 object-contain"
                      />
                      <p className="text-text body-text mt-3">
                        {selectedFile.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray">
                        ここに画像をドラッグ＆ドロップ
                      </p>
                      <p className="text-gray mt-2">
                        またはクリックしてファイルを選択
                      </p>
                    </>
                  )}
                </div>
                <CardAction className="mt-5 flex flex-end w-full">
                  <Button
                    className="button-submit w-fit"
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                  >
                    {uploading ? "保存中..." : "保存する"}
                  </Button>
                </CardAction>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UpdateImage;
