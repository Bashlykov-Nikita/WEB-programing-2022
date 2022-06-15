
let a = ''; //first number
let b = ''; //second numer
let sign =''; // opertion sign
let finish = false; // 

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// display

const out = document.querySelector('.calc-screen p');
const historyOut = document.querySelector('.history p');

function clearAll(){
    a = ''; // first number and resault
    b = ''; //second number
    sign ='' // sign
    finish = false;
    out.textContent = 0;
    historyOut.textContent = '';
    document.querySelector('#main_screen').style.fontSize='4rem';
}
function del(){
    if(out.textContent === a){
        if(a.length === 1){
            out.textContent = 0;
            a = '';
        } else{
        out.textContent = a.slice(0, -1);
        a = a.slice(0, -1);
        }
    }else if(out.textContent === b){
        if(b.length === 1){
            out.textContent = 0;
            b = '';
        } else{
        out.textContent = b.slice(0, -1);
        b = b.slice(0, -1);
        }
    }else return;
    
}
function plusMinus(){
    if(out.textContent === a){
        if(a == 0){
            return;
        } else if(a[0] === '-'){
            a = a.replace('-','') 
            out.textContent =a;
        }else{
        a = '-' + a;
        out.textContent = a;
        }
    }else if(out.textContent === b){
        if(b == 0){
            return;
        } else if(b[0] === '-'){
            b = b.replace('-','') 
            out.textContent =b;
        }else{
        b = '-' + b;
        out.textContent = b;
        }
    }else return;
}
function factorial(num) {
    if (num < 0) 
        return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorial(num - 1));
    }
}
function sin(){
    if(out.textContent === a){
        //a = "sin("+a+")";
        out.textContent = "sin("+a+")";
        //TODO: Why its not working?
        // for(let i = 0; i < 3; i++){
        //     a +=(Math.pow(-1, i) * Math.pow(a, (2*i + 1)))/(factorial(2*i + 1))
        // }
        let buff = a;        
        a = buff - Math.pow(buff, 3)/factorial(3) + Math.pow(buff, 5)/factorial(5)- Math.pow(buff, 7)/factorial(7) + Math.pow(buff, 9)/factorial(9);
        a = a +''; 
        a = a.slice(0, 6) 
    }else if(out.textContent === b){
        //FIXME: b cannot be summed to the a after 
        out.textContent = "sin("+b+")";
        b = b - Math.pow(b, 3)/factorial(3) + Math.pow(b, 5)/factorial(5)- Math.pow(b, 7)/factorial(7) + Math.pow(b, 9)/factorial(9);
        b = b +''; 
        b = b.slice(0, 6)
    }else return;
}
function cos(){
    if(out.textContent === a){
        //a = "sin("+a+")";
        out.textContent = "cos("+a+")";
        //TODO: Why its not working?
        // for(let i = 0; i < 3; i++){
        //     a +=(Math.pow(-1, i) * Math.pow(a, (2*i + 1)))/(factorial(2*i + 1))
        // }        
        a = 1 - Math.pow(a, 2)/factorial(2) + Math.pow(a, 4)/factorial(4)- Math.pow(a, 6)/factorial(6) + Math.pow(a, 8)/factorial(8);
        a = a +''; 
        console.log(a);
        a = a.slice(0, 6) 
    }else if(out.textContent === b){
        //FIXME: b cannot be summed to the a after 
        out.textContent = "sin("+b+")";
        b = 1 - Math.pow(b, 2)/factorial(2) + Math.pow(b, 4)/factorial(4)- Math.pow(b, 6)/factorial(6) + Math.pow(b, 8)/factorial(8);
        b = b +''; 
        b = b.slice(0, 6)
    }else return;
}

document.querySelector('.sin').onclick = sin;
document.querySelector('.cos').onclick = cos;
document.querySelector('.del').onclick = del;
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.plus-minus').onclick = plusMinus;

document.querySelector('.buttons').onclick = (event) =>{
    // not a button
    if(!event.target.classList.contains('btn')) return;
    // pressed ac
    if(event.target.classList.contains('ac')) return;
    // pressed del
    if(event.target.classList.contains('del')) return;
    // pressed sign change
    if(event.target.classList.contains('plus-minus')) return;
    if(event.target.classList.contains('sin')) return;
    if(event.target.classList.contains('cos')) return;
    out.textContent = '';
    // get pressed button
    const key = event.target.textContent;

    // if digit is pressed
    if(digit.includes(key)){
        
        if(b === '' && sign === ''){
            a += key;
            if(a.length > 7){
                document.querySelector('#main_screen').style.fontSize='3rem';
            } 

            out.textContent = a;
        }
        else if(a !== '' && b !== '' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else{
            b += key;
            if(b.length > 7){
                document.querySelector('#main_screen').style.fontSize='3rem';
            } 
            out.textContent = b;
        }
        return;
    }

    //if sign is pressed
    if(action.includes(key)){
        sign = key;
        document.querySelector('#main_screen').style.fontSize='4rem';
        out.textContent = sign;
        if(a.length > 7){
            historyOut.textContent = a.slice(0, 6) + "..." + sign;
        }else historyOut.textContent = a + " " + sign;
        return;
    }

    //if =
    if(key === '='){
        if(b === '') b = a;
        switch(sign){
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if(b === '0'){
                    out.textContent = 'Error';
                    a='';
                    b= '';
                    sign='';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        a.toString();
        if(b.length > 7){
            historyOut.textContent += " " + b.slice(0, 6) + "...";
        }else historyOut.textContent += " " + b;
        a += "";
        if(a.length > 7){
            document.querySelector('#main_screen').style.fontSize='3rem';
            out.textContent = a;
        } else out.textContent = a;

    }
}