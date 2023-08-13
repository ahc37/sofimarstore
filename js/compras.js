$(document).ready(function () {
	
    wwpag = $('input[name=wpagina]').val();
    
    $('#closeCarr').click(function () {
        $('#itmEdt').hide(300);
    });
        
    $('#btnBuscaByName').click(function () {
        var wtxt=$('input[name=textobuscar]').val().trim();
        listarProdMaster(wtxt,'nombre');
    });

	$('.botonF1').hover(function(){
	  $('.xbtn').addClass('animacionVer');
	});

	$('.xcontenedor').mouseleave(function(){
	  $('.xbtn').removeClass('animacionVer');
	}); 

	$('#btnEnviar').click(function () {
		if (	$('input[name=nombre]').val().trim().length>0 && 
				$('input[name=telefono]').val().trim().length>0 && 
				$('input[name=correo]').val().trim().length>0 && 
				$('input[name=correo]').val().trim().indexOf("@")!==-1  && 
				$('input[name=correo]').val().trim().indexOf(".")!==-1  
		) {
			envMail();
		} else {
			alert ('Por favor, ingrese la información requerida\nGracias');
		}
	});
	
	$('#btnClose').click(function () {
		$('#dvCotiza').fadeOut(300);
		$('#dvProductos').fadeIn(500);	
	});
	
    $('#closeSesion').click(function () {
        
        $.ajax({
            method: "POST",
            url: 'php/logout.php',
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
             //   openPage('01010001');
           }
       });
    });

   
});

	function envMail() {
		if ( $('#xcaptcha').val().trim()==$('#miTexto').val().trim())  {
			$('#dvCotiza').fadeOut(300);
			$('#dvProductos').fadeIn(500);
			$.ajax({
				method: "POST",
				url: 'php/contactoCotiza.php',
				data: {nombre: $('input[name=nombre]').val(),correo:$('input[name=correo]').val(),telefono:$('input[name=telefono]').val(),
					mensaje:$('textarea[name=mensaje]').val(),cantidad:$('input[name=canti]').val(),producto:$('#nameProd').text(),
					xcaptcha:$('#xcaptcha').val().trim(),miTexto:$('#miTexto').val().trim()},
				statusCode: {
					404: function () {
						alert('Pagina no encontrada');
					},
					500: function (e) {
						alert('Error de servidor: '+e);
					}
				},			
				success: function(datos)
				{
					alert (datos);
				}
		   });
		} else {
			alert ('El texto ingresado no coincide!');
		}
	}
	
		function displayText(wespec) {
			var element=document.getElementById(wespec);
			element.classList.toggle("mostrar");
		} 
		
	function cotizar(e,n){
		var wsms="Solicito cotización del producto \n"+e;
		var wtxt=document.getElementById('prd'+n);
		var wimg=document.getElementById('img'+n).src;
		var wcontenido=wtxt.innerHTML;
		$('#nameProd').text(e);
		$('#myText').empty();
		$('#mensaje').text("");
		$('#mensaje').text(wsms);
		$('#myText').append(wcontenido);		
		$('#myProd').attr("src", wimg);
		$('#dvProductos').fadeOut(300);
		$('#dvCotiza').fadeIn(500);
	}
	
	
    function misPedidos() {
        var wwpag = $('input[name=wpagina]').val();
        $('#divPedidos').empty();
        $.ajax({
            method: "POST",
            url: 'php/verMisPedidos.php',
            data: {wpagina: wwpag},
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
                $('#divPedidos').append(datos);
           }
       });
    };
    
    function myTempCar() {
        var wwpag = $('input[name=wpagina]').val();
        $('#divMyCarr').empty();
        $.ajax({
            method: "POST",
            url: 'php/verCarritoTemp.php',
            data: {wpagina: wwpag},
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
                $('#divMyCarr').append(datos);
           }
       });
    };
    
function addToCar(wid,wprecio,wnum) {
    var wcant=document.getElementById('cant'+wnum).value;
    var wwpag = $('input[name=wpagina]').val();
        $.ajax({
            method: "POST",
            url: 'php/addProdCarro.php',
            data: {wpagina: wwpag, id_art:wid,cantidad:wcant,precio:wprecio},
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
alert(datos);
location.reload();
           }
       });
}	

function listaCategorias() {
        $.ajax({
            method: "POST",
            url: 'php/listaCategoria.php',
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
            $('#mcat').empty();
            $('#mcat').append(datos);
           }
       });
}

function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
	var sParametro = sPaginaURL.split('=');
    if (sParametro[0] === sParametroNombre) {
		return sParametro[1];
    }
    return null;
	
}

function openPage(wfam) {
    var url = "productos.php?cat=" + encodeURIComponent(wfam);
    window.location.href = url;
}

function openProd(wcat,wmaster,wprecio) {
	listarProductos(wcat,wmaster,'id_master',wprecio);
}	

function listarProdMaster(wcat,wcampobuscar,wnombre) {
    $('#tituloCategoria').html(wnombre);
    var wwpag = $('input[name=wpagina]').val();
    $.ajax({
        method: "POST",
        url: 'php/listaProdMaster.php',
        data: {categoria: wcat, wpagina: wwpag,campobuscar:wcampobuscar},
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
            $('#divMyCarr').show(0);
            $('#divMyCarr').empty();
            $('#divMyCarr').append(datos);
			altura();
        }
    });
}

function listarProductos(wcat,wmaster,wcampo,wprecio) {
//    $('#tituloCategoria').html(wnombrefam);
    var wwpg = wwpag;
    $.ajax({
        method: "POST",
        url: 'php/listaproductos.php',
        data: {categoria: wcat, master: wmaster, wpagina: wwpg,campobuscar:wcampo,precio:wprecio},
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
            $('#divMyCarr').show(0);
            $('#divMyCarr').empty();
            $('#divMyCarr').append(datos);
        }
    });
}

function editaArt(wid,wprecio,wnum) {
    var wcant=document.getElementById('cant'+wnum).value;
    var wwpag = $('input[name=wpagina]').val();
    
    $.ajax({
        method: "POST",
        url: 'php/addProdCarro.php',
		data: {wpagina: wwpag, id_art:wid,cantidad:wcant,precio:wprecio},
        statusCode: {
            404: function () {
                alert('Pagina no encontrada');
            },
            500: function (e) {
                alert('Error de servidor: '+e);
            }
        },			
        success: function(datos)
        {
            alert(datos);
            location.reload();
       }
    });
}

function deleteArt(wid) {
    var wwpag = $('input[name=wpagina]').val();
        $.ajax({
            method: "POST",
            url: 'php/deleteItemCarro.php',
            data: {wpagina: wwpag, id_art:wid},
            statusCode: {
                404: function () {
                    alert('Pagina no encontrada');
                },
                500: function (e) {
                    alert('Error de servidor: '+e);
                }
            },			
            success: function(datos)
            {
alert(datos);
location.reload();
           }
       });
}
	