import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (filePath, publicId) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist at the specified path');
        }
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            public_id: publicId,
        });
        log('Upload successful cloudinary URL:', result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(filePath); // Clean up local file on error 
        console.error('Error uploading to Cloudinary  :', error);
        return null;
    }
};


// (async function () {

//     // Configuration
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });

//     const uploadCloudinary = async (filePath, publicId) => {
//         try {
//             if (!fs.existsSync(filePath)) {
//                 throw new Error('File does not exist at the specified path');
//             }
//             const result = await cloudinary.uploader.upload(filePath, {
//                 resource_type: "auto",
//                 public_id: publicId,
//             });
//             log('Upload successful cloudinary URL:', result.url);
//             return result;
//         } catch (error) {
//             fs.unlinkSync(filePath); // Clean up local file on error 
//             console.error('Error uploading to Cloudinary  :', error);
//             return null;
//         }
//     };

//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();

export { uploadCloudinary };