console.log("Hello worlds");


let age =53;
let result = age >= 50
    ?"Senior citizen"
    :age>=18
        ?"Adult"
        :age>=13
            ?"Teenager"
            :"Child";
console.log (result);


function tru(a,b){
    return [a,b,a+b,a-b,a*b,b*a,b**a,a**b,a/b,b/a,a%b,b%a];
}
let resul = tru(3,4);
console.log(resul);

let trum = function (c,b,x){
    return[c,b,x, c-x-b, c*b*x, c/b/x]
}
console.log(trum(2,3,4));





let csd= function(i,j,k){
    return this.csd
}
