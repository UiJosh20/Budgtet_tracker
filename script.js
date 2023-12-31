const ref = () => {
  display.style.display = "none";
  let pName = productName.value;
  let quant = quantityOwn.value;
  let prices = priceName.value;
  if (pName == "" && quant == "" && prices == "") {
    display.style.display = "block";
    // display.innerHTML = `<p class="alert alert-danger w-100 col-lg col-sm col-md">fill the input</p>`
  }
};
setTimeout(() => {
  display.style.display = "none";
  
}, 3500);

let budgetArray = JSON.parse(localStorage.getItem("budget")) || [];
const addUp = () => {
  let pName = productName.value;
  let quant = quantityOwn.value;
  let prices = priceName.value;
  let budgetObj = { pName, quant, prices };

  if (pName !== "" && quant !== "" && prices !== "") {
    display.innerHTML = "";
    budgetArray.push(budgetObj);
    localStorage.setItem("budget", JSON.stringify(budgetArray));
    window.location.href = "result.html";
  } else {
    display.innerHTML = `<p class="alert alert-danger w-100 col-lg col-sm col-md">fill the input</p>`;
  }
};

// result page script

let totalSpent = 0;
function displayAll() {
  resultCard.innerHTML = ""; // Clear the card display before rendering
  budgetArray.map((item, i) => {
    let itemCost = item.quant * item.prices;
    totalSpent += itemCost;
    resultCard.innerHTML += `
          <div class="card1">
            <p class="heading">
              ${item.pName}
            </p>
            <p>
              Quantity: ${item.quant}
            </p>
            <p>
              Price: ${item.prices} 
            </p>
            <p>
              Total ${itemCost} 
            </p>
            <a href="#" class="btn btn-danger fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal-${i}">Delete</a>
            
            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog mt-5">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h3 class="text-dark text-center">Are you sure you want to delete?</h3>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" onclick="deleteAny(${i})" data-bs-dismiss="modal">Delete</button>
                    
                  </div>
                </div>
              </div>
            </div>


            <a href="#" class="btn btn-warning text-light fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1-${i}">Edit</a>
          </div>
    
          <!-- Modal -->
          <div class="modal fade" id="exampleModal1-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog mt-5">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div id="showErr"></div>
                  <input type="text" placeholder="New name" id="productName-${i}" class="form-control mb-3">
                  <input type="number"  placeholder="New quantity" id="quantityOwn-${i}" class="form-control mb-3">
                  <input type="number" placeholder=" New price" id="priceName-${i}" class="form-control">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-warning" onclick="editAny(${i})" data-bs-dismiss="modal">Edit</button>
                </div>
              </div>
            </div>
          </div>
          </div>`;
  });
}

displayAll();

if (budgetArray.length > 0) {
  document.getElementById("resulthorn").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100 pbottom">Total Budget: &#8358;${totalSpent.toFixed(2)}</p>`;
} else {
  document.getElementById("resultCard").innerHTML += `<h2 class="fw-bold textColor">No item added</h2>`;
}

const editAny = (i) => {
  budgetArray[i]["pName"] = document.getElementById(`productName-${i}`).value;
  budgetArray[i]["quant"] = document.getElementById(`quantityOwn-${i}`).value;
  budgetArray[i]["prices"] = document.getElementById(`priceName-${i}`).value;
  localStorage.setItem("budget", JSON.stringify(budgetArray));
  totalSpent = 0; // Reset totalSpent
  resultCard.innerHTML = ""; // Clear the card display
  displayAll();
  if (budgetArray.length > 0) {
    document.getElementById("resulthorn").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100 pbottom">Total Budget: &#8358;${totalSpent.toFixed(2)}</p>`;
  }
};

const deleteAny = (i) => {
  errorx.innerHTML = `<p class="alert alert-success known">Deleted successfully</p>`
  budgetArray.splice(i, 1);
  localStorage.setItem("budget", JSON.stringify(budgetArray));
  totalSpent = 0; // Reset totalSpent
  resultCard.innerHTML = ""; // Clear the card display
  displayAll(); // Redisplay the updated cards
  if (budgetArray.length > 0) {
    document.getElementById("resulthorn").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100 pbottom">Total Budget: &#8358;${totalSpent.toFixed(2)}</p>`;
  } else {
    resulthorn.innerHTML = ""
    document.getElementById("resultCard").innerHTML += `<h2 class="fw-bold textColor">No item added</h2>`;
  }
  setTimeout(()=>{
    errorx.style.display = "none"
  }, 2000)
};

