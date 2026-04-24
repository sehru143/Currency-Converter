const Base_Url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const Msg = document.querySelector(".msg");

for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
   updateExchangeRate();
  
  } 
);
const updateExchangeRate =async ()=>{
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  if (isNaN(amtVal) || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }


  const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`;

   {
    let response = await fetch(URL);
    let data = await response.json();


    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalVal = (amtVal * rate)

    Msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;


}
window.addEventListener("load",()=>{
    updateExchangeRate();
})}
