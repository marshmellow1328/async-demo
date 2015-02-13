var express = require( 'express' );
var app = express();

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
        while( true ) {
            response.write( "event: message\n" );
            response.write( "data: test\n\n" );
        }
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
