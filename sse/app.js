var express = require( 'express' );
var app = express();
app.use( express.json() );
app.use( express.urlencoded() );

var EventEmitter = require( 'events' ).EventEmitter;
var events = new EventEmitter();

app.use( '/client', express.static( __dirname + '/client/' ) );
app.use( '/server', express.static( __dirname + '/server/' ) );

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
        console.log( request.body );
        events.emit( 'message', request.param( 'message' ) );
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
