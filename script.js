// 
let currentId = 1;
function updateMonthYear() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const monthYearDisplay = document.getElementById('month-year');
    const excludeDateInput = document.getElementById('exclude-date');
    const numDaysDisplay = document.getElementById('num-of-days');
    const leadCountInput = document.getElementById('number-of-leads');
    const expectedLeadCountDisplay = document.getElementById('expected-lead-count');
    const saveButton = document.getElementById('save');

    startDateInput.addEventListener('input', updateMonthAndYear);
    endDateInput.addEventListener('input', updateMonthAndYear);
    excludeDateInput.addEventListener('input', updateNumOfDays);
    leadCountInput.addEventListener('input', updateExpectedLeadCount);

    function updateMonthAndYear() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (startDate && endDate && startDate <= endDate) {
            const startMonth = startDate.toLocaleString('default', { month: 'long' });
            const endMonth = endDate.toLocaleString('default', { month: 'long' });
            const startYear = startDate.getFullYear();
            const endYear = endDate.getFullYear();

            if (startYear === endYear) {
                monthYearDisplay.textContent = `${startMonth} - ${endMonth} ${startYear}`;
            } else {
                monthYearDisplay.textContent = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
            }
        } else {
            monthYearDisplay.textContent = 'Invalid date range';
        }
    }

    function updateNumOfDays() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const excludedDaysInput = excludeDateInput.value;

        if (startDate && endDate && startDate <= endDate) {
            const excludedDays = excludedDaysInput.split(',').map(Number);

            const timeDiff = endDate - startDate;
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Calculate days

            // Calculate the number of excluded days
            const numExcludedDays = excludedDays.filter(day => startDate <= day && day <= endDate).length;

            // Calculate the number of days considering excluded dates
            const numDays = daysDiff - numExcludedDays;

            numDaysDisplay.textContent = numDays;

            // Update the expected lead count
            updateExpectedLeadCount();
        } else {
            numDaysDisplay.textContent = 'Invalid date range';
        }
    }

    function updateExpectedLeadCount() {
        const leadCount = parseFloat(leadCountInput.value);
        const numDays = parseFloat(numDaysDisplay.textContent);

        if (!isNaN(leadCount) && !isNaN(numDays) && numDays > 0) {
            const expectedLeadCount = leadCount / numDays;
            expectedLeadCountDisplay.textContent = expectedLeadCount.toFixed(2); // Display expected lead count with 2 decimal places
        } else {
            expectedLeadCountDisplay.textContent = 'Invalid input';
        }
    }

    saveButton.addEventListener('click', sendData);

    function sendData() {
        const data = {
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            monthYearDisplay: monthYearDisplay.textContent,
            excludedDates: excludeDateInput.value,
            numDaysDisplay: numDaysDisplay.textContent,
            leadCount: leadCountInput.value,
            expectedLeadCount: expectedLeadCountDisplay.textContent,
        };
        addNextEntry(data);
    }

    function addNextEntry(data) {
        // Create a new table row
        const table = document.getElementById('entry-table'); 
        const newRow = table.insertRow(-1); 

        // Add cells to the new row
        const idCell = newRow.insertCell(0);
        const startDateCell = newRow.insertCell(1);
        const endDateCell = newRow.insertCell(2);
        const monthCell = newRow.insertCell(3);
        const excludedDatesCell = newRow.insertCell(4);
        const numDaysDisplayCell = newRow.insertCell(5);
        const leadCountCell = newRow.insertCell(6);
        const expectedLeadCountCell = newRow.insertCell(7);

        // Set cell values
        idCell.textContent = currentId;
        startDateCell.textContent = data.startDate;
        endDateCell.textContent = data.endDate;
        monthCell.textContent = data.monthYearDisplay;
        excludedDatesCell.textContent = data.excludedDates;
        numDaysDisplayCell.textContent = data.numDaysDisplay;

        leadCountCell.textContent = data.leadCount;
        expectedLeadCountCell.textContent = data.expectedLeadCount;

        // Increment the current ID
        currentId++;

        // Clear input fields
        startDateInput.value = '';
        endDateInput.value = '';
        excludeDateInput.value = '';
        leadCountInput.value = '';

        // Reset other fields
        monthYearDisplay.textContent = '';
        numDaysDisplay.textContent = '';
        expectedLeadCountDisplay.textContent = '';

        // You can also focus on the start date field for convenience
        startDateInput.focus();
    }
}

// Initialize the first ID when the page loads
document.querySelector('tr:last-child td:first-child').textContent = currentId;

updateMonthYear();
