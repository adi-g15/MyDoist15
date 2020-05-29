const functions = require('firebase-functions');
const express = require('express');	//exports a function
const { homeScreen, getAllTodos, postOneTodo, deleteTodo, editTodo } = require('./api/todos');
const { loginUser, signUpUser } = require('./api/users')
const { uploadProfilePhoto } = require('./api/users')
const auth = require('./util/auth');

const app = express()

	//Assigns the getAllTodos() callback to the /todos 'route'
app.get( '/todos', getAllTodos );
app.post( '/todo', postOneTodo );
app.delete( '/todo/:todoId', deleteTodo );
app.put( '/todo/:todoId', editTodo );
app.get( '/', homeScreen );

app.post('/login', loginUser);
	//We added an 'authentication layer', so that only a user associated with that account can upload the image.
app.post('/user/image', auth, uploadProfilePhoto);

// getAllTodos();
/*[LEARNT]Gives error cannot read property 'json' of undefined (ie. it was trying to access res.json(), but we didnt even pass res, so undefined)
					And, hence the express().get(), function should be what is passing the req, and res objects to the callback! :D */

// //This creates an API with the url -> https://<hosting-region>-todoapp-<id>.cloudfunctions.net/helloWorld
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

	//Similar to the helloWorld, this should create the url as /api, after which further sub-routes will probably be handled by the express
exports.api = functions.https.onRequest(app);