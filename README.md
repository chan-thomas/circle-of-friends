Adding Authentication:

To add the necessary dependencies for authentication, run the following command:

```sh
npm i express-session passport passport-local connect-ensure-login bcrypt
```
### Dependencies Explanation

1. **express-session**:
    - **Purpose**: This middleware is used to manage sessions in Express applications. It allows you to store user-specific data between HTTP requests.
    - **Usage**: When a user logs in, a session is created and stored on the server. This session can be used to keep the user logged in across multiple requests.

2. **passport**:
    - **Purpose**: Passport is an authentication middleware for Node.js. It is designed to be flexible and modular, allowing you to authenticate requests using various strategies.
    - **Usage**: Passport is used to handle the authentication process. It verifies the user's credentials (email and password) and establishes a login session.

3. **passport-local**:
    - **Purpose**: This is a Passport strategy for authenticating with a username and password. It is commonly used for traditional login forms.
    - **Usage**: The `passport-local` strategy is configured to use email and password for authentication. It checks the provided credentials against the stored user data.

4. **connect-ensure-login**:
    - **Purpose**: This middleware ensures that a user is logged in before allowing them to access certain routes.
    - **Usage**: It is used to protect routes that require authentication. If a user is not logged in, they are redirected to the login page.
    ```sh
    //usage: for example, to protect the '/profile' route: 
    import {ensureLoggedIn} from 'connect-ensure-login';
    app.get('/profile', ensureLoggedIn('/login'), (req, res) => {
        res.render('profile', { user: req.user });
    });
    ```

5. **bcrypt**:
    - **Purpose**: Bcrypt is a library for hashing passwords. It helps to securely store passwords by converting them into a fixed-length string of characters, which is difficult to reverse-engineer.
    - **Usage**: When a user registers, their password is hashed using bcrypt before being stored in the database. During login, the provided password is hashed again and compared to the stored hash to verify the user's identity.
By using these dependencies together, you can implement a robust authentication system that uses email and password to authenticate users and authorize access to your application.

### Setting Up Environment Variables
Creating a `.env` file to the root directory of yourproject. Use this file to store system specific variables like port number, or sensitive information such as passwords and API keys is a common practice in Node.js applications. This file is **not committed to version control** and is used to store environment-specific configuration values. Make sure to add the `.env` file to your `.gitignore` file to prevent it from being pushed to the repository.

For example:
```sh 
PORT=3000
ADMIN_PASSWORD=mysecretpassword
```
In this example, the `PORT` variable specifies the port number on which the server will run, and the `ADMIN_PASSWORD` variable is used to sign in to the server.

To load these variables from the `.env` file and make them available in your application, run the following command: 
```sh
node --env-file=.env app.js
```
This command uses the `--env-file` flag to load the environment variables from the `.env` file and pass them to the `app.js` file.

### Generating the ADMIN_PASSWORD Hash

To securely store the `ADMIN_PASSWORD`, you should hash it using bcrypt before saving it to your environment variables or database. Here is how you can generate the hash:

1. **Install bcrypt**:
    If you haven't already installed bcrypt, you can do so by running:
    ```sh
    npm install bcrypt
    ```

2. **Generate the Hash**:
    Create a script to generate the hash. For example, create a file named `generateHash.js` with the following content:
    ```js
    //generateHash.js   
    import bcrypt from 'bcrypt';
    const saltRounds = 10;
    const plainPassword = 'mysecretpassword';

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        if (err) {
            console.error('Error generating hash:', err);
        } else {
            console.log('Generated hash:', hash);
        }
    });
    ```

3. **Run the Script**:
    Execute the script to generate the hash:
    ```sh
    node generateHash.js
    ```

4. **Store the Hash**:
    Once the hash is generated, you can store it in your `.env` file or database. For example:
    ```sh
    ADMIN_PASSWORD_HASH=$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2Bz5Q39Q4uX9k3K6
    ```

By following these steps, you ensure that the `ADMIN_PASSWORD` is securely hashed using bcrypt before being stored, enhancing the security of your application.