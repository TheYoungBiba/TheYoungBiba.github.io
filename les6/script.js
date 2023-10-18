const options = {
    type1: [],
    type2: ['128 Gb', '256 Gb', '512 Gb'],
    type3: []
};

const property = {
    type1: '',
    type2: '',
    type3: 'Защитное стекло с наклейкой'
};

const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');

serviceTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        updateOptions(selectedType);
        updateProperty(selectedType);
        updatePrice();
    });
});

function updateOptions(selectedType) {
    const optionsContainer = document.getElementById('optionsContainer');
    const selectedOptions = options[selectedType];
    optionsContainer.innerHTML = '';
    if (selectedOptions.length > 0) {
        const select = document.createElement('select');
        select.addEventListener('change', updatePrice);
        selectedOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.innerText = option;
            select.appendChild(optionElement);
        });
        optionsContainer.appendChild(select);
    }
}

function updateProperty(selectedType) {
    const propertyContainer = document.getElementById('propertyContainer');
    const selectedProperty = property[selectedType];
    propertyContainer.innerHTML = '';
    if (selectedProperty !== '') {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', updatePrice);
        const label = document.createElement('label');
        label.innerText = selectedProperty;
        label.appendChild(checkbox);
        propertyContainer.appendChild(label);
    }
}

let count = document.getElementById("quantity");

count.addEventListener("input", function () {
    updatePrice();
});

function updatePrice() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
    const selectedOptions = options[selectedType];
    const selectedProperty = property[selectedType];
    let price = 0;
    switch (selectedType) {
        case 'type1':
        price = 100500;
        break;
        case 'type2':
        price = 200;
        if (selectedOptions.length > 0) {
            const select = document.querySelector('#optionsContainer select');
            const selectedOption = select.options[select.selectedIndex].text;
            if (selectedOption === '128 Gb') {
                price += 50;
            } else if (selectedOption === '256 Gb') {
                price += 100;
            } else if (selectedOption === '512 Gb') {
                price += 150;
            }
        }
        break;
        case 'type3':
        price = 300;
        if (selectedProperty !== '') {
            const checkbox = document.querySelector('#propertyContainer input[type="checkbox"]');
            if (checkbox.checked) {
                price += 200;
            }
        }
        break;
    }
    document.getElementById('price').innerText = price * quantity;
}

updateOptions('type1');
updateProperty('type1');
updatePrice();