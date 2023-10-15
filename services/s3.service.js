import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { readFile, unlink } from "node:fs/promises";
import "dotenv/config";

const s3 = new S3Client({
  region: "us-east-1",
  accessLevel: "allow-all",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadImage = async ({ file }) => {
  console.log(file);

  //leer archivo temporal
  const imageBuffer = await readFile(file.path);

  const params = {
    Bucket: process.env.BUCKET,
    Key: file.originalname,
    Body: imageBuffer,
  };
  const commandSave = new PutObjectCommand(params);

  try {
    await s3.send(commandSave);
    //elimiar archivo temporal creado por multer
    await unlink(file.path);

    const photo_url = `https://${process.env.BUCKET}.s3.amazonaws.com/${file.originalname}`;
    return photo_url;
  } catch (err) {
    console.error(err);
  }
};

const deleteImage = async (key) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: key,
  };
  const commandDelete = new DeleteObjectCommand(params);
  try {
    const response = await s3.send(commandDelete);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export default {uploadImage, deleteImage};
