export async function UploadDocumets({formData}: {formData: FormData }) {
try{
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      return data
}catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  }
}