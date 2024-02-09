'use strict';

//--------------This File is Out of the Project--------------------

const movement=[1,2,3,4,5,-6,-7,-80];

for(let [index,element] of movement.entries())
{
   if(element>0)
   {
    console.log(`Indes:${index+1},You Diposited:${element}`);
   }else{
    console.log(`Index:${index+1},You Withdraw:${Math.abs(element)}`); //Math.abs uses for convert nagetive to absolute number 
   }
}

//forEach function is a higherorder function
console.log('---------------ForEach function arriving--------------');

//forEach passes current element,index,and entire element.
//Continue and break keyword does not work with forEach loop
movement.forEach(function(movement,index,array)
{
 if(movement>0)
 {
   console.log(`Index:${index+1},Array:${array},You Diposited:${movement}`);
 }else{
   console.log(`Index:${index+1},Array:${array},You Withdraw:${Math.abs(movement)}`);
 }
})


////-----------forEach with Maps and Sets---------------///

//Maps
const currency=new Map([
   ['USD','United States dollar'],
   ['TK','Bangladesh Currency'],
   ['RS','Indian Rupee']
]);

currency.forEach(function(value,key,entireMapArray)
{
  console.log(`${key}:${value}`);
});

//Sets
//Sets does not have key or index either
const currencySet=new Set(['USD','TK','EUR','RS']);
currencySet.forEach(function(value,key,entireSetArray)
{
   console.log(`${key}:${value}`);
})
