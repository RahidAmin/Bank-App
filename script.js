'use strict';

//Data

const account1={
    owner:'Rahid Amin',
    movement:[100,200,300,-400,-500,600,.85],
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
        
        <div class="movements__value">${mov} $</div>
      </div>`;

      //here insertAdjacentHTML using for row looping
      containerMovements.insertAdjacentHTML('afterbegin',html);
    });

    

}


// console.log(containerMovements.innerHTML) //Important


//calculate and display balance

const calcDisplayBalance=function(acc)
{
 acc.balance=acc.movement.reduce((acc,mov)=>acc+mov,0);
 labelBalance.textContent=`${acc.balance.toFixed(2)} $`;
}


//Calculate Display Summary
const calcDisplaySummary=function(acc)
{
 const incomes=acc.movement.filter(mov=>mov>0).reduce((acc,mov)=>mov+acc,0);
 labelSumIn.textContent=`${incomes} $`;

 const out=acc.movement.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
 labelSumOut.textContent=`${Math.abs(out)} $`;

 const interest=acc.movement.filter(mov=>mov>0).map(deposit=>(deposit*acc.interestRate)/100).filter((int,i,arr)=>
 {
  console.log(arr);
  return int>1;
 }).reduce((acc,mov)=>acc+mov,0);

 
 labelSumInterest.textContent=`${interest.toFixed(2)}$`; //here toFixed used to write 2 numbers after dot 
 
}




//computing username and add it to the the account array(side effect).

const createUserName=function(accs)
{
    accs.forEach(function(acc)
    {
      acc.userName=acc.owner.toLowerCase().split(' ').map((name1)=>name1[0]).join('');
    })

}

createUserName(account);
console.log(account);

const updateUi=function(acc)
{
  //Display Movements
  displayMovements(acc.movement);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
}


//Event Handler
let currentAccount;
btnLogin.addEventListener('click',function(e)
{
  //prevent form from submitting`
  e.preventDefault();
  console.log('Clicked')

  currentAccount=account.find(function(acc)
  {
    
   return acc.userName===inputLoginUsername.value;
  })
  console.log(currentAccount)

  if(currentAccount?.pin===Number(inputLoginPin.value))
  {
    //Display UI and message
    labelWelcome.textContent=`Welcome Back,${currentAccount.owner.split(' ')[0]}` 
    containerApp.style.opacity=100;

    //Clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
  
    //Update Ui
  updateUi(currentAccount);
  }
  
})

btnTransfer.addEventListener('click',function(event)
{
  event.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAccount=account.find(function(acc)
  {
    return acc.userName=== inputTransferTo.value;
  })
   inputTransferAmount.value=inputTransferTo.value='';
   inputTransferAmount.blur();

  if(amount>0 && currentAccount.balance>=amount && receiverAccount && receiverAccount?.userName !== currentAccount.userName)
  {
    //Doing the Transfer
    currentAccount.movement.push(-amount);
    receiverAccount.movement.push(amount);

    //Update UI
    updateUi(currentAccount);
  }

})



///---------These codes are out of the project-------------////
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
const movement1=[100,200,300,-300,-200,-100];
const deposits1=movement1.filter(function(mov)
{
    return mov>0;
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

const withdrawals1=movement1.filter(function(mov)
{

    return mov<0;
})
console.log(withdrawals1);

//---------------The Reduce Method......./////
//this method returns one single value
//Accumulator exists in reduce method
const movement2=[100,200,300,400,-300,-200,-100];

const balance=movement2.reduce(function(accumulator,cur,i,arr)
{
    console.log(`${i}:${accumulator}`)
  return accumulator+cur;

},100)
//here 100 is the initial value of accumulator

console.log(balance);

//Max Value

const maxBalance=movement2.reduce(function(acc,mov)
{
  
  if(acc>mov)
  {
    return acc;
  }
  else{
    return mov;
  }

},movement2[0]);
console.log(maxBalance)

///-------The Magic of Chaining------------////
const movement3=[100,200,300,400,-300,-200,-100];
const usdToTaka=109.73;

//pipeline
const totalDepositeTaka=movement3.filter(function(mov){
  return mov>0
}).map(function(mov)
{
  return mov*usdToTaka;
}).reduce(function(acc,mov)
{
  return acc+mov;
},0)
console.log(totalDepositeTaka);

//-------------The Find Method--------------------////

//find method returns the first and only one value of an array which fulfill the condition
//it returns value not array

const firstWithdrawl=movement3.find(function(mov){
 return mov<0
})
console.log(firstWithdrawl);

//important

const myAccount=account.find(function(acc)
{
  //Find an object in an arry by one of it's property name
  return acc.owner==='Rahid Amin';
})

console.log(account);
console.log(myAccount);