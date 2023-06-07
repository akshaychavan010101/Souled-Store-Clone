// login and register
const login_toggle_btn = document.getElementById("login-toggle-btn");
const register_toggle_btn = document.getElementById("register-toggle-btn");
const login_container = document.getElementById("login-container");
const login_content_inner_div = document.getElementById(
  "login-content-inner-div"
);
const login_box = document.getElementById("login-box");
const register_box = document.getElementById("register-box");
let proceed_btn = document.getElementById("Proceed-btn");
let register_btn = document.getElementById("form-register-btn");

const login_by_google = document.getElementById("login-by-google");



// onload;
async function onload() {
  let res = await fetchtovalidateToken();
  if (!res) {
    logout_option.style.display = "none";
    account_option.style.display = "none";
    login_option.style.display = "block";
  } else {
    logout_option.style.display = "block";
    account_option.style.display = "block";
    login_option.style.display = "none";
    window.location.assign("./main.html");
  }
}
onload();

// login and register toggle ------------------------
const logintoggle = () => {
  login_box.style.display = "block";
  register_box.style.display = "none";
  login_toggle_btn.style.backgroundColor = "#117a7a";
  login_toggle_btn.style.color = "white";
  register_toggle_btn.style.backgroundColor = "rgb(255, 255, 255)";
  register_toggle_btn.style.color = "black";
};
const registertoggle = () => {
  login_box.style.display = "none";
  register_box.style.display = "block";

  register_toggle_btn.style.backgroundColor = "#117a7a";
  register_toggle_btn.style.color = "white";
  login_toggle_btn.style.backgroundColor = "rgb(255, 255, 255)";
  login_toggle_btn.style.color = "black";
};

// ------------------------

// to submit the login form and register form
const submitloginfun = async (event) => {
  event.preventDefault();

  try {
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    proceed_btn.value = "Loading...";
    const promise = await fetch(`${baseURL}/login`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await promise.json();

    if (res.ok) {
      sessionStorage.setItem("accesstoken", res.token);
      modalfun(res.msg);
      setTimeout(() => {
        window.location.assign("./main.html");
      }, 2000);
    } else {
      modalfun(res.msg);
    }
    proceed_btn.value = "Proceed";
  } catch (error) {
    modalfun("Oopps.. ☹️ Server Error");
    proceed_btn.value = "Proceed";
  }
};

const submitregisterfun = async (event) => {
  event.preventDefault();

  try {
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    if (data.password == data.confirm_password) {
      register_btn.value = "Loading...";
      const promise = await fetch(`${baseURL}/register`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const res = await promise.json();
      modalfun(res.msg);
      setTimeout(() => {
        logintoggle();
      }, 1000);
    } else {
      modalfun("Passwords do not match");
    }
    register_btn.value = "Register";
  } catch (error) {
    modalfun("Oopps.. ☹️ Server Error");
    register_btn.value = "Register";
  }
};
