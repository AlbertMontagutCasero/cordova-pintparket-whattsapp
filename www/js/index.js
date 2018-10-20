var textoCastellano = "Buenos días, {0}.\r\nMe llamo Jordi Montagut de la empresa PintParket .\r\nLe escribo por una solicitud de presupuesto de parquet.\r\nNormalmente nuestra metodología es la siguiente:\r\nNos desplazamos a su domicilio para tomar medidas y hacer un presupuesto que se adapte a sus necesidades. Además, mostrarle las diferentes opciones: calidades, colores, diseño, etc.\r\nMuchas gracias por confiar en nosotros. Quedamos a su disposición.";
var textoCatalan = "Bon dia, {0}.\r\nEm dic Jordi Montagut de la empresa PintParket.\r\nLi escric per una sol·licitud de pressupost de parquet.\r\nNormalment la nostra metodologia es la següent:\r\nEns desplacem al seu domicili per prendre mesures i fer un pressupost que s'adapti a les seves necessitats. A més, mostrar-li les diferents opcions: qualitats, colors, disseny, etc.\r\nMoltes gràcies per confiar en nosaltres. Quedem a la seva disposició."
var urlTemplate = "https://api.whatsapp.com/send?phone=+34{0}&text={1}";
var nombreCliente;
var telefonoCliente;


$(function () {
    overrideFormatString();
    onSend();
});

function onSend() {
    $("#buttonForm").on("click", function (e) {
        e.preventDefault();
        nombreCliente = $("#nameClient").val();
        telefonoCliente = $("#phoneClient").val();

        if (!checkValueForm()) {
            return;
        }

        if ($("#languageClient").val() == "es") {
            textoCastellano = window.encodeURIComponent(textoCastellano.format(nombreCliente));
            urTemplate = urlTemplate.format(telefonoCliente, textoCastellano);
            window.location.replace(urlTemplate.format(telefonoCliente, textoCastellano));
        } else if ($("#languageClient").val() == "cat") {
            textoCatalan = window.encodeURIComponent(textoCatalan.format(nombreCliente));
            urTemplate = urlTemplate.format(telefonoCliente, textoCatalan);
            window.location.replace(urlTemplate.format(telefonoCliente, textoCatalan));
        }
    });
}

function checkValueForm() {
    if ($("#nameClient").val() == "" || $("#phoneClient").val() == "") {
        alert("Falta poner el nombre del cliente o el telefono");
        return false;
    }
    var phoneClient = $("#phoneClient").val();
    if (!validatePhone(phoneClient.toString())) {
        alert("El numero de telefono contiene letras");
        return false;
    }

    if (phoneClient.length != 9) {
        alert("el numero de telefono no tiene 9 digitos");
        return false;
    }

    return true;
}

function validatePhone(txtPhone) {
    var filter = /^[0-9-+]+$/;
    return filter.test(txtPhone);
}

function overrideFormatString() {
    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        };
    }
}