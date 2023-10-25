
function addUp(){
  var pName = productName.value;
  var quant = quantityOwn.value;
  var prices = priceName.value;
  var budgetObj = {pName, quant, prices};
  var budgetArray = JSON.parse(localStorage.getItem("budget")) || [];
if(pName !== "" && quant !== "" && prices !== ""){
    display.innerHTML = ""
    budgetArray.push(budgetObj)
    localStorage.setItem("budget", JSON.stringify(budgetArray))
    window.location.href = "result.html"

}else{
  display.innerHTML = `<p class="alert alert-danger w-100 col-lg col-sm col-md">fill the input</p>`
}
  
  

}

