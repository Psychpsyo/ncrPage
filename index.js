let ncrAmount = 0;
let comparisonObjects = [
	{
		"name": "{{amount}} Physical WinRAR CDs",
		"price": 38.99,
		"multiplier": 1,
		"icon": "icons/winRar.png",
		"shopLink": "https://www.rarlab.com/buysharewarecd.php"
	},
	{
		"name": "Nothing ({{amount}} times)",
		"price": 6.95,
		"multiplier": 1,
		"icon": "icons/nothing.png",
		"shopLink": "https://www.amazon.com/dp/B019HDSCPU"
	},
	{
		"name": "{{amount}} Copies of Minecraft",
		"price": 23.99,
		"multiplier": 1,
		"icon": "icons/minecraft.png",
		"shopLink": "https://www.minecraft.net/en-us/store/minecraft-java-edition"
	},
	{
		"name": "{{amount}}lb of Multi-Purpose Sand",
		"price": 4.38,
		"multiplier": 50,
		"icon": "icons/sand.png",
		"shopLink": "https://www.lowes.com/pd/Sakrete-50-lb-All-purpose-Sand/1000489239"
	},
	{
		"name": "${{amount}} in Monopoly Money",
		"price": 12.29,
		"multiplier": 20580,
		"icon": "icons/monopolyMoney.png",
		"shopLink": "https://www.amazon.com/dp/B00000IWCW"
	},
	{
		"name": "1st Edition Charizard Holo Cards ({{amount}})",
		"price": 532798.67,
		"multiplier": 1,
		"icon": "icons/charizard.png",
		"shopLink": "https://www.ebay.com/itm/224455202297"
	},
	{
		"name": "{{amount}} King James Bibles (Paperback)",
		"price": 40,
		"multiplier": 1,
		"icon": "icons/bible.png",
		"shopLink": "https://bookshop.org/books/holy-bible-king-james-version-kjv/9781622456338"
	},
	{
		"name": "{{amount}} Lego Death Stars (Sealed)",
		"price": 657.53,
		"multiplier": 1,
		"icon": "icons/deathStar.png",
		"shopLink": "https://www.bricklink.com/v2/catalog/catalogitem.page?S=75159-1"
	},
	{
		"name": "{{amount}} Months of VRChat Plus",
		"price": 9.99,
		"multiplier": 1,
		"icon": "icons/vrChatPlus.png",
		"shopLink": "https://hello.vrchat.com/vrchatplus"
	},
	{
		"name": "{{amount}} V-Bucks",
		"price": 7.99,
		"multiplier": 1000,
		"icon": "icons/vBucks.png",
		"shopLink": "https://www.epicgames.com/store/en-US/p/fortnite--1000-v-bucks"
	},
	{
		"name": "{{amount}} 55Gallon Drums of Lube",
		"price": 1774.80,
		"multiplier": 1,
		"icon": "icons/lube.png",
		"shopLink": "https://www.amazon.com/dp/B005MR3IVO"
	},
	{
		"name": "{{amount}} Samsung Smart Fridges",
		"price": 4599,
		"multiplier": 1,
		"icon": "icons/smartFridge.png",
		"shopLink": "https://www.samsung.com/us/home-appliances/refrigerators/4-door-flex/22-cu--ft--counter-depth-4-door-flex--with-21-5-in--connected-touch-screen-family-hub--refrigerator-rf22n9781sr-aa/"
	}
];

function addObjectItem(div, item, amount) {
	if (amount > 0 && div.childElementCount < 60) {
		amount--;
		img = document.createElement("img");
		img.src = item.icon;
		div.appendChild(img);
		
		window.setTimeout(function() {
			addObjectItem(div, item, amount);
		}, 30);
	} else {
		div.appendChild(document.createTextNode((amount > 1? "... " : " ") + "(" + (div.childElementCount + Math.floor(amount)) + ")"));
	}
}

//checking for enter presses in the input field
document.getElementById("yourMoney").addEventListener("keyup", function(e) {
	if (e.code == "Enter" && this.checkValidity()) {
		ncrAmount = parseInt(this.value, 10);
		fetch("https://api.coingecko.com/api/v3/simple/price?ids=neos-credits&vs_currencies=usd")
		.then(response => response.json())
		.then(ncrInfo => {
			let ncrValue = ncrInfo["neos-credits"].usd;
			//clear the list of comparisons
			while (document.getElementById("rightSide").firstChild) {
				document.getElementById("rightSide").firstChild.remove();
			}
			
			//add the updated comparisons
			for (const item of comparisonObjects) {
				let possibleAmount = Math.floor(ncrAmount * ncrValue / item.price);
				if (possibleAmount > 0) {
					let comparisonDiv = document.getElementById("compTemplate").content.cloneNode(true);
					comparisonDiv.querySelector(".itemName").textContent = item.name.replace("{{amount}}", possibleAmount * item.multiplier);
					comparisonDiv.querySelector(".storeLink").href = item.shopLink;
					
					addObjectItem(comparisonDiv.querySelector(".iconDiv"), item, possibleAmount);
					
					document.getElementById("rightSide").appendChild(comparisonDiv);
				}
			}
		});
	}
});