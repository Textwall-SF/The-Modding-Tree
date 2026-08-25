addLayer("w", {
    name: "Walls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FFFF",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "walls", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('w', 23)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['p'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: walls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p",34) || player.w.unlocked},
	upgrades: {
		11: {
			title: "TextWall, Start!",
			description: "+100 point base",
			cost: new Decimal(1)
		},
		12: {
			title: "Login / Register",
			description: "Walls boost points.",
			cost: new Decimal(2),
			effect() {
            return player.w.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() {return hasUpgrade("w",11)}
		},
		13: {
			title: "How to use...",
			description: "*4 point gain",
		    tooltip: "tw.2s4.me?",
			cost: new Decimal(2),
			unlocked() {return hasUpgrade("w",12)}
		},
		14: {
			title: "Use basic chars",
			description: "*2.5 point gain",
		    tooltip: `Use ., -, /, ', + for basics in tw.2s4.me`,
			cost: new Decimal(4),
			unlocked() {return hasUpgrade("w",13)}
		},
		21: {
			title: "2020 Textwall",
			description: "+2020 point gain base",
		    tooltip: "Textwall was created in 2020",
			cost: new Decimal(7),
			unlocked() {return hasUpgrade("w",14)}
		},
		22: {
			title: "Enter 2021!",
			description: "*2.021 point gain",
		    tooltip: "the historic era of textwall, 2021. there is click yes",
			cost: new Decimal(12),
			unlocked() {return hasUpgrade("w",21)}
		},
		23: {
			title: "Create subwalls",
			description: "*5 PP gain and *3 Walls gain",
			cost: new Decimal(25),
			unlocked() {return hasUpgrade("w",22)}
		},
		24: {
			title: "Type 50,000 chars of text",
			description: "*100 point gain",
			cost: new Decimal(80),
			unlocked() {return hasUpgrade("w",23)}
		},
	}
})
