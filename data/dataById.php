<?php
    require_once("../dbconnect.php");

    if(isset($_POST['idVal'])){
        $output = "<span class=\"close\"><i class=\"fa fa-times-circle\" style=\"font-size:24px\"></i></span>";
        $query = "SELECT * FROM geo_data WHERE idGeo =:idGeo";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':idGeo', $_POST['idVal']);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

       foreach($res as $row){
            $output .= "<div class=\"card\"><img src=\"" . $row['image_url'] . "\" class=\"card-img-top\" alt=\"\"><div class=\"card-body\"><p class=\"card-text\">Artist: " . $row['artiste'] . "</p><p class=\"card-text\">Year: " . $row['annee'] ."</p><p class=\"card-text\">Organization: " . $row['organisme'] ."</p><p class=\"card-text\">Adress: " . $row['adresse'] ."</p><p class=\"card-text\">District: " . $row['arrondissement'] ."</p></div></div>";
        }

        echo $output;
    }
?>