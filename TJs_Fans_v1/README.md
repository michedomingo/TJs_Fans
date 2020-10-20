# TJ's Fans version 1

Backend API for the TJ's Fans application to manage products, shopping lists, reviews, users and authentication.

## Indices

- [Authentication](#authentication)

  - [Forgot Password](#1-forgot-password)
  - [Get Logged in User via Token](#2-get-logged-in-user-via-token)
  - [Logout User](#3-logout-user)
  - [Register User](#4-register-user)
  - [Reset Password](#5-reset-password)
  - [Update Password](#6-update-password)
  - [Update User Details](#7-update-user-details)

- [Products](#products)

  - [Create Product](#1-create-product)
  - [Delete Product](#2-delete-product)
  - [Get All Products](#3-get-all-products)
  - [Get Products For Store](#4-get-products-for-store)
  - [Get Single Product](#5-get-single-product)
  - [Login User](#6-login-user)
  - [Update Product](#7-update-product)

- [Reviews](#reviews)

  - [Add review for Store](#1-add-review-for-store)
  - [Delete Review](#2-delete-review)
  - [Get All Reviews](#3-get-all-reviews)
  - [Get Reviews for Store](#4-get-reviews-for-store)
  - [Get Single Review](#5-get-single-review)
  - [Update Review](#6-update-review)

- [Stores](#stores)

  - [Create New Store](#1-create-new-store)
  - [Delete Store](#2-delete-store)
  - [Get All Stores](#3-get-all-stores)
  - [Get Single Store](#4-get-single-store)
  - [Get Stores By Distance](#5-get-stores-by-distance)
  - [Update Store](#6-update-store)
  - [Upload Photo](#7-upload-photo)

- [Users](#users)

  - [Create User](#1-create-user)
  - [Delete User](#2-delete-user)
  - [Get All Users](#3-get-all-users)
  - [Get Single User](#4-get-single-user)
  - [Update User](#5-update-user)

---

## Authentication

Routes for user authentication including register, login, reset password, etc.

### 1. Forgot Password

Generate password token and send email.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "email": "mary@gmail.com"
}
```

### 2. Get Logged in User via Token

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/auth/me
```

**_Headers:_**

| Key           | Value                                                                                                                                                                              | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Content-Type  | application/json                                                                                                                                                                   | JSON type   |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOGIyMGQwODJjNzIyOGUxZTgxMTFkYiIsImlhdCI6MTYwMjk2MzI4NiwiZXhwIjoxNjEwNzM5Mjg2fQ.8D4C9affe-j53nACJBB4q7dEP5NQlaG4RRPqdjGMr3o |             |

### 3. Logout User

Clear token cookie.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/auth/logout
```

### 4. Register User

Add user to database with encrypted password.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "name": "John Doe 1",
    "email": "john1@gmail.com",
    "password": "123456",
    "role": "publisher"
}
```

### 5. Reset Password

Reset user password using token.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/4311ac743fb4cfc5b754f4d2f68b12bd9bc7b935
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "password": "1234567"
}
```

### 6. Update Password

Update logged in user password, send in the body currentPassword and newPassword.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "currentPassword": "123456",
    "newPassword": "1234567"
}
```

### 7. Update User Details

Update logged in user name and email.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "name": "John Doe",
    "email": "john@gmail.com"
}
```

## Products

Products CRUD functionality / Create, Read, Update, & Delete products

### 1. Create Product

Create a product for a specific store.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c6/products
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    	"productName": "TRADER JOE'S, SEASONED KALE CHIPS",
        "user": "tbd",
		"priceAvg": 499,
        "ingredients": "KALE, CASHEWS, TAHINI (GROUND SESAME SEEDS), CARROT POWDER, ONION POWDER, CANE SUGAR, LEMON JUICE CONCENTRATE, MUSTARD POWDER, SALT GARLIC POWDER.",
        "productLabel": ["Vegan", "Vegetarian"],
        "dairyFree": true,
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false,
        "organic": false
}
```

### 2. Delete Product

Delete product from database.

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/products/5d725cb9c4ded7bcb480eaa1
```

### 3. Get All Products

Fetch all products from database. Includes pagination, filtering, etc.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/products
```

### 4. Get Products For Store

Get the specific products for a store.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c4/products
```

### 5. Get Single Product

Get single product by ID.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/products/5d725a4a7b292f5f8ceff789
```

### 6. Login User

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "email": "mary@gmail.com",
    "password": "1234567"
}
```

### 7. Update Product

Update single product in database.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/products/5d725cb9c4ded7bcb480eaa1
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "vegan": false,
    "vegetarian": false
}
```

## Reviews

Manage store reviews

### 1. Add review for Store

Insert review for a specific store.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c3/reviews
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "title": "Nice Store",
    "text": "I bought a lot",
    "rating": 8
}
```

### 2. Delete Review

Remove review from database.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/reviews/5f8ded086d7214e24a657773
```

### 3. Get All Reviews

Get all reviews from database and populate with store name/description.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/reviews
```

### 4. Get Reviews for Store

Fetch the reviews for a specific store.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c3/reviews
```

### 5. Get Single Review

Fetch a review from database by id and populate Store name and description.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/reviews/5d7a514b5d2c12c7449be027
```

### 6. Update Review

Update review in database.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/reviews/5f8ded086d7214e24a657773
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "title": "Had fun"
}
```

## Stores

Stores CRUD functionality / Create, Read, Update, & Delete stores

### 1. Create New Store

Add new store to database. Must be authenticated and must be publisher or admin.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/stores
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "storeName": "TEST",
    "website": "https://locations.traderjoes.com/ca/san-francisco/200/",
    "phone": "415-292-7665",
    "address": "1095 Hyde St San Francisco, CA 94109",
    "alcohol": ["Beer", "Wine", "Liquor"],
    "email": "200@traderjoes.com",
    "description": "At Trader Joe’s, we see ourselves as your neighborhood grocery store."
}

```

### 2. Delete Store

Delete store from database.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/stores/5f8b4059d0cb829626e01248
```

### 3. Get All Stores

Fetch all stores from database. Includes pagination, filtering, etc.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/stores
```

### 4. Get Single Store

Get single store by ID.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c6
```

### 5. Get Stores By Distance

Get stores within a radius of a specific zipcode.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/stores/radius/94601/11
```

### 6. Update Store

Update single store in database.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/stores/5f838a072448963e0c496d86
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "description": "At Trader Joe’s (200), we see ourselves as your neighborhood grocery store."
}
```

### 7. Upload Photo

Route to upload a store photo.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/stores/5f8532d110c90b77d09f66c4/photo
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "description": "At Trader Joe’s (200), we see ourselves as your neighborhood grocery store."
}
```

## Users

CRUD functionality for users only available to admins.

### 1. Create User

Add user to database (admin).

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "name": "Nate Smith",
    "email": "nate@gmail.com",
    "password": "123456"
}
```

### 2. Delete User

Delete user from database (admin).

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc035
```

### 3. Get All Users

Get all users (admin).

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users
```

### 4. Get Single User

Get single user by id (admin).

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc035
```

### 5. Update User

Update user in database (admin).

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc035
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON type   |

**_Body:_**

```js
{
    "name": "Steph 1"
}
```

---

[Back to top](#tj's_fans-version-1)

> Made with &#9829; by [michedomingo](https://github.com/michedomingo)
