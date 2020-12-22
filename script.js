const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Creating photos array as global variable using let so the data can change
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 15;
const apiKey = "aSIXkn34rf7IVGgXHFqJXepWUdEr3sgR312Ct5JpG8g";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready =", ready);
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error
  }
}

// Create elements for links & photos then add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("Total images: ", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> tag to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    // Using helper function to create elements
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> to display photo
    const img = document.createElement("img");
    // Same process as above
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, the put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    console.log(ready);
    ready = false;
    console.log("Load more images");
  }
});

// On Load
getPhotos();
