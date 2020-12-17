function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function setupWallet(address){
	$.ajax({
		url: "getToken.php",
		type: "GET",
		data: {
			contract : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
			address : address
		},
		dataType: 'html',
		success: function(data){
		    var all = data.split(" _ ");
		    var decimals = all[6];
			var balance2 = all[0];
			balance2 = parseInt(balance2) / Math.pow(10, 18);
			var balance = balance2.toFixed(5);
			var price = parseFloat(all[1]).toFixed(2);
			var total = parseFloat(all[2]).toFixed(3);
			document.getElementById("ethereum-price").innerHTML = price;
			document.getElementById("ethereum-total").innerHTML = balance;
			document.getElementById("ethereum-estimate").innerHTML = total;
			document.getElementById("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change").innerHTML = volatily1d("ETH","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
		}
	});
	$.ajax({
		url: "getToken.php",
		type: "GET",
		data: {
			address : address
		},
		dataType: 'html',
		success: function(data){
			var checkToken = data.split(" | ");
			var list = "", i;
			for (i = 0; i <= checkToken.length-2; i++) {
			    var all = checkToken[i].split(" _ ");
			    var decimals = all[6];
				var balance2 = all[0];
				balance2 = parseInt(balance2) / Math.pow(10, decimals);
				var balance = balance2.toFixed(5);
				var price = parseFloat(all[1]).toFixed(4);
				var total = parseFloat(all[2]).toFixed(4);
				var tokenName = all[3];
				var tokenTicker = all[4];
				var contract = all[5];
				var onclickContract = 'modalContract("'+contract+'","'+tokenTicker+'","'+balance+'")';
				if(balance2 != "0"){
					list = list+'<div class="div-hover rounded token-list" id="tokens" onclick='+onclickContract+' style="margin-top:7px;" data-toggle="tooltip" data-placement="top" title="'+contract+'"><div style="margin:1.5px;width:50px;margin-right: 4px;"><img src="https://logos.covalenthq.com/tokens/'+contract+'.png" style="width:50px;height: auto;border-radius: 50px;"></div><div style="width:100%;min-height:50px;margin-left: 4px;"><p id="token-name" style="font-size: 14px;color: black;margin-bottom: 0px;">'+tokenName+' ('+tokenTicker+')</p><p id="token-price" style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;display:inline-block;"><u id="'+contract+'-price" style="text-decoration:none;">'+price+'</u> USD/'+tokenTicker+'</p><p id="token-change" style="font-size: 11px;display:inline-block;margin-bottom:3px;"> (<u id="'+contract+'-change" style="text-decoration:none;">'+volatily1d(tokenTicker,contract)+'</u>)</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><u id="'+contract+'-total" style="text-decoration:none;">'+balance+'</u> '+tokenTicker+' (~<span class="fa fa-usd"></span> <u id="'+contract+'-estimate" class="token-estimate" style="text-decoration:none;">'+total+'</u>)</p></div></div>';
					document.getElementById("token-list").innerHTML = list;
				}
			}
		}
	});
	$.ajax({
		async : false,
		url: "getToken.php",
		type: "GET",
		data: {
			type : "nft",
			address : address
		},
		dataType: 'html',
		success: function(data){
		    var checkNft = data.split(" | ");
		    var list = "",i;
		    for (var i = 0; i <= checkNft.length-2; i++) {
		    	var all = checkNft[i].split(" _ ");
		    	var tokenName = all[0];
		    	var tokenTicker = all[1];
		    	var contract = all[2];
		    	var tokenId = all[3];
		    	var balance = all[4];
		    	console.log(contract);
		    	list = list+'<div class="div-hover rounded token-list" id="tokens" style="margin-top:7px;" data-toggle="tooltip" data-placement="top" title="'+contract+'"><div style="margin:1.5px;width:50px;margin-right: 4px;"><img src="https://logos.covalenthq.com/tokens/'+contract+'.png" style="width:50px;height: auto;border-radius: 50px;"></div><div style="width:100%;min-height:50px;margin-left: 4px;"><p id="token-name" style="font-size: 14px;color: black;margin-bottom: 0px;">'+tokenName+' ('+tokenTicker+')</p><p id="token-price" style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;">ID: '+tokenId+'</p><p id="token-price" style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;display:inline-block;">Total: '+balance+'</p></div></div>';
				document.getElementById("nft-list").innerHTML = list;
		    }
		}
	});
}

function openNft(){
	$("#transaction-all").css("display","none");
	$("#token-all").css("display","none");
	$("#nft-all").css("display","block");
	$("#nft-button").css("border-bottom","3px solid #0d2150");
	$("#token-button").css("border-bottom","none");
	$("#transaction-button").css("border-bottom","none");
}

function openToken(){
	$("#transaction-all").css("display","none");
	$("#token-all").css("display","block");
	$("#nft-all").css("display","none");
	$("#nft-button").css("border-bottom","none");
	$("#token-button").css("border-bottom","3px solid #0d2150");
	$("#transaction-button").css("border-bottom","none");
}

function openTransaction(){
	$("#transaction-all").css("display","block");
	$("#token-all").css("display","none");
	$("#nft-all").css("display","none");
	$("#nft-button").css("border-bottom","none");
	$("#token-button").css("border-bottom","none");
	$("#transaction-button").css("border-bottom","3px solid #0d2150");
	$.ajax({
		url: "getTransaction.php",
		type: "GET",
		data: {
			method : "getTransaction",
			address : address,
			contract : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
		},
		dataType: 'html',
		success: function(data){
			var checkTransaction = data.split(" | ");
			var list = "", i;
			for(var i = 0 ; i<= checkTransaction.length-2; i++){
				var all = checkTransaction[i].split(" _ ");
				var type = all[0];
				var date = all[1];
				var hash = all[2];
				var value2 = all[3];
				var to = all[4];
				var gasUsed = all[5];
				var gasPrice = all[6];
				var gas = gasPrice/1000000000000000000;
				value = parseFloat(value2)/10**parseFloat(18);
				gas = gas*gasUsed;
				console.log(type);
				if(type == "in"){
					var color = "green";
					var icon = "fa fa-arrow-down";
				}else if(type == "out"){
					var color = "red";
					var icon = "fa fa-arrow-up";
				}
				list = list+'<div class="div-hover rounded" style="padding:7px;transition:0.7s;animation-duration: 0.7s;display: flex;flex-wrap: nowrap;"><div style="margin:1.5px;width:50px;margin-right: 4px;"><img src="https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png" style="width:50px;height: auto;border-radius: 50px;"></div><div style="width:100%;min-height:50px;margin-left: 4px;word-break: break-word;"><p style="font-size: 14px;color: black;margin-bottom: 0px;"><a style="text-decoration: none;color: black;" href="https://etherscan.com/tx/'+hash+'/" target="_blank">'+hash+'</a></p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="'+icon+'"></span> '+to+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class=" fa fa-cubes"></span> '+date+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="fa fa-ethereum"></span> '+gas+' ETH</p><p style="font-size: 11px;color: '+color+';margin-bottom: 3px;"><span class="fa fa-send-o"></span> '+parseFloat(value).toFixed(10)+' ETH</p></div></div>';
				document.getElementById("transactions-list").innerHTML = list;
			}
		}
	});
}

var address = getCookie("temporaryAddress");

function volatily1d(tokenTicker,contract){
	$.ajax({
		url: "getChart.php",
		type: "GET",
		data: {
			contract : contract,
			method : "getChart",
			range_from : "volatily1d",
			range_to : "volatily1d",
			ticker : tokenTicker
		},
		dataType: 'html',
		success: function(data){
			document.getElementById(contract+"-change").innerHTML = parseFloat(data).toFixed(3)+"%";
			if(parseFloat(data).toFixed(3) > 0){
				$("#"+contract+"-change").css("color","green");
			}else if(parseFloat(data).toFixed(3) < 0){
				$("#"+contract+"-change").css("color","red");
			}
		}
	});
}

function modalEth(){
	var volatilyPer = document.getElementById("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change").innerHTML;
	if(parseFloat(volatilyPer) < 0 ){
		var color = "red";
	}else if(parseFloat(volatilyPer) > 0){
		var color = "green";
	}
	$("#modal-contract").css("display", "block");
	document.getElementById("modal-contract-name").innerHTML = '<img src="https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png" style="width:auto;height:25px;"> Ethereum (ETH)';
	document.getElementById("modal-contract-total").innerHTML =  document.getElementById('ethereum-total').innerHTML+' ETH (~<span class="fa fa-usd"></span> '+document.getElementById("ethereum-estimate").innerHTML+')';
	document.getElementById("modal-contract-price").innerHTML = '<span class="fa fa-usd"></span> '+document.getElementById("ethereum-price").innerHTML+' (<u id="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change" style="text-decoration:none;color:'+color+'">'+document.getElementById("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change").innerHTML+'</u>)';
	document.getElementById("sent").innerHTML = "Send Ethereum";
	$.ajax({
		url: "getChart.php",
		type: "GET",
		data: {
			method : "getChart",
			ticker : "eth",
			range_from : "chartMonthly",
			range_to : "chartMonthly"
		},
		dataType: 'html',
		success: function(data){
			var checkChart = data.split(" | ");
			var prices = [];
			var dates = [];
			for (var i = checkChart.length-2; i >= 0; i--) {
			    var all = checkChart[i].split(" _ ");
			    var date = all[0];
			    var price = parseFloat(all[1]).toFixed(4);
			    prices.push(price);
			    dates.push(date);
			}
			var options = {
			  chart: {
			    type: 'line'
			  },
			  series: [{
			    name: 'Prices',
			    data: prices
			  }],
			  xaxis: {
			    categories: dates
			  }
			};

			var chart = new ApexCharts(document.querySelector("#daily_chart"), options);

			chart.render();
		}
	});
	$.ajax({
		url: "getTransaction.php",
		type: "GET",
		data: {
			method : "getTransaction",
			address : address,
			contract : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
		},
		dataType: 'html',
		success: function(data){
			var checkTransaction = data.split(" | ");
			var list = "", i;
			for(var i = 0 ; i<= checkTransaction.length-2; i++){
				var all = checkTransaction[i].split(" _ ");
				var type = all[0];
				var date = all[1];
				var hash = all[2];
				var value2 = all[3];
				var to = all[4];
				var gasUsed = all[5];
				var gasPrice = all[6];
				var gas = gasPrice/1000000000000000000;
				value = parseFloat(value2)/10**parseFloat(18);
				gas = gas*gasUsed;
				if(type == "in"){
					var color = "green";
					var icon = "fa fa-arrow-down";
				}else{
					var color = "red";
					var icon = "fa fa-arrow-up";
				}
				list = list+'<div class="div-hover rounded" style="animation-duration: 0.7s;display: flex;flex-wrap: nowrap;"><div style="margin:1.5px;width:50px;margin-right: 4px;"><img src="https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png" style="width:50px;height: auto;border-radius: 50px;"></div><div style="width:100%;min-height:50px;margin-left: 4px;word-break: break-word;"><p style="font-size: 14px;color: black;margin-bottom: 0px;"><a style="text-decoration: none;color: black;" href="https://etherscan.com/tx/'+hash+'/" target="_blank">'+hash+'</a></p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="'+icon+'"></span> '+to+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class=" fa fa-cubes"></span> '+date+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="fa fa-ethereum"></span> '+gas+' ETH</p><p style="font-size: 11px;color: '+color+';margin-bottom: 3px;"><span class="fa fa-send-o"></span> '+parseFloat(value).toFixed(10)+' ETH</p></div></div>';
				document.getElementById("transaction-list").innerHTML = list;
			}
		}
	});
}

function modalContract(contract, tokenTicker, balance){
	$("#modal-contract").css("display", "block");
	$("#sent").css("display", "none");
	$("#sent-input").css("display", "none");
	$("#sent-ticker").css("display", "none");
	$("#sent-button").css("display", "none");
	var volatilyPer = document.getElementById(contract+"-change").innerHTML;
	if(parseFloat(volatilyPer) < 0 ){
		var color = "red";
	}else if(parseFloat(volatilyPer) > 0){
		var color = "green";
	}
	var decimals;
	$.ajax({
		async : false,
		url: "getToken.php",
		type: "GET",
		data: {
			contract : contract,
			address : address
		},
		dataType: 'html',
		success: function(data){
		    var all = data.split(" _ ");
		    decimals = all[6];
			var price = parseFloat(all[1]).toFixed(4);
			var total = parseFloat(all[2]).toFixed(4);
			var tokenName = all[3];
			document.getElementById("modal-contract-name").innerHTML = '<img src="https://logos.covalenthq.com/tokens/'+contract+'.png" style="width:auto;height:25px;"> '+tokenName+' ('+tokenTicker+')';
			document.getElementById("modal-contract-total").innerHTML =  balance+' '+tokenTicker+' (~<span class="fa fa-usd"></span> '+total+')';
			document.getElementById("modal-contract-price").innerHTML = '<span class="fa fa-usd"></span> '+price+' (<u id="'+contract+'-change" style="text-decoration:none;color:'+color+';">'+document.getElementById(contract+"-change").innerHTML+'</u>)';
			document.getElementById("sent").innerHTML = "Send "+tokenName;
			$("#sent").css("display", "block");
			$("#sent-input").css("display", "block");
			$("#sent-ticker").css("display", "block");
			$("#sent-button").css("display", "block");
		}
	});
	$.ajax({
		url: "getChart.php",
		type: "GET",
		data: {
			method : "getChart",
			ticker : tokenTicker,
			range_from : "chartMonthly",
			range_to : "chartMonthly"
		},
		dataType: 'html',
		success: function(data){
			var checkChart = data.split(" | ");
			var prices = [];
			var dates = [];
			for (var i = checkChart.length-2; i >= 0; i--) {
			    var all = checkChart[i].split(" _ ");
			    var date = all[0];
			    var price = parseFloat(all[1]).toFixed(4);
			    prices.push(price);
			    dates.push(date);
			}
			var options = {
			  chart: {
			    type: 'line'
			  },
			  series: [{
			    name: 'Prices',
			    data: prices
			  }],
			  xaxis: {
			    categories: dates
			  }
			};

			var chart = new ApexCharts(document.querySelector("#daily_chart"), options);

			chart.render();
		}
	});
	$.ajax({
		url: "getTransaction.php",
		type: "GET",
		data: {
			method : "getTransaction",
			address : address,
			contract : contract
		},
		dataType: 'html',
		success: function(data){
			var checkTransaction = data.split(" | ");
			var list = "", i;
			for(var i = 0 ; i<= checkTransaction.length-2; i++){
				var all = checkTransaction[i].split(" _ ");
				var type = all[0];
				var date = all[1];
				var hash = all[2];
				var value2 = all[3];
				var to = all[4];
				var gasUsed = all[5];
				var gasPrice = all[6];
				var gas = gasPrice/1000000000000000000;
				value = parseFloat(value2)/10**parseFloat(decimals);
				gas = gas*gasUsed;
				if(type == "in"){
					var color = "green";
					var icon = "fa fa-arrow-down";
				}else{
					var color = "red";
					var icon = "fa fa-arrow-up";
				}
				list = list+'<div class="div-hover rounded" title="Ethereum" style="animation-duration: 0.7s;display: flex;flex-wrap: nowrap;"><div style="margin:1.5px;width:50px;margin-right: 4px;"><img src="https://logos.covalenthq.com/tokens/'+contract+'.png" style="width:50px;height: auto;border-radius: 50px;"></div><div style="width:100%;min-height:50px;margin-left: 4px;word-break: break-word;"><p style="font-size: 14px;color: black;margin-bottom: 0px;"><a style="text-decoration: none;color: black;" href="https://etherscan.com/tx/'+hash+'/" target="_blank">'+hash+'</a></p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="'+icon+'"></span> '+to+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class=" fa fa-cubes"></span> '+date+'</p><p style="font-size: 11px;color: #6f6f6f;margin-bottom: 3px;"><span class="fa fa-ethereum"></span> '+gas+' ETH</p><p style="font-size: 11px;color: '+color+';margin-bottom: 3px;"><span class="fa fa-send-o"></span> '+parseFloat(value).toFixed(10)+' '+tokenTicker+'</p></div></div>';
				document.getElementById("transaction-list").innerHTML = list;
			}
		}
	});
}

function copyAddress(){
	var value = document.getElementById("address-here").innerHTML;
	var input_temp = document.createElement("input");
	input_temp.value = value;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand("copy");
	document.body.removeChild(input_temp);
	$("#alert-floating").css("display", "block");
	document.getElementById("alert-floating-p").innerHTML = "Address  copied!";
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

document.onkeydown = function(e) {
    if (e.ctrlKey && 
        (e.keyCode === 85 )) {
        return false;
    }
};

function revealPassword2() {
  	var password = document.getElementById("password-wallet2");
  	if (document.getElementById('revealPassword2').checked) {
    	password.type = "text";
  	}else{
    	password.type = "password";
  	}
}
function cancelWallet(){
  	var password2 = document.getElementById("password-wallet2");
  	$("#modal-wallet").css("display", "none");
  	$("#modal-wallet2").css("display", "none");
    password2.type = "password";
  	password2.value = "";
  	document.getElementById("privkey-input").value = "";
  	document.getElementById("keystore-input").value = "";
  	document.getElementById("mnemo-input").value = "";
  	document.getElementById("revealPassword2").checked = false;
  	$("#input-privkey").css("display", "block");
	$("#input-keystore").css("display", "none");	
	$("#input-mnemo").css("display", "none");
	$("#privKey").css("border-bottom", "3px solid #0d2150");
	$("#keystore").css("border-bottom", "0px");
	$("#mnemo").css("border-bottom", "0px");
}
function openCreate(){
	$('#create-wallet').prop('disabled', true);
	$('#import-wallet').prop('disabled', true);
	$('#watch-wallet').prop('disabled', true);
	$("#watch-wallet").css("cursor", "no-drop");
	$("#create-wallet").css("cursor", "no-drop");
	$("#import-wallet").css("cursor", "no-drop");
	$.ajax({
		url: "createAccount.php",
		type: "POST",
		data: {
			method : "create_newAccount"
		},
		dataType: 'html',
		success: function(data){
			if(data.search("[SUCCESS] " != "-1")){
				document.getElementById("address-here").innerHTML = getCookie("temporaryAddress");
				$('#container-wallet-login').css('display','none');
				$('#modal-wallet2').css('display','none');
				$('#token-dashboard').css('display','block');
		    	setupWallet(getCookie("temporaryAddress"));
		    	setCookie("watching", 0,365);
		    }else{
		    	$("alert-floating").css("display","block");
		    	document.getElementById("alert-floating-p").innerHTML = "Please try again! :(";
		    }
		}
	});
}
function openImport(){
	$("#modal-wallet2").css("display", "block");
	$("#alert-login2").css("display", "none");
}
function privKey(){
	$("#input-privkey").css("display", "block");
	$("#input-keystore").css("display", "none");	
	$("#input-mnemo").css("display", "none");
	$("#privKey").css("border-bottom", "3px solid #0d2150");
	$("#keystore").css("border-bottom", "0px");
	$("#mnemo").css("border-bottom", "0px");
	$("#alert-login2").css("display", "none");
}
function keystore(){
	$("#input-privkey").css("display", "none");
	$("#input-keystore").css("display", "block");	
	$("#input-mnemo").css("display", "none");
	$("#privKey").css("border-bottom", "0px");
	$("#keystore").css("border-bottom", "3px solid #0d2150");
	$("#mnemo").css("border-bottom", "0px");
	$("#alert-login2").css("display", "none");
}
function mnemo(){
	$("#input-privkey").css("display", "none");
	$("#input-keystore").css("display", "none");	
	$("#input-mnemo").css("display", "block");
	$("#privKey").css("border-bottom", "0px");
	$("#keystore").css("border-bottom", "0px");
	$("#mnemo").css("border-bottom", "3px solid #0d2150");
	$("#alert-login2").css("display", "none");
}
function watchWallet(){
	var address = document.getElementById("watch-input").value;
	setCookie("temporaryAddress", address, 1);
	setCookie("watching", 1,365);
	document.getElementById("address-here").innerHTML = address;
	$('#container-wallet-login').css('display','none');
	$('#modal-wallet').css('display','none');
	$('#token-dashboard').css('display','block');
	setupWallet(address);
}
function importWallet(){
	if($('#input-privkey').is(":visible")){
		var privKey = document.getElementById("privkey-input");
		if(privKey.value.length < 64 || privKey.value.length > 64){
			document.getElementById('alert-login-p2').innerHTML = "Invalid key!";
			$("#alert-login2").css("display", "block");
		}else{
			$("#blocking-login").css("display", "block");
			$("#alert-login2").css("display", "none");
			$.ajax({
				url: "importAccount.php",
				type: "POST",
				data: {
					method : "import_privKey",
					par1 : privKey.value,	
				},
				dataType: 'html',
				success: function(data){
				    if(data == "1"){
				    	document.getElementById("address-here").innerHTML = getCookie("temporaryAddress");
						$('#container-wallet-login').css('display','none');
						$('#modal-wallet2').css('display','none');
						$('#token-dashboard').css('display','block');
				    	setupWallet(getCookie("temporaryAddress"));
				    	setCookie("watching", 0,365);
				    }else{
				    	$("#blocking-login").css("display", "none");
				    	document.getElementById('alert-login-p2').innerHTML = data;
						$("#alert-login2").css("display", "block");
				    }
				}
			});
		}
	}else if($('#input-keystore').is(":visible")){

	}else if($('#input-mnemo').is(":visible")){
		var mnemonic = document.getElementById("mnemo-input").value;
		let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
		var gettingprivKey = mnemonicWallet.privateKey;
		var getprivKey = gettingprivKey.split("0x");
		var privKey = getprivKey[1];
		if(privKey.length < 64 || privKey.length > 64){
			document.getElementById('alert-login-p2').innerHTML = "Invalid key!!";
			$("#alert-login2").css("display", "block");
		}else{
			$("#blocking-login").css("display", "block");
			$("#alert-login2").css("display", "none");
			var rahasia = "zPMKsrC5";
			$.ajax({
				url: "responserver.php",
				type: "POST",
				data: {
					dilarang : rahasia,
					method : "import_privKey",
					par1 : privKey,	
				},
				dataType: 'html',
				success: function(data){
				    if(data == "1"){
				    	$("#modal-wallet2").css("display", "none");
				    	document.getElementById("address-here").innerHTML = getCookie("temporaryAddress");
						$('#container-wallet-login').css('display','none');
						$('#token-dashboard').css('display','block');
				    	setupWallet(getCookie("temporaryAddress"));
				    	setCookie("watching", 0,365);
				    }else{
				    	$("#blocking-login").css("display", "none");
				    	document.getElementById('alert-login-p2').innerHTML = data;
						$("#alert-login2").css("display", "block");
				    }
				}
			});
		}
	}
}

const web3 = new Web3(
  	new Web3.providers.HttpProvider(
    	'http://127.0.0.1:2020',
    	{
      	headers: [{
        	name: 'Access-Control-Allow-Origin',
        	value: 'http://127.0.0.1:2020'
      	}]
    	}
  	)
);

$.ajax({
	url: "getBlock.php",
	type: "GET",
	data: {
		method : "blockNumber",
	},
	dataType: 'html',
	success: function(data){
	    document.getElementById('block-number').innerHTML = "<a id='block-number2' href='https://etherscan.com/block/"+data+"' style='text-decoration:none;color:#19b000;' target='_blank'>"+data+"</a>";
	}
});

setInterval(function(){
    $.ajax({
		url: "getBlock.php",
		type: "GET",
		data: {
			method : "blockNumber",
		},
		dataType: 'html',
		success: function(data){
			if(document.getElementById('block-number2').innerHTML != data){
			    document.getElementById('block-number').innerHTML = "<a id='block-number2' href='https://etherscan.com/block/"+data+"' style='text-decoration:none;color:#19b000;' target='_blank'>"+data+"</a>";
				if($('#token-dashboard').is(":visible")){
					if(document.getElementById("tokens")){
						$.ajax({
							url: "getToken.php",
							type: "GET",
							data: {
								address : address
							},
							dataType: 'html',
							success: function(data){
								var checkToken = data.split(" | ");
								var list = "", i;
								for (var i = 0; i <= checkToken.length-2; i++) {
								    var all = checkToken[i].split(" _ ");
								    var decimals = all[6];
									var balance2 = all[0];
									balance2 = parseInt(balance2) / Math.pow(10, decimals);
									var balance = balance2.toFixed(5);
									var price = parseFloat(all[1]).toFixed(4);
									var total = parseFloat(all[2]).toFixed(4);
									var tokenName = all[3];
									var tokenTicker = all[4];
									var contract = all[5];
									if(balance2 != "0"){
										if(document.getElementById(contract+"-price").innerHTML != price){
											document.getElementById(contract+"-price").innerHTML = price;
											document.getElementById(contract+"-estimate").innerHTML = total;
											document.getElementById(contract+"-change").innerHTML = volatily1d(tokenTicker,contract);
										}else if(document.getElementById(contract+"-total").innerHTML != balance){
											document.getElementById(contract+"-total").innerHTML = balance;
											document.getElementById(contract+"-estimate").innerHTML = total;
										}
									}
								}
							}
						});
					}
					$.ajax({
						url: "getToken.php",
						type: "GET",
						data: {
							contract : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
							address : address
						},
						dataType: 'html',
						success: function(data){
						    var all = data.split(" _ ");
						    var decimals = all[6];
							var balance2 = all[0];
							balance2 = parseInt(balance2) / Math.pow(10, 18);
							var balance = balance2.toFixed(5);
							var price = parseFloat(all[1]).toFixed(2);
							var total = parseFloat(all[2]).toFixed(3);
							if(document.getElementById("ethereum-price").innerHTML != price){
								document.getElementById("ethereum-price").innerHTML = price;
								document.getElementById("ethereum-total").innerHTML = balance;
								document.getElementById("ethereum-estimate").innerHTML = total;
								document.getElementById("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-change").innerHTML = volatily1d("ETH","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
							}else if(document.getElementById("ethereum-total").innerHTML != balance){
								document.getElementById("ethereum-total").innerHTML = balance;
								document.getElementById("ethereum-estimate").innerHTML = total;
							}
						}
					});
				}
			}
		}
	});
},1500);

setInterval(function(){
	var estimate = document.getElementsByClassName("token-estimate");
	var totalEstimate = 0;
	for (var i = 0; i <= estimate.length-1; i++) {
		totalEstimate += parseFloat(estimate[i].innerHTML);
	}
	if(document.getElementById("all-estimate").innerHTML != totalEstimate.toFixed(4)){
		document.getElementById("all-estimate").innerHTML = totalEstimate.toFixed(4);
	}
},1500);

setInterval(function(){
    document.getElementById("block-icon").classList.add('fa-dot-circle-o');
	document.getElementById("block-icon").classList.remove('fa-circle');
},750);

setInterval(function(){
    document.getElementById("block-icon").classList.add('fa-circle');
	document.getElementById("block-icon").classList.remove('fa-dot-circle-o');
},1500);
