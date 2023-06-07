// catch the token from the url and store it in session storage
const currentUrl = new URL(window.location.href);

// Get the query parameters from the URL
const queryParams = currentUrl.searchParams;

// Get the value of a specific query parameter
const token = queryParams.get("token");

if (token) {
  sessionStorage.setItem("accesstoken", token);
  window.location.assign("./main.html");
}

// slider

const plusSlides = async (n) => {
  if (n < 0) {
    n = slides.length - 1;
  }

  if (n > slides.length - 1) {
    n = 0;
  }
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  console.log(n);
  slides[n].style.display = "block";
};

const minusSlides = async (n) => {
  if (n < 0) {
    n = slides.length - 1;
  }

  if (n > slides.length - 1) {
    n = 0;
  }
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[n].style.display = "block";
};

// next page
const nextpager = async () => {
  const nextpagefun = () => {
    window.location.assign("./allproducts.html");
  };

  const slideshow_container = document.querySelectorAll("#card-container div");
  const category_card_container = document.querySelectorAll(
    "#category-card-container div"
  );
  const category2 = document.querySelectorAll(".category2 img");

  slideshow_container.forEach((Element) => {
    Element.addEventListener("click", nextpagefun);
  });
  category_card_container.forEach((Element) => {
    Element.addEventListener("click", nextpagefun);
  });
  category2.forEach((Element) => {
    Element.addEventListener("click", nextpagefun);
  });
};

// women section toggle
function womenfun() {
  men_section_tab.style.backgroundColor = "#e11b23";
  men_section_tab_a.style.color = "white";
  women_section_tab.style.backgroundColor = "white";
  women_section_tab_a.style.color = "black";
  kids_section_tab.style.backgroundColor = "#e11b23";
  kids_section_tab_a.style.color = "white";

  women_section_toggle.style.display = "block";
  men_section_toggle.style.display = "none";

  nextpager();
}

//  men section toggle
function mensfun() {
  men_section_tab.style.backgroundColor = "white";
  men_section_tab_a.style.color = "black";
  women_section_tab.style.backgroundColor = "#e11b23";
  women_section_tab_a.style.color = "white";
  kids_section_tab_a.style.color = "white";
  kids_section_tab.style.backgroundColor = "#e11b23";

  men_section_toggle.style.display = "block";
  women_section_toggle.style.display = "none";
  nextpager();
}

if (pagetoLoad === "women") {
  womenfun();
} else if (pagetoLoad === "men") {
  mensfun();
} else {
  womenfun();
}

// onload
const onload = () => {
  let res = fetchtovalidateToken();
  if (!sessionStorage.getItem("accesstoken") || !res) {
    logout_option.style.display = "none";
    account_option.style.display = "none";
    login_option.style.display = "block";
    cart_count.style.display = "none";
  } else {
    logout_option.style.display = "block";
    account_option.style.display = "block";
    login_option.style.display = "none";
    cart_count.style.display = "block";
  }
};
onload();
