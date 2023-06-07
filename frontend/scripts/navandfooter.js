const baseURL = "http://localhost:4000";

const women_section_tab = document.getElementById("women-section-tab");
const women_section_tab_a = document.getElementById("women-section-tab-a-tag");
const men_section_tab = document.getElementById("men-section-tab");
const men_section_tab_a = document.getElementById("men-section-tab-a-tag");
const kids_section_tab = document.getElementById("kids-section-tab");
const kids_section_tab_a = document.getElementById("kids-section-tab-a-tag");

const women_section_toggle = document.getElementById("women-section");
const men_section_toggle = document.getElementById("men-section");
const pagetoLoad = localStorage.getItem("pagetoLoad");
let slides = document.querySelectorAll(".mySlides");
//footer
const nav_link_plus = document.getElementById("nav-link-plus");
const who_link_plus = document.getElementById("who-link-plus");
const hidden_divs_footerOne = document.getElementById("hidden-divs-footerOne");
const hidden_divs_footerTow = document.getElementById("hidden-divs-footerTwo");

// // nav bar user icon
const user_icon = document.getElementById("user-icon-btn");
const user_drop_wrap = document.querySelector(".user-drop-wrap");
const closeDiv = document.getElementById("closeDiv");
const login_option = document.getElementById("login_option");
const logout_option = document.getElementById("logout_option");
const account_option = document.getElementById("account_option");

// // modal
const modal_msg = document.getElementById("modal-msg");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

// //cart icon
const cart_count = document.getElementById("cart-count");

// // cart icon
const cart_icon = document.getElementById("cart-icon");

// hamburger menu
const hamburger = document.getElementsByClassName("hamburger");

if (hamburger && hamburger[0]) {
  hamburger[0].addEventListener("click", () => {
    const nav2 = document.querySelector(".navbar-2");
    if (nav2.style.display == "block") {
      nav2.style.display = "none";
    } else {
      nav2.style.display = "block";
    }
  });
}

// function to desplay the modal
const modalfun = (msg) => {
  modal_msg.innerText = msg;
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// logout
const logoutfun = () => {
  sessionStorage.clear();
  modalfun("Logged out successfully");
  setTimeout(() => {
    window.location.assign("./index.html");
  }, 1500);
};

user_icon.addEventListener("click", () => {
  user_drop_wrap.style.display = "block";
});

closeDiv.addEventListener("click", () => {
  user_drop_wrap.style.display = "none";
});

cart_icon.addEventListener("click", () => {
  window.location.assign("./cart.html");
});

// // validate the token
let fetchtovalidateToken = async () => {
  if (!sessionStorage.getItem("accesstoken")) {
    return false;
  }
  let res = false;
  const promise = await fetch(`${baseURL}/validatetoken`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `${sessionStorage.getItem("accesstoken")}`,
    },
  });
  res = await promise.json();
  if (!res.msg && !res) {
    return false;
  }
  return true;
};

// to update cart count
const updateCartcount = async () => {
  if (fetchtovalidateToken() === false) {
    cart_count.innerText = 0;
    return;
  }

  if (
    sessionStorage.getItem("accesstoken") &&
    sessionStorage.getItem("cartCount")
  ) {
    cart_count.innerText = sessionStorage.getItem("cartCount");
  } else {
    try {
      const promise = await fetch(`${baseURL}/user/getcart`, {
        headers: {
          "Contet-type": "application/json",
          authorization: `${sessionStorage.getItem("accesstoken")}`,
        },
      });
      const res = await promise.json();
      const data = res.data;
      sessionStorage.setItem("cartCount", data.length);
      cart_count.innerText = sessionStorage.getItem("cartCount");
      updateCartcount();
    } catch (error) {
      cart_count.innerText = 0;
    }
  }
};
updateCartcount();

//men, women and kids toggle
women_section_tab.addEventListener("click", () => {
  localStorage.setItem("pagetoLoad", "women");
  window.location.assign("./main.html");
});

men_section_tab.addEventListener("click", () => {
  localStorage.setItem("pagetoLoad", "men");
  window.location.assign("./main.html");
});

kids_section_tab.addEventListener("click", () => {
  window.location.assign("#");
});

// footer area opening divs
const openNaviLinkfun = () => {
  if (hidden_divs_footerOne.style.display === "block") {
    hidden_divs_footerOne.style.display = "none";
    nav_link_plus.innerText = "+";
  } else {
    hidden_divs_footerOne.style.display = "block";
    nav_link_plus.innerText = "-";
  }
};

const openWhoLinkfun = () => {
  if (hidden_divs_footerTow.style.display === "block") {
    hidden_divs_footerTow.style.display = "none";
    who_link_plus.innerText = "+";
  } else {
    hidden_divs_footerTow.style.display = "block";
    hidden_divs_footerTow.focus();
    who_link_plus.innerText = "-";
  }
};
