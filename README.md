# Photo Gallery App
#### Created by Matthew Westenhaver

## About
- This project was created using MERN Stack (MongoDB, Express.js, React.js, Node.js) and deployed on Heroku to keep the API and Client on the same URL. Express.js serves both the client files and processes the API requests.
- To view the photo gallery, you must create an account and login.
- I used JSON Web Tokens for user authorization.

## Requirements
1. You will need Git and Node.js/NPM installed on your computer.
2. You will also need MongoDB, which can be installed using Homebrew.


## How to Build
1. Fork the repository and then clone the repository to your local machine.
2. Using the command line, navigate to the root directory of the project.
3. Create a ".env" file and add the following line
`JWT_SECRET=whatever_you_want_the_secret_to_be` and then save the file.
4. Install the backend dependencies using NPM - `npm i`.
5. Navigate into the "client" directory and install the frontend dependencies using NPM - `npm i`.
6. If you want to keep the client and server together, you can use a service like Heroku.
7. If you want to split the client and server apart, you can use Heroku to deploy the server and a static hosting site like AWS S3 to host the production build of the client. The production build of the client can be created by running `npm run build` from the command line when in the root of the client directory.

## How to Run
1. Navigate into the root directory of the project and start the API using `node server.js` or `nodemon` if you have it installed.
2. If you want to run the app on a local database, navigate into the client directory and find the "auth.js" file and comment out the 8th line and uncomment the 9th line.
3. Navigate back to the client directory in the command line and start the client using `npm start`.
