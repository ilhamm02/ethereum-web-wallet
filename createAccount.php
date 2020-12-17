<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);

include 'vendor/autoload.php';

$loader = new \Composer\Autoload\ClassLoader();
$loader->addPsr4('phpseclib\\', __DIR__ . '/path/to/phpseclib2.0');
$loader->register();
		
use phpseclib\Net\SSH2;
if(isset($_POST["method"])){
	$dokumen = $db->query('SELECT * FROM kunci WHERE id = "1" ');
  $dokumen->execute();
  $dokumen = $dokumen->fetch();

	$data = array(
	            "jsonrpc" => "2.0",
	            "method" => "personal_newAccount",
	            "params"  => array("<WALLET_PASSWORD>"),
	            "id" => 83
	);
	$ch = curl_init();
	curl_setopt_array($ch, array(
	    CURLOPT_URL             => "http://<GETH_IP>:<GETH_PORT>",
	    CURLOPT_POST            => true,
	    CURLOPT_POSTFIELDS      => json_encode($data),
	    CURLOPT_HTTPHEADER      => ["Content-Type: application/json"], // tanpa tanda kurung
	    CURLOPT_RETURNTRANSFER  => true,
	    CURLOPT_HEADER          => false,
	    CURLOPT_IPRESOLVE       => CURL_IPRESOLVE_V4,
	));
	$result = curl_exec($ch);
	curl_close($ch);
	$result = json_decode($result);
	if(isset($result->result)){
		$address = $result->result;
		$address1 = explode("0x", $address);
		$ssh = new SSH2($dokumen["ip_console"]);
		if (!$ssh->login("<SERVER_IP>", "<SERVER_PASSWORD>")) {
		    exit('Login Failed');
		}
		$par1 = $ssh->exec('<GET_ADDRESS_PRIVATE_KEY>');
		$ssh->exec('mv <OLD_KEYSTORE_NAME> <NEW_KEYSTORE_NAME>);
		setCookie("temporaryAddress", $address, strtotime("2050-01-19 03:14:07"));
		echo "[SUCCESS]";
	}else{
		echo "[ERROR] ".$result->error->message;
	}
}else{
	echo "[ERROR] Invalid key!!!";
}
?>
