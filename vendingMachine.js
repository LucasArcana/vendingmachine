//Sets up wallet, codes and prices for soft drinks and their names
var $money = 0;
var codeSequence = ("A1", "A2", "B1", "B2");
var stockCocaCola = 5;
var stockFanta = 5;
var stockSprite = 5;
var stockScheweppes = 5;
const coinValue = {'$1': 1, '$2': 2, '$5': 5,'$10': 10};
const sodaPrice = [4, 3, 5, 6];
const formatMoney = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'}).format;


//Setting up functions
var btnCoin = document.getElementById("btnCoin");
var $clear = document.getElementById("clearCoin");
var sodaChoice = document.getElementById("sodaChoice");
var adminAccess = document.getElementById("adminAccess");

//Sets up admin details
let isAdmin = false;
const user = {
	username: "JayisAwesome",
	password: "jA@PCHI"
};

adminAccess.addEventListener("click", function() {
	var loginUsername = window.prompt('Enter your username.'); 
	var loginPassword = window.prompt('Enter your password.');
	if (loginUsername === "JayisAwesome" && loginPassword === "jA@PCHI") {
		window.alert("Admin is ON.");
		var restockPrompt = window.prompt("Choose which product to restock. (Coca-Cola, Fanta, Sprite, or Schweppes.");
			switch (restockPrompt) {
				case "Coca-Cola":
					stockCocaCola = 5;
					console.log("Stock left for Coca-Cola: " + stockCocaCola);
					break;

				case "Fanta":
					stockFanta = 5;
					console.log("Stock left for Fanta: " + stockFanta);
					break;

				case "Sprite":
					stockSprite = 5;
					console.log("Stock left for Sprite: " + stockSprite);
					break;

				case "Schweppes":
					stockScheweppes = 5;
					console.log("Stock left for Schweppes: " + stockScheweppes);
					break;					
			}
		window.alert("Thanks for refilling this machine.");
	}
})


//Insert coins
btnCoin.addEventListener("click", function(){
	var coin = window.prompt("Insert any coin. ($1, $2, $5, $10)");
	$money += coinValue[coin] || 0; //[coin] calls one of the properties of coinValue's objects.
	if (typeof coinValue[coin] === 'undefined')	alert('Invalid Choice');
	console.log('You now have ' + formatMoney($money));
})


//Clears money inserted
$clear.addEventListener("click", function(){
	if ($money > 0){
		$money = 0;
		console.log('You now have ' + formatMoney($money));
	} else if ($money == 0){
		var msgReturn = window.alert('You cleared nothing. Add money.');
		console.log('You now have ' + formatMoney($money));
	}
})


//Choosing soda
sodaChoice.addEventListener("click", function() {
	var sodaChoice = window.prompt("Select your code. Type 'A1', 'A2', 'B1', or 'B2'.");
	console.log(sodaChoice);

	switch (sodaChoice) {
		case "A1":
			window.alert("You selected Coca-Cola.");
    		window.alert("This costs $" + sodaPrice[0] + "."); //sodaprice[0] calls the first element in "sodaPrice's" array
    		window.alert(sodaPrice[0] <= $money ? "You have enough. Have a nice day." : "You don't have enough. Try again.");
			if (stockCocaCola > 0 && $money >= sodaPrice[0]) {
				$money -= sodaPrice[0].toFixed(2);
				console.log("Change: $" + $money.toFixed(2));
				stockCocaCola -= 1;
				$returnChange();
			} else {
			window.alert("No stocks available for " + sodaChoice + " or you didn't choose your product correctly.");
			}
			console.log("Stock left for Coca-Cola: " + stockCocaCola);
			break;

		case "A2":
			window.alert("You selected Fanta.");
			window.alert("This costs $" + sodaPrice[1] + ".");
			window.alert(sodaPrice[1] <= $money ? "You have enough. Have a nice day." : "You don't have enough. Try again.");
			if (stockFanta > 0 && $money >= sodaPrice[1]) {
				$money -= sodaPrice[1].toFixed(2);
				console.log("Change: $" + $money.toFixed(2));
				stockFanta -= 1;
				$returnChange();			
			} else {
			window.alert("No stocks available for " + sodaChoice + " or you didn't choose your product correctly.");
			}
			console.log("Stock left for Fanta: " + stockFanta);
			break;

		case "B1":
			window.alert("You selected Sprite.");
			window.alert("This costs $" + sodaPrice[2] + ".");
			window.alert(sodaPrice[2] <= $money ? "You have enough. Have a nice day." : "You don't have enough. Try again.");
			if (stockSprite > 0 && $money >= sodaPrice[2]) {
				$money -= sodaPrice[2].toFixed(2);
				console.log("Change: $" + $money.toFixed(2));
				stockSprite -= 1;
				$returnChange();			
			} else {
			window.alert("No stocks available for " + sodaChoice + " or you didn't choose your product correctly.");
			}
			console.log("Stock left for Sprite: " + stockSprite);
			break;

		case "B2":
			window.alert("You selected Schweppes");
			window.alert("This costs $" + sodaPrice[3] + ".");
			window.alert(sodaPrice[3] <= $money ? "You have enough. Have a nice day." : "You don't have enough. Try again.");
			if (stockScheweppes > 0 && $money >= sodaPrice[3]) {
				$money -= sodaPrice[3].toFixed(2);
				console.log("Change: $" + $money.toFixed(2));
				stockScheweppes -= 1;
				$returnChange();
			} else {
			window.alert("No stocks available for " + sodaChoice + " or you didn't choose your product correctly.");
			}
			console.log("Stock left for Schweppes: " + stockScheweppes);			
			break;
	}
});

//Expected to receive change
function $returnChange(){
	var dollar1 = 0;
	var dollar2 = 0;
	var dollar5 = 0;
	var dollar10 = 0;

/*	
	How does this change function work (in layman's terms)?
	(1)While money inserted is greater than or equal to a specific denomination, divide this by the specific
		denomination without remainders.
	(2)Tally up by one every time you can divide by whatever denomination.
	(3)Move onto the next one repeating last instruction.
	(4)Repeat steps 1 to 3until you reach the '$1' denomination.
*/

//Math.floor() trick from <https://www.codegrepper.com/code-examples/javascript/js+ignore+remainder>
	
	if ($money >= 10){
		$money = Math.floor($money/10);
		console.log('Number of $10: ' + $money.toFixed(0));
		console.log('Number of money inserted: ' + $money);
	} 

	if ($money >= 5){
		dollar5 = Math.floor($money/5);
		$money - dollar5;
		console.log('Number of $5: ' + dollar5.toFixed(0));
		console.log('Number of money inserted: ' + $money);
	} 

	if ($money >= 2){
		dollar2 = Math.floor($money/2);
		$money - dollar2;
		console.log('Number of $2: ' + dollar2.toFixed(0));		
		console.log('Number of money inserted: ' + $money);
	} 

	if ($money >= 1){
		dollar1 = Math.floor($money/1);
		$money - dollar1
		console.log('Number of $1: ' + dollar1.toFixed(0));		
		console.log('Number of money inserted: ' + $money);
	}

}