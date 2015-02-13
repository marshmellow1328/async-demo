var express = require( 'express' );
var app = express();

var EventEmitter = require( 'events' ).EventEmitter;
var events = new EventEmitter();

app.use( '/client', express.static( __dirname + '/client/' ) );

app.get(
    '/events',
    function( request, response ) {
        response.writeHead(
            200,
            {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        );
        response.write( "\n" );
        events.on(
            'message',
            function( event ) {
                response.write( "event: message\n" );
                response.write( "data: "+event+"\n\n" );
            }
        );
    }
);

app.post(
    '/events',
    function( request, response ) {
        console.log( 'new event' );
        events.emit( 'message', 'test' );
        response.send( 'ok' );
    }
);


var server = app.listen( 8080 );
server.on(
    'listening',
    function() {
        console.log(
            'Listening on port ' + server.address().port );
    }
);
