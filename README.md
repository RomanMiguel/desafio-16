
# comandos:

## cluster:
    npm run cluster

## forever sin cluster:
    npm run forever

## pm2 fork:
    npm run pmfork

## pm2 cluster:
    npm run pmcluster



## configuracion que utilize con NGINX esta es:

    events{
    }
    
    http {
        upstream app {
            server 127.0.0.1:8082;
            server 127.0.0.1:8084;
            server 127.0.0.1:8085;
        }
        server{
            listen  2000;
            location / {
                proxy_pass http://app;
            }
        }
    }