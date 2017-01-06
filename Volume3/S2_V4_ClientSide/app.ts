/**
 * Module dependencies.
 */

import express = require('express')
import http = require('http')
import path = require('path')
import logger = require('morgan')
import bodyParser = require('body-parser')
import methodOverride = require('method-override')
import errorhandler = require('errorhandler')
import mongoose = require('mongoose')
import io = require('socket.io')

import routes = require('./routes/index')
import todos = require('./server/todos')
import { AppServerSocket } from './server/sockets'
import { SocketEvents } from './common/events';
import * as Models from './common/models'

var mongoURI = 'mongodb://localhost/todos'
  , Schema = mongoose.Schema
  , ObjectID = Schema.Types.ObjectId
  , Todo = todos.init(Schema, mongoose);

var connectWithRetry = function () {
  return mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();

mongoose.connection.on('open', function () {
  console.log("connected to mongodb");
});

var app = express();

app.set('port', process.env.PORT || 2982);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(errorhandler());
}

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});


var sio = io.listen(server);
//User online user count variable
var users = 0;

var address_list: { [key: string]: { list: string[] } } = {};

sio.sockets.on('connection', function (socket: AppServerSocket) {
  var address = socket.handshake.address;
  var socketid: string[];

  if (address_list[address]) {
    socketid = address_list[address].list;
    socketid.push(socket.id);
    address_list[address].list = socketid;
  } else {
    socketid = [socket.id];
    address_list[address] = { list: socketid };
  }

  users = Object.keys(address_list).length;

  socket.emit(SocketEvents.count, { count: users });
  socket.broadcast.emit(SocketEvents.count, { count: users });

  /*
    handles 'all' namespace
    function: list all todos
    response: all todos, json format
  */
  Todo.find({}, function (err, todos) {
    socket.emit(SocketEvents.all, todos);
  });

  /*
    handles 'add' namespace
    function: add a todo
    Response: Todo object
  */
  socket.on(SocketEvents.add, function (data: Models.Todo) {
    var todo = new Todo({
      title: data.title,
      complete: false
    });

    todo.save(function (err) {
      if (err) throw err;
      socket.emit('added', todo);
      socket.broadcast.emit('added', todo);
    });
  });

  /*
    Handles 'delete' namespace
    function: delete a todo
    response: the delete todo id, json object
  */
  socket.on(SocketEvents.delete, function (data: Models.DeleteTodoCommand) {
    Todo.findById(data.id, function (err, todo) {
      todo.remove(function (err) {
        if (err) throw err;
        socket.emit('deleted', data);
        socket.broadcast.emit('deleted', data);
      });
    });
  });

  /*
    Handles 'edit' namespace
    function: edit a todo
    response: edited todo, json object
  */
  socket.on(SocketEvents.edit, function (data: Models.Todo) {
    if (typeof data.id === 'undefined') {
      return;
    }

    Todo.findById(data.id, function (err, todo) {
      todo.title = data.title;
      todo.save(function (err) {
        if (err) throw err;
        socket.emit('edited', todo);
        socket.broadcast.emit('edited', todo);
      });
    });
  });

  /*
    Handles 'changestatus' namespace
    function: change the status of a todo
    response: the todo that was edited, json object
  */
  socket.on(SocketEvents.changestatus, function (data: Models.ChangeTodoStatusCommand) {
    if (typeof data.id === 'undefined') {
      return;
    }

    Todo.findById(data.id, function (err, todo) {
      todo.complete = data.status == Models.TodoStatusComplete ? true : false;
      todo.save(function (err) {
        if (err) throw err;
        socket.emit(SocketEvents.statuschanged, data);
        socket.broadcast.emit(SocketEvents.statuschanged, data);
      });
    });
  });

  /*
    Handles 'allchangestatus' namespace
    function: change the status of all todos
    response: the status, json object
  */
  socket.on(SocketEvents.allchangestatus, function (data: Models.ChangeTodoStatusCommand) {
    var master_status = data.status == Models.TodoStatusComplete ? true : false;
    Todo.find({}, function (err, todos) {
      for (var todo of todos) {
        todo.complete = master_status;
        todo.save(function (err) {
          if (err) throw err;
          socket.emit(SocketEvents.allstatuschanged, data);
          socket.broadcast.emit(SocketEvents.allstatuschanged, data);
        });
      }
    });
  });

  //disconnect state
  socket.on(SocketEvents.disconnect, function () {
    var socketid = address_list[address].list;

    socketid.splice(socketid.indexOf(socket.id), 1);

    if (Object.keys(socketid).length == 0) {
      delete address_list[address];
    }

    users = Object.keys(address_list).length;
    socket.emit(SocketEvents.count, { count: users });
    socket.broadcast.emit(SocketEvents.count, { count: users });
  });

});

app.use('/', routes);