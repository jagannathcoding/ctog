import React, { useState } from 'react';
const ImageUploader = () => {
 const [selectedImage, setSelectedImage] = useState(null);
 const [grayscaleImage, setGrayscaleImage] = useState(null);
 const handleImageChange = (e) => {
 const file = e.target.files[0];
 if (file) {
 setSelectedImage(URL.createObjectURL(file));
 setGrayscaleImage(null);
 }
 };

 const convertToGrayscale = () => {
 const canvas = document.createElement('canvas');
 const context = canvas.getContext('2d');
 const img = new Image();
 img.src = selectedImage;
 img.onload = () => {
 canvas.width = img.width;
 canvas.height = img.height;
 context.drawImage(img, 0, 0, img.width, img.height);
 const imageData = context.getImageData(0, 0, img.width, img.height);
 const data = imageData.data;
 
 for (let i = 0; i < data.length; i += 4) {
 const grayscale = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
 data[i] = grayscale;
 data[i + 1] = grayscale;
 data[i + 2] = grayscale;
 }
 context.putImageData(imageData, 0, 0);
 setGrayscaleImage(canvas.toDataURL('image/png'));
 };
 };


 return (
 <div>
 <input type="file" onChange={handleImageChange} />
 {selectedImage && (
 <div>
 <img src={selectedImage} alt="Selected" width="300" height="200" />
 <button onClick={convertToGrayscale}>Convert to Grayscale</button>
 </div>
 )}
 {grayscaleImage && (
 <div>
 <h3>Grayscale Image</h3>
 <img src={grayscaleImage} alt="Grayscale" width="300" height="200" />
 </div>
 )}
 </div>
 );
};
export default ImageUploader;

/*

EXPLANATION
1. State Management:
• The component uses the useState hook to manage two pieces of state: 
selectedImage (to store the selected image file) and grayscaleImage (to store 
the grayscale version of the image).

2. Image Selection:
• The handleImageChange function is triggered when an image is selected 
using the file input. It sets the selectedImage state to the URL of the selected 
image using URL.createObjectURL.


3. Grayscale Conversion:
• The convertToGrayscale function is called when the "Convert to Grayscale" 
button is clicked.
• It creates a canvas element, draws the original image on the canvas, and 
accesses the image data using the getImageData method.
• It then loops through each pixel in the image, calculates the grayscale value, 
and updates the pixel values accordingly.
• The modified image data is put back on the canvas, and the grayscaleImage
state is set to the data URL of the canvas.


4. Rendering:
• The component renders an input for image selection, the selected image (if 
any), and the grayscale image (if generated).
5. Display:
• The selected image is displayed with a button to convert it

*/