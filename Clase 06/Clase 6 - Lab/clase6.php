<?php

try{
    $connection = new PDO("mysql:host=localhost;dbname=cdcol;charset=utf8", "root", "");
    $result = $connection->query("SELECT * FROM cds");
    $array = $result->fetchAll();
    var_dump($array);
}
catch(PDOException $e){
    echo $e->getMessage();
}
?>