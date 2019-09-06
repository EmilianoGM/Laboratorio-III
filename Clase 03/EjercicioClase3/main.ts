/// <reference path="empleado.ts" />
let nuevoEmpleado : Entidades.Empleado = new Entidades.Empleado("Emiliano", "Medina", 24567841, "M", 123456, 100000);
console.log(nuevoEmpleado.ToString());
console.log(nuevoEmpleado.Hablar("español"));
