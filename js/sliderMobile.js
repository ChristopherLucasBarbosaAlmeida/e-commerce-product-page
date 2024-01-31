const slider = document.getElementById("carrouseu");
const previous = document.querySelector(".previous--mobile");
const next = document.querySelector(".next--mobile");
let sliderPosition = 0;
const width = slider.offsetWidth;

previous.addEventListener("click", () => {
  if (!sliderPosition) {
    return;
  }
  sliderPosition += width;
  slider.style.transform = `translateX(${sliderPosition}px)`;
});

next.addEventListener("click", () => {
  if (sliderPosition === -1275) {
    return;
  }
  sliderPosition -= width;
  slider.style.transform = `translateX(${sliderPosition}px)`;
});
