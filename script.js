'use strict';

//Data

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
  //it will erase the existing class of movement in html file.
  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';

  //movements.slice.sort() it will make a copy of movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        
        <div class="movements__value">${mov} $</div>
      </div>`;

    //here insertAdjacentHTML using for row looping
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });



}


// console.log(containerMovements.innerHTML) //Important


//calculate and display balance

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


  labelSumInterest.textContent = `${interest.toFixed(2)}$`; //here toFixed used to write 2 numbers after dot 

}




//computing username and add it to the the account array(side effect).

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map((name1) => name1[0]).join('');
  })

}

createUserName(account);
console.log(account);

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



///---------These codes are out of the project-------------////
//----------11:The Map Method(Out of the Project)------------

const movements = [100, 200, 300, 400, 500];
const eurToUSD = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUSD;
});
const movementsUSD1 = movements.map((mov) => {
  return mov * eurToUSD;
});
console.log(movements);
console.log(movementsUSD);
console.log(movementsUSD1)

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUSD);
}
console.log(movementsUsdFor);

const movementDescriptions = movements.map((mov, i, arr) => {
  return `movement is:${mov},Index:${i + 1},Array:${arr}`;
});

console.log(movementDescriptions);

//---12:Computing Usernames------------////

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



//-----------------The Filter Method..-------///
//it only returns the values which fulfill the specific requirements.
const movement1 = [100, 200, 300, -300, -200, -100];
const deposits1 = movement1.filter(function (mov) {
  return mov > 0;
})
console.log(deposits1)

// const depositForForOfLoop=[];
// for(const mov of movement1)
// {
//     if(mov>0)
//     {
//         depositForForOfLoop.push(mov)
//     }
// }
// console.log(depositForForOfLoop)

const withdrawals1 = movement1.filter(function (mov) {

  return mov < 0;
})
console.log(withdrawals1);

//---------------The Reduce Method......./////
//this method returns one single value
//Accumulator exists in reduce method
const movement2 = [100, 200, 300, 400, -300, -200, -100];

const balance = movement2.reduce(function (accumulator, cur, i, arr) {
  console.log(`${i}:${accumulator}`)
  return accumulator + cur;

}, 100)
//here 100 is the initial value of accumulator

console.log(balance);

//Max Value

const maxBalance = movement2.reduce(function (acc, mov) {

  if (acc > mov) {
    return acc;
  }
  else {
    return mov;
  }

}, movement2[0]);
console.log(maxBalance)

///-------The Magic of Chaining------------////
const movement3 = [100, 200, 300, 400, -300, -200, -100];
const usdToTaka = 109.73;

//pipeline
const totalDepositeTaka = movement3.filter(function (mov) {
  return mov > 0
}).map(function (mov) {
  return mov * usdToTaka;
}).reduce(function (acc, mov) {
  return acc + mov;
}, 0)
console.log(totalDepositeTaka);

//-------------The Find Method--------------------////

//find method returns the first and only one value of an array which fulfill the condition
//it returns value not array

const firstWithdrawl = movement3.find(function (mov) {
  return mov < 0
})
console.log(firstWithdrawl);

//important

const myAccount = account.find(function (acc) {
  //Find an object in an arry by one of it's property name
  return acc.owner === 'Rahid Amin';
})

console.log(account);
console.log(myAccount);

//--------------Splice Method--------------///

const months = ['jan', 'march', 'april', 'may', 'july', 'aug'];

//insert feb in months array
months.splice(1, 0, 'feb');
console.log(months);

//remove july and add june in months
months.splice(5, 1, 'june');
console.log(months);
//only remove aug from months
months.splice(6, 1);
console.log(months)

///-------------------Some and Every--------------------////
const movement4 = [150, 250, 350, 450, -550, -650];
//returns boolean value
//Equality
console.log(movement4.includes(450));
//----Some--
console.log(movement4.some(mov => mov === 450));
//returns boolean value
//Condition
const anyDeposites = movement4.some(mov => mov > 0)
console.log(anyDeposites)
//---Every--
const movement5 = [100, 300, 500, 700];
console.log(movement5.every(function (mov) {
  return mov > 0;
}))

///------------------flat and flatMap------------------////
//flat
const arr2 = [1, 2, [3, 4, 5], 6, [7, 8], 9];
console.log(arr2.flat());//flat(1) is default

const arr3 = [[1, 2, [3, 4], 5], 6, 7, [8, [9, 10], 11], 12, 13];
console.log(arr3.flat(2));

const allMovements = account.map(function (mov) {
  return mov.movement;
})
console.log(allMovements)

const allMovementsWithFlat = allMovements.flat();
console.log(allMovementsWithFlat)

const overallBalance = allMovementsWithFlat.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//Chining method

const overallBalanceUsingChaining = account.map(mov => mov.movement).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceUsingChaining);

//flatMap
const overallBalanceUsingFlatMap = account.flatMap(mov => mov.movement).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceUsingFlatMap);

//--------------Sorting Array--------------////////
//sorting based on string

const movement6 = [100, -200, -600, 500, 300, -344, 450, 800];

const letters = ['abc', 'xyz', 'def', 'ghi', 'jkl']
console.log(letters)
letters.sort();
console.log(letters)
// console.log(movement6.sort());

//----Most Important----
//return<0, A, B(keep order)
//return>0, B, A(switch order)

//Ascending order
movement6.sort((a, b) => {
  if (a < b) return -1;

  if (a > b) return 1;

})

console.log(movement6);
movement6.sort((a, b) => a - b);
console.log(movement6)

//Descending Order
movement6.sort((a, b) => {
  if (a < b) return 1;

  if (a > b) return -1;

})
console.log(movement6)

movement6.sort((a, b) => b - a)
console.log(movement6);

//-----------Creating and filling arrays------------//

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
const newArray = new Array(7);
console.log(newArray);
// newArray.fill(1)
// console.log(newArray);
// newArray.fill(1,3);
// console.log(newArray)

newArray.fill(1, 3, 5);
console.log(newArray);

const arr = [8, 9, 10, 11, 12, 13, 14, 15];
arr.fill('fill', 3, 6);
console.log(arr);

//Array.from
const x = Array.from({ length: 7 }, () => 1);
console.log(x);

const y = Array.from({ length: 7 }, (_, i) => i + 1); //cur is not uses here so we used throw away(_)
console.log(y)

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(document.querySelectorAll('.movements__value'), (el) => Number(el.textContent.replace('$', '')));

  // console.log(movementUI.map(el=>el.textContent.replace('$','')))
  console.log(movementUI)

  const movemenUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movemenUI2)
})

///----------------Array Methods Practice------------/////

const bankDepositeSum = account.map((mov) => mov.movement).flat().filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositeSum)

// const bankDepositeAtleast200=account.flatMap((mov)=>mov.movement).filter((mov)=>mov>=200).length;
// console.log(bankDepositeAtleast200)

const bankDepositeAtleast200 = account.flatMap((mov) => mov.movement).reduce((acc, mov) => mov >= 200 ? acc + 1 : acc, 0);
console.log(bankDepositeAtleast200)

const { deposits, withdrawals } = account.map((mov) => mov.movement).flat().reduce((acc, mov) => {
  // mov>0?(acc.deposits=mov+acc.deposits):(acc.withdrawals=mov+acc.withdrawals)
  acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
  return acc;
}, { deposits: 0, withdrawals: 0 })
console.log(deposits, withdrawals);

//convert title case
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'the', 'of', 'in', 'an', 'for', 'or', 'with', 'and'];
  const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');

  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a boy wiTh some type Of supeR poWer'));
