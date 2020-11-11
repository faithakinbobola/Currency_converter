let btn = document.querySelector('.currencyContainer')

function convert(inputValue, exchRate) {
    return inputValue * exchRate;
}

function convertCurrency() {
    document.querySelector('#toCurrency').value = "Please wait...";
    const firstCurrencyElem = document.querySelector('#fromCurrencylist');
    const secondCurrencyElem = document.querySelector('#toCurrencylist');
    const firstVal = firstCurrencyElem.options[firstCurrencyElem.selectedIndex].value;
    const secondVal = secondCurrencyElem.options[secondCurrencyElem.selectedIndex].value;
    const inputVal = document.querySelector('#fromCurrency').value;

    const rateObj = {
      conversionPair: `${firstVal}_${secondVal}`,
      conversionRate: '',
    };
  
    fetch(`https://free.currconv.com/api/v7/convert?apiKey=3565e092fc7543ca3218&q=${firstVal}_${secondVal}&compact=ultra`)
      .then(response => response.json())
      .then((data) => {
        const rateData = Object.entries(data);
        console.log(rateData);       
        const rateValue = rateData[0][1];
        const convertedVal = convert(inputVal, rateValue);
        rateObj.conversionRate = rateValue;
        document.querySelector('#toCurrency').value = convertedVal.toString();
      })
      .catch((error) => {
        console.log(error); // error results from fetch (poor or no internet
        document.querySelector('#toCurrency').value = "Error Occured. Try Again";
    });
}

btn.addEventListener('click', convertCurrency)