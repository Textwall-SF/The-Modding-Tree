addLayer("tw", {
    name: "textwallers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TW", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		    points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(6000), // Can be a function that takes requirement increases into account
    resource: "textwallers", // Name of prestige currency
    baseResource: "textcoins", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 2,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['w', 't'],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "T", description: "Shift + T: textwallers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t",41) || player.tw.unlocked},
    milestones: {
      1: {
      requirementDescription: "1 textwallers",
      done() { return player.tw.points.gte(1);}, // Used to determine when to give the milestone
      effectDescription: "x30 points.",
      },
      2: {
      requirementDescription: "2 textwallers",
      done() { return player.tw.points.gte(2);}, // Used to determine when to give the milestone
      effectDescription: "x10 prestige points and walls.",
      },
      3: {
      requirementDescription: "3 textwallers",
      done() { return player.tw.points.gte(3);}, // Used to determine when to give the milestone
      effectDescription: "x3 textcoins, unlock new textcoin challenge.",
      },
      4: {
      requirementDescription: "5 textwallers",
      done() { return player.tw.points.gte(5);}, // Used to determine when to give the milestone
      effectDescription: "Passively gain 1% of walls per second.",
      },
      5: {
      requirementDescription: "7 textwallers",
      done() { return player.tw.points.gte(7);}, // Used to determine when to give the milestone
      effectDescription: "x10,000 points and ^1.01 points.",
      },
	  6: {
      requirementDescription: "8 textwallers",
      done() { return player.tw.points.gte(8);}, // Used to determine when to give the milestone
      effectDescription: "Passively gain 1% of textcoins per second.",
      },
      7: {
      requirementDescription: "10 textwallers",
      done() { return player.tw.points.gte(10);}, // Used to determine when to give the milestone
      effectDescription: "Unlock multiplier.",
      },
    }
})
addLayer("x", {
    name: "multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "×", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "multiplier", // Name of prestige currency
    baseResource: "textwallers", // Name of resource prestige is based on
    baseAmount() {return player.tw.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['tw'],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
