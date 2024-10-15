const mesa = document.getElementById('mesa');
const emojis = [ '🐒', '🐒', '🐎', '🐎', '🐕', '🐕', '🐈', '🐈', '🐟', '🐟', '🐓', '🐓', '🐫', '🐫', '🐑', '🐑'];
const qtdEmojis = emojis.length;
const ordemDosEmojis = [];
let cartasSubmetidas = [];
const cartasAcertadas = [];

function sortearEmojis() {
    const ids = [];
    for (let i = 0; i < qtdEmojis; i++) ids.push(i);
    for (let i = 0; i < qtdEmojis; i++) {
        const idSorteado = Math.floor(Math.random() * ids.length);
        ordemDosEmojis.push(ids[idSorteado]);
        ids.splice(idSorteado, 1);
    }
}

function virarCarta(id) {
    const carta = document.getElementById(`carta-${id}`);
    carta.className = 'carta-virada';
    carta.textContent = '';
}

function conferirVitoria() {
    if (cartasAcertadas.length === qtdEmojis) {
        alert('Parabéns! Você venceu.');
        location.reload();
    }
}

function conferirCarta(id) {
    const primeiraCartaSubmetida = cartasSubmetidas[0];
    if (id !== primeiraCartaSubmetida) {
        if (emojis[ordemDosEmojis[id]] === emojis[ordemDosEmojis[primeiraCartaSubmetida]]) {
            cartasAcertadas.push(id, primeiraCartaSubmetida);
            conferirVitoria();
        } else {
            setTimeout(() => {
                virarCarta(id);
                virarCarta(primeiraCartaSubmetida);
            }, 200);
        }
        cartasSubmetidas = [];
    } else {
        alert('Você não pode escolher 2 vezes a mesma carta.\nO jogo vai ser reiniciado.');
        location.reload();
    }
}

function revelarCarta(event) {
    const carta = event.target;
    carta.className = 'carta-revelada';
    const id = carta.id.replace('carta-', '');
    carta.textContent = emojis[ordemDosEmojis[id]];
    cartasSubmetidas.push(id);
    if (cartasSubmetidas.length === 2) {
        conferirCarta(id);
    }
}

function criarCarta(id) {
    const carta = document.createElement('div');
    carta.className = 'carta-virada';
    carta.id = `carta-${id}`;
    carta.addEventListener('click', revelarCarta);
    return carta;
}

function porCartasNaMesa() {
    for (let i = 0; i < 16; i++) {
        const carta = criarCarta(i);
        mesa.appendChild(carta);
    }
}

function main() {
    porCartasNaMesa();
    sortearEmojis();
}

main();