const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const user = data.results[0];
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
  } catch (err) {
    console.log(err);
  }
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Doubles money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//Sorts by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Filter millionaires
function showMillionaires() {
  data = data.filter((user) => user.money >= 1000000);

  updateDOM();
}

//Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, num) => (acc += num.money), 0);
  console.log(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `
  <h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>
  `;
  main.appendChild(wealthEl);
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = `
  <h2><strong>Person</strong> Wealth</h2>
  `;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `
    <strong>${item.name}</strong> ${formatMoney(item.money)}
    `;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(num) {
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
