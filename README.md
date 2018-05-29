# Simple-E-commerce
A very simple E-Commerce site. Implemented using MEAN stack.

# Requirements
Mongodb --> v3.6
Express --> v4.0
Node    --> v8.9
Angular --> v5.1


#Installlation

1- Running MongoDB server

MongoDB

2- Import the JSON file Products into database

--> Database    : ecom
--> Collections : products

mongoimport ./products.json  -d ecom -c products

3- running backend

cd node ./app.js

4- Building the Front-End

cd ./public/searchApp

npm build

5- Navigate to localhost:3000/ to view the app.
