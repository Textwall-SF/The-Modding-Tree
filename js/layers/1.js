addLayer("p", {
    name: "anti-confusion essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00ff00",
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
        title: "Anti-confusion",
        description: "Anti-confusion boosts itself",
		effect() {
            return player.points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(1)
	},
		34: {
        title: "Confusion",
        description: "Unlock confusion essence.",
        cost: new Decimal("10^^1e301")
	},
})
addLayer("c", {
    name: "confusion essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "×", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
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
        {key: "?", description: "???: None layer (confusion essence)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('p',34)) || player.x.unlocked},
	tabFormat: {
        "Confusion": {
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
            title: "Confuser",
            description: "x5 anti-confusion and confusion essence gain",
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
        if (player.c.unlocked) gain = gain.add(1)
        if (hasUpgrade('c', 11)) gain = gain.times(5)
        if (hasUpgrade('c', 12)) gain = gain.times(10)
        if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('x', 13))
        mg = gain
        player.x.points = player.x.points.add(gain.times(diff))
    },
})
