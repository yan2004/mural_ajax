<?php
     require_once('../dbconnect.php');
    
    if(isset($_POST["query"])){
        $output = "";
        $query = "SELECT * FROM geo_data WHERE CONCAT(artiste,organisme,adresse,annee,arrondissement) LIKE '%" . $_POST["query"] ."%' ORDER BY artiste ASC;";
        $res = $conn->query($query);
        $output = "<ul class='list-research'>";
       
        //If there's something return
        if($res->fetchColumn() > 0){
            while($rows = $res->fetchAll()){
                foreach($rows as $row){
                    $output .= "<li>". $row['artiste']. ' | '. $row['adresse'] . ' | '. $row['idGeo'] ."</li>";
                }
            }
        }else{
            $output .= "<li>No related map element found</li>";
        }
        $output .= "</ul>";
        echo $output;
        
    }
    
?>