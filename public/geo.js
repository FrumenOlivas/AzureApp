if ("geolocation" in navigator) {
  // Obtener informacion de la ubicacion geografica del cliente
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    document.getElementById("lat").textContent = lat;
    document.getElementById("lon").textContent = lon;

    // Enviar datos al servidor mediante un POST
    const data = { lat, lon };
    const opciones = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const respuesta = await fetch("/api", opciones);
    const datos = await respuesta.json();
    //console.log(datos);
    document.getElementById("link").setAttribute("href", datos.url);

    // Acceder a una API externa
    const resp = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const dat = await resp.json();
    console.log(
      //`https://www.google.com/maps/@${dat.latitude},${dat.longitude},17z`
      `https://www.google.com/maps/search/?api=1&query=${dat.latitude},${dat.longitude}`
    );
  });
} else {
  document.getElementById("mensaje").textContent = "NO";
}
