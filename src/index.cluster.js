import express from "express"
import session from "express-session";
import cors from "cors"
import { routerProducts, routerCart, routerUser, routerInfo, routerRandom } from "./routers";
import "./config/db"
import cluster from "cluster";
import os from "os";

const nucleo = os.cpus().length 

if(cluster.isPrimary) {

    for(let i=0 ; i<nucleo; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`process ${process.pid} died`)
    })

} else {

    const app = express();
    
    app.set ( "view engine" , "ejs"  );
    app.set ( "views"       , "./src/views" );
    
    app.use ( express.json () );
    app.use ( express.urlencoded ( {extended: true} ) );
    app.use ( cors() );
    app.use ( session ( {
        secret: "secret(1234)",
        cookie: { maxAge: Number(30000) },
        rolling: true,
        resave: true,
        saveUninitialized: true
    } ) );
    
    app.use ( '/api/productos'  , routerProducts );
    app.use ( '/api/carrito'    , routerCart );
    app.use ( '/api/user'       , routerUser );
    app.use ( '/api/info'       , routerInfo );
    app.use ( '/api/random'     , routerRandom );
    
    const PORT = process.argv[2] || 8080;
    console.log(PORT)
    app.listen( PORT , () => console.log('server started'));
}
