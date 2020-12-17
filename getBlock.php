<?php
    if(isset($_GET["method"]) && $_GET["method"] == "blockNumber"){
    $data = array(
                "jsonrpc" => "2.0",
                "method" => "eth_blockNumber",
                "params"  => array(),
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
    echo hexdec($result->result);
}
?>
