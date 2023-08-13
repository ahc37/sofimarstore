$(document).ready(function () {

    $('#loginF').click(function () {
        eligeFormulario("log");
    });
    $('#creaCuenta').click(function () {
        eligeFormulario("rqreg");
    });
    $('#updCuenta').click(function () {
        eligeFormulario("upd");
    });

    $('#btnAddMail').click(function () {
        var wcorreo = $('input[name=wwcorreo]').val().trim();
        alert(wcorreo);
        $('input[name=email2]').val(wcorreo);
        limpiaDatos();
    });

    function limpiaDatos() {
        $('input[name=ndocum]').val("");
        $('input[name=nombre]').val("");
        $('input[name=email]').val("");
        $('input[name=phone]').val("");
        $('input[name=direccion]').val("");
        $('input[name=wpassw1]').val("");
        $('input[name=wpassw2]').val("");
        $('input[name=email2]').val("");
        $('input[name=password]').val("");
        $('input[name=wcorreo]').val("");
    }
});

$('#addClie').click(function () {
    var x = confirm("Los Datos Ingresados son Correctos?");
    if (x) {
        $('#loadingDiv').show();
        var wcmbTipoDoc = $('select[name=cmbTipoDoc]').val();
        var wndocum = $('input[name=ndocum]').val().trim();
        var wnombre = $('input[name=nombre]').val().trim();
        var wemail = $('input[name=email]').val().trim();
        var wphone = $('input[name=phone]').val().trim();
        var wdireccion = $('input[name=direccion]').val().trim();
        var wwpassw1 = $('input[name=wpassw1]').val().trim();
        var wwpassw2 = $('input[name=wpassw2]').val().trim();
//			var wtproc = $('input[name=tproc]').val().trim();			

        $.ajax({
            method: "POST",
            url: 'php/clientes.php',
            data: {cmbTipoDoc: wcmbTipoDoc, ndocum: wndocum, nombre: wnombre, phone: wphone, direccion: wdireccion, email: wemail, wpassw1: wwpassw1, wpassw2: wwpassw2},
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function () {
                    alert('Error de servidor');
                }
            },
            success: function (datos) {
                var wDatos = datos.split("♦");
                var wwid = wDatos[0];
                var wsms = wDatos[1];
                $('input[name=idclie]').val(wwid);
                limpiaDatos();
                $('#mensajes').html(datos);
            }

        });
    }
});

$('#btnLogin').click(function () {
    var wemail = $('input[name=email2]').val().trim();
    var wwpassw1 = $('input[name=password]').val().trim();
    $.ajax({
        method: "POST",
        url: 'php/login.php',
        data: {email2: wemail, password: wwpassw1},
        statusCode: {
            404: function () {
                alert('Pagina no encontrada');
            },
            500: function (e) {
                alert('Error de servidor: ' + e);
            }
        },
        success: function (datos)
        {
            $('input[name=idclie]').val(datos);
            limpiaDatos();
            if (datos === "0") {
                $('#mensajes').html(datos);
            } else {
                window.location = "productos.php";
            }

        }
    });
});

$('#btnUpdpass').click(function () {
    eligeFormulario("upd");
});

function chgPassw() {
    eligeFormulario("upd");
}
;

function eligeFormulario(e) {
    $.ajax({
        url: "php/eligeFormulario.php",
        method: "POST",
        async: false,
        data: {wform: e},
        success: function (resp) {
            $('#myClieForm').empty();
            $('#myClieForm').append(resp);
        }
    });
}
