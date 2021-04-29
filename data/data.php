<?php
    require_once('../dbconnect.php');

    //reading json file
    $json = file_get_contents('data.json');

    //converting json object to php associative array
    $data = json_decode($json, true);

    $geoData = $data['features'];
    
    //processing the array of ojbects
    foreach ($geoData as $datas) {
        $idGeo = $datas['properties']['id'];
        $artisteGeo = $datas['properties']['artiste'];
        $organismeGeo = $datas['properties']['organisme'];
        $adresseGeo = $datas['properties']['adresse'];
        $anneeGeo = $datas['properties']['annee'];
        $arrondissementGeo = $datas['properties']['arrondissement'];
        $latitudeGeo = $datas['properties']['latitude'];
        $longitudeGeo = $datas['properties']['longitude'];
        $imageGeo = $datas['properties']['image'];

        $sql = $conn->prepare('SELECT COUNT(*) FROM geo_data WHERE idGeo = :idGeo');
        $sql->bindValue(':idGeo', $idGeo);
        $sql->execute();

        if($sql->fetchColumn()){die('Data already exist');}

       
        //preparing statment for insert query
        $st = $conn->prepare("INSERT INTO geo_data (idGeo,artiste,organisme,adresse,annee,arrondissement,latitude,longitude,image_url) VALUES (:idGeo,:artiste,:organisme,:adresse,:annee,:arrondissement,:latitude,:longitude,:image_url)");
        $st->bindValue(':idGeo', $idGeo);
        $st->bindValue(':artiste', $artisteGeo);
        $st->bindValue(':organisme', $organismeGeo);
        $st->bindValue(':adresse', $adresseGeo);
        $st->bindValue(':annee', $anneeGeo);
        $st->bindValue(':arrondissement', $arrondissementGeo);
        $st->bindValue(':latitude', $latitudeGeo);
        $st->bindValue(':longitude', $longitudeGeo);
        $st->bindValue(':image_url', $imageGeo);

        $st->execute();

    }
    
?>