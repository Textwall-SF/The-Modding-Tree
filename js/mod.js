let modInfo = {
	name: "Make NullArea not confusing at all simulator",
	author: "Textwall-SF",
	pointsName: "anti-confusion",
	modFiles: ["layers/1.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "#1.001",
	name: "NullArea is confusing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>#1.001</h3><br>
		- 2 Prestige Layers: Anti-Confusion Essence and Confusion Essence<br>
		- Added 20 new upgrades.<br>
		- Endgame: 100 confusion essence<br>
    <h2>Older changelog entries not available</h2>`

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
	if (hasUpgrade('p',12)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
    display = `Endgame: 100 confusion essence<br>`
	if ((player.points.lte(100)) && (player.points.gte(1))) {
			display = display + "NullArea has 1.00e100 confusion essence"
	}
	if ((player.points.lte(1e4)) && (player.points.gte(100))) {
			display = display + "NullArea has 1.00e90 confusion essence"
	}
	if ((player.points.lte(1e7)) && (player.points.gte(1e4))) {
			display = display + "NullArea has 1.00e85 confusion essence"
	}
	if ((player.points.lte(1e10)) && (player.points.gte(1e7))) {
			display = display + "NullArea has 1.00e80 confusion essence"
	}
	if ((player.points.lte(1e14)) && (player.points.gte(1e10))) {
			display = display + "NullArea has 1.00e75 confusion essence"
	}
	if ((player.points.lte(1e18)) && (player.points.gte(1e14))) {
			display = display + "NullArea has 1.00e70 confusion essence"
	}
	if ((player.points.lte(1e22)) && (player.points.gte(1e18))) {
			display = display + "NullArea has 1.00e60 confusion essence"
	}
	if ((player.points.lte(1e26)) && (player.points.gte(1e22))) {
			display = display + "NullArea has 1.00e55 confusion essence"
	}
    if ((player.points.lte(1e31)) && (player.points.gte(1e26))) {
			display = display + "NullArea has 1.00e50 confusion essence"
	}
	if ((player.points.lte(1e35)) && (player.points.gte(1e31))) {
			display = display + "NullArea has 1.00e45 confusion essence"
	}
	return display
  },
]

// Determines when the game "ends"
function isEndgame() {
	return player.c.points.gte(new Decimal(100))
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
