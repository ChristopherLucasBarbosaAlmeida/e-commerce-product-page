const img = document.getElementById("slider");
const imgModal = document.getElementById("modal-slider");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".close__icon");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
let currentImage = 0;

img.addEventListener("click", toggleModal);
closeIcon.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("modal--show");
}

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

const thumbnails = [
  {
    id: window.crypto.randomUUID(),
    url: "images/image-product-1-thumbnail.jpg",
  },
  {
    id: window.crypto.randomUUID(),
    url: "images/image-product-2-thumbnail.jpg",
  },
  {
    id: window.crypto.randomUUID(),
    url: "images/image-product-3-thumbnail.jpg",
  },
  {
    id: window.crypto.randomUUID(),
    url: "images/image-product-4-thumbnail.jpg",
  },
];

const container = document.getElementById("container-thumbnails");

const items = thumbnails.map((thumbnail) => {
  const div = document.createElement("div");
  const imgThumbnail = `<img src="${thumbnail.url}" id="${thumbnail.id}"/>`;
  div.innerHTML = imgThumbnail;
  div.addEventListener("click", (e) => {
    const index = thumbnails.findIndex(
      (thumbnail) => thumbnail.id === e.target.id
    );
    img.src = images[index];
  });
  return div;
});

container.append(...items);

next.addEventListener("click", () => {
  currentImage++;
  if (currentImage === images.length) {
    currentImage = 0;
  }
  imgModal.src = images[currentImage];
});

previous.addEventListener("click", () => {
  if (!currentImage) {
    currentImage = images.length;
  }
  currentImage--;
  imgModal.src = images[currentImage];
});
