// Import the functions you need from the SDKs you need
import cloudinary from "~/config/cloudinaryConfig";
import { env } from "~/config/environments";
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
let resourceType = "auto"; // Cloudinary tự nhận diện (tốt nhất)
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: env.CLOUDINARY_FOLDER, // Thư mục lưu trữ trên Cloudinary
      resource_type: resourceType,
    });

    res.json({
      url: result.secure_url, // URL truy cập file
      public_id: result.public_id, // ID file trên Cloudinary
      resource_type: result.resource_type, // Kiểu file (image, video, raw, audio)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const uploadMultipleFiles = async (req, res) => {
 try {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const uploadPromises = req.files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: env.CLOUDINARY_FOLDER,
      resource_type: "auto",
    });
    return result;
  });
  const results = await Promise.all(uploadPromises);
  res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const uploadController = {
  uploadFile,
  uploadMultipleFiles,
};


