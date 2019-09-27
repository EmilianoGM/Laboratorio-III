let xhttp : XMLHttpRequest = new XMLHttpRequest();

function Test(): void{
  xhttp.open("GET", "Backend/test.php", true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
  }
}

function Test_params():void {
  let nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
  let url = "Backend/test_params.php" + "?nombre=" + nombre;
  xhttp.open("GET", url , true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
  }
}
window.onload = () => {
  Test();
}
