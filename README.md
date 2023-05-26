# Web Service & RESTful API for ToDoList Application

## Requirement

- Javascript
- NodeJS
- ExpressJs
- MySQL
- API

## Dependencies

- express
- mysql2
- sequelize
- jsonwebtoken
- bcrypt
- dotenv

## Web Service & API Documentation

#### Todos :

Get All todos

```
GET /todos
```

Get Single todos

```
GET /todos/{id}
```

Add a new todos

```
POST /todos
```

```
Body:
{
  "title": String,
  "description": String,
  "isCompleted": Boolean
}
```

Update todos

```
PUT /todos/{id}
```

```
Body:
{
  "title": String,
  "description": String,
  "isCompleted": Boolean
}
```

Delete todos

```
DELETE todos/{id}
```

#### Auth :

Register Login

```
POST /users/register
```

```
Body:
{
  "username": String,
  "phone": String,
  "email": String,
  "password": String,
}
```

User Login

```
POST /users/login
```

```
Body:
{
  "email": String,
  "password": String
}
```
