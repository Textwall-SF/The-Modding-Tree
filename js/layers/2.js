addLayer("w", {
    name: "Walls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
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
		if (hasUpgrade('w', 33)) mult = mult.times(2.022)
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
		31: {
			title: "Self-Synergism",
			description: "Boost prestige points an some substance rate",
			cost: new Decimal(170),
			effect() {
            return player.w.points.add(1).pow(0.12)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			unlocked() {return hasUpgrade("w",24)}
		},
		32: {
			title: "New Upgrades???",
			description: "Unlock new prestige upgrades",
			cost: new Decimal(300),
			unlocked() {return hasUpgrade("w",31)}
		},
		33: {
			title: "2022",
			description: "*2.022 Walls. Entering the most eras!",
			cost: new Decimal(5000),
			unlocked() {return hasUpgrade("w",32)}
		},
		34: {
			title: "Textcoins",
			description: "Unlock Textcoins.",
			cost: new Decimal(5e5),
			unlocked() {return hasUpgrade("w",33)}
		},
	}
})
addLayer("t", {
    name: "Textcoin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFBB00",
    requires: new Decimal(1e16), // Can be a function that takes requirement increases into account
    resource: "textcoins", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['p'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: textcoins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("w",34) || player.t.unlocked},
	upgrades: {
		11: {
			title: "A Textcoin",
			description: "Made by lime.person in 2021/2022. Also x6 points.",
			cost: new Decimal(1)
		},
		12: {
			title: "Automation I",
			description: "Automate prestige upgrades.",
			cost: new Decimal(2)
		},
		13: {
			title: "Automation II",
			description: "Passively gain 1% of Prestige Points per second.",
			cost: new Decimal(5)
		},
		21: {
			title: "Challenge?",
			description: "Unlock Challenges",
			cost: new Decimal(15)
		},
	}
})
