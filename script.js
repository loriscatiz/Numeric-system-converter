
//accetta in ingresso un decimale e restituisce un binario, ottale o esadecimale
function decimalToBase(a, base) {
    if (a == 0) return '0'; // Caso base per il numero 0
    let remainders = [];
    const digits = '0123456789ABCDEF'; // Mappa per convertire resti in cifre (anche per basi > 10)

    while (a > 0) {
        const remainder = a % base; // Calcola il resto
        remainders.push(digits[remainder]); // Aggiungi la cifra corrispondente (0-9 o A-F)
        a = Math.floor(a / base);  // Aggiorna 'a' dividendo per la base
    }

    // Unisci i resti al contrario per formare il numero nella base desiderata
    return remainders.reverse().join('');
}

//accetta in ingresso un ImageBitmapRenderingContext, ottale o esadecimale e restituisce un decimale
function baseToDecimal(a, base) {
    if (a == 0) return '0';
 
    const numLength = a.length;
    let result = 0;
    
    for (let i = 0; i < numLength; i++) {
        let char = a.charAt(i); // Ottieni il carattere corrente
        let value; // Variabile per il valore numerico del carattere

        if (char >= 'A') { // Se è una lettera
            value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        } else { // Se è un numero
            value = parseInt(char);
        }

        // Aggiorna il risultato con il contributo di questa cifra
        result += value * Math.pow(base, numLength - 1 - i);
    }
   
    return result; // Restituisci il risultato finale
}

function removeLeadingZero(input) {
    if (input.value.length > 1 && input.value.startsWith("0")) {
        input.value = input.value.slice(1); // Rimuove lo zero iniziale
    }
}


const form = document.querySelector("#form")

let decimal = document.querySelector("#decimal");
let binary = document.querySelector("#binary");
let octal = document.querySelector("#octal");
let hexadecimal = document.querySelector("#hexadecimal");
let errorDecimal = document.querySelector('#error-decimal')
let errorBinary = document.querySelector('#error-binary')
let errorOctal = document.querySelector('#error-octal')
let errorHexadecimal = document.querySelector('#error-hexadecimal')
let previousDecimalValue = decimal.value
let previousBinaryValue = binary.value
let previousOctalValue = octal.value
let previousHexadecimalValue = hexadecimal.value

function updateFromDecimal(){
    removeLeadingZero(decimal)
    if(decimal.value==false){decimal.value = "0"}
    if (/^[0-9]*$/.test(decimal.value)) {
        // Se l'input è valido (solo 0 e 1)
        errorDecimal.classList.remove('error-visible')
        errorBinary.classList.remove('error-visible')
        errorOctal.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        previousDecimalValue = decimal.value; // Aggiorna il valore valido precedente
        binary.value = decimalToBase(decimal.value, 2); // Aggiorna il campo decimale
        octal.value = decimalToBase(decimal.value, 8)
        hexadecimal.value = decimalToBase(decimal.value, 16)
        previousBinaryValue = binary.value; // Aggiorna il valore valido precedente
        previousOctalValue = octal.value; // Aggiorna il valore valido precedente
        previousHexadecimalValue = hexadecimal.value; // Aggiorna il valore valido precedente
    } else {
        // Se l'input è invalido
        console.error(
            `${decimal.value} is not a valid decimal number. A decimal number consists of digits [0-9].`
          );
          
        errorBinary.classList.remove('error-visible')
        errorOctal.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        errorDecimal.classList.add('error-visible')
        decimal.value = previousDecimalValue; // Ripristina il valore precedente
    }
}
function updateFromBinary(){
    removeLeadingZero(binary)
    if(binary.value==false){binary.value = "0"}
    if (/^[01]*$/.test(binary.value)) {
        errorDecimal.classList.remove('error-visible')
        errorBinary.classList.remove('error-visible')
        errorOctal.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        previousBinaryValue = binary.value; // Aggiorna il valore valido precedente
        decimal.value = baseToDecimal(binary.value, 2); // Aggiorna il campo decimale
        octal.value = decimalToBase(decimal.value, 8)
        hexadecimal.value = decimalToBase(decimal.value, 16)
        previousDecimalValue = decimal.value; // Aggiorna il valore valido precedente
        previousOctalValue = octal.value; // Aggiorna il valore valido precedente
        previousHexadecimalValue = hexadecimal.value;
    } else {
        // Se l'input è invalido
        console.error(
            `${binary.value} is not a valid binary number. A binary number consists of only the digits [0] and [1].`
          );          
        errorDecimal.classList.remove('error-visible')
        errorOctal.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        errorBinary.classList.add('error-visible')
        binary.value = previousBinaryValue; // Ripristina il valore precedente
    }
}
function updateFromOctal(){
    removeLeadingZero(octal)
    if(octal.value==false){octal.value = "0"}
    if (/^[0-7]*$/.test(octal.value)) {
        errorDecimal.classList.remove('error-visible')
        errorBinary.classList.remove('error-visible')
        errorOctal.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        previousOctalValue = octal.value; // Aggiorna il valore valido precedente
        decimal.value = baseToDecimal(octal.value, 8); // Aggiorna il campo decimale
        binary.value = decimalToBase(decimal.value, 2)
        hexadecimal.value = decimalToBase(decimal.value, 16)
        previousDecimalValue = decimal.value; // Aggiorna il valore valido precedente
        previousBinaryValue = binary.value; // Aggiorna il valore valido precedente
        previousHexadecimalValue = hexadecimal.value;
    } else {console.error(
        `${octal.value} is not a valid octal number. An octal number consists of digits [0-7].`
      );      
        errorDecimal.classList.remove('error-visible')
        errorBinary.classList.remove('error-visible')
        errorHexadecimal.classList.remove('error-visible')
        errorOctal.classList.add('error-visible')
        octal.value = previousOctalValue; // Ripristina il valore precedente
    }

}
function updateFromHexadecimal(){
    removeLeadingZero(hexadecimal)
        if(hexadecimal.value==false){hexadecimal.value = "0"}
        hexadecimal.value = hexadecimal.value.toUpperCase();
        if (/^[0-9A-F]*$/.test(hexadecimal.value)) {
            errorDecimal.classList.remove('error-visible')
            errorBinary.classList.remove('error-visible')
            errorOctal.classList.remove('error-visible')
            errorHexadecimal.classList.remove('error-visible')
            previousHexadecimalValue = hexadecimal.value; // Aggiorna il valore valido precedente
            decimal.value = baseToDecimal(hexadecimal.value, 16); // Aggiorna il campo decimale
            binary.value = decimalToBase(decimal.value, 2)
            octal.value = decimalToBase(decimal.value, 8)
            previousDecimalValue = decimal.value; // Aggiorna il valore valido precedente
            previousBinaryValue = binary.value; // Aggiorna il valore valido precedente
            previousOctalValue = octal.value;
        } else {
            // Se l'input è invalido
            console.error(
                `${hexadecimal.value} is not a valid hexadecimal number. A hexadecimal number consists of digits [0-9] and letters [A-F].`
              );              
            errorDecimal.classList.remove('error-visible')
            errorBinary.classList.remove('error-visible')
            errorOctal.classList.remove('error-visible')
            errorHexadecimal.classList.add('error-visible')
            hexadecimal.value = previousHexadecimalValue; // Ripristina il valore precedente
        }
}

decimal.addEventListener("input", updateFromDecimal)
binary.addEventListener("input", updateFromBinary)
octal.addEventListener("input", updateFromOctal)
hexadecimal.addEventListener("input",updateFromHexadecimal)

let plus = document.querySelectorAll(".plus")
let minus = document.querySelectorAll(".minus")

plus.forEach(function(button){
    button.addEventListener("click", ()=>{
        decimal.value++
        updateFromDecimal()
    })
})
minus.forEach(function(button){
    button.addEventListener("click", ()=>{
        decimal.value--
        updateFromDecimal()
    })
})
let info = document.querySelectorAll(".info")
let close = document.querySelectorAll(".close")
let modal = document.querySelectorAll(".modal")

for(let i = 0; i < info.length; i++){
    info[i].addEventListener("click", ()=>{
        modal[i].showModal()
    })
    close[i].addEventListener("click", ()=>{
   
        modal[i].setAttribute("closing", "");
    
        modal[i].addEventListener(
          "animationend",
          () => {
            modal[i].removeAttribute("closing");
            modal[i].close();
          },
          { once: true }
        );
    })
}




