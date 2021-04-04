const boton = document.getElementById("boton");
boton.addEventListener("click", async () => {
  const userName = document.getElementById("userInput");
  const pass = document.getElementById("passInput");
  //alert(userName.value + " " + pass.value);
  // Enviar datos al servidor mediante un POST
  const data = { user: userName.value, pass: pass.value };
  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const respuesta = await fetch("/api", opciones);
  const datos = await respuesta.json();
  //console.log(datos);
  if (datos.login) {
    window.location = "geo.html";
    //alert(datos.login);
  } else {
    alert("Datos incorrectos");
    userName.value = "";
    pass.value = "";
  }
});
