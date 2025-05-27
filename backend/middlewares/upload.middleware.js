import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../utils/util.cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profile_pictures_students',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 300, height: 300, crop: 'limit' }],
    },
  });
  
  const upload = multer({ storage });
  
  export default upload;
