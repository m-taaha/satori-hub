import multer from "multer";
import os from "os";

//telling multer to save the file on disc (on our server)
const storage = multer.diskStorage({
    //'destination' is a funciton that tells multer where to put the files
    destination: function (req, file, cb) {
        //we'll create this '/public/temp' folder in our root directory
        cb(null, os.tmpdir()); 
    },

    //'filename' tells the multer what to call the file
    filename: function (req, file, cb) {
        //for now we'll just keep the original file name
        //in a real app, you might add  a uniqye prefix to avoid conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage: storage,
});