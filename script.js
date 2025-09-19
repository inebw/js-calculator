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
    
    if (result - parseInt(result) == 0) {
        return parseInt(result)
    }

    return result.toFixed(2)
}

function darkenColor(str) {
    str = str.replaceAll('rgb(', '');
    str = str.replaceAll(' ', '');
    str = str.replaceAll(')', '');
    
    let arr = str.split(',');
    if (arr.includes('255')) {
        return lightenColor(arr)
    }
    arr = arr.map(item=> {
        let col = +item + 50;
        col = col > 255 ? 255 : col
        return col
    });
    newStr = "rgb("
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            newStr += arr[i] + ')'
        } else {
            newStr += arr[i] + ", ";
        }
    }
    return newStr
}

function lightenColor(arr) {
    arr = arr.map(item=> {
        let col = +item - 50;
        col = col > 255 ? 255 : col
        return col
    });
    newStr = "rgb("
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            newStr += arr[i] + ')'
        } else {
            newStr += arr[i] + ", ";
        }
    }
    return newStr
}

equalTo.addEventListener('click', () => {
    let value = userInput.value;
    if (value == '') {
        answer.textContent = 'Enter something bruh'
        return
    }
    let result = returnCalculation(value);
    answer.textContent = `Result: ${result}`
    userInput.value = "";

})

clearButton.addEventListener('click', () => {
    userInput.value = "";
    answer.textContent = "Input Cleared!"
})

const allButtons = document.querySelectorAll('button');

allButtons.forEach((elem) => {
    elem.addEventListener('click', () => {
        const currValue = userInput.value
        if (elem.textContent == '.') {
            op = 0
            cl = 0
            for (let i = 0; i < currValue.length; i++) {
                if (op > 0) {
                    if (
                        currValue[i] == '+' ||
                        currValue[i] == '-' ||
                        currValue[i] == '/' ||
                        currValue[i] == 'x' 
                    ) {
                        cl++
                    }
                }
                if (currValue[i] == '.') op++;
            }
            if (op > cl) return
        }
        
        if (elem.textContent !== '=' && elem.textContent !== 'C'){
            userInput.value += elem.textContent;
            answer.textContent = "Keep on typing!";
        }
        
    })
})

let bg; 
allButtons.forEach((elem) => {
    elem.addEventListener('mouseover', (e) => {
        bg = window.getComputedStyle(elem).backgroundColor
        elem.style.backgroundColor = darkenColor(bg);
    })
})

allButtons.forEach((elem) => {
    elem.addEventListener('mouseout', (e) => {
        elem.style.backgroundColor = bg
    })
})