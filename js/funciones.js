	
function nobackbutton(){
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button"; //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";};
}

function chequea(wcadena, winput1) {
    var elem1 = document.getElementById(winput1);
    var wnewcad = "";
    var letmat = wcadena.split("");
    var i;
    var chkpunto=0;
    for (i = 0; i < wcadena.length; i++) { 
        var letra=letmat[i];
        if (letra === ".") {
            chkpunto++;
        }
        if (letra === "1" || letra === "2" || letra === "3" || letra === "4" || letra === "5" || letra === "6" || letra === "7" || letra === "8" || letra === "9" || letra === "0" || letra === ".")
        {
            wnewcad=wnewcad+letra;
            if (letra === "." && chkpunto>1) {
                wnewcad = wnewcad.substring(0, wnewcad.length - 1);
            }
        }
    }
    elem1.value=wnewcad;
}
        
function ImprimirPagina(wpagina) {
    if (window.print)
        window.print();
    else
        alert("Lo siento, pero a tu navegador no se le puede ordenar imprimir" +
                " desde la web. Actualizate o hazlo desde los menús");
}

function verificar() {
    if ((document.frm.nombre.value.length === 0) || (document.frm.emailcontrata.length === "") || (document.frm.asunto.length === "") || (document.frm.consulta.length === ""))
    {
        alert('Por favor, ingrese la información en los campos marcados con asterisco\nGracias');
        return;
    } else if (document.frm.emailcontrata.value.indexOf("@") === -1 || document.frm.emailcontrata.value.indexOf(".") === -1)
    {
        alert("Su direccion de correo electronica es incorrecta, verifiquela por favor");
    } else
    {
        document.frm.submit();
    }
}

function AbreVentana(wVentana, nh, nw) {
    var wid_doc = wVentana;
    window.open(wid_doc, "_blank", "statusbar=no,toolbar=no,menubar=no,directories=no,status=no,resizable=yes,location=no,scrollbars=yes,height=" +
            nh + ",width=" + nw + ",screenX=0,screenY=0,top=0,left=0,maximize=1");
}

function footer() {
    var txt_footer =
            "<div class=\"footer\"><br>" +
            "<p>&copy;&nbsp;<script type=\"text/javascript\">document.write(new Date().getFullYear());</script>" +
            "&nbsp;&nbsp;SysfacSystems. Todos los derechos reservados</p>" +
            "</div>";
    document.write(txt_footer);
}

function rotar_imagen() {
    var tiempo = 1000;//tiempo en milisegundos
    var aMin = 1;
    var aMax = 10;
    var aNum = (aMax - aMin) + 1;
    var aDir = 'css/fondos/';
    var arrImagenes = new Array();
    for (var xx = 0; xx < aNum; xx++) {
        var j = aMin + xx;
        arrImagenes[xx] = aDir + j + '.jpg';
    }

    var _img = document.getElementById('img_fondo');
    // Genera aleatorio
    var vImg = (Math.round((Math.random() * aNum)));
    if (vImg >= aNum) {
        vImg = aNum - 1;
    }
    //cargar la 1er imagen
    _img.src = arrImagenes[vImg];

}

function imagenCanvas() {
    var tiempo = 1000;//tiempo en milisegundos
    var aMin = 1;
    var aMax = 10;
    var aNum = (aMax - aMin) + 1;
    var aDir = 'css/fondos/';
    var arrImagenes = new Array();
    for (var xx = 0; xx < aNum; xx++) {
        var j = aMin + xx;
        arrImagenes[xx] = aDir + j + '.jpg';
    }

    var wcanvas = document.getElementById('myCanvasImg');
    var ctx = wcanvas.getContext("2d");
    // Genera aleatorio
    var vImg = (Math.round((Math.random() * aNum)));
    if (vImg >= aNum) {
        vImg = aNum - 1;
    }
    var nwimg = new Image();
    nwimg.src = arrImagenes[vImg];
    //cargar la 1er imagen
    //_img.src = arrImagenes[vImg];
    
    nwimg.onload = function(){
        ctx.drawImage(nwimg, 0, 0);
    };

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(wCookie) {
    var wcook = getCookie(wCookie);
    return wcook;
}

function checkMobile() {
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }

    };
    var contenedor = $('#divMainLogin');
    var browserType = isMobile.any() ? "Mobil" : "Desktop";
    if (!isMobile.any()) {
        $("#esMovil").val(browserType);
        contenedor.css('backgroundImage', 'url(images/bg-01.jpg)');
    }
    if (isMobile.Android()) {
        jQuery("#dispositivo").attr("src", "img/android.png");
        contenedor.css('backgroundImage', 'url(images/bg-02.jpg)');
    }
    if (isMobile.iOS()) {
        jQuery("#dispositivo").attr("src", "img/ios.png");
        contenedor.css('backgroundImage', 'url(images/bg-02.jpg)');
    }
}


function ExportToExcel(wdocument){
    var htmltable= document.getElementById(wdocument);
    var html = htmltable.outerHTML;
    while (html.indexOf('á') !== -1) html = html.replace('á', '&aacute;');
    while (html.indexOf('é') !== -1) html = html.replace('é', '&eacute;');
    while (html.indexOf('í') !== -1) html = html.replace('í', '&iacute;');
    while (html.indexOf('ó') !== -1) html = html.replace('ó', '&oacute;');
    while (html.indexOf('ú') !== -1) html = html.replace('ú', '&uacute;');
    while (html.indexOf('º') !== -1) html = html.replace('º', '&ordm;');
    while (html.indexOf('Ñ') !== -1) html = html.replace('Ñ', '&#209;');
    while (html.indexOf('ñ') !== -1) html = html.replace('ñ', '&#241;');
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

}

function ponerFecha2(wdesde,whasta) {
    var wDate = new Date();
    var wDia = "0" + wDate.getDate();
    var wMes = "0" + (wDate.getMonth() + 1);
    var wYear = wDate.getFullYear();
    var wFecha = wYear + "-" + wMes.slice(wMes.length - 2, 3) + "-" + wDia.slice(wDia.length - 2, 3);
    document.getElementById(wdesde).value = wYear+"-"+wMes.slice(wMes.length-2,3)+"-"+"01";
    document.getElementById(whasta).value = wFecha;
}

function poneFecha(wdesde,whasta) {
    var wDate = new Date();
    var wDia = "0" + wDate.getDate();
    var wMes = "0" + (wDate.getMonth() + 1);
    var wYear = wDate.getFullYear();
//    var wFecha = wYear + "-" + wMes.slice(wMes.length - 2, 3) + "-" + wDia.slice(wDia.length - 2, 3);
    var wFecha = wDia.slice(wDia.length-2,3)+"/"+wMes.slice(wMes.length-2,3)+"/"+wYear;
    document.getElementById(wdesde).value = "01/"+wMes.slice(wMes.length-2,3)+"/"+wYear;
    document.getElementById(whasta).value = wFecha;
}
      
function formatoNumero(wnumero){
    var wformato=wnumero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    return wformato;
}

function cuentaChars(wimp,wresult,wLimite){
    var wcampo=document.getElementById(wimp);
    var wnc=wcampo.value.length;
    if (wnc > wLimite) {
        wcampo.value = wcampo.value.substring(0, wLimite); 
    }else{
        document.getElementById(wresult).value=wLimite - wnc; 
     
    }     
} 

function datosEmpresa(wdato) {
    $.ajax({
        url: "php/datosEmpresa.php",
        method: "POST",
        async: false,
        data: {wform: wdato},
        success: function (resp) {
document.write(resp);
        }
    });
}

function miEmpresa() {
	var wcontacto=
	"<p class=\"text-uppercase\">"+
	"MZA.“B” LOTE 31, APV. Valle Azul San Diego II Etapa."+
	"<br>San Martín de Porres - Lima - <b>Perú</b></p>";
	document.write(wcontacto);
}


function nosotros() {
	var wcontacto=
	"Somos una empresa de venta de ropa ONLINE. Ofrecemos ropa de mejor calidad que satisfaga las necesidades y gustos del mercado potencial, vendemos ropa a la moda que cumpla con los requerimientos de estilo en el segmento del mercado.";
	document.write(wcontacto);
}

function altura(){
  var altura_arr = [];//CREAMOS UN ARREGLO VACIO
  $('.descrip').each(function(){//RECORREMOS TODOS LOS CONTENEDORES DE LAS IMAGENES, DEBEN TENER LA MISMA CLASE
    var altura = $(this).height(); //LES SACAMOS LA ALTURA
    altura_arr.push(altura);//METEMOS LA ALTURA AL ARREGLO
  });
  altura_arr.sort(function(a, b){return b-a}); //ACOMODAMOS EL ARREGLO EN ORDEN DESCENDENTE
  $('.descrip').each(function(){//RECORREMOS DE NUEVO LOS CONTENEDORES
    $(this).css('height',altura_arr[0]);//LES PONEMOS A TODOS LOS CONTENEDORES EL PRIMERO ELEMENTO DE ALTURA DEL ARREGLO, QUE ES EL MAS GRANDE.
  });
}