const STATUS = {
    closed: "CLOSED",
    insufficientFunds: "INSUFFICIENT_FUNDS",
    open: "OPEN",
};

// Main function
function checkCashRegister(price, cash, cid) {
    let cashRegister = { status: "", change: cid };
    const changeNeeded = (cash - price).toFixed(2);
    const changeAvailable = getTotalCashRegisterChange(cid);
    cashRegister.status = getTotalCashRegisterStatus(
        changeNeeded,
        changeAvailable
    );

    // Returns cashRegister if obviously not enough cash
    if (cashRegister.status === STATUS.insufficientFunds) {
        cashRegister.change = [];
        return cashRegister;
    }

    // Returns cashRegister and doesn't run getCustomerChange if already know have exact amount
    if (cashRegister.status === STATUS.closed) {
        return cashRegister;
    }

    // Gets an array of the change to give to the customer
    cashRegister.change = getCustomerChange(changeNeeded, cid);

    // Sets staus to insufficient funds if ran out of cash during getCustomerChange
    if (changeNeeded > getTotalCashRegisterChange(cashRegister.change)) {
        cashRegister.status = STATUS.insufficientFunds;
        cashRegister.change = [];
    }

    return cashRegister;
}

// Returns array of customer change
function getCustomerChange(changeNeeded, changeInDrawer) {
    const change = [];
    const denominations = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        ONE: 1.0,
        FIVE: 5.0,
        TEN: 10.0,
        TWENTY: 20.0,
        "ONE HUNDRED": 100.0,
    };
    // Start with largest denomination
    for (let i = changeInDrawer.length - 1; i >= 0; i--) {
        const cashName = changeInDrawer[i][0];
        const cashTotal = changeInDrawer[i][1];
        const cashValue = denominations[cashName];
        let cashAmount = (cashTotal / cashValue).toFixed(2);
        let cashToReturn = 0;
        // While changeNeeded is still larger than the cash's value and we still have some of that denomination
        while (changeNeeded >= cashValue && cashAmount > 0) {
            changeNeeded -= cashValue;
            changeNeeded = changeNeeded.toFixed(2);
            cashAmount--;
            cashToReturn++;
        }
        // If returning some of that denomination, add to array name and value given
        if (cashToReturn > 0) {
            change.push([cashName, cashToReturn * cashValue]);
        }
    }
    return change;
}

// Sets status based on if register has enough change
function getTotalCashRegisterStatus(changeNeeded, changeAvailable) {
    if (Number(changeNeeded) > Number(changeAvailable)) {
        return STATUS.insufficientFunds;
    }
    if (Number(changeNeeded) < Number(changeAvailable)) {
        return STATUS.open;
    }
    return STATUS.closed;
}

// Gets total of cash in register
function getTotalCashRegisterChange(cid) {
    return cid
        .reduce((accumulator, currentValue) => accumulator + currentValue[1], 0)
        .toFixed(2);
}

console.log(
    checkCashRegister(19.5, 20, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100],
    ])
);
