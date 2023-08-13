$(document).ready(function () {
    wwpag = $('input[name=wpagina]').val();
	listaCategorias();

	$('#btnExportar').click(function () {
        ExportToExcel("tablaParticipa");
    });

});

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

    function listaProductos() {
		var wwpag="html";
        $('#divMyCarr').empty();
        $.ajax({
            method: "POST",
            url: 'php/lstProdsTodos.php',
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
				altura();
           }
       });
    };
    
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
			listarProdMaster("C01","HOMBRE");
           }
       });
}



function listarProdMaster(wcat,wnombre) {
    $('#tituloCategoria').html(wnombre);
    var wwpag = $('input[name=wpagina]').val();
    $.ajax({
        method: "POST",
        url: 'php/listaProdMaster.php',
        data: {categoria: wcat, wpagina: wwpag,campobuscar:wnombre},
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




	