import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath, publicId) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist at the specified path');
        }
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            public_id: publicId,
        });
        console.log('Upload successful cloudinary URL:', result.url);
        console.log('Cloudinary upload result:', result.url);
        return result;

    } catch (error) {
        fs.unlinkSync(filePath); // Clean up local file on error 
        console.error('Error uploading to Cloudinary  :', error);
        return null;
    }
};

export { uploadOnCloudinary };