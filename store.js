//--------------collection slider-------------------
let $ = document;

let prevBtn = $.querySelectorAll(".lightbox-prev");
let nextBtn = $.querySelectorAll(".lightbox-next");
let closeBtns = $.querySelectorAll(".lightbox-close");
let customScroll = $.querySelector(".scroll");
const loginBtn=$.querySelector("#login-btn")

//----------------scroll bar-------------

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  let documentHeight = document.body.clientHeight;
  let windowHeight = window.innerHeight;

  let scrollPercent = scrollTop / (documentHeight - windowHeight);

  let scrollPercentRounded = Math.round(scrollPercent * 100);

  customScroll.style.width = scrollPercentRounded + "%";
});

//---------------slider for collection section-------------
let object = {
  photo1: [
    "images/a-1.jpg",
    "images/watch.jpg",
    "images/watchshop.jpg",
    "images/watch1.jpg",
    "images/watch2.jpg",
    "images/watch3.jpg",
  ],
  photo2: [
    "images/clothes 1.jpeg",
    "images/clothesW2.jpg",
    "images/clothesW3.jpg",
    "images/clothesW4.jpg",
    "images/clothesW5.jpg",
    "images/clothesW6.jpg",
  ],
  photo3: [
    "images/clothes 3.jpg",
    "images/clothesM.jpg",
    "images/clothesM1.jpg",
    "images/clothesM2.jpg",
    "images/clothesM3.jpg",
    "images/clothesM4.jpg",
    "images/clothesM5.jpg",
  ],
  photo4: [
    "images/shoes 2.png",
    "images/H2918cbed70904ff2b25d92a492151e0aI_grande.webp",
    "images/Melina-women-leather-bag-coral-dust-diamante-buckle-matching-heels-view-JULKE_256x.avif",
    "images/New-Arrival-D-Green-Color-African-Women-Shoes-Italian-Design-Shoes-And-Bag-Set-Decorated-with.webp",
    "images/stylish-woman-summer-outfit-isolated-posing-fashion-trend-isolated_285396-472.avif",
  ],
  photo5: [
    "images/shoes 3.jpg",
    "images/menshoes1.jpg",
    "images/men shoes2.jpg",
    "images/men shoes3.jpg",
    "images/men shoes4.jpg",
    "images/men shoes5.jpg",
    "images/menshoes 7.jpg",
  ],
};

let index = 0;

function prevItem(image) {
  event.preventDefault();

  let imgContainer = image.parentNode;
  let imageElem = imgContainer.firstElementChild;
  let imageId = imageElem.id;

  index--;

  if (imageId === "photo1") {
    if (index < 0) {
      index = object.photo1.length - 1;
    }

    imageElem.setAttribute("src", object.photo1[index]);
  } else if (imageId === "photo2") {
    if (index < 0) {
      index = object.photo2.length - 1;
    }
    imageElem.setAttribute("src", object.photo2[index]);
  } else if (imageId === "photo3") {
    if (index < 0) {
      index = object.photo3.length - 1;
    }

    imageElem.setAttribute("src", object.photo3[index]);
  } else if (imageId === "photo4") {
    if (index < 0) {
      index = object.photo4.length - 1;
    }

    imageElem.setAttribute("src", object.photo4[index]);
  } else if (imageId === "photo5") {
    if (index < 0) {
      index = object.photo5.length - 1;
    }

    imageElem.setAttribute("src", object.photo5[index]);
  }
}

function nextItem(image) {
  event.preventDefault();

  let imgContainer = image.parentNode;
  let imageElem = imgContainer.firstElementChild;
  let imageId = imageElem.id;

  index++;
  if (imageId === "photo1") {
    if (index > object.photo1.length - 1) {
      index = 0;
    }
    imageElem.setAttribute("src", object.photo1[index]);
  } else if (imageId === "photo2") {
    if (index > object.photo2.length - 1) {
      index = 0;
    }
    imageElem.setAttribute("src", object.photo2[index]);
  } else if (imageId === "photo3") {
    if (index > object.photo3.length - 1) {
      index = 0;
    }
    imageElem.setAttribute("src", object.photo3[index]);
  } else if (imageId === "photo4") {
    if (index > object.photo4.length - 1) {
      index = 0;
    }
    imageElem.setAttribute("src", object.photo4[index]);
  } else if (imageId === "photo5") {
    if (index > object.photo5.length - 1) {
      index = 0;
    }
    imageElem.setAttribute("src", object.photo5[index]);
  }
}

prevBtn.forEach(function (image) {
  image.addEventListener("click", function () {
    prevItem(image);
  });
});
nextBtn.forEach(function (image) {
  image.addEventListener("click", function () {
    nextItem(image);
  });
});

loginBtn.addEventListener("click",()=>{
  window.open("login page/loginPage.html")
})



