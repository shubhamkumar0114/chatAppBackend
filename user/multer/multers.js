import multer from "multer"

export function uploadImageFile(){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/public/uploads')
        },
        filename: function (req, file, cb) {
          const 
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
      
      const upload = multer({ storage: storage })
}