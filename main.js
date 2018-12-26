let purchaseItems = [{
        name: 'Stick',
        cost: 1,
        numSelected: 0
    },
    {
        name: 'Gun',
        cost: 3,
        numSelected: 0 
    }]

total = 0;

money = 15;

inventory = [];

function updatePurchaseMenu () {
    let purchaseHTML = ''
    let itemIndex = 0;
    purchaseItems.forEach(item => {
        purchaseHTML += `<li>${item.name} (cost: ${item.cost}) <button class="minusOne" type="button" value="${itemIndex}">-</button><button class="plusOne" type="button" value="${itemIndex}">+</button> ${item.numSelected}</li>`
        itemIndex++
    })
    printPurchaseMenu (purchaseHTML)
    console.log('updatePurchaseMenu');
}

function practiceGame () {
    updatePurchaseMenu ();
    clickPlus ();
    clickMinus ();
    submitPurchase ();
    console.log('practiceGame');
}

function printPurchaseMenu (purchaseHTML) {
    $('.purchaseList').html(`${purchaseHTML}`);
    $('.total').replaceWith(`<p class="total">Total Cost: ${total}</p>`)
    console.log(purchaseHTML);
    console.log('printPurchaseMenu');
}

/*fuctions for purchaseing new item*/

function clickPlus () {
    $('main').on('click', '.plusOne', function () {
        let itemIndex = $(this).val();
        addOneToPurchaseChoice (itemIndex);
        console.log(itemIndex);
    })
}

function addOneToPurchaseChoice (itemIndex) {
    /*Is there a better way to do this. I shouldn't add it to purchaseItems but if I make a new array I'll have to add
    another global variable*/
    for (let i in purchaseItems) {
        if (i === itemIndex) {
            purchaseItems[i].numSelected += 1;
        }
    }
    updatePurchaseMenu ();
    changeTotal (itemIndex, 'add');
    console.log('addOneToPurchaseChoice');
}

function clickMinus () {
    $('main').on('click', '.minusOne', function () {
        let itemIndex = $(this).val();
        subOneToPurchaseChoice (itemIndex);
        console.log(itemIndex);
    })
}

function subOneToPurchaseChoice (itemIndex) {
    /*Is there a better way to do this. I shouldn't add it to purchaseItems but if I make a new array I'll have to add
    another global variable*/
    for (let i in purchaseItems) {
        if (i === itemIndex) {
            if (purchaseItems[i].numSelected !== 0) {
                purchaseItems[i].numSelected -= 1;
                changeTotal (itemIndex);
            }
        }
    }
    updatePurchaseMenu ();
    console.log('subOneToPurchaseChoice');
}

function changeTotal (itemIndex, addOrSubtract = 'subtract') {
    for (let i in purchaseItems) {
        if (i === itemIndex) {
            if (addOrSubtract === 'add') {
                total += purchaseItems[i].cost;
            }
            else {
                total -= purchaseItems[i].cost;
            }
        }
    }
    updatePurchaseMenu ();
}

function submitPurchase () {
    $('form').submit(function (event) {
        event.preventDefault;
        if (total <= money) {
            money -= total;
            for (let i in purchaseItems) {
                if (purchaseItems[i].numSelected > 0) {
                    let numberToBuy = purchaseItems[i].numSelected
                    for (let j=1; j<= numberToBuy; j++) {
                        newInventoryItem (purchaseItems[i].name)
                    }
                }
            }
        }
        updateInventory ();
        resetNumSelect ();
    return false;
    })
}

function resetNumSelect () {
    for (let i in purchaseItems) {
        purchaseItems[i].numSelected = 0;
        total = 0;
        updatePurchaseMenu ();
    }
}

function newInventoryItem (itemName, itemCondition = 10) {
    inventory.push(
        {name: itemName,
        condition: itemCondition}
    )
    console.log(inventory);
}

function updateInventory () {
    numberOfEachItem = countInventoryItems ();
    printInventory (numberOfEachItem);
    console.log('updateinventery');
}

function countInventoryItems () {
    let numberofEachItemArray = [];
    inventory.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    let currentItem = null;
    let count = 0
    for (let i in inventory) {
        if (inventory[i].name !== currentItem) {
            if (count>0) {
                numberofEachItemArray.push({name: currentItem,
                                            number: count});
            }
            currentItem = inventory[i].name;
            count = 1;
        }
        else {
            count++
        }
    }
    numberofEachItemArray.push({name: currentItem,
        number: count});
    return numberofEachItemArray;
}

function printInventory (numberOfEachItem) {
    inventoryHTML ='';
    numberOfEachItem.forEach(item => {
        inventoryHTML += `<li>${item.name}: ${item.number}</li>`;
    })
    $('.inventory').html(`${inventoryHTML}`)
}

 
$(practiceGame);