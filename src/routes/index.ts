import express from 'express';
import images from './api/images';
import path from 'path';
import fs from "fs";

const routes: express.Router = express.Router();

routes.use('/api/images', images);

const imagesFullPath = path.resolve(`D:/06_Learn-IT/OnTap/NodeJS/a-Tu/design-image/udacity-image-processing-api/assets/images/full`);

const imagesThumbPath = path.resolve(`D:/06_Learn-IT/OnTap/NodeJS/a-Tu/design-image/udacity-image-processing-api/assets/images/thumb`);


// An array of image file extensions to consider
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

// Function to get image file paths in the folder
function getImageFullPaths() {
  const files = fs.readdirSync(imagesFullPath);
  const imagePaths = files
    .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => file.split(".")[0]);
  return imagePaths;
}

function getImageThumbPath() {
  const files = fs.readdirSync(imagesThumbPath);
  const imagePaths = files
    .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => file.split(".")[0]);

  const imageThumbList = imagePaths.map((item) => {
    const parts = item.split('-');
    if (parts.length === 2) {
      const imageName = parts[0];
      const dimensions = parts[1];

      // Split the dimensions by "x" to separate width and height
      const [width, height] = dimensions.split('x').map(Number);

      console.log(`Image Name: ${imageName}`);
      console.log(`Width: ${width}`);
      console.log(`Height: ${height}`);
      return { imageName, width, height };
    } return;
  });
  console.log(imageThumbList);

  return imageThumbList;
}
routes.get('/', (request: express.Request, response: express.Response): void => {
  const imagePathsOfFull = getImageFullPaths();
  console.log(imagePathsOfFull, "1");

  const imagePathOfThumb = getImageThumbPath();
  console.log(imagePathOfThumb, "2");


  response.write("<html>");
  response.write('<body>');
  response.write('<h1>Welcome to image-processing-api</h1>');
  response.write('<label for="filename">Choose a image:</label>');
  response.write('<form action="/api/images" method="get">');
  response.write('<select name="filename" id="filename">');
  for (let index = 0; index < imagePathsOfFull.length; index++) {
    response.write(`<option value="${imagePathsOfFull[index]}">${imagePathsOfFull[index]}</option>`);
  };
  response.write('</select>');
  response.write('<button type="submit">select</button>');
  response.write('</form><br>');

  response.write('<h3>Choose file with width and height</h3>');
  response.write('<form action="/api/images" method="get">');
  response.write('');
  response.write('<select name="filename" id="filename">');
  for (let index = 0; index < imagePathsOfFull.length; index++) {
    response.write(`<option value="${imagePathsOfFull[index]}">${imagePathsOfFull[index]}</option>`);
  };
  response.write('</select>');
  response.write(' <input type="text" value="" id="width" name="width" />');
  response.write('<input type="text" value="" id="height" name="height" />');
  response.write('<button type="submit">send</button>');
  response.write('</form><br>');
  response.write('<select name="filename" id="filename" onchange="window.location.href = this.value;">');
  for (let index = 0; index < imagePathOfThumb.length; index++) {
    const item = imagePathOfThumb[index];
    const linkUrl = `/api/images?filename=${encodeURIComponent(item?.imageName || "")}&width=${encodeURIComponent(item?.width || "")}&height=${encodeURIComponent(item?.height || "")}`;
    response.write(`<option value="${linkUrl}">${item?.imageName}-${item?.width}x${item?.height}</option>`);
  }
  response.write('</select>');

  response.write('');
  response.write('</body>');
  response.write('</html>');
  response.end();

}
);

export default routes;
