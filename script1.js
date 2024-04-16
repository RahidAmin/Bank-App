'use strict';
const account1 = {
    owner: 'Rahid Amin',
    movement: [100, 200, 300, -400, -500, 600, .85],
    interestRate: 1.2,
    pin: 111,
}

const account2 = {
    owner: 'Mujibul Haque',
    movement: [393, 459, -284, 398, -88],
    interestRate: 1.4,
    pin: 222
}

const account3 = {
    owner: 'Shanto Mota',
    movement: [101, 394, 430, -222, 82],
    interestRate: 1.6,
    pin: 333,
}

const account = [account1, account2, account3];

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

const displayMovements = function (movements, sort = false) {

    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          
          <div class="movements__value">${mov} $</div>
        </div>`;


        containerMovements.insertAdjacentHTML('afterbegin', html);
    });



}

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movement.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance.toFixed(2)} $`;
}


//Calculate Display Summary
const calcDisplaySummary = function (acc) {
    const incomes = acc.movement.filter(mov => mov > 0).reduce((acc, mov) => mov + acc, 0);
    labelSumIn.textContent = `${incomes} $`;

    const out = acc.movement.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)} $`;

    const interest = acc.movement.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => {
        console.log(arr);
        return int > 1;
    }).reduce((acc, mov) => acc + mov, 0);


    labelSumInterest.textContent = `${interest.toFixed(2)}$`;

}



const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.userName = acc.owner.toLowerCase().split(' ').map((name1) => name1[0]).join('');
    })

}

createUserName(account);


const updateUi = function (acc) {
    //Display Movements
    displayMovements(acc.movement);

    //Display balance
    calcDisplayBalance(acc);

    //Display summary
    calcDisplaySummary(acc);
}


//Event Handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    //prevent form from submitting`
    e.preventDefault();
    console.log('Clicked')

    currentAccount = account.find(function (acc) {

        return acc.userName === inputLoginUsername.value;
    })
    console.log(currentAccount)

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        //Display UI and message
        labelWelcome.textContent = `Welcome Back,${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100;

        //Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        //Update Ui
        updateUi(currentAccount);
    }

})

btnTransfer.addEventListener('click', function (event) {
    event.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAccount = account.find(function (acc) {
        return acc.userName === inputTransferTo.value;
    })
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();

    if (amount > 0 && currentAccount.balance >= amount && receiverAccount && receiverAccount?.userName !== currentAccount.userName) {
        //Doing the Transfer
        currentAccount.movement.push(-amount);
        receiverAccount.movement.push(amount);

        //Update UI
        updateUi(currentAccount);
    }

})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movement.some(function (mov) {
        return mov >= amount * .1;
    })) {
        currentAccount.movement.push(amount);
        updateUi(currentAccount);

        inputLoanAmount.value = '';
        inputLoanAmount.blur();

    }

})

btnClose.addEventListener('click', function (e) {


    e.preventDefault();
    if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
        //findInd also returns the full index
        const index = account.findIndex(function (acc) {
            return acc.userName === currentAccount.userName;
        })
        //delete account 
        account.splice(index, 1);

        //hide ui
        containerApp.style.opacity = 0;

    }
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();


})

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movement, !sorted);
    sorted = !sorted;
})

////___________________________Out of the project__________________________________////

//math and rounding

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));
console.log(Math.max(1, 2, 36, 4, 3, 5, 6));
console.log(Math.max(1, 3, 5, 6, '37', 0, 22, 4));//type coercion
console.log(Math.min(33, 5, 44, 64, 1, 44, 642,));
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 10) + 1);

const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}
console.log(randomNumber(10, 5));

console.log(Math.round(23.4));
console.log(Math.round(23.5));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.8));

console.log(Math.trunc(23.9));
console.log(Math.floor(23.8));
console.log(Math.trunc(-23.9));
console.log(Math.floor(-23.8));//better for most of the case

//Rounding decimals
console.log((2.3).toFixed(0))

//--------The remainder Operator---//
//important
labelBalance.addEventListener('click', function () {
    [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
        if (i % 2 === 0) {
            row.style.backgroundColor = 'green';
        }
    })

})
console.log([...document.querySelectorAll('.movements__row')]);

//Bigint

const x = 10093n;
console.log(x)

///------------Dates and times-----------/////

const now = new Date();
console.log(now)
// console.log(new Date(account1.movementDates[0]))
console.log(new Date('October 26, 1998'));
console.log(new Date(2025, 9, 10, 8, 26, 30))

const future = new Date(2099, 10, 26, 44, 30);
console.log(future.getFullYear())
console.log(`${future.getHours()},${future.getMinutes()},${future.getSeconds()}`)
console.log(`${future.getDate()}/${future.getMonth()}/${future.getFullYear()}`)
console.log(future.toISOString());
console.log(Date.now())
console.log(new Date(1711718254903))

future.setFullYear(2100);
console.log(future)

/////------------Operations with dates--------------////

const future1=new Date(2024,4,5,3,50);
console.log(+(future1))


const calcDaysPassed=function(date1,date2)
{
 return Math.abs((date2-date1)/(1000*60*60*24));
}

const days1=calcDaysPassed(new Date(2023,4,5),new Date(2021,4,5));
console.log(days1);

///-----------Internationalizing ApI------------//////


//From Youtube
const dateForBd=new Date();

const dateForBdIntl=new Intl.DateTimeFormat('bn-BD',{
    year:'numeric',
    month:'numeric',
    day:'numeric',
    hour:'numeric',
    minute:'numeric',
}).format(dateForBd);
console.log(dateForBdIntl);


//for individuls
const dateAndTimeForMyBrowser=new Date();
const getLocaleForBrowse=navigator.language;
const optionForPc={
    day:'numeric',
    month:'long',
    year:'numeric',
    hour:'numeric',
    minute:'numeric',
}

const dateForPC=new Intl.DateTimeFormat(getLocaleForBrowse,optionForPc).format(dateAndTimeForMyBrowser);
console.log(dateForPC)

//For number
const num1=22333444;
const option1={
    style:'currency',  //here can use unit,percent and currency..
    currency:'USD',
    // useGrouping:false
}

const initNumbers=new Intl.NumberFormat('en-US',option1).format(num1);
console.log(initNumbers)




//internationalizing number
const num=123456789.45;

const option={
    style:'unit',
    unit:'mile-per-hour',
}

console.log(new Intl.NumberFormat('bn-BD',option).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language).format(num));


///-----------Set Timeout--------------///

setTimeout(() => {
    console.log('Set Time Out')
}, 5000);

console.log('Waiting.....');

const ingredients=['olives','spinach'];


const pizzaTimeOut=setTimeout((ing1,ing2)=>
{
 console.log(`Here is your Pizza..with ${ing1} and ${ing2}`)
},7000,...ingredients);

if(ingredients.includes('spinach'))
{
    clearTimeout(pizzaTimeOut);   //in this case pizzaTimeOut will not work
}

///----Set Interval---------////

// setInterval(()=>
// {
//   const now=new Date();
//   console.log(now.getSeconds());
// },1000)