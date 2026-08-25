addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fcfcfc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade(this.layer, 32)) mult = mult.times(2)
		if (hasUpgrade("w", 23)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		11: {
        title: "Starting point",
        description: "Boost points by specific effect",
		effect() {
            return player.points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(1)
	},
		12: {
        title: "New wall",
        description: "Boosts points by subsequent rate",
		effect() {
            return player.points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(2),
		unlocked() {
                return hasUpgrade('p', 11)
        },
	},
		13: {
        title: "Extender",
        description: "Boosts points by *5",
		cost: new Decimal(5),
		unlocked() {
                return hasUpgrade('p', 12)
        },
		},
	    14: {
        title: "Adding",
        description: "Add +20 to point base",
		cost: new Decimal(15),
		unlocked() {
                return hasUpgrade('p', 13)
        },
		},
		21: {
        title: "More boosts!",
        description: "Boosts points at rate",
		tooltip: "return player.points.add(1).pow(0.2)",
		cost: new Decimal(40),
		unlocked() {
                return hasUpgrade('p', 14)
        },
		effect() {
            return player.points.add(1).pow(0.3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
		},
		22: {
        title: "Multipliers",
        description: "*2 point gain",
		cost: new Decimal(75),
		unlocked() {
                return hasUpgrade('p', 21)
        },
		},
		23: {
        title: "Base Shifting",
        description: "*1.5 point gain",
		cost: new Decimal(130),
		unlocked() {
                return hasUpgrade('p', 22)
        },
		},
		24: {
        title: "Stacking up",
        description: "*3 point gain",
		cost: new Decimal(300),
		unlocked() {
                return hasUpgrade('p', 23)
        },
		},
		31: {
        title: "New Walls?",
        description: "*3 point gain",
		cost: new Decimal(620),
		unlocked() {
                return hasUpgrade('p', 24)
        },
		},
		32: {
        title: "Leap up",
        description: "*2 prestige point gain",
		cost: new Decimal(1000),
		unlocked() {
                return hasUpgrade('p', 31)
        },
		},
		33: {
        title: "Point Booster 1",
        description: "*2 point gain",
		cost: new Decimal(2200),
		unlocked() {
                return hasUpgrade('p', 32)
        },
		},
		34: {
        title: "Enter the... TextWall",
        description: "Unlock Walls layer",
		cost: new Decimal(5000),
		unlocked() {
                return hasUpgrade('p', 33)
        },
	  },
	}
})
