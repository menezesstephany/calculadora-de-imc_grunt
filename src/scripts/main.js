document.getElementById('calculate-btn').addEventListener('click', function() {
    console.log("Botão clicado!");
    
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Por favor, insira valores válidos para altura e peso.");
        return;
    }

    const imc = weight / (height * height);

    let category = "";
    if (imc < 18.5) {
        category = "Abaixo do peso";
        document.getElementById('imc-category').className = "abaixo-peso";
    } else if (imc >= 18.5 && imc < 25) {
        category = "Peso normal";
        document.getElementById('imc-category').className = "peso-normal";
    } else if (imc >= 25 && imc < 30) {
        category = "Sobrepeso";
        document.getElementById('imc-category').className = "sobrepeso";
    } else {
        category = "Obesidade";
        document.getElementById('imc-category').className = "obesidade";
    }

    document.getElementById('imc-value').textContent = imc.toFixed(2);
    document.getElementById('imc-category').textContent = category;
});
