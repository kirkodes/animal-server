# Animal Server Challenges Starter Repository
This is the starter repository for a set of challenges for students going through the Web Development Course at Eleven Fifty Academy.
This starter repository and its challenges are meant to help students gain a better understanding of PostgreSQL, Sequelize, and Express.

## Instructions
In the terminal or powershell, type <code>git clone</code> followed by the HTTPS URL for this remote repository.

Next, step into the newly cloned directory.

After this, run <code>npm install</code> in the terminal/powershell in order to install the dependencies indicated in the <code>package.json</code>.

Modify the database connection URL to include your password and set up the database in pgAdmin.

Finally, type <code>npm run dev</code> or <code>nodemon</code> to start the application.

BRONZE CHALLENGE
Design a '/user/create' endpoint that will let the user send a new user object through the server to the database.
If successful, the server should store the user object sent in the database, and send a response to the user with a 200 status code and the user object just saved.
If the operation fails, the server should respond with a 500 status code and an error message back.
Note :: You do not need to use bcrypt.

  SILVER CHALLENGE
Complete the bronze level challenge above, but this time create a '/user/login' endpoint that will let the user send a user object through the server and check with an existing user in the database.
On success, the user object should be sent back with an appropriate status code.
On failure, an appropriate status code and an error message should be sent.
Note :: You do not need to use bcrypt.

  GOLD CHALLENGE
Complete the silver level challenge above, but make sure that passwords are saved encrypted.
When the '/user/create' and '/user/login' endpoints send the user information back, make sure that information contains a token using jwt (this uses the jsonwebtoken dependency).
Note :: You will modify Bronze and Silver to use bcrypt and implement tokens using jsonwebtoken
Collapse



Send a message to instructor-code