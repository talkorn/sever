# Business Cards Node.js Project

This is a Node.js project for managing business cards. It provides RESTful APIs using Express.js framework and utilizes various libraries such as bcryptjs, joi, jsonwebtoken, config, morgan, cors, chalk, and mongoose.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version >= 12)
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```
   cd business-cards-nodejs-project
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up the database:

   - Update the Atlas connection in the production file (`config/production.json`) with your MongoDB Atlas URL.

5. Available Scripts

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
POST /users: Create a new user.
POST /users/login: User login and authentication.
GET /users: Get all users.
GET /users/:id: Get a user by ID.
PUT /users/:id: Update a user by ID.
PATCH /users/:id: Update the "isBusiness" field of a user by ID.
DELETE /users/:id: Delete a user by ID.

Card Routes
POST /api: Create a new card.
GET /api: Get all cards.
GET /api/my-cards: Get all cards belonging to the authenticated user.
GET /api/:id: Get a card by ID.
PUT /api/:id: Update a card by ID.
PATCH /api/:id: Toggle the "likes" field of a card by ID.
DELETE /api/:id: Delete a card by ID.
PATCH /api/biz/:id: Generate a new business number for a card by ID.
