let totalAmount = 0;
let categoryCounts = {
    Taxes: 0,
    Groceries: 0,
    Entertainment: 0,
    Insurance: 0,
    Others: 0
};
const x = document.getElementById('chart').getContext('2d');
let expenseChart = new Chart(x, {
    type: 'pie',
    data: {
        labels: ['Taxes', 'Groceries', 'Entertainment', 'Insurance', 'Others'],

        datasets: [{
            // this is dataset[0]
            label: 'Expense Distribution',
            data: [0, 0, 0, 0, 0],
            backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'],
            // color: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 1
        }
            // ,
            // {
            // // this is our dataset[1]
            // }
        ]
    },

    options: {
        // Responsive: ScreenAdjustments
        responsive: true,
        plugins: {
            // legend: typesPosition
            legend: {
                position: 'bottom',
                labels: {
                    color: 'white'  // Update legend text color to white
                }

            },
            // Tooltip : SmlPopUp Whle Hoverng
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ": ₹" + tooltipItem.raw.toFixed(2);
                    }
                }
            }
        }
    }
});
function addExpense() {
    const expenseName = document.getElementById("expName").value;
    const expenseAmount = parseFloat(document.getElementById("expAmount").value);
    const expenseCategory = document.getElementById("expense-category").value;

    if (expenseName === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    const table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    const c1 = newRow.insertCell(0);
    const c2 = newRow.insertCell(1);
    const c3 = newRow.insertCell(2);
    newRow.style.fontWeight = "bold";
    c1.style.color = "#001b78";
    c2.style.color = "red";
    c3.style.color = "purple";
    c1.style.backgroundColor = "rgb(163 158 158)";
    c2.style.backgroundColor = "rgb(194 190 190)";
    c3.style.backgroundColor = "rgb(224 218 218)";


    c1.textContent = expenseName;
    c2.textContent = `${expenseAmount.toFixed(2)}`;
    c3.textContent = expenseCategory;

    // chartMaking_________________________________________________________________
    // calctng TotalAmount on PArticular Category in  below stt.....
    categoryCounts[expenseCategory] += expenseAmount;
    
    expenseChart.data.datasets[0].data = [
        categoryCounts.Taxes,
        categoryCounts.Groceries,
        categoryCounts.Entertainment,
        categoryCounts.Insurance,
        categoryCounts.Others
    ];
    expenseChart.update();

    document.getElementById("expName").value = "";
    document.getElementById("expAmount").value = "";
    document.getElementById("expense-category").value = "Taxes";

    updateTotal(expenseAmount);
}

function updateTotal(amount) {
    totalAmount += amount;
    let sym = '₹';
    let value = `${totalAmount.toFixed(2)}`;
    document.getElementById("total-amount").textContent = sym + value;
}
