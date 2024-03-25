### Introduction

**Sasha** is social media Application, Have many Feature that you will know

---

### Feature

- **Authentication - Authorization**
- **Secure**
- **Private Permissions**
- **Manage Profile**
- **Post Comments**
- **Post Likes**
- **Comment Replies**

---

### Getting Started

Create a file and name it `config.env` after that fill these Variables

### `config.env`

`SECRET_KEY=`

`PORT=`

`DATABASE_URL=`

**Info** : The Database is **MongoDB**
then write `npm i`, then `npm run start:dev`

### Tools

- Nodejs (Runtime)
- Express (freamwork)
- MongoDB (NoSql Database)

### End Points

**Authentication / Authorization**

- POST /api/v1/auth/sign-in

  `{`
  `  email,`
  `  password`
  `}`

- POST /api/v1/auth/sign-up

  `{`
  `  email,`
  `  password,`
  `  username,`
  `  name,`
  `  bio,` // optional
  `  avatar` // optional
  `}`

- POST /api/v1/auth/change-email
  `headers: {authorization: token}`
  `{`
  `  email`
  `}`
- POST /api/v1/auth/change-password

  `headers: {authorization: token}`
  `{`
  `  password`
  `}`
  **Post**

if you want to update or delete or Create

`headers: { authorization: token }`

if you want to update or delete or Create enter also

`headers: { content: "First Post in Sasha!, author: user_id" }`

- **GET** /api/v1/post
- **POST** /api/v1/post
- **GET** /api/v1/post/:post_id
- **PUT** /api/v1/post/:post_id
- **DELETE** /api/v1/post/:post_id

**Comment**

if you want to update or delete or Create
`headers: { authorization: token }`

if you want to Create enter also
`headers: { content: "First Post in Sasha!", postId: id }`

- **GET** /api/v1/post/:post_id/comment
- **POST** /api/v1/post/:post_id/comment
- **GET** /api/v1/post/:post_id/comment/:comment_id
- **PUT** /api/v1/post/:post_id/comment/:comment_id
- **DELETE** /api/v1/post/:post_id/comment/:comment_id

**Reply**

if you want to update or delete or Create
`headers: { authorization: token }`

if you want to Create enter also
`headers: { content: "First Post in Sasha!", comment_id: id }`

- **GET** /api/v1/post/:post_id/comment/:comment_id/reply
- **POST** /api/v1/post/:post_id/comment/:comment_id/reply
- **GET** /api/v1/post/:post_id/comment/:comment_id/reply/:reply_id
- **PUT** /api/v1/post/:post_id/comment/:comment_id/reply/:reply_id
- **DELETE** /api/v1/post/:post_id/comment/:comment_id/reply/:reply_id
