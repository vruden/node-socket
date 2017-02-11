// io.sockets — выбор всех подключенных клиентов
// io.sockets.sockets[ID] — выбор конкретно взятого клиента с id ID
// socket — выбор «текущего» клиента
// socket.send(TEXT) — «базовое» событие, отправка сообщения TEXT
// socket.json.send({}) — отправка сообщения в формате JSON
// socket.broadcast.send — отправка сообщения всем клиентам, кроме текущего
// socket.broadcast.json.send
// socket.emit(EVENT, JSON и не только) — отправка пользовательского события EVENT с данными JSON (например —
// socket.emit('whereami', {'location': loc})), может использоваться для переписывания? стандартных событий
// 'connected', 'message' и 'disconnect'.
// socket.emit('actorId', 12);
// socket.on(EVENT, CALLBACK) — вызов функции CALLBACK при возникновении события EVENT (например —
// socket.on('whereami', function(loc){ console.log('I\'m in ' + loc + '!'); }))

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        // отправляет сообщение всем, в том числе и инициатору
        io.emit('chat message', msg);

        // отправляет сообщение тому, кто инициировал событие
        // socket.emit('chat message', msg);
    });

    // вызфывается при socket.send
    socket.on('message', function (msg) {
        socket.send('hi ' + msg);
    });

    // socket.id
    // // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
    // socket.json.send({'event': 'connected', 'name': ID, 'time': time});
    // socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});
    // // Посылаем всем остальным пользователям, что подключился новый клиент и его имя
    // socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
    // socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})

    // // При отключении клиента - уведомляем остальных
    socket.on('disconnect', function () {
        // io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});