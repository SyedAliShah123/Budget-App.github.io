let totalAmount = document.getElementById("total-amounta");
let userAmount = document.getElementById("user-amount");
const checkButton = document.getElementById("check-amount");
const totalButton = document.getElementById("Total-amount-button");
const titleProduct = document.getElementById("product-title");
const budget = document.getElementById("budget");
const productError = document.getElementById("product-error");
const amount = document.getElementById("amount");
const expanValve = document.getElementById("expan-value");
const balanceAmount = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
totalButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if(tempAmount === "" || tempAmount < 0){
        budget.classList.remove("hide");
    }else{
        budget.classList.add("hide");
        amount.innerHTML = tempAmount;
        balanceAmount.innerHTML = tempAmount - expanValve.innerText;
        totalAmount.value = "";
    }
}); 

const disableButtons = (bool) => {
    let buttonEdit = document.getElementsByClassName("edit");
    Array.from(buttonEdit).forEach((element) => {
        element.disabled = bool;
    });
};
const elementModify = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceAmount.innerText;
    let currentExpan = expanValve.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        titleProduct.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expanValve.innerText = parseInt(currentExpan) - parseInt(parentAmount);
    parentDiv.remove();
};

//Function to create list
const createList = (expanName ,expanValve) =>{
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "line-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">
    ${expanName}</p><p class="amount">${expanValve}</p>`;
    
    let buttonEdit = document.createElement("button");
    buttonEdit.classList.add("fa-solid", "fa-pen-to-square", "edit");
    buttonEdit.style.fontSize = "24px";
    buttonEdit.addEventListener("click", () => {
    elementModify(buttonEdit, true);
    });
    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("fa-solid","fa-trash-can", "delete");
    buttonDelete.style.fontSize = "24px";
    buttonDelete.addEventListener("click", () => {
        elementModify(buttonDelete);
    });
    subListContent.appendChild(buttonEdit);
    subListContent.appendChild(buttonDelete);
    document.getElementById("list").appendChild(subListContent);
};


//fuction to add expense
checkButton.addEventListener("click", () => {
    if(!userAmount.value || !titleProduct.value){
        productError.classList.remove("hide");
        return false;
    }
    disableButtons(false);
    let expanse = parseInt(userAmount.value);
    let sum = parseInt(expanValve.innerText) + expanse;
    expanValve.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceAmount.innerText = totalBalance;
    createList(titleProduct.value, userAmount.value);
    titleProduct.value = "";
    userAmount.value = "";
});