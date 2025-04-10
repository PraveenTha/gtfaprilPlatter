document.addEventListener("DOMContentLoaded", function () {
  // Sticky header and logo change
  const header = document.querySelector("header");
  const logoChange = document.querySelector(".logo img");

  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
    logoChange.src =
      window.scrollY > 50 ? "img/logo_black.png" : "img/logo.png";
  });

  // Banner section
  const mainBanner = document.querySelectorAll(".slide-item");
  const bannerList = document.querySelectorAll(".prv-list img");
  const banList = document.querySelectorAll(".prv-list");
  let currentIndex = 0;

  function changeBanner(index) {
    mainBanner.forEach((item) => item.classList.remove("show_banner"));
    bannerList.forEach((item) => item.classList.remove("show_active"));
    banList.forEach((item) => item.classList.remove("show_active"));

    mainBanner[index].classList.add("show_banner");
    bannerList[index].classList.add("show_active");
    banList[index].classList.add("show_active");
  }

  bannerList.forEach((banner, index) => {
    banner.addEventListener("click", () => {
      changeBanner(index);
      currentIndex = index;
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % mainBanner.length;
    changeBanner(currentIndex);
  }, 5000);

  // Amenities section lightbox
  const slideBox = document.querySelector(".slide_box");
  const slides = document.querySelectorAll(".slides");
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slideBox.appendChild(clone);
  });

  const images = document.querySelectorAll(".slides img");
  const imgDescriptions = document.querySelectorAll(".aminities_contant p");
  let currentImgIndex = 0;

  const lightBox = document.createElement("div");
  lightBox.classList.add("lightBox");

  const lightBoxImg = document.createElement("img");
  const lightBoxDesc = document.createElement("p");
  const closeBtn = document.createElement("span");
  const prevBtn = document.createElement("span");
  const nextBtn = document.createElement("span");

  closeBtn.textContent = "X";
  prevBtn.textContent = "<";
  nextBtn.textContent = ">";

  closeBtn.className = "close_lightbox";
  prevBtn.className = "prev_btn";
  nextBtn.className = "next_btn";

  [closeBtn, prevBtn, nextBtn].forEach((btn) => (btn.style.cursor = "pointer"));

  closeBtn.addEventListener("click", () => lightBox.remove());
  prevBtn.addEventListener("click", () => {
    if (currentImgIndex > 0) images[currentImgIndex - 1].click();
  });
  nextBtn.addEventListener("click", () => {
    if (currentImgIndex < images.length - 1)
      images[currentImgIndex + 1].click();
  });

  images.forEach((image, index) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", () => {
      currentImgIndex = index;
      lightBoxImg.src = image.src;
      lightBoxDesc.textContent =
        imgDescriptions[index]?.textContent || "No description available";

      lightBox.innerHTML = "";
      lightBox.append(lightBoxImg, lightBoxDesc, prevBtn, nextBtn, closeBtn);
      document.body.appendChild(lightBox);
    });
  });

  // Gallery section lightbox
  const galleryImages = document.querySelectorAll(".parent div");
  const galleryImageList = Array.from(galleryImages).map((div) =>
    div.querySelector("img")
  );
  let currentGalleryIndex = 0;

  galleryImages.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentGalleryIndex = index;

      // Remove any existing gallery lightbox before adding a new one
      const existingBox = document.querySelector(".lightBox");
      if (existingBox) existingBox.remove();

      const imgSrc = galleryImageList[index].src;
      const galleryLightBox = document.createElement("div");
      galleryLightBox.classList.add("lightBox");

      const galleryImg = document.createElement("img");
      galleryImg.src = imgSrc;

      const galleryClose = document.createElement("span");
      galleryClose.textContent = "X";
      galleryClose.className = "close_lightbox";
      galleryClose.style.cursor = "pointer";
      galleryClose.addEventListener("click", () => {
        galleryLightBox.remove();
      });

      const galleryPrev = document.createElement("span");
      galleryPrev.textContent = "<";
      galleryPrev.className = "prev_btn";
      galleryPrev.style.cursor = "pointer";
      galleryPrev.addEventListener("click", () => {
        if (currentGalleryIndex > 0) {
          galleryImages[currentGalleryIndex - 1].click();
        }
      });

      const galleryNext = document.createElement("span");
      galleryNext.textContent = ">";
      galleryNext.className = "next_btn";
      galleryNext.style.cursor = "pointer";
      galleryNext.addEventListener("click", () => {
        if (currentGalleryIndex < galleryImageList.length - 1) {
          galleryImages[currentGalleryIndex + 1].click();
        }
      });

      galleryLightBox.append(
        galleryPrev,
        galleryNext,
        galleryImg,
        galleryClose
      );
      document.body.appendChild(galleryLightBox);
    });
  });

  $(".read-mor-les").click(function () {
    $(".read-out").slideToggle(300);

    // Change text based on visibility
    if ($(".read-out").is(":visible")) {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });

  //popup section
  const openPopup = document.querySelectorAll(".open_popup");
  const popUpForm = document.querySelector("#popUpGetTuch");
  const closPopup = document.querySelector("#clsPop");
  openPopup.forEach((popUp) => {
    popUp.addEventListener("click", () => {
      popUpForm.style.display = "block";
    });
    closPopup.addEventListener("click", () => {
      popUpForm.style.display = "none";
    });
  });
  //TOGGLE-MENU
  const toggleBtn = document.querySelector("#desktop_ham");
  const mobileMenu = document.querySelector(".menu_bar ul.menu");
  const menuItem = document.querySelectorAll(".menu_bar ul li");
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("close_menu");
    mobileMenu.classList.toggle("show_menu");
  });
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      toggleBtn.classList.remove("close_menu");
      mobileMenu.classList.remove("show_menu");
    });
  });
});
