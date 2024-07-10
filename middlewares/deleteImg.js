const cloudinary = require("cloudinary");
function removeImage(arguments) {
  const public_ids = [...arguments];
  public_ids.map((id) => {
    cloudinary.api.delete_resources(id, { folder: "websites" });
  });
}

module.exports = removeImage;
