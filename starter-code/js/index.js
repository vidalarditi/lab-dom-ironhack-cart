function getSubTotalByRow(itemNode){
  var price = itemNode.querySelector(".product-price span").innerHTML;
  var quantity = itemNode.getElementsByClassName("quantity")[0].value;
  price = parseFloat(price);
  quantity = parseFloat(quantity);
  return (price * quantity).toFixed(2);
}

function updateSubTotalByRow(SubTotal, itemNode){
  itemNode.querySelector(".product-subtotal span").innerHTML = SubTotal;
}

function updateSubTotals(){
  var allProducts = document.getElementsByClassName("product-template");
  for(var i=0; i < allProducts.length; i++){
    var subTotal = getSubTotalByRow(allProducts[i]);
    updateSubTotalByRow(subTotal, allProducts[i]);
  }
}

function getTotalPrice() {
  var allProducts = document.getElementsByClassName("product-template");
  var FinalPrice = 0;
  for(var i=0; i < allProducts.length; i++){
    var subTotal = allProducts[i].querySelector(".product-subtotal span").innerHTML;
    subTotal = parseFloat(subTotal);
    FinalPrice += subTotal;
  }
  document.querySelector("#Total span").innerHTML = FinalPrice;
}

var deleteRowHandler = function(event){
  var container = document.getElementsByClassName("all-products")[0];
  var row = event.currentTarget.parentNode
  container.removeChild(row);
}

function createSubTotal(){
  var divNode = document.createElement("div");
  divNode.setAttribute("class", "product-subtotal")
  divNode.innerHTML = "$"
  var spanNode = document.createElement("span");
  spanNode.innerHTML = 0;
  divNode.appendChild(spanNode);
  return divNode;
}

function createQuantityInput(){
  var inputNode = document.createElement("input");
  inputNode.setAttribute("class", "quantity product-quantity")
  return inputNode;
}


function createDeleteButton(){
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete"
  deleteButton.setAttribute("class", "btn btn-delete")
  
  deleteButton.onclick = deleteRowHandler
  return deleteButton
}

function createItemPrice(price){
  var priceDiv = document.createElement("div");
  priceDiv.setAttribute("class", "product-price");
  priceDiv.innerHTML = "$";
  var priceSpan = document.createElement("span");
  priceSpan.innerHTML = price;
  priceDiv.appendChild(priceSpan);
  return priceDiv;
}

function createItemName(name){
  var node = document.createElement("div")
  node.setAttribute("class", "product-name")
  node.innerHTML = name;
  return node;
}

function createNewItemRow(itemName, itemUnitPrice){
  var newRow = document.createElement("div");
  newRow.setAttribute("class", "product-template flex-row")
  newRow.appendChild(createItemName(itemName))
  newRow.appendChild(createItemPrice(itemUnitPrice))
  newRow.appendChild(createQuantityInput())
  newRow.appendChild(createSubTotal())
  newRow.appendChild(createDeleteButton())
  return newRow;
}

function createNewItem(){
  var addProductName= document.getElementById("product-name-input").value;
  var addProductPrice= document.getElementById("product-price-input").value;
  var newRow = createNewItemRow(addProductName, addProductPrice);
  
  var allProducts = document.getElementsByClassName("all-products")[0];
  var inputBar = document.getElementsByClassName("input-bar")[0];
  allProducts.insertBefore(newRow, inputBar)
}

window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  
  createItemButton.addEventListener("click", createNewItem)
  var deleteButtons = document.getElementsByClassName('btn-delete');
  calculatePriceButton.onclick = function(){
    updateSubTotals()
    getTotalPrice()
  }
  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteRowHandler;
  }
};
