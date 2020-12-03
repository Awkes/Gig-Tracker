# Gig Tracker

An application where you can keep track on gigs you've been to.

This application is being built as an examinating project while I'm attending the [JavaScript Fullstack](https://www.molndal.se/campus-molndal/utbildningar/yrkeshogskola/korta-utbildningar-inom-yh/javascript-fullstack.html) education att [Campus Mölndal](https://www.molndal.se/campus-molndal.html).

It's built using the MERN-stack with the following frameworks and tools.

- [MongoDB](https://mongodb.com)
- [Express](https://expressjs.com)
- [React](https://reactjs.org)
- [Node.js](https://nodejs.org/en)
- [ThemeUI](https://theme-ui.com/)
- [React Router](https://reactrouter.com)
- [Chart.js](https://chartjs.org) + [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)
- [FontAwesome](https://fontawesome.com)

I'm also trying to learn TypeScript while building this project.

- [TypeScript](https://typescriptlang.org)

## App

- https://gig-tracker-app.herokuapp.com/

## Endpoints

---
<b>POST /user</b> - Create a new user.

<code>{ username: String , password: String, email: String }</code>

---
<b>GET /users</b> - Get all users. (PROTECTED)

---
<b>GET /user/:userId</b> - Get user. (PROTECTED)

---
<b>PUT /user</b> - Update user. (PROTECTED)

<code>{ id: String, name: String , password: String, email: String }</code>

---
<b>DELETE /user</b> - Delete user. (PROTECTED)

---
<b>POST /auth</b> - Sign in.

<code>{ email: String, password: String }</code>

---
<b>POST /gig</b> - Create gig.

<code>
{
  creator: String (userId)
  artist: String,
  tour: String,
  venue: String,
  city: String,
  country: String,
  date: String,
  notes: String,
  setlist: [String],
}
</code>

---
<b>GET /gigs/:userId[?query]</b> - Get all gigs for a user. (PROTECTED)

Query (optional)
- search - search string to filter results
- order - field to order by (date, artist, tour, venue, city, country)
- sort - sort order "asc" or "desc" (default "desc")
- limit - number of entries per page
- page - page number

---
<b>GET /gig/:gigId</b> - Get one gig. (PROTECTED)

---
<b>PUT /gig</b> - Update gig. (PROTECTED)

<code>
{
  id: String (gigId)
  creator: String (userId)
  artist: String,
  tour: String,
  venue: String,
  city: String,
  country: String,
  date: String,
  notes: String,
  setlist: [String],
}
</code>

---
<b>DELETE /gig</b> - Delete gig. (PROTECTED)

<code>{ id: String (gigId), creator: String (userId) }</code>

---
<b>GET /stats/:userId</b> - Get statistics for user. (PROTECTED)

---
* PROTECTED routes needs x-access-token (provided from /auth) in Headers.
  