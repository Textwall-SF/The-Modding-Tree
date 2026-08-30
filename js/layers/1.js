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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes:{
            help: {
                title: "Important notice",
				body: "Removed all of the layers, this confusing one is https://raw.githack.com/The179UCETile/wextwall-tree/patch-1/index.html"
			},
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
        title: "Repeating itself",
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
        title: "Extending",
        description: "Boosts points by *5",
		cost: new Decimal(5),
		unlocked() {
                return hasUpgrade('p', 12)
        },
		},
	    14: {
        title: "Addition",
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
        title: "Base Shift",
        description: "*1.5 point gain",
		cost: new Decimal(130),
		unlocked() {
                return hasUpgrade('p', 22)
        },
		},
		24: {
        title: "Stacking Up",
        description: "*3 point gain",
		cost: new Decimal(300),
		unlocked() {
                return hasUpgrade('p', 23)
        },
		},
		31: {
        title: "Tripler",
        description: "*3 point gain",
		cost: new Decimal(620),
		unlocked() {
                return hasUpgrade('p', 24)
        },
		},
		32: {
        title: "Leap Up",
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
        title: "Multiplier",
        description: "Unlock Multiplier",
		cost: new Decimal(5000),
		unlocked() {
                return hasUpgrade('p', 33)
        },
		},
	}
})
addLayer("x", {
    name: "multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "×", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
	branches: ["p"],
    hotkeys: [
        {key: "?", description: "???: None layer (Multiplier)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('p',34)) || player.x.unlocked},
	tabFormat: {
        "Multiplier": {
            content: [
                "main-display",
                ["display-text", function() {return "You are gaining " + format(mg) + " multiplier per second"}],
                "blank",
                "upgrades"
            ],
        },
    },
	upgrades: {
        11: {
            title: "Multiplication",
            description: "x5 point and multiplier gain",
            cost: new Decimal(20),
        },
        12: {
            title: "Multiplication+",
            description: "x10 point and multiplier gain",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade('x',11)}
        },
        13: {
            title: "Multiplier²",
            description: "Multiply multiplier gain by multiplier.",
            effect() {
                return player.x.points.add(1).pow(0.05)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(mult+1)<sup>0.05</sup>",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('x',11)}
        },
    },
	update(diff){
        let gain = new Decimal(0)
        if (player.x.unlocked) gain = gain.add(1)
        if (hasUpgrade('x', 11)) gain = gain.times(5)
        if (hasUpgrade('x', 12)) gain = gain.times(10)
        if (hasUpgrade('x', 13)) gain = gain.times(upgradeEffect('x', 13))
        mg = gain
        player.x.points = player.x.points.add(gain.times(diff))
    },
})
