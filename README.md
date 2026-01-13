# GigFlow

GigFlow is a full-stack gig marketplace where clients post gigs, freelancers bid, and clients hire freelancers using transaction-safe logic and real-time updates.

This project was built as part of a full-stack engineering assignment.

---

## Overview

- JWT based authentication with HttpOnly cookies
- Role-based access (Client, Freelancer)
- Transaction-safe hiring using mongoDb Transactions
- Real-time updates using Socket.IO

###  Gigs

#### Clients can:

- Create gigs
- View their posted gigs

#### Freelancers can:

- Browse all gigs
- View gig details

### Bidding System

- Freelancers can place bids on gigs
- Each bid includes:
  * Price
  * Message
- Clients can view all bids for a gig

### Hiring Logic 

#### Transactional hiring using MongoDB Transactions Guarantees:

* Only one freelancer can be hired
* Gig status changes from open → assigned
* Selected bid → hired
* All other bids → rejected
* Fully race-condition safe

### Real-Time Notifications

* Integrated Socket.IO
* When a client hires a freelancer:
* Freelancer receives instant notification
* No page refresh required
---

## Tech Stack

Frontend:
- React (Vite)
- TypeScript
- Redux Toolkit
- React Hook Form
- Zod
- shadcn/ui

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- JWT

---

## Project Structure

Backend:

```
server/ 
├── src/ 
│ ├── controllers/ 
│ ├── db/
│ ├── middlewares/
│ ├── models/ 
│ ├── routes/ 
│ ├── socket/ 
│ ├── types/
│ ├── utils/ 
│ ├── app.ts
│ └── server.ts
```


Frontend:
```
client/ 
├── src/
│ ├── api/ 
│ ├── components/
│ ├── lib/  
│ ├── pages/ 
│ ├── redux/ 
│ ├── routes/
│ ├── socket/ 
│ ├── types/
│ ├── app.ts
│ └── main.ts

```
---

## Environment Variables

Backend:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
```


---

## Running Locally

Backend:
```
cd server
npm install
npm run dev
```

Frontend:
```
cd client
npm install
npm run dev
```


---

## API Routes

Auth:
```
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/getMe (with middleware)
- POST /api/auth/logout
```
Gigs:
```
- POST /api/gig/create-gig
- GET  /api/gig/get-gig/:id
- GET  /api/gig/gigs
- GET  /api/gig/get-my-gigs/:id
```

Bids:
```
- POST   /api/bid/create-bid
- GET    /api/bid/get-bid/:id
- GET    /api/bid/get-bid-gig/:id
- Patch  /api/bid/hire-freelancer/:id
```

---

