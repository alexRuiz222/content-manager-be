const fs = require("fs-extra");
moveFile = (destinationFolder, origin, destination) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirpSync(destinationFolder);
    }
    fs.copy(origin, destination, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("File moved");
        resolve();
      }
    });
  });
};

module.exports = {
  moveFile,
};
