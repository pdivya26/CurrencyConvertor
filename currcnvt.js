const amount = document.querySelector("#amt");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const ex = document.querySelector("#ex");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (currCode in countryList) {
        
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "INR") {
        newOption.selected = "selected";
        console.log();
        } 
        else if (select.name === "to" && currCode === "USD") {
        newOption.selected = "selected";
        }
        select.append(newOption);
    }

    convertCurrency();

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //prevents default its actions
    let amtVal = amount.value;
    let invMsg = document.querySelector(".invmsg");
    if(amtVal === "" || amtVal < 1 || !Number(amtVal)) {
        invMsg.innerText = "Invalid Amount!";
        alert("Amount entered is incorrect. Please check and re-enter  the correct amount.");
    }
    else {
        invMsg.innerText = "";
        convertCurrency();
    }
    
})

ex.addEventListener("click", () => {
    let tempCurr = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCurr;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    convertCurrency();
})

async function convertCurrency() {
    let amtVal = amount.value;
    let fromC = fromCurr.value;
    let toC = toCurr.value;

    if(amount.value == "" ) {
        amtVal = 0;
    }

    console.log(`${fromC}, ${toC}`);
    console.log(countryList);
    console.log(countryList[fromC]);
    console.log(countryList[toC]);

    const url = `https://v6.exchangerate-api.com/v6/21f19a5dd2390960a3f72daa/latest/${fromC}`;

    const response = await fetch(url);
    const data = await response.json();

    const rate = data.conversion_rates[toC];
    console.log(rate);

    console.log(amtVal);
    const convertedAmount = (amtVal * rate).toFixed(2);
    console.log(convertedAmount);

    let result = document.querySelector("#msg");
    if(Number(amtVal)) {
        let finRes = `${amtVal} ${fromC} = ${convertedAmount} ${toC}`;
        if(finRes) {
            result.innerText = finRes;
        }
        else {
            console.log("Error!");
        }
    }
    else {
        result.innerText = "";
    }
}
