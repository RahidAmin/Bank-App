'use strict';

//--------------This File is Out of the Project--------------------


const arr=['a','b','c','d','e','f'];

//Slice method
console.log(arr.slice(2,5));
console.log(arr.slice(-4,-1));
console.log(arr.slice(1,-2));
console.log([...arr])

//Splice Method

const arr1=['g','h','i','j','k'];

//Splice mutate the original array
console.log(arr1.splice(1,3));

console.log([...arr1]);

//Reverse Method
const arr2=['l','m','n','o','p'];
//Reverse mutate the original array
console.log(arr2.reverse());
console.log(arr2)

//concat method
const letter=arr.concat(arr1).concat(arr2);
console.log(letter);
console.log([...arr,...arr1,...arr2]);

//Join Method
console.log(letter.join(' * '))