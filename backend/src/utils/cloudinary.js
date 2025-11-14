//this file will do to things - 
//1. connect my cloudinary account uisng API keys
//2. create a helper function (uploadOnCloudinary) that will take a local file path (/public/temp/image.png0 and uploads it

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {

   try{
     //upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto", //automatically detect if it's an image, video or raw file
    });

    //file has been uploaded successfully 
    //console.log("File uploaded to Cloudinary: ", response.url);

    //We've uploaded the file, so we can remove the loacal temporary version 
    fs.unlinkSync(localFilePath);

    return response; //return the full cloudinary response

   }catch(error){
    //if the file fails to upload still remove the temporary file
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary Upload Error:", error);
    return null;
   }
}

export {uploadOnCloudinary};