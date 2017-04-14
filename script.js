
var button = document.querySelector("button");
var result = document.querySelector(".result");
var form = document.querySelector("form");
var formElements = form.elements;


button.addEventListener("click", validate);

// Walidacja formularza
function validate() {
    function checkForm() {
        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];
            if (element.value == "" || element.value <= 0) {
                return true;
            }        
        }
    }
    if (checkForm()) {
        showResult("<span class=\"fontawesome-warning-sign\"></span><br><span class=\"warning\"> Uzupełnij formularz! </span>");
        form.className = "animated shake";
    }
    else {
        calcHyperfocal();        
    }
}


// Liczenie hiperfokalnej
function calcHyperfocal() {
    var focal = document.querySelector("input").value;
    var aperture = document.querySelectorAll("input")[1].value;
    var sensor = document.querySelector("select").value;
    switch (sensor) {
        case "Micro4/3":
        var CircleOfConfusion = "0.015";
        break;

        case "APS-C":
        var CircleOfConfusion = "0.02";
        break;

        case "Full Frame":
        var CircleOfConfusion = "0.03";
        break;
    }
    var hyperfocal = (focal * focal)/(aperture * CircleOfConfusion);
    var wynikMetry = ((hyperfocal/1000).toFixed(2)) +"<br>m";
    showResult(wynikMetry);
}

// Wyswietlanie wiadomosci    
function showResult(message) {
    result.innerHTML = message;
    form.style.opacity = "0.3";
    result.className = "result animated bounceIn"; 
    result.style.opacity = "1";
    button.className = "animated tada";
    button.innerHTML = "<span class=\"iconicfill-check\"></span>Ok!";
    button.addEventListener("click", closeResult);
}


// Zamykanie wiadomosci
function closeResult() {
    form.style.opacity = "1";
    result.className = "result animated bounceOut";
    button.className = "animated rubberBand";
    button.innerHTML = "<span class=\"iconicfill-wrench\"></span> Oblicz";
    form.className = "";
    button.removeEventListener("click", closeResult);
}
