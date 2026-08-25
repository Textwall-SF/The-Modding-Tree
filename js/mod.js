let modInfo = {
	name: "The Textwall Tree",
	author: "Textwall-SF",
	pointsName: "points",
	modFiles: ["layers/1.js", "layers/2.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "#0.011",
	name: "Textwall Tree",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>#0.011</h3><br>
		- 2 Prestige Layers: Prestige Points, walls.<br>
		- Added 17 new upgrades.<br>
		- Endgame: 400 walls`

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
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
    display = ""
	if ((player.points.lte(6.68e59)) && (player.points.gte(1e25))) {
			display = display + "Stuck?"
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
	return player.w.points.gte(new Decimal(400))
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
