$(document).ready(function () {
    leeXML();
    
//    wwpag = $('input[name=wpagina]').val();
//    listarProds('01','Uniformes','categoria');

});



function leeXML() {
	
	var wwfoto="img/prods/";
	var wwdiv=
                        "<div class=\"col-md-3\">"+
                        "    <div class=\"card\">"+
                        "        <img class=\"img-responsive img-rounded card-img-top\" src=\"img/prods/prod20.jpg\" alt=\"Producto1\" title=\"Producto1\" data-toggle=\"popover\" data-trigger=\"hover\" data-content=\"Descripcion del producto. para que sirve, como se usa.\">"+
                        "        <div class=\"card-body\">"+
                        "            <h3 class=\"text-uppercase\">Nombre producto20</h3>"+
                        "            <p class=\"card-title\">Precio</p>"+
                        "            <p class=\"card-text\">Completa el formulario y regístrate para que accedas a compras en línea y descuentos especiales.</p>"+
                        "        </div>"+
                        "    </div>"+
                        "</div>";
						$("#divProds").append(wwdiv);
  $.ajax({
    type: "GET",
    url: "productos.xml",
    dataType: "xml",
    success: function(xml){
    $(xml).find('producto').each(function(){
      var wnombre = $(this).find('nombre').text();
      var wfoto = wwfoto+$(this).find('FOTO').text();
      $("<li></li>").html(wnombre + ", " + wfoto).appendTo("#divProds ul");
    });
  },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });
}

