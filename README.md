## __1. Setup MongoDB Database__

- Activate MongoDB server, then create a __*madcamp*__ database with a __*user*__ collection. Don't forget to create your database user:

    ```bash
    $ use madcamp
    
    $ db.createUser({
        user: 'your_username',
        pwd: 'your_password',
        roles: ['readWrite', 'dbAdmin'] 
        })

    $ db.createCollection('user')
    ```

- Insert some data, as initial data, into __*user*__ collection:

    ```bash
    $ db.user.insert([
        {id: 'A', password: '1234'},
        {id: 'B', password: '1234'}
        ])
    
    $ db.user.find().pretty();
    ```
- __Done!__ :thumbsup:

#

## __2. Setup Node.js Backend Project__

- Clone this repo, go to __*Express_Backend*__ folder then install all dependencies:

    ```bash
    $ cd React_RNative_Express_MongoDB/Express_Backend

    $ npm i
    ```

- Open __*app.js*__ & edit this line to configure your database:
    
    ```javascript
    var url = 'mongodb://user:password@localhost:27017/madcamp';
    ```

- Save it, then run your backend project. It will run at __*localhost:80*__:

    ```bash
    $ node app
    ```

- __Done!__ :thumbsup:

#

## __3. Setup React Frontend Project__

- Go to __*React_Frontend*__ folder, install all dependencies then run this project:

    ```bash
    $ cd React_RNative_Express_MongoDB/React_Frontend

    $ npm i

    $ npm start
    ```

- It will run at __*localhost:3000*__ & open in browser automatically! __Done!__ :thumbsup:

#

## __4. Setup React Native Android Project__

- Activate your __*AVD (Android Virtual Device)*__.

- Go to __*RNative_Mobile*__ folder, install all dependencies then run this project:

    ```bash
    $ cd React_RNative_Express_MongoDB/RNative_Mobile

    $ npm i

    $ react-native run-android
    ```

- __Done!__ :thumbsup:

#