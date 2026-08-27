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
		if (hasUpgrade("w", 31)) mult = mult.times(upgradeEffect('w',31))
		if (hasUpgrade(this.layer, 42)) mult = mult.times(2.5)
		if (hasChallenge("t", 11)) mult = mult.times(66.66)
		if (hasMilestone("tw", 2)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1)
		if (inChallenge("t", 11)) exp = exp.pow(0.25)
		if (hasUpgrade("t", 32)) exp = exp.pow(1.01)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	autoUpgrade(){return hasUpgrade("t",12)},
	passiveGeneration() {
        let Gen = 0
        if(hasUpgrade('t',13)) Gen = 1
        return Gen
    },
	infoboxes:{
            lore: {
                title: "Important notice",
                body: "<b>So, removed some of the confusion. Also, I AM NOT NullArea, I AM Textwall-SF!</b><br> Welcome to the first layer, Prestige. Goal is to get a lot of points. <br> <i>The179UCETile, qwas and anon responded in tw.2s4.me so the game is confusing and later it updated for not confusing at all.</i>",
            }
        },
	upgrades: {
		11: {
        title: "The Start",
        description: "Points boosted on points.",
		effect() {
            return player.points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(1)
	},
		12: {
        title: "New wall",
        description: "Points boosted on points, again.",
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
        description: "Points boosted by points, again twice.",
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
        title: "Point Booster I",
        description: "*2 point gain",
		cost: new Decimal(2200),
		unlocked() {
                return hasUpgrade('p', 32)
        },
		},
		34: {
        title: "Enter the... TextWall!",
        description: "Unlock Walls layer.",
		cost: new Decimal(5000),
		unlocked() {
                return hasUpgrade('p', 33)
        },
		},
		41: {
        title: "The new start",
        description: "*5 point gain",
		cost: new Decimal(1e12),
		unlocked() {
                return hasUpgrade('w', 32)
        },
		},
		42: {
        title: "NEW TEXTWALLERS?",
        description: "*2.5 prestige point gain",
		cost: new Decimal(5e12),
		unlocked() {
                return hasUpgrade('p', 41)
        },
		},
		43: {
        title: "Point Booster II",
        description: "*7 point gain",
		cost: new Decimal(9e13),
		unlocked() {
                return hasUpgrade('p', 42)
        },
		},
		44: {
        title: "Universal Reconstructing",
        description: "*3.3 point gain",
		cost: new Decimal(1e15),
		unlocked() {
                return hasUpgrade('p', 43)
        },
	  },
	}
})
