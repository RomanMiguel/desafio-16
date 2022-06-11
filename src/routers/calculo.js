function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function calculo(cant) {
    const numeros = [];
    
    for (let i = 0; i < cant; i++) {
        numeros.push(getRandomInt(1, 1000));
    }

    return numeros;
  }
  
  process.on("message", (cant) => {
    const resultado = calculo(cant);
    process.send(resultado);
  });