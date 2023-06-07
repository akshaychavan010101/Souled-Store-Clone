// loading and no results
let indicator = document.getElementById("indicator");
const no_result = document.getElementById("no_result");
const preloader = document.getElementById("preloader");



// for the filters and the sorts
const click_divs = document.getElementsByClassName("click-divs");
const open_click_div = document.getElementsByClassName("open-click-div");
const inputs = document.querySelectorAll(".open-click-options > input");
const up_down_arrow = document.querySelectorAll(
  ".click-divs > span:nth-child(2)"
);

const sortAtoZ = document.getElementById("sortAtoZ");
const sortZtoA = document.getElementById("sortZtoA");
const sortMaxDiscount = document.getElementById("sortMaxDiscount");

// appending functions
const product_display = document.getElementById("product-display");
const poster_top_img = document.getElementById("poster-top-img");



if (pagetoLoad === "women") {
  men_section_tab.style.backgroundColor = "#e11b23";
  men_section_tab_a.style.color = "white";
  women_section_tab.style.backgroundColor = "white";
  women_section_tab_a.style.color = "black";
  kids_section_tab.style.backgroundColor = "#e11b23";
  kids_section_tab_a.style.color = "white";
} else if (pagetoLoad == "men") {
  men_section_tab.style.backgroundColor = "white";
  men_section_tab_a.style.color = "black";
  women_section_tab.style.backgroundColor = "#e11b23";
  women_section_tab_a.style.color = "white";
  kids_section_tab_a.style.color = "white";
  kids_section_tab.style.backgroundColor = "#e11b23";
}

indicator.innerHTML = `●  Home > Products > ${pagetoLoad}`;


// for the main body  of the page
let tousearr = [];
let sectionData = [];

if (localStorage.getItem("pagetoLoad") === "women") {
  poster_top_img.setAttribute("src", "img/Web-Banner_1_h0DvwUm.webp");
} else {
  poster_top_img.setAttribute("src", "./img/men sliders.webp");
}

const checkproductfun = (id) => {
  sessionStorage.setItem("productid", id);
  window.location.assign("./singleproduct.html");
};

// display the products
const appendfun = async (data) => {
  try {
    product_display.innerHTML = null;
    no_result.style.display = "none";

    if (data.length === 0) {
      no_result.style.display = "block";
      return;
    }
    no_result.style.display = "none";
    for (let i = 0; i < data.length; i++) {
      const div =
        `
                   <div class="card" onclick="checkproductfun('` +
        data[i]._id +
        `')">
                      <img src="${data[i].image[0]}" alt="">
                      <h5>${data[i].title}</h5>
                      <hr>
                      <small>${data[i].gender}</small> <small>${data[i].category}</small>
                      <br>
                      <small>${data[i].size}</small> <small>${data[i].theme}</small>
                        <br>
                      <h5 style="display:inline">$${data[i].price}</h5> &nbsp; &nbsp; 
                      <h5 style="display:inline; color:red">${data[i].discount}% OFF</h5>
                      <br>                      
                   </div>

      `;
      product_display.innerHTML += div;
    }
  } catch (error) {
    no_result.style.display = "block";
  }
};

// to fetch the data
const fetchfun = async () => {
  preloader.style.display = "block";
  try {
    const promise = await fetch(`${baseURL}/products`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    });

    const res = await promise.json();
    no_result.style.display = "none";
    preloader.style.display = "none";
    const data = res.data;
    const filteredData = await data.filter(
      (item) => item.gender.toLowerCase() == localStorage.getItem("pagetoLoad")
    );
    appendfun(filteredData);
    tousearr = data;
    sectionData = filteredData;
  } catch (error) {
    preloader.style.display = "none";
    no_result.style.display = "block";
  }
};
fetchfun();

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

for (let i = 0; i < click_divs.length; i++) {
  click_divs[i].addEventListener("click", (e) => {
    if (open_click_div[i].style.display === "block") {
      open_click_div[i].style.display = "none";
      up_down_arrow[i].innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    } else {
      open_click_div[i].style.display = "block";
      up_down_arrow[i].innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
    }
  });
}

// for the filter section
const applyfun = () => {
  let gender = [];
  let category = [];
  let theme = [];
  let size = [];

  for (let i = 0; i < inputs.length; i++) {
    if (
      inputs[i].attributes.type.nodeValue === "checkbox" &&
      inputs[i].checked
    ) {
      if (i >= 0 && i <= 2) {
        gender.push(inputs[i].value);
      }
      if (i >= 3 && i <= 8) {
        category.push(inputs[i].value);
      }
      if (i >= 9 && i <= 12) {
        theme.push(inputs[i].value);
      }
      if (i >= 13 && i <= 17) {
        size.push(inputs[i].value);
      }
    }
  }

  if (
    gender.length > 0 &&
    category.length == 0 &&
    theme.length == 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);
    appendfun(x);
  } else if (
    gender.length == 0 &&
    category.length > 0 &&
    theme.length == 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < category.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    x = x.flat(Infinity);
    appendfun(x);
  } else if (
    gender.length == 0 &&
    category.length == 0 &&
    theme.length > 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < theme.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    x = x.flat(Infinity);
    appendfun(x);
  } else if (
    gender.length == 0 &&
    category.length == 0 &&
    theme.length == 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < size.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    x = x.flat(Infinity);
    appendfun(x);
  } else if (
    gender.length > 0 &&
    category.length > 0 &&
    theme.length == 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < category.length; i++) {
      y.push(
        x.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length > 0 &&
    category.length == 0 &&
    theme.length > 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < theme.length; i++) {
      y.push(
        x.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length > 0 &&
    category.length == 0 &&
    theme.length == 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < size.length; i++) {
      y.push(
        x.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length == 0 &&
    category.length > 0 &&
    theme.length > 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < category.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < theme.length; i++) {
      y.push(
        x.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length == 0 &&
    category.length > 0 &&
    theme.length == 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < category.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < size.length; i++) {
      y.push(
        x.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length == 0 &&
    category.length == 0 &&
    theme.length > 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < theme.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < size.length; i++) {
      y.push(
        x.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    y = y.flat(Infinity);
    appendfun(y);
  } else if (
    gender.length > 0 &&
    category.length > 0 &&
    theme.length > 0 &&
    size.length == 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < category.length; i++) {
      y.push(
        x.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    y = y.flat(Infinity);

    let z = [];
    for (let i = 0; i < theme.length; i++) {
      z.push(
        y.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    z = z.flat(Infinity);
    appendfun(z);
  } else if (
    gender.length > 0 &&
    category.length > 0 &&
    theme.length == 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < category.length; i++) {
      y.push(
        x.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    y = y.flat(Infinity);

    let z = [];
    for (let i = 0; i < size.length; i++) {
      z.push(
        y.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    z = z.flat(Infinity);
    appendfun(z);
  } else if (
    gender.length > 0 &&
    category.length == 0 &&
    theme.length > 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < gender.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < theme.length; i++) {
      y.push(
        x.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    y = y.flat(Infinity);

    let z = [];
    for (let i = 0; i < size.length; i++) {
      z.push(
        y.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    z = z.flat(Infinity);
    appendfun(z);
  } else if (
    gender.length == 0 &&
    category.length > 0 &&
    theme.length > 0 &&
    size.length > 0
  ) {
    let x = [];
    for (let i = 0; i < category.length; i++) {
      x.push(
        tousearr.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < theme.length; i++) {
      y.push(
        x.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    y = y.flat(Infinity);

    let z = [];
    for (let i = 0; i < size.length; i++) {
      z.push(
        y.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    z = z.flat(Infinity);
    appendfun(z);
  } else if (
    gender.length > 0 &&
    category.length > 0 &&
    theme.length > 0 &&
    size.length > 0
  ) {
    let w = [];
    for (let i = 0; i < gender.length; i++) {
      w.push(
        tousearr.filter((item) => {
          return item.gender == gender[i];
        })
      );
    }

    w = w.flat(Infinity);

    let x = [];

    for (let i = 0; i < category.length; i++) {
      x.push(
        w.filter((item) => {
          return item.category == category[i];
        })
      );
    }

    x = x.flat(Infinity);

    let y = [];
    for (let i = 0; i < theme.length; i++) {
      y.push(
        x.filter((item) => {
          return item.theme == theme[i];
        })
      );
    }

    y = y.flat(Infinity);

    let z = [];
    for (let i = 0; i < size.length; i++) {
      z.push(
        y.filter((item) => {
          return item.size == size[i];
        })
      );
    }

    z = z.flat(Infinity);
    appendfun(z);
  } else {
    appendfun(sectionData);
  }
};

const clearfun = () => {
  for (let i = 0; i < inputs.length; i++) {
    if (
      inputs[i].attributes.type.nodeValue === "checkbox" &&
      inputs[i].checked
    ) {
      inputs[i].checked = false;
    }
  }
  appendfun(sectionData);
};

// sort
const sortfun = (event) => {
  try {
    sortAtoZ.checked = false;
    sortZtoA.checked = false;
    sortMaxDiscount.checked = false;

    event.target.checked = true;
    if (event.target.value == "AtoZ") {
      sectionData = sectionData.sort((a, b) => a.price - b.price);
    } else if (event.target.value == "ZtoA") {
      sectionData = sectionData.sort((a, b) => b.price - a.price);
    } else {
      sectionData = sectionData.sort((a, b) => b.discount - a.discount);
    }
    appendfun(sectionData);
  } catch (error) {
    alert("something went wrong");
  }
};


