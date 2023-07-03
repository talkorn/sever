# Business Cards Node.js Project

This is a Node.js project for managing business cards. It provides RESTful APIs using Express.js framework and utilizes various libraries such as bcryptjs, joi, jsonwebtoken, config, morgan, cors, chalk, and mongoose.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version >= 12)
- MongoDB

### Installation

1. Install the dependencies:

   ```
   npm install
   ```

2. Set up the database:

   - Update the Atlas connection in the production file (`config/production.json`) with your MongoDB Atlas URL.

3. Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be purple with the message:
  server run on: http://localhost:8181/.

## API Endpoints

The following API endpoints are available:

User Routes
POST api/users: Create a new user.
POST api/users/login: User login and authentication.
GET api/users: Get all users.
GET api/users/:id: Get a user by ID.
PUT api/users/:id: Update a user by ID.
PATCH api/users/:id: Update the "isBusiness" field of a user by ID.
DELETE api/users/:id: Delete a user by ID.

Card Routes
POST /api/cards- Create a new card.
GET /api/cards- Get all cards.
GET /api/cards/my-cards- Get all cards belonging to the authenticated user.
GET /api/cards/:id- Get a card by ID.
PUT /api/cards/:id- Update a card by ID.
PATCH /api/cards/:id- Toggle the "likes" field of a card by ID.
DELETE /api/cards/:id- Delete a card by ID.
PATCH /api/cards/biz/:id- Generate a new business number for a card by ID.
