import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../constants.js';

(async function connectCloudinary () {
    await cloudinary.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET,
    });
})()
export const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath);
        unlink(imagePath, (err) => {
            if (err) throw err;
          }); 
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        unlink(imagePath, (err) => {
            if (err) throw err;
          }); 
    }
};
