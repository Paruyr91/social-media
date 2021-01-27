const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer=require('multer')
 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog',
      format: async (req, file) =>{ 'jpeg','png','jpg'}, // supports promises as well
      public_id: (req, file) => new Date().toISOString(),
    },
  });
   
  const parsercloudinary = multer({ storage: storage });

module.exports=parsercloudinary 