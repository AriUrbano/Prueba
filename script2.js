/**************TEMA 2  ***************/

// Variables principales
const word = "javascript"; // Palabra oculta
let guessedLetters = [];    // Array de letras usadas para adivinar la palabra
let errorCount = 0; // conteo de errores
const maxErrors = 6;    // Número máximo de errores permitidos

// Elementos del DOM
const wordDisplay = document.getElementById('wordDisplay'); // Elemento donde se muestra la palabra
const letterInput = document.getElementById('letterInput'); // Input para ingresar letras
const guessButton = document.getElementById('guessButton'); // Botón para adivinar
const errorCountSpan = document.getElementById('errorCount');   // Elemento donde se muestra el conteo de errores
const usedLettersSpan = document.getElementById('usedLetters'); // Elemento donde se muestran las letras usadas hasta elo momento
const message = document.getElementById('message'); // Mensaje de resultado
const restartButton = document.getElementById('restartButton'); // Botón para reiniciar el juego

// Funciones
// Esta función actualiza la visualización de la palabra oculta, mostrando las letras adivinadas y guiones bajos para las letras no adivinadas.
function updateWordDisplay() {
    let display = '';
    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            display += letter + ' ';
        } else {
            display += '_ ';
        }
    }
    wordDisplay.textContent = display.trim();
}

function handleGuess() {
    function handleGuess() {
        const letter = letterInput.value.toLowerCase();
        letterInput.value = ''; // Limpiar el input después de obtener el valor
        
        // Validar que sea una única letra del alfabeto
        if (!letter || letter.length !== 1 || !letter.match(/[a-zñ]/i)) {
            alert('Por favor ingresa una única letra válida (a-z)');
            return;
        }
        
        // Verificar si la letra ya fue usada
        if (guessedLetters.includes(letter)) {
            alert('Ya usaste esta letra. Prueba con otra diferente.');
            return;
        }
        
        // Agregar la letra a las letras usadas (tanto si es correcta como incorrecta)
        guessedLetters.push(letter);
        usedLettersSpan.textContent = guessedLetters.join(', ');
        
        // Verificar si la letra está en la palabra
        if (word.includes(letter)) {
            // Letra correcta - actualizar la visualización de la palabra
            updateWordDisplay();
        } else {
            // Letra incorrecta - incrementar el contador de errores
            errorCount++;
            errorCountSpan.textContent = errorCount;
        }
        
        // Verificar el estado del juego (ganó o perdió)
        checkGameStatus();
    }
}
// checkGameStatus() verifica el estado del juego
function checkGameStatus() {
    // Revisar si todas las letras fueron adivinadas
    let won = true;
    for (let letter of word) {
        if (!guessedLetters.includes(letter)) {
            won = false;
            break;
        }
    }

    if (won) {
        message.textContent = '¡Ganaste! 🎉';
        guessButton.disabled = true;
        letterInput.disabled = true;
        restartButton.style.display = 'inline-block';
    } else if (errorCount >= maxErrors) {
        message.textContent = `¡Perdiste! 😢 La palabra era: ${word}`;
        guessButton.disabled = true;
        letterInput.disabled = true;
        restartButton.style.display = 'inline-block';
    }
}

// restartGame reinicia el juego
function restartGame() {
    guessedLetters = [];
    errorCount = 0;
    errorCountSpan.textContent = errorCount;
    usedLettersSpan.textContent = '';
    message.textContent = '';
    guessButton.disabled = false;
    letterInput.disabled = false;
    restartButton.style.display = 'none';
    updateWordDisplay();
}

// Eventos
guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', restartGame);

// Inicialización
updateWordDisplay();
