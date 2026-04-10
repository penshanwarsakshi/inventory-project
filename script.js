let inventory = [
    { id: 101, name: "Laptop", quantity: 50 },
    { id: 102, name: "Mouse", quantity: 100 },
    { id: 103, name: "Keyboard", quantity: 75 }
];

let sales = [0, 0, 0];

// Display Table
function displayInventory(data = inventory) {
    let table = document.querySelector("#inventoryTable tbody");
    table.innerHTML = "";

    data.forEach(item => {
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
        </tr>`;
    });
}

// Add Sale (Trigger Simulation)
function addSale() {
    let id = parseInt(document.getElementById("productId").value);
    let qty = parseInt(document.getElementById("quantity").value);

    let index = inventory.findIndex(p => p.id === id);

    if(index === -1) {
        alert("Product not found");
        return;
    }

    if(qty > inventory[index].quantity) {
        alert("Not enough stock");
        return;
    }

    inventory[index].quantity -= qty;
    sales[index] += qty;

    updateChart();
    displayInventory();
}

// Search
function searchProduct() {
    let val = document.getElementById("search").value.toLowerCase();
    let filtered = inventory.filter(p =>
        p.name.toLowerCase().includes(val)
    );
    displayInventory(filtered);
}

// Chart
let chart;

function updateChart() {
    if(chart) chart.destroy();

    let ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: inventory.map(p => p.name),
            datasets: [{
                label: "Sales",
                data: sales
            }]
        }
    });
}

// Load
displayInventory();
updateChart();
