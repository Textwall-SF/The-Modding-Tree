let modInfo = {
	name: "cz. : the tree",
	author: "ReanultFan Auth.",
	pointsName: "craziness points",
	modFiles: ["layers/cz.js", "layers/system_center.js", "layers/shop.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.2",
	name: "SS1 - Shop and Milestones",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.0.2</h3><br>
		- Added TCOH's shop and 4DC_H's system center.
		- Added more upgrades.
		- Fixed bugs.
	<h3>v0.0.1 - Start of Cz.</h3><br>
		- Added Cz.`

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

	let gain = new Decimal(0)
	// Cz.
	if (hasUpgrade('cz', 11)) gain = gain.add(1)
	if (hasUpgrade('cz', 12)) gain = gain.add(2)
	if (hasUpgrade('cz', 13)) gain = gain.add(6)
	if (hasUpgrade('cz', 14)) gain = gain.times(3.5)
	if (hasUpgrade('cz', 21)) gain = gain.times(upgradeEffect('cz',21))
	if (hasUpgrade('cz', 22)) gain = gain.times(10)
	if (hasUpgrade('cz', 23)) gain = gain.pow(1.05)
	if (hasUpgrade('cz', 31)) gain = gain.times(5)
	if (hasUpgrade('cz', 32)) gain = gain.times(2.001)
	if (hasUpgrade('cz', 33)) gain = gain.times(upgradeEffect('cz',33))
	// System Center
	if (hasMilestone('sy', 1)) gain = gain.pow(1.2)
	// Shop
	if (hasUpgrade('ts', 11)) gain = gain.times(upgradeEffect('ts',11))
	if (hasUpgrade('ts', 12)) gain = gain.times(16)
	if (hasUpgrade('ts', 13)) gain = gain.pow(1.1)
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
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(6.68e59)) + " protons."
    }
	if ((player.points.lte(1.71e75)) && (player.points.gte(2.37e62))) {
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(2.37e62)) + " nuclei."
	}
	if ((player.points.lte(1.18e84)) && (player.points.gte(1.71e75))) {
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(1.71e75)) + " Hydrogen atoms."
	}
	if ((player.points.lte(2.13e88)) && (player.points.gte(1.18e84))) {
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(1.18e84)) + " viruses."
	}
	if ((player.points.lte(1.47e94)) && (player.points.gte(2.13e88))) {
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(2.13e88)) + " red blood cells."
	}
	if ((player.points.lte(1.18e97)) && (player.points.gte(1.47e94))) {
			display = display + "If every Cz. was a planck volume, then you can make " + player.points.div(new Decimal(1.47e94)) + " grains of sand."
	}
	return display
  },
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
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
