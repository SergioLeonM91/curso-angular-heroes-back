const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:   '/api/auth',
            heroes: '/api/heroes'
        };

        // DB connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        
        // CORS
        this.app.use(cors());

        // Body read and parse
        this.app.use( express.json() );

        //Public directory
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.heroes, require('../routes/heroes'));
    }

    listen() {
        this.app.listen( this.port );
    }
}

module.exports = Server;