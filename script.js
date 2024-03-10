'use strict';

//Data

const account1={
    owner:'Rahid Amin',
    movement:[100,200,300,-400,-500,600],
    interestRate:1.2,
    pin:111,
}

const account2={
    owner:'Mujibul Haque',
    movement:[393,459,-284,398,-88],
    interestRate:1.4,
    pin:222
}

const account3={
    owner:'Shanto Mota',
    movement:[101,394,430,-222,82],
    interestRate:1.6,
    pin:333,
}

const account=[account1,account2,account3];

//Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//----------Number 8:Creating Dom elements-------------

const displayMovements=function(movements)
{
    //it will erase the existing class of movement in html file.
    // console.log(containerMovements.innerHTML);
    containerMovements.innerHTML='';
    
    movements.forEach(function(mov,i)
    {
        const type=mov>0?'deposit':'withdrawal';
        const html=`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        
        <div class="movements__value">${mov}</div>
      </div>`;

      //here insertAdjacentHTML using for row looping
      containerMovements.insertAdjacentHTML('afterbegin',html);
    });

    

}

displayMovements(account1.movement);
// console.log(containerMovements.innerHTML) //Important


//----------11:The Map Method(Out of the Project)------------

const movements=[100,200,300,400,500];
const eurToUSD=1.1;
const movementsUSD=movements.map(function(mov)
{
  return mov*eurToUSD;
});
const movementsUSD1=movements.map((mov)=>
{
  return mov*eurToUSD;
});
console.log(movements);
console.log(movementsUSD);
console.log(movementsUSD1)

const movementsUsdFor=[];
for(const mov of movements)
{
    movementsUsdFor.push(mov*eurToUSD);
}
console.log(movementsUsdFor);

const movementDescriptions=movements.map((mov,i,arr)=>
{
    return `movement is:${mov},Index:${i+1},Array:${arr}`;
});

console.log(movementDescriptions);

//---12:Computing Usernames

//const user='Rahid Amin siddique';

//This is my Method
// const userName=user.toLocaleLowerCase().split(' ');

// const userNameArr=[];
// for(const x of userName)
// {
//     let y=x[0];
//     userNameArr.push(y);

// }
// console.log(userNameArr.join(''))

//For Single owner name's return
// const createUserName=function(user)
// {
//     const userName=user.toLowerCase().split(' ').map(name=>name[0]).join('');
//     return userName;
// }

// console.log(createUserName(account2.owner ))

//computing username and add it to the the account array(side effect).

const createUserName=function(accs)
{
    accs.forEach(function(acc)
    {
      acc.userName=acc.owner.toLowerCase().split(' ').map((name1)=>name1[0]).join('');
    })

}

createUserName(account)
console.log(account)