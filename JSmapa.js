var obrazek = "https://api.mapy.cz/img/api/marker/drop-red.png";

var m = new SMap(JAK.gel("m"));
m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
m.addControl(mouse);

var vrstva = new SMap.Layer.Marker();     /* Vrstva se značkami */
var souradnice = [];
// data pro markery
var markers = [{
	name: "Doučování",
  id: 1,
  coords: "50.1304944\"N,14.4956761\"E"
}];

// vytvoreni markeru
markers.forEach(function(marker) {
	var c = SMap.Coords.fromWGS84(marker.coords); /* Souřadnice značky, z textového formátu souřadnic */

  var options = {
        url: obrazek,
        title: marker.name,
        anchor: {left:10, bottom: 1}  /* Ukotvení značky za bod uprostřed dole */
    }

    // duletize je prirazeni id jednotlivemu markeru - vlastni id, jinak se generuje nahodne
    var znacka = new SMap.Marker(c, marker.id, options);
    souradnice.push(c);
    vrstva.addMarker(znacka);
});

// zobrazime a povolime vrstvu - pokud by se vrstva povolila pred vkladanim markeru, tak by se s kazdym vlozenym markerem prekreslovala mapa a pocitaly pozice vsech markeru
m.addLayer(vrstva);                          /* Přidat ji do mapy */
vrstva.enable();                         /* A povolit */

var cz = m.computeCenterZoom(souradnice); /* Spočítat pozici mapy tak, aby značky byly vidět */
m.setCenterZoom(cz[0], cz[1]);

// poslouchani na kliknuti u markeru
m.getSignals().addListener(this, "marker-click", function(e) {
  // vybrany marker
  var marker = e.target;
  var id = marker.getId();
  // zobrazime jeho jmeno - parovani vybraneho markeru pomoci jeho id a nasich vstupnich dat
  for (var i = 0; i < markers.length; i++) {
  	if (markers[i].id == id) {
    	alert(markers[i].name);
      break;
    }
  }
});
