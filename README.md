# Bagelly - The clone of "Th Souled Store"

Bagelly fashions-website This was a Solo project Executed in 5 days.

This project was completed within 5 days in unit-3 construct week at Masai School. Bagelly is a ecommerce company based in India that allows customers to shop the chlothes online. The objective of the project was to clone the Souled store app and to implement the knowledge that unit and the units prior to that. 


Contributor

Akshay Chavan

Tech Stack Used : - Languages HTML CSS JavaScript, Node.js, Express, Mongoose

Packages : - Jsonwebtoken, Bcrypt, Dotenv, Cors

### This documentation provides an overview of the routes available in the project. It includes the user routes, product routes, and cart routes.

## User Routes
GET /users
This route is used to fetch all the users.

POST /register
This route is used to register a new user.

POST /login
This route is used for user authentication and login.

PATCH /update/:id
This route is used to update user information based on the provided id.

DELETE /delete/:id
This route is used to delete a user based on the provided id.

GET /validatetoken
This route is used to validate a user's token.

GET /auth/google
This route is used for authentication using Google OAuth.

## Product Routes
GET /products
This route is used to fetch all products.

GET /products/singleproduct/:id
This route is used to fetch a specific product based on the provided id.

GET /products/women
This route is used to fetch products specifically for women.

GET /products/men
This route is used to fetch products specifically for men.

GET /products/kids
This route is used to fetch products specifically for kids.

POST /products/add
This route is used to add a new product.

PATCH /products/update/:id
This route is used to update a product based on the provided id.

DELETE /products/delete/:id
This route is used to delete a product based on the provided id.

## Cart Routes
GET /user/getcart
This route is used to fetch the cart items for a specific user.

POST /user/addtocart
This route is used to add an item to the user's cart.

DELETE /user/remove/:id
This route is used to remove an item from the user's cart based on the provided id.



### Followings are the screenshots of the pages of the website
<br>



<h1>Home Page</h1>
<a href="https://ibb.co/7rnjZj0"><img src="https://i.ibb.co/5srGSGJ/Screenshot-2023-02-27-140728.png" alt="Screenshot-2023-02-27-140728" border="0"></a>
<a href="https://ibb.co/wR8JdZc"><img src="https://i.ibb.co/DtmG1Pr/Screenshot-2023-02-27-140812.png" alt="Screenshot-2023-02-27-140812" border="0"></a>
<h1>Product Page</h1>
<a href="https://ibb.co/5cBvZsK"><img src="https://i.ibb.co/GPckmCH/Screenshot-2023-02-27-140850.png" alt="Screenshot-2023-02-27-140850" border="0"></a>
<h1>Cart Page</h1>
<a href="https://ibb.co/LhjL9Ww"><img src="https://i.ibb.co/93KFyLX/Screenshot-2023-02-27-140934.png" alt="Screenshot-2023-02-27-140934" border="0"></a>



