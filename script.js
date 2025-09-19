const equalTo = document.querySelector('.equal-to');
const clearButton = document.querySelector('.clear-button');
const userInput = document.querySelector('.user-input');
const answer = document.querySelector('.answer')

function returnCalculation(str) {
    let numbers = str.split(/[+-/*]+/);
    let result = 0;
    numbers = numbers.map(item => parseInt(item));
    for (i = 0; i < str.length; i++) {
        if (str[i] == '+') {
            let a = numbers.shift();
            let b = numbers.shift();
            let c = a + b;
            numbers.unshift(c);
        } else if (str[i] == '-') {
            let a;
        } else if (str[i] == '/') {
            let a;
        } else if (str[i] == '*' || str[i] == 'x') {
            let a;
        } 
    }
    result = numbers.shift()
    return result
}

equalTo.addEventListener('click', () => {
    let value = userInput.value;
    let result = returnCalculation(value);
    answer.textContent = `Result: ${result}`
    userInput.value = "";

})

clearButton.addEventListener('click', () => {
    userInput.value = "";
})