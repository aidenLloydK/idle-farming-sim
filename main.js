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

// Store interval IDs to be able to clear them later
let workerIntervals = [];
let farmIntervals = [];
let managerIntervals = [];

// Load stored values and update UI
function loadGame() {
    updateDisplay();

    // Restore passive incomes
    for (let i = 0; i < workers; i++) {
        let intervalId = setInterval(() => {
            money += workerIncome;
            updateDisplay();
            saveGame();
        }, 700);
        workerIntervals.push(intervalId);
    }

    for (let i = 0; i < manager; i++) {
        let intervalId = setInterval(() => {
            money += manager_income;
            updateDisplay();
            saveGame();
        }, 700);
        managerIntervals.push(intervalId);
    }

    for (let i = 1; i < farm_size; i++) {
        let intervalId = setInterval(() => {
            money += farm_size_income;
            updateDisplay();
            saveGame();
        }, 700);
        farmIntervals.push(intervalId);
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
        let intervalId = setInterval(() => {
            money += manager_income;
            updateDisplay();
            saveGame();
        }, 700);
        managerIntervals.push(intervalId);
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
        let intervalId = setInterval(() => {
            money += farm_size_income;
            updateDisplay();
            saveGame();
        }, 700);
        farmIntervals.push(intervalId);
    }
}

// Reset game to initial state
function reset() {
    // Clear all intervals
    workerIntervals.forEach(clearInterval);
    farmIntervals.forEach(clearInterval);
    managerIntervals.forEach(clearInterval);

    // Reset game variables
    money = 0;
    workers = 0;
    workerCost = 25;
    farm_size = 1;
    upgrade_cost = 500;
    manager = 0;
    manager_cost = 1000;

    // Clear stored intervals arrays
    workerIntervals = [];
    farmIntervals = [];
    managerIntervals = [];

    // Update localStorage
    saveGame();

    // Update the display
    updateDisplay();
}

// Buy a worker
function buyWorker() {
    if (money >= workerCost) {
        money -= workerCost;
        workers += 1;
        workerCost += 15;
        updateDisplay();
        saveGame();
        let intervalId = setInterval(() => {
            money += workerIncome;
            updateDisplay();
            saveGame();
        }, 700);
        workerIntervals.push(intervalId);
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
