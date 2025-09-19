const equalTo = document.querySelector('.equal-to');
const clearButton = document.querySelector('.clear-button');
const userInput = document.querySelector('.user-input');
const answer = document.querySelector('.answer')


function removeBrackets(str) {
    if (str.length == 0) return "";

    let res = "";
    let i = 0;
    while (i < str.length ) {
        if (str[i] == '(') {
            let j = i + 1;
            let op = 0;
            while (str[j] != ')' && op == 0) {
                if (str[j] == '(') op++;
                if (str[j] == ')') op--;
                j++;
            }
            let temp = returnCalculation(str.slice(i+1, j));
            res += temp;
            i = j;
        }
        else res += str[i]
        i++;
    }
    return res
}

function returnCalculation(str) {
    // console.log("here" + str)
    str = str.replaceAll('x', '*');
    str = str.replaceAll(' ', '');
    if (str.includes('(')) {
        str = removeBrackets(str);
    }
    console.log(str)
    let numbers = str.split(/[+\-/*]+/);
    console.log(numbers)
    let result = 0;
    numbers = numbers.map(item => parseFloat(item));
    for (i = 0; i < str.length; i++) {
        if (str[i] == '+') {
            let a = numbers.shift();
            let b = numbers.shift();
            let c = a + b;
            numbers.unshift(c);
        } else if (str[i] == '-') {
            let a = numbers.shift();
            let b = numbers.shift();
            let c = a - b;
            numbers.unshift(c);
        } else if (str[i] == '/') {
            let a = numbers.shift();
            let b = numbers.shift();
            let c = a / b;
            numbers.unshift(c);
        } else if (str[i] == '*' || str[i] == 'x') {
            let a = numbers.shift();
            let b = numbers.shift();
            let c = a * b;
            numbers.unshift(c);
        } 
    }
    result = numbers.shift()
    console.log(result)
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
    answer.textContent = "Result: "
})

const allButtons = document.querySelectorAll('button');

allButtons.forEach((elem) => {
    elem.addEventListener('click', () => {
        if (elem.textContent !== '=' && elem.textContent !== 'C'){
            userInput.value += elem.textContent;
            answer.textContent = "Result: ";
        }
        
    })
})