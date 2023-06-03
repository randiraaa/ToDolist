# Web Service & RESTful API for ToDoList Application

Implementation of simple To Do List application development using JavaScript with NodeJS, Web Service, RESTful API, Authentication & Authorization. The database uses MySQL which practices the Sequelize-cli migrations, models & seeders module.

## Requirement

- Javascript
- NodeJS
- ExpressJs
- Web Service
- MySQL
- API
- Postman, for building, testing, and documenting APIs

## Dependencies

```json
{
  "dependencies": {
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "ip": "^1.1.8",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "mysql2": "^3.3.3",
    "sequelize": "^6.31.1",
    "sequelize-cli": "^6.6.0"
  }
}
```

## For Install Dependencies

```nodejs
npm install <dependencies>
```

## To Do List

This to do list feature has users who register and log in to be able to enter the To Do List. The login feature is complemented by giving tokens to users as roles, namely admin and user.

Admin roles have permission to be able to delete users, while users are not given permission. I made this permission using authentication and authorization. So the user who registers will be given permission as an admin or as a user.

## Database

- Database :  
  Database online at [db4free.net](https://www.db4free.net/phpMyAdmin).

```
{
  "username": "randira",
  "password": "123randi4",
  "database": "dbtpatodolist",
  "host": "db4free.net",
}
```

Database created with sequelize-cli :

- Table todolist  
  ![tb-todo](README-assets/tb-todo.png)

- Table users  
  ![tb-todo](README-assets/tb-users.png)

- Table tokenauth  
  ![tb-token](README-assets/tb-token.png)

## Web Service & API Documentation

### Server

```git
node app.js / nodemon app
```

# ![server](README-assets/consoleServer.png)

# ![server](README-assets/server.png)

## Postman

### ==== User ====

### Register User Roles "admin" :

```
POST | http://localhost:3000/register
```

raw

```
{
    "username" : "randi",
    "email" : "randi@gmail.com",
    "password" : "123randi4",
    "roles" : "admin"
}
```

body

```
{
    "success": true,
    "message": "Register success!"
}
```

### Register User Roles "user" :

```
POST | http://localhost:3000/register
```

raw

```
{
    "username" : "jhon",
    "email" : "jhon@gmail.com",
    "password" : "123jhon4",
    "roles" : "user"
}
```

body

```
{
    "success": true,
    "message": "Register success!"
}
```

### Register user, if the user already exists identified from the email :

body

```
{
    "status": 200,
    "values": "Email already exists!"
}
```

### Login User :

```
POST | http://localhost:3000/login
```

raw

```
{
    "email" : "randi@gmail.com",
    "password" : "123randi4"
}
```

body

```
{
    "success": true,
    "message": "Token generated successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE2ODU4MDU2MDQsImV4cCI6MTY4NTgwNzA0NH0._Yrr5VNEhkgQ9H9fspZk1Vfu6ezGiYdLRqLtWrQuU7s",
    "currUser": 1
}
```

### Login User, if the user login there is an error in the email and password :

body

```
{
    "error": true,
    "message": "Incorrect email or password!"
}
```

### Authentication & Authorization Roles "admin" & "user" :

### == Roles "admin" ==

```
DELETE | http://localhost:3000/auth/delete/3
```

- Autorization -> Bearer Token  
  Token :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE2ODU4MDU2MDQsImV4cCI6MTY4NTgwNzA0NH0._Yrr5VNEhkgQ9H9fspZk1Vfu6ezGiYdLRqLtWrQuU7s
```

Response = body :

```
{
    "status": 200,
    "values": "Delete user success!"
}
```

- Wrong tokens :  
  Response = body :

```
{
    "auth": false,
    "message": "Tokens are not listed!"
}
```

- No tokens :  
  Response = body :

```
{
    "auth": false,
    "message": "No tokens!"
}
```

### == Roles "user" ==

```
DELETE | http://localhost:3000/auth/delete/2
```

- Autorization -> Bearer Token  
  Token :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGVzIjoidXNlciIsImlhdCI6MTY4NTgwNjkyMywiZXhwIjoxNjg1ODA4MzYzfQ.sirirQ5pcGYQc7lDizHx05Ej0wuIJcfhKGVmPKSss2I
```

Response = body :

```
{
    "auth": false,
    "message": "You are not granted permission! Please contact admin for help center!"
}
```

### ==== To Do List ====

- All Todos :

```
GET | http://localhost:3000/todos
```

Response = body :

```
{
    "status": 200,
    "values": [
        {
            "id": 1,
            "description": "Musik"
        },
        {
            "id": 2,
            "description": "Olahraga"
        },
        {
            "id": 3,
            "description": "Membaca"
        },
        {
            "id": 4,
            "description": "Bernyanyi"
        },
        {
            "id": 5,
            "description": "Bermain"
        }
    ]
}
```

- Todos by "id" :

```
GET | http://localhost:3000/todos/3
```

Response = body :

```
{
    "status": 200,
    "values": [
        {
            "id": 3,
            "description": "Membaca"
        }
    ]
}
```

- Add Todos :

```
POST | http://localhost:3000/todos/add
```

raw :

```
{
    "description" : "Ngoding"
}
```

Response = body :

```
{
    "status": 200,
    "values": "Add TODOS success!"
}
```

- Update Todos :

```
PUT | http://localhost:3000/todos/update/6
```

raw before :

```
{
    "description" : "Ngoding"
}
```

raw after :

```
{
    "description" : "Design UI/UX"
}
```

Response = body :

```
{
    "status": 200,
    "values": "Update TODOS success!"
}
```

- Delete Todos by "id":

```
DELETE | http://localhost:3000/todos/delete/6
```

Response = body :

```
{
    "status": 200,
    "values": "Delete TODOS success!"
}
```
