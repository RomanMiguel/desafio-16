import { Router }  from 'express';
import { fork } from "child_process";

const router = Router();

let computo = fork(`./src/routers/calculo.js`);

router.get("/", (req, res) => {
    
    const {cant=100000000} = req.query;
    computo.on("message", (rsdo) => {
        
        res.status(200).send({ rsdo });
        computo.kill();
        computo = fork(`./src/routers/calculo.js`);
    });

    computo.send(cant);
});

export default router