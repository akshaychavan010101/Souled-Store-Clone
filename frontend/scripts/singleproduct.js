// indicators and loaders
let indicator = document.getElementById("indicator");
const no_result = document.getElementById("no_result");
const preloader = document.getElementById("preloader");

// product qty
const product_quantity = document.getElementById("product-quantity-select");

window.onload = () => {
  modal.style.display = "none";
  if (!sessionStorage.getItem("productid")) {
    window.location.assign("./allproducts.html");
  }
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

if (pagetoLoad === "women") {
  men_section_tab.style.backgroundColor = "#e11b23";
  men_section_tab_a.style.color = "white";
  women_section_tab.style.backgroundColor = "white";
  women_section_tab_a.style.color = "black";
  kids_section_tab.style.backgroundColor = "#e11b23";
  kids_section_tab_a.style.color = "white";
} else {
  men_section_tab.style.backgroundColor = "white";
  men_section_tab_a.style.color = "black";
  women_section_tab.style.backgroundColor = "#e11b23";
  women_section_tab_a.style.color = "white";
  kids_section_tab_a.style.color = "white";
  kids_section_tab.style.backgroundColor = "#e11b23";
}

// main body
let productsIncart = JSON.parse(localStorage.getItem("productsIncart")) || [];
const left_section = document.getElementById("left-section");
const product_title = document.querySelector("#product-title h2");
const product_title_desc = document.querySelector("#product-title p");
const product_price = document.querySelector("#product-price h4");
let product = [];

if (sessionStorage.getItem("accesstoken")) {
  cart_count.innerText = sessionStorage.getItem("cartCount") || 0;
} else {
  cart_count.innerText = 0;
}

let productBody = {};
let Productprice = 1;

const appendfun = (data) => {
  if (data.length == 0) {
    no_result.style.display = "block";
    return;
  }
  productBody = data;
  Productprice = +product.price;
  product = data;
  let img1 = data.image[0];
  let img2 = data.image[1];
  let unavail = "./img/nodata.jpg";
  product_title.innerHTML = data.title;
  product_title.style.marginBottom = "1rem";
  product_title_desc.innerHTML = data.category + " " + data.theme;
  product_price.innerHTML = "$ " + data.price;

  left_section.innerHTML = null;
  const div = `
        <div>
          <img src="${img1}" alt="error" />
        </div>
        <div>
          <img src="${img2 ? img2 : unavail}" alt="error" />
        </div>

   `;
  left_section.innerHTML = div;
};

const fetchOnlyfun = async () => {
  preloader.style.display = "block";
  try {
    const id = sessionStorage.getItem("productid");
    const promise = await fetch(`${baseURL}/products/singleproduct/${id}`);
    const res = await promise.json();
    appendfun(res.data);
    preloader.style.display = "none";
  } catch (error) {
    preloader.style.display = "none";
  } finally {
    preloader.style.display = "none";
  }
};
fetchOnlyfun();

const click_divs = document.getElementsByClassName("click-divs");
const open_click_div = document.getElementsByClassName("open-click-div");

for (let i = 0; i < click_divs.length; i++) {
  click_divs[i].addEventListener("click", () => {
    if (open_click_div[i].style.display === "block") {
      open_click_div[i].style.display = "none";
    } else {
      open_click_div[i].style.display = "block";
    }
  });
}

// selecting the size
let check = false;
let productSize = "size";
const selectsizefun = (size) => {
  let product_id = sessionStorage.getItem("productid") + size;
  delete productBody._id;
  productBody["product_id"] = product_id;

  const size_chart_buttons = document.querySelectorAll(
    "#size-chart-buttons button"
  );
  check = true;
  productSize = size;
  const btn = document.getElementById(`${size}`);
  for (let i = 0; i < size_chart_buttons.length; i++) {
    size_chart_buttons[i].style.backgroundColor = "white";
  }
  btn.style.backgroundColor = "rgb(209, 207, 207)";
};

// quantity

let qtyclick = 0;
product_quantity.addEventListener("change", () => {
  qtyclick = 1;
  Productprice = +product.price * +product_quantity.value;
});

// to count the cart total
const fetchuserCart = async () => {
  if ((await fetchtovalidateToken()) == false) {
    return;
  }
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
    updateCartcount();
  } catch (error) {
    console.log(error);
  }
};
fetchuserCart();

// to add to cart

const addtoCartfun = async () => {
  let isvalid = await fetchtovalidateToken();
  if (!isvalid) {
    window.location.assign("./index.html");
    return;
  }
  if (check == true) {
    if (qtyclick == 0) {
      Productprice = +product.price;
    }
    const product_quantity = document.getElementById("product-quantity-select");

    productBody["Qty"] = product_quantity.value;
    productBody["afterQtyprice"] = Productprice;
    productBody.size = productSize;

    try {
      const promise = await fetch(`${baseURL}/user/addtocart`, {
        headers: {
          "Content-type": "application/json",
          authorization: `${sessionStorage.getItem("accesstoken")}`,
        },
        method: "POST",
        body: JSON.stringify(productBody),
      });

      const res = await promise.json();
      fetchuserCart();
      modalfun(res.msg);
    } catch (error) {
      console.log(error);
    }
    updateCartcount();
  } else if (check === false) {
    modalfun("Please Select size");
  }
};
