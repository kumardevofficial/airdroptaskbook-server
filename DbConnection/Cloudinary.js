import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer) => {
    if (!fileBuffer || fileBuffer.length === 0) {
        throw new Error('File buffer is empty');
    }

    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(fileBuffer); // Ensure buffer is correctly sent
        });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
