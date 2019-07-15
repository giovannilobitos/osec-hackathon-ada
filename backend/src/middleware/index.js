const fs = require('fs')
const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  app.get('/images/:imageId', function serveImages(req, res, next) {
    const { params: { imageId } } = req;
    console.log('--------------');
    const imagePath = path.join(process.cwd(), `../docs/img/${imageId}`)
    console.log(imagePath);
    if (fs.statSync(imagePath)) {
      fileStream = fs.createReadStream(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      return fileStream.pipe(res);
    }
  })
};
