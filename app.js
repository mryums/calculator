let nums = document.querySelectorAll(".num")
let reset = document.querySelector("#reset")
let operators = document.querySelectorAll(".arth-opera")
let equalsTo = document.querySelector("#equals-to")
let percentage = document.querySelector("#percen")
let plusMinus = document.querySelector("#plus-minus")
const display = document.querySelector("#display")

let currValue = '';
let preValue = '';
let operator = '';
let result = '';


//fn to update Display
const updateDisplay = () => {
// update display with current value or '0', if empty    
  display.textContent = currValue || '0'; // Update the calculator's display area
// set button text to 'C' if there is input, otherwise 'AC'
 reset.innerText = currValue? 'C' : 'AC';
}

//fn to All clear
const clearAll = () => {
 if( reset.innerText === 'AC'){
//if 'AC', clear everything
  currValue = '';
  preValue = '';
  operator = '';
  result = '';
 } else {
// if 'C', clear only current value
 currValue = '';  
 }
 updateDisplay() //update the display nad button text
};  

//operator button clicks
operators.forEach((arthOpera) => {
    arthOpera.addEventListener("click", () => {
     if(currValue === '' && result === '') return; //if no number entered, do nothing
     if(currValue !== ''){
     preValue = currValue; //store current value as previous value
    } else if ( result !== ''){
      preValue = result; //if result exist use it as previous value
    }
     operator = arthOpera.textContent
    currValue = ''; //clear current value for next input
    // Update the display
  //updateDisplay(currValue); //optionally to display operator
  });
})

//nums button clicks 
nums.forEach((num) => {
  num.addEventListener("click", () => {
   if (result !== ''){
  //if result was just calculated, clear it before entering a new number
   result = '';
   currValue = '';

  } 
    let numVal = num.textContent
    // Concatenate the clicked number to currValue
    currValue += numVal;
    // Update the display
    updateDisplay(); // update the display with current number 
  });
});

//percentage buttton clicks
percentage.addEventListener("click", () => {
  if( currValue !== ''){
    //convert current value into percentage 
    currValue = (parseFloat(currValue) / 100).toString();
    updateDisplay(currValue);
  }
})

//plus-minus button clicks
plusMinus.addEventListener("click", () => {
  if( currValue !== ''){
    //toggle the sign of current value 
    currValue = (parseFloat(currValue) * -1).toString();
    updateDisplay();
 }
})    

//Calculation fn
const calculation = () => {
  const firstnum = parseFloat(preValue)// to convert preValue(string) to a number
  const secondnum = parseFloat(currValue) // to conver currValue(string) to a number

  let result ;
  
  switch(operator){
    case '+':
      result = firstnum + secondnum //now it is numerical addition 
    break;
    case '−':
      result = firstnum - secondnum
    break;
    case '×':
      result = firstnum * secondnum
    break;
    case '÷':
      if( secondnum === 0){
      result = 'Error'; // handle divide by 0 error
    } else {
      result = firstnum / secondnum
    } 
    break; 
  default:
      result = 'Invalid Operator'; //Incase no operator is matched 
    } 

  //reset the values
  currValue = result.toString(); 
  preValue = '';
  operator = '';  
  updateDisplay();
};


// All clear
reset.addEventListener("click", clearAll );


// Equals-to
equalsTo.addEventListener("click", () => {
  if (currValue === '' && preValue === '') return; // if no value, do nothing
  calculation() //call calculation fn

});

