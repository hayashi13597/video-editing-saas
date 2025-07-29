import { getS3FileUpload } from "@/orvalApi/endpoints/s3-file-upload/s3-file-upload";
import axios from "axios";

/**
 * Get a pre-signed URL for uploading a file to S3
 */
async function getPresignedUploadUrl({
  file,
  entityType = "user",
  purpose = "avatar"
}: {
  file: File;
  entityType?: string;
  entityId?: string;
  purpose?: string;
}) {
  try {
    const res = await getS3FileUpload().upload({
      fileName: file.name,
      contentType: file.type,
      entityType,
      purpose
    });
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting pre-signed URL:", error);
    throw new Error("Failed to get pre-signed URL");
  }
}

/**
 * Upload a file directly to S3 using a pre-signed URL
 */
async function uploadFileWithPresignedUrl({
  file,
  signedUrl
}: {
  file: File;
  signedUrl: string;
}) {
  try {
    await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

/**
 * Complete file upload process - get pre-signed URL and upload file to S3
 */
export async function uploadFileToS3({
  file,
  entityType = "user",
  entityId,
  purpose = "avatar"
}: {
  file: File;
  entityType?: string;
  entityId?: string;
  purpose?: string;
}) {
  const { signedUrl, key } = await getPresignedUploadUrl({
    file,
    entityType,
    entityId,
    purpose
  });

  await uploadFileWithPresignedUrl({ file, signedUrl });

  const fileUrl = `${process.env.NEXT_PUBLIC_S3_URL}${key}`;
  return { fileUrl, key };
}

/**
 * Delete a file from S3 using the backend API
 */
export async function deleteFileFromS3(key: string) {
  try {
    await getS3FileUpload()._delete({ key });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
}
