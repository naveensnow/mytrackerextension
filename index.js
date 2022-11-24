let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");

let getitemfromlocal = JSON.parse(localStorage.getItem("myleads"));

if (getitemfromlocal) {
  myLeads = getitemfromlocal;
  render(myLeads);
}
inputBtn.addEventListener("click", function () {
  if (!inputEl.value) return; //checking empty string conditions
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myleads", JSON.stringify(myLeads));

  render(myLeads);
});

function render(lead) {
  let listItems = "";
  for (let i = 0; i < lead.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${lead[i]}'>
                    ${lead[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
