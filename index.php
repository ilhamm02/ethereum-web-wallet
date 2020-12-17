<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Covalent Wallet</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
<link rel="stylesheet" href="../cssstyle.css">
<header>
	<nav class="header-home" id="header-home">
		<p class="header-title"><img src="http://okesip.xyz/img/20201210_074310.png" style="height:35px;width:auto;display:inline;block;" alt="Covalent Wallet"></p>
	</nav>
</header>
<body>
	<div class="container-wallet-login container-wallet" id="container-wallet-login" style="display: block;"><p style="color:white;text-align:center;font-size:15px;">Import / Create Ethereum Wallet</p>
		<div class="container-wallet" style="width:290px;">
			<button class="setup-wallet shadow" id="create-wallet" onclick="openCreate()">Create Wallet</button>
			<button class="setup-wallet shadow" id="import-wallet" onclick="openImport()">Import Wallet</button>
			<button class="setup-wallet shadow" id="watch-wallet" style="width:265px;margin-top: 10px;" onclick="$('#modal-wallet').css('display','block');">Watch Wallet</button>
		</div>
	</div>
	<div class="modal" id="modal-wallet" style="display: none;height: 235px;">
		<p style="color: black;text-align: center;font-size: 17px;">Watch Wallet</p>
		<hr>
		<p style="color: black;text-align: left;">Ethereum Address</p>
		<textarea row="3" class="input-wallet" id="watch-input" style="min-height:70px;width: :100%"></textarea>
		<div class="container-wallet" style="width:290px;">
			<button class="setup-wallet shadow" id="import-wallet" onclick="watchWallet()" style="background: #0d2150;color: white;border-color: #0d2150">Watch Wallet</button>
			<button class="setup-wallet shadow" id="cancel-wallet" onclick="$('#modal-wallet').css('display','none');document.getElementById('watch-input').innerHTML = ''" style="background: white;color: #0d2150;border-color: #0d2150">Cancel</button>
		</div>
	</div>
	<div class="modal" id="modal-wallet2" style="display: none;height: 285px;">
		<div id="blocking-login" style="display:none;position: absolute;top:0;left:0;width: 100%;height:100%;background: rgba(0,0,0,0.3);">
			<p style="position:absolute;color:#0d2150;font-family: 'Orkney';font-size: 17px;top: 50%;left: 50%;-moz-transform: translateX(-50%) translateY(-50%);-webkit-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);">Please Wait...</p>
		</div>
		<p style="color: black;text-align: center;font-size: 17px;">Import Wallet</p>
		<hr>
		<div style="display: flex;flex-wrap: nowrap;background: white;width: 100%">
			<div id="privKey" onclick="privKey()" style="margin:1.5px;font-size: 13px;text-align: center;color:#0d2150;width: 50%;border-bottom: 3px solid #0d2150;padding: 7px;cursor: pointer;">
				Private Key
			</div>
			<div id="mnemo" onclick="mnemo()" style="margin:1.5px;font-size: 13px;text-align: center;color:#0d2150;width: 50%;border-bottom: 0px solid #0d2150;padding: 7px;cursor: pointer;">
				Mnemonic
			</div>
		</div>
		<div class="alert-warning" id="alert-login2" style="display: none;">
		  	<div style="display: flex;flex-wrap: nowrap;background: transparent;">
		  		<p id="alert-login-p2"></p>
		  	</div>
		</div>
		<div id="input-privkey">
			<p style="color: black;text-align: left;">Private  Key</p>
			<textarea row="3" class="input-wallet" id="privkey-input" style="min-height:70px;"></textarea>
		</div>
		<div id="input-keystore" style="display: none;">
			<p style="color: black;text-align: left;">Keystore</p>
			<textarea row="3" class="input-wallet" id="keystore-input" style="min-height:70px;"></textarea>
			<p style="color: black;text-align: left;">Key Password</p>
			<input type="Password" id="password-wallet2" onkeyup="validationPassword()" name="password-wallet" class="input-wallet">
			<input type="checkbox" id="revealPassword2" onclick="revealPassword2()" style="color: black;cursor: pointer;">
			<label for="revealPassword2" style="cursor: pointer;">Show Password</label>
		</div>
		<div id="input-mnemo" style="display: none;">
			<p style="color: black;text-align: left;">Mnemonic</p>
			<textarea row="3" class="input-wallet" id="mnemo-input" style="min-height:70px;"></textarea>
		</div>
		<div class="container-wallet" style="width:290px;">
			<button class="setup-wallet shadow" id="import-wallet" onclick="importWallet()" style="background: #0d2150;color: white;border-color: #0d2150">Import Wallet</button>
			<button class="setup-wallet shadow" id="cancel-wallet" onclick="cancelWallet()" style="background: white;color: #0d2150;border-color: #0d2150">Cancel</button>
		</div>
	</div>
	<div class="alert-warning" id="alert-floating" style="display:none;word-wrap: break-word;position: absolute;top:3px;right: 3px;width:290px;z-index:10;animation-name: open-alert-floating;animation-duration: 0.3s;">
		<span class="closebtn" onclick="this.parentElement.style.display='none';" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 22px;line-height: 20px;cursor: pointer;">&times;</span>
		<p id="alert-floating-p" style="font-size: 13px;"></p>
	</div>

	<div class="container rounded shadow-sm bg-white p-7" id="token-dashboard" style="display:none;padding:7px;z-index: 6;margin-top: 0px;height: 700px;">
		<div class="div-hover address-div rounded shadow-sm" onclick="$('#modal-address').css('display','block');">
			<div style="width:5%;">
				<img src="https://avatars1.githubusercontent.com/u/47313528?s=88&v=4" alt="Address" style="width:100%;height:auto;">				
			</div>
			<div style="width:95%;padding: 7px;word-wrap: break-word;">
				<p id="address-here" style="margin-top: -10px;font-size: 15px;"></p>
				<p id="estimated-here" style="font-size:11px;margin-top:-17px;margin-bottom:-10px;color:#6f6f6f">~<span class="fa fa-usd"></span> <u id="all-estimate" style="text-decoration:none;"></u></p>
			</div>
		</div>
		<div style="display: flex;flex-wrap: nowrap;background: white;width: 100%;margin-top:10px;">
			<div class="div-hover rounded" id="token-button" onclick="openToken()" style="transition:0.7s;margin:1.5px;font-size: 13px;text-align: center;color:#0d2150;width: 33%;border-bottom: 3px solid #0d2150;padding: 7px;cursor: pointer;">
				ERC-20
			</div>
			<div class="div-hover rounded" id="nft-button" onclick="openNft()" style="transition:0.7s;margin:1.5px;font-size: 13px;text-align: center;color:#0d2150;width: 33%;border-bottom: 0px solid #0d2150;padding: 7px;cursor: pointer;">
				ERC-721
			</div>
			<div class="div-hover rounded" id="transaction-button" onclick="openTransaction()" style="transition:0.7s;margin:1.5px;font-size: 13px;text-align: center;color:#0d2150;width: 33%;border-bottom: 0px solid #0d2150;padding: 7px;cursor: pointer;">
				Transaction
			</div>
		</div>
		<div class="overflow-div" style="margin-top: 10px;height: 556px;overflow-y: auto;">
			<div id="token-all">
				<div class="div-hover rounded token-list" title="Ethereum" onclick="modalEth()">
					<div style="margin:1.5px;width:50px;margin-right: 4px;">
						<img src="https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png" style="width:50px;height: auto;border-radius: 50px;" alt="Ethereum">
					</div>
					<div style="width:100%;min-height:50px;margin-left: 4px;">
						<p id="ethereum-list" style="font-size: 14px;color: black;margin-bottom: 0px;">Ethereum (ETH)</p>
						<p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><u id="ethereum-price" style="text-decoration:none;"></u> USD/ETH (<u id="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change" style="text-decoration:none;"></u>)</p>
						<p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><u id="ethereum-total" style="text-decoration:none;"></u> ETH (~<span class="fa fa-usd"></span> <u id="ethereum-estimate" class="token-estimate" style="text-decoration:none;"></u>)</p>
					</div>
				</div>
				<div id="token-list"></div>
			</div>
			<div id="nft-all" style="display: none;">
				<div id="nft-list"></div>
			</div>
			<div id="transaction-all" style="display: none;">
				<div id="transactions-list"></div>
			</div>
		</div>
	</div>
	<div class="modal-div" id="modal-address" style="display: none;">
		<div class="modal rounded shadow-sm bg-white" style="display: block;height:180px;padding: 7px;">
			<p class="div-hover rounded" onclick="$('#modal-address').css('display','none');" style="font-family:Orkney;font-size:12px;text-align:center;margin-bottom: 0;"><span class="fa fa-times"></span> Close</p>
			<div class="address-div rounded div-hover" style="display: block;word-wrap: break-word;" onclick="copyAddress()">
				<p style="margin:0 auto;font-size: 15px;"><span class="fa fa-copy"></span> Copy Address</p>
			</div>
			<div class="address-div rounded div-hover" onclick="$('#alert-floating').css('display','none');$('#alert-floating').css('display','block');document.getElementById('alert-floating-p').innerHTML = 'Feature will be available soon! :)';" style="display: block;word-wrap: break-word;">
				<p style="margin:0 auto;font-size: 15px;color:red;"><span class="fa fa-key"></span> Show Phrase</p>
			</div>
			<div class="address-div rounded div-hover" onclick="$('#alert-floating').css('display','none');$('#alert-floating').css('display','block');document.getElementById('alert-floating-p').innerHTML = 'Feature will be available soon! :)';" style="display: block;word-wrap: break-word;">
				<p style="margin:0 auto;font-size: 15px;color:#aab300;"><span class="fa fa-exclamation-triangle"></span> Remind Address</p>
			</div>
			<div class="address-div rounded div-hover" style="display: block;word-wrap: break-word;" onclick="window.location.reload();">
				<p style="margin:0 auto;font-size: 15px;color:red;"><span class="fa fa-sign-out"></span> Log Out</p>
			</div>
		</div>
	</div>
	<div class="modal-div overflow-div" id="modal-contract" style="display: none;height: 100%;">
		<div class="modal rounded shadow-sm bg-white overflow-div" style="display: block;max-height:100%;overflow-y: auto;padding: 7px;">
			<p class="div-hover rounded" onclick="$('#modal-contract').css('display','none');document.getElementById('daily_chart').innerHTML = '';document.getElementById('modal-contract-name').innerHTML = '';document.getElementById('modal-contract-total').innerHTML = '';document.getElementById('modal-contract-price').innerHTML = '';document.getElementById('transaction-list').innerHTML = ''" style="font-family:Orkney;font-size:12px;text-align:center;margin-bottom: 0;"><span class="fa fa-times"></span> Close</p>
			<p id="modal-contract-name" style="margin:0 auto;font-size: 17px;text-align: center;"></p>
			<p id="modal-contract-total" style="margin:0 auto;font-size: 12px;color: #6f6f6f;text-align: center;"></p>
			<p id="modal-contract-price" style="margin:0 auto;font-size: 12px;color:#6f6f6f;text-align: center;"></p>
			<div id="daily_chart" style="width: 100%"></div>
			<p style="color: black;text-align: center;font-size: 17px;" id="sent"></p>
			<input class="form-control" type="text" placeholder="Receiver" id="sent-input" style="width:100%;margin-bottom:5px;border-radius: 0;">
			<input class="form-control" type="text" placeholder="Amount" id="sent-ticker" style="width:100%;margin-bottom:5px;border-radius: 0;">
	        <button type="submit" class="btn btn-primary" id="sent-button" disabled="true" style="border-radius:0;margin-top:5px;width:100%;background-color: #0d2150;">Coming Soon...</button>
	        <p style="color: black;text-align: center;font-size: 17px;margin-top:10px;">Transaction (Last 25)</p>
	        <div id="transaction-list"></div>
		</div>
	</div>

	<p style="color:#19b000;position: fixed;bottom: 0px;right:15px;font-size: 11px;"><span id="block-icon" class="fa fa-circle"></span> <b id="block-number"> </b></p>
</body>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="application/javascript" src="https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"></script>
<script type="application/javascript" src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="../javastyle.js"></script>
</html>
