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

total = 0

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
            }
        }
    }
    updatePurchaseMenu ();
    changeTotal (itemIndex);
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

function NewTotalCost () {

}

function submitPurchase () {

}

function payForItems () {

}

function addToInventory () {

}

 
$(practiceGame);