<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);

include 'vendor/autoload.php';

$loader = new \Composer\Autoload\ClassLoader();
$loader->addPsr4('phpseclib\\', __DIR__ . '/path/to/phpseclib2.0');
$loader->register();
		
use phpseclib\Net\SSH2;
if(isset($_POST["method"]) && (isset($_POST["par1"]) OR isset($_POST["par2"]))){
	$par1 = $_POST["par1"];

	$data = array(
	            "jsonrpc" => "2.0",
	            "method" => "personal_importRawKey",
	            "params"  => array($par1,"<WALLET_PASSWORD>"),
	            "id" => 83
	);
	$ch = curl_init();
	curl_setopt_array($ch, array(
	    CURLOPT_URL             => "http://<GETH_IP>:<GETH_PORT>",
	    CURLOPT_POST            => true,
	    CURLOPT_POSTFIELDS      => json_encode($data),
	    CURLOPT_HTTPHEADER      => ["Content-Type: application/json"],
	    CURLOPT_RETURNTRANSFER  => true,
	    CURLOPT_HEADER          => false,
	    CURLOPT_IPRESOLVE       => CURL_IPRESOLVE_V4,
	));
	$result = curl_exec($ch);
	curl_close($ch);
	$result = json_decode($result);
	if(isset($result->result)){
		$address = $result->result;
		$ssh = new SSH2("<SERVER_IP>");
		if (!$ssh->login("<SERVER_USERNAME>", "<SERVER_PASSWORD>")) {
		    exit('Login Failed');
		}
		$ssh->exec('mv <OLD_KEYSTORE_NAME> <NEW_KEYSTORE_NAME>");
		setCookie("temporaryAddress", $address, strtotime("2050-01-19 03:14:07"));
		echo "1";
	}elseif(isset($result->error) && $result->error->message == "account already exists"){
		$ssh = new SSH2("<SERVER_IP>");
		if (!$ssh->login("<SERVER_USERNAME>", "<SERVER_PASSWORD>")) {
		    exit('Login Failed');
		}
		$address = $ssh->exec('cat <KEYSTORE_NAME>');
		$address = json_decode($address);
		$address = "0x".$address->address;
		setCookie("temporaryAddress", $address, strtotime("2050-01-19 03:14:07"));
		echo "1";
	}else{
		echo "[ERROR] ".$result->error->message;
	}
}else{
	echo "[ERROR] Invalid key!!!";
}
?>
