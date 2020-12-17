<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);
if(isset($_GET["method"]) && $_GET["method"] == "getChart" && isset($_GET["ticker"]) && isset($_GET["range_from"]) && isset($_GET["range_to"])){
    if($_GET["range_from"] == "chartMonthly" && $_GET["range_to"] == "chartMonthly"){
        $start = date('Y-m-d', strtotime('-1 months'));
    }elseif($_GET["range_from"] == "volatily1d" && $_GET["range_to"] == "volatily1d"){
        $start = date('Y-m-d', strtotime('-1 days'));
    }else{
        $start = $_GET["range_from"];
    }
    $end = date('Y-m-d');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.covalenthq.com/v1/pricing/historical/usd/".$_GET["ticker"]."/?from=".$start."&to=".$end."&key=<API_KEY>");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

    curl_close ($ch);

    $result = json_decode($result);
    if($_GET["range_from"] == "volatily1d" && $_GET["range_to"] == "volatily1d"){
        if(isset($result->data) &&$result->data->contract_address == $_GET["contract"]){
            $per = $result->data->prices[0]->price - $result->data->prices[1]->price;
            $per = $per/$result->data->prices[1]->price;
            echo $per*100;
        }
    }else{
        for($i=0;$i<=count($result->data->prices)-1;$i++){
            echo date_format(date_create($result->data->prices[$i]->date), 'm/d')." _ ".$result->data->prices[$i]->price." | ";
        }
    }
}
?>
