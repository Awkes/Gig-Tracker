# GigTracker
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

<code>{ id: String, username: String , password: String, email: String }</code>

---
<b>DELETE /user</b> - Delete user. (PROTECTED)

<code>{ id: String }</code>

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
<b>GET /gigs/:userId[?query]</b> - Get all gigs for a user.

Query (optional)
- search - search string to filter results
- sort - sort order "asc" or "desc" (default "desc")
- limit - number of entries per page
- page - page number

---
<b>GET /gig/:gigId</b> - Get one gig.

---
<b>PUT /gig/:gigId</b> - Update gig.

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
<b>DELETE /gig/:gigId</b> - Delete gig.

---
<b>GET /stats/:userId</b> - Get statistics for user.

---
* PROTECTED routes needs x-access-token (provided from /auth) in Headers.
  