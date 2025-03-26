let money = parseInt(localStorage.getItem("money")) || 0;


let workers = parseInt(localStorage.getItem("workers")) || 0;
let workerCost = parseInt(localStorage.getItem("workerCost")) || 25;
let workerIncome = 1;


let farm_size = parseInt(localStorage.getItem("farm_size")) || 1;
let upgrade_cost = parseInt(localStorage.getItem("upgrade_cost")) || 500;
let farm_size_income = 10;


let manager = parseInt(localStorage.getItem("manager")) || 0;
let manager_cost = parseInt(localStorage.getItem("manager_cost")) || 1000;
let manager_income = 30;

// Load stored values and update UI
function loadGame() {
    updateDisplay();

    // Restore passive incomes
    for (let i = 0; i < workers; i++) {
        setInterval(() => {
            money += workerIncome;
            updateDisplay();
            saveGame();
        }, 700);
    }

    for (let i = 0; i < manager; i++) {
        setInterval(() => {
            money += manager_income;
            updateDisplay();
            saveGame();
        }, 700);
    }

    for (let i = 1; i < farm_size; i++) {
        setInterval(() => {
            money += farm_size_income;
            updateDisplay();
            saveGame();
        }, 700);
    }
}

// Save game data to localStorage
function saveGame() {
    localStorage.setItem("money", money);
    
    
    localStorage.setItem("workers", workers);
    localStorage.setItem("workerCost", workerCost);
    
    
    localStorage.setItem("farm_size", farm_size);
    localStorage.setItem("upgrade_cost", upgrade_cost);
    
    
    localStorage.setItem("manager", manager);
    localStorage.setItem("manager_cost", manager_cost);
}

// Farming button
function farming_button() {
    money += 1;
    updateDisplay();
    saveGame();
}

// Buy a manager
function buyManager() {
    if (money >= manager_cost) {
        money -= manager_cost;
        manager += 1;
        manager_cost += 150;
        updateDisplay();
        saveGame();
        setInterval(() => {
            money += manager_income;
            updateDisplay();
            saveGame();
        }, 700);
    }
}

// Upgrade farm
function upgrade_farm() {
    if (money >= upgrade_cost) {
        money -= upgrade_cost;
        farm_size += 1;
        upgrade_cost += 50;
        updateDisplay();
        saveGame();
        setInterval(() => {
            money += farm_size_income;
            updateDisplay();
            saveGame();
        }, 700);
    }
}

// Buy a worker
function buyWorker() {
    if (money >= workerCost) {
        money -= workerCost;
        workers += 1;
        workerCost += 15;
        updateDisplay();
        saveGame();
        setInterval(() => {
            money += workerIncome;
            updateDisplay();
            saveGame();
        }, 700);
    }
}

// Update display
function updateDisplay() {
    document.getElementById("money_count").innerText = `Money: $${money}`;
    document.getElementById("worker_count").innerText = `Workers: ${workers}`;
    document.getElementById("farm_count").innerText = `Farm size: ${farm_size}`;
    document.getElementById("manager_count").innerText = `Managers: ${manager}`;

    document.getElementById("worker_price").innerText = `Hire Worker: $${workerCost}`;
    document.getElementById("farm_price").innerText = `Upgrade Farm: $${upgrade_cost}`;
    document.getElementById("manager_price").innerText = `Hire Manager: $${manager_cost}`;
}


// Load the game state when the page loads
window.onload = loadGame;
