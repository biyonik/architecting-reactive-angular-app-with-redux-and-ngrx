var a = 2;

function add(x) {
    a += x;
    return a;
}



function subtract(x) {
    a -= x;
    return a;
}

function multiply(x) {
    a *= x;
    return a;
}

let result = add(5);
console.log(result);

result = subtract(2);
console.log(result);

console.log('variable a last value: ' + a);
