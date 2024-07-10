const sharp = require("sharp");

const convertToWebp = async (buffer) => {
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
};

module.exports =convertToWebp;
