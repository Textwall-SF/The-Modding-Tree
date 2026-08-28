let modInfo = {
	name: "The Textwall Tree",
	author: "Textwall-SF",
	pointsName: "points",
	modFiles: ["layers/1.js", "layers/2.js", "layers/3.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "#0.111",
	name: "Not a line, but...",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>#0.111</h3><br>
	    - Added Multiplier.<br>
	    - Added 2 new milestones.<br>
		- Added 4 new upgrades.<br>
		- Endgame: 30,000 Multiplier<br>
    <h3>#0.101</h3><br>
	    - Added Textwallers.<br>
	    - Added 5 new milestones.<br>
		- Added 1 new challenge.<br>
		- Endgame: 8 Textwallers<br>
    <h3>#0.024</h3><br>
	    - Added 8 new upgrades.<br>
		- Added 1 new challenge.<br>
		- Endgame: 6,000 Textcoins<br>
    <h3>#0.021</h3><br>
	    - Added 6 new upgrades.<br>
		- Added Textcoins layer.<br>
		- Added 1 challenge.<br>
		- Endgame: 500 Textcoins<br>
    <h3>#0.013</h3><br>
	    - Added 8 new upgrades.<br>
		- Endgame: 500,000 walls<br>
	<h3>#0.011</h3><br>
		- 2 Prestige Layers: Prestige Points, walls.<br>
		- Added 20 new upgrades.<br>
		- Endgame: 250 walls`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p',11)) gain = gain.times(upgradeEffect('p',11))
	if (hasUpgrade('p',12)) gain = gain.times(upgradeEffect('p',12))
	if (hasUpgrade('p',13)) gain = gain.times(2)
	if (hasUpgrade('p',14)) gain = gain.add(20)
	if (hasUpgrade('p',21)) gain = gain.times(upgradeEffect('p',21))
	if (hasUpgrade('p',22)) gain = gain.times(2)
	if (hasUpgrade('p',23)) gain = gain.times(1.5)
	if (hasUpgrade('p',24)) gain = gain.times(3)
	if (hasUpgrade('p',31)) gain = gain.times(3)
	if (hasUpgrade('p',33)) gain = gain.times(2)
	if (hasUpgrade('w',11)) gain = gain.add(100)
	if (hasUpgrade('w',12)) gain = gain.times(upgradeEffect('w',12))
	if (hasUpgrade('w',13)) gain = gain.times(4)
	if (hasUpgrade('w',14)) gain = gain.times(2.5)
	if (hasUpgrade('w',21)) gain = gain.add(2020)
	if (hasUpgrade('w',22)) gain = gain.times(2.021)
	if (hasUpgrade('w',24)) gain = gain.times(100)
	if (hasUpgrade('p',41)) gain = gain.times(5)
	if (hasUpgrade('p',43)) gain = gain.times(7)
	if (hasUpgrade('p',44)) gain = gain.times(3.3)
	if (hasUpgrade('t',11)) gain = gain.times(6)
	if (hasUpgrade('t',22)) gain = gain.pow(1.01)
	if (hasUpgrade('t',23)) gain = gain.times(7)
	if (hasUpgrade('t',23)) gain = gain.div(2.5)
	if (hasUpgrade('w',41)) gain = gain.times(4)
	if (hasUpgrade('w',43)) gain = gain.times(3.3333)
	if (hasMilestone('tw',1)) gain = gain.times(30)
	if (hasMilestone('tw',5)) gain = gain.times(1e4)
	if (hasMilestone('tw',5)) gain = gain.pow(1.01)
	if (hasChallenge('t',12)) gain = gain.pow(1.01)
	if (inChallenge('t',12)) gain = gain.pow(0.1)
	if (hasChallenge('t',21)) gain = gain.times(56.14)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
    display = `Endgame: 10 textwallers<br>`
	if ((player.points.lte(6.68e59)) && (player.points.gte(1e25))) {
			display = display + "Stuck? Credit to Antimatter Dimensions for how much of a specific object or writing down your amount."
    }
	if ((player.points.lte(2.37e62)) && (player.points.gte(6.68e59))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(6.68e59)) + " protons."
    }
	if ((player.points.lte(1.71e75)) && (player.points.gte(2.37e62))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(2.37e62)) + " nuclei."
	}
	if ((player.points.lte(1.18e84)) && (player.points.gte(1.71e75))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(1.71e75)) + " Hydrogen atoms."
	}
	if ((player.points.lte(2.13e88)) && (player.points.gte(1.18e84))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(1.18e84)) + " viruses."
	}
	if ((player.points.lte(1.47e94)) && (player.points.gte(2.13e88))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(2.13e88)) + " red blood cells."
	}
	if ((player.points.lte(1.18e97)) && (player.points.gte(1.47e94))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(1.47e94)) + " grains of sand."
	}
	if ((player.points.lte(8.42e98)) && (player.points.gte(1.18e97)) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(1.18e97)) + " grains of rice."
	}
	if ((player.points.lte(1.78e101)) && (player.points.gte(8.42e98))) {
			display = display + "If every point was a planck volume, then you can fill " + player.points.div(new Decimal(8.42e98)) + " teaspoons."
	}
	if ((player.points.lte(2.37e104)) && (player.points.gte(1.78e101))) {
			display = display + "If every point was a planck volume, then you can fill " + player.points.div(new Decimal(1.78e101)) + " bottles of wine."
	}
	if ((player.points.lte("2.37e217")) && (player.points.gte(2.37e104))) {
			display = display + "If every point was a planck volume, then you can fill " + player.points.div(new Decimal(2.37e104)) + " fridge-freezers."
	}
	if ((player.points.lte("4.26e412")) && (player.points.gte("2.37e217"))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal(2.37e217)) + " Dimensions."
	}
	if ((player.points.lte("2.37e65104")) && (player.points.gte("4.26e412"))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal("4.26e412")) + " Infinity Dimensions."
	}
	if ((player.points.lte("1e100000")) && (player.points.gte("2.37e65104"))) {
			display = display + "If every point was a planck volume, then you can make " + player.points.div(new Decimal("2.37e65104")) + " Time Dimensions."
	}
	if ((player.points.gte("1e100000")) && (player.points.lte("10^^1.79e308"))) {
			display = display + "If you wrote 1 number per second, writing down your point amount will need " + formatTime(player.points.add(1).log10()) + "; to write down your point amount."
	}
	return display
  },
]

// Determines when the game "ends"
function isEndgame() {
	return player.t.points.gte(new Decimal(10))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
