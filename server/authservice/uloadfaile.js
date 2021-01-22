const cloudinary = require('cloudinary').v2
const fs = require('fs')

module.exports=function upload(req,res){

    console.log(req.file,'llllllllllllll')

            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
                return  cloudinary.uploader.upload(
                    path,
                    { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
                    function(err, image) {
                    if (err) return err
                    console.log('file uploaded to Cloudinary')
                    fs.unlinkSync(path)
                    return image
                    }
                )
}