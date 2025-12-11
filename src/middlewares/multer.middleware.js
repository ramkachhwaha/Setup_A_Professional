import multer from 'multer'

//  Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp") // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // Generate a unique suffix for the filename
        // cb(null, file.fieldname + '-' + uniqueSuffix) // Set the filename for the uploaded file
        
        cb(null, file.originalname) // Use the original filename
    }
})

// Export the multer upload middleware
export const upload = multer({
    storage,
});
