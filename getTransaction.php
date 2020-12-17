<?php
if(isset($_GET["method"]) && $_GET["method"] == "getTransaction" && isset($_GET["address"]) && !isset($_GET["contract"])){

}elseif(isset($_GET["method"]) && $_GET["method"] == "getTransaction" && isset($_GET["address"]) && isset($_GET["contract"])){
	if($_GET["contract"] == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"){
		$ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, "https://api.covalenthq.com/v1/1/address/".$_GET['address']."/transactions_v2/?key=<API_KEY>);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

	    $result = curl_exec($ch);
	    if (curl_errno($ch)) {
	        echo 'Error:' . curl_error($ch);
	    }

	    curl_close ($ch);
	    
	    $result = json_decode($result);
	    if(count($result->data->items) < 25){
	    	$length = count($result->data->items)-1;
	    }else{
	    	$length = 24;
	    }
	    for($i = 0; $i<=$length;$i++){
	    	if($result->data->items[$i]->from_address == $_GET["address"]){
	    		$type = "out";
	    		$to = $result->data->items[$i]->to_address;
	    	}elseif($result->data->items[$i]->to_address == $_GET["address"]){
	    		$type = "in";
	    		$to = $result->data->items[$i]->from_address;
	    	}
	    	echo $type." _ ".date_format(date_create($result->data->items[$i]->block_signed_at),'Y/m/d H:i:s')." _ ".$result->data->items[$i]->tx_hash." _ ".$result->data->items[$i]->value." _ ".$to." _ ".$result->data->items[$i]->gas_spent." _ ".$result->data->items[$i]->gas_price." | ";
	    }
	}else{
		$ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, "https://api.covalenthq.com/v1/1/address/".$_GET['address']."/transactions_v2/?key=<API_KEY>);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

	    $result = curl_exec($ch);
	    if (curl_errno($ch)) {
	        echo 'Error:' . curl_error($ch);
	    }

	    curl_close ($ch);
	    
	    $result = json_decode($result);
	    if(count($result->data->items) < 25){
	    	$length = count($result->data->items)-1;
	    }else{
	    	$length = 24;
	    }
	    for($i = 0; $i<=$length;$i++){
	    	if($result->data->items[$i]->from_address == $_GET["contract"] || $result->data->items[$i]->to_address == $_GET["contract"]){
		    	if($result->data->items[$i]->from_address == $_GET["address"]){
		    		$type = "out";
		    		$to = $result->data->items[$i]->log_events[0]->decoded->params[1]->value;
		    	}else{
		    		$type = "in";
		    		$to = $result->data->items[$i]->from_address;
		    	}
		    	$date = date_create($result->data->items[$i]->block_signed_at);
		    	echo $type." _ ".date_format($date,'Y/m/d H:i:s')." _ ".$result->data->items[$i]->tx_hash." _ ".$result->data->items[$i]->log_events[0]->decoded->params[2]->value." _ ".$to." _ ".$result->data->items[$i]->gas_spent." _ ".$result->data->items[$i]->gas_price." | ";
		    }
	    }
	}
}
?>
