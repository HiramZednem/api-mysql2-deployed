
function saludo(nombre) {
    console.log(`Hola ${nombre}`);
}


function personaSaludaOtraPersona( nombre, funcionSaludo) {
    console.log('Hola soy una persona');
    funcionSaludo(nombre);
}

personaSaludaOtraPersona('Diego', saludo);