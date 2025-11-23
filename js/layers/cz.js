addLayer("cz", {
    name: "craziness points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cz", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#eeeeee",
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
      11: {
        title: "Invisible",
        description: "1 Cz. per second.",
        cost: new Decimal(0),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points"
      },
	  12: {
        title: "Infrared.",
        description: "2 Cz. per second.",
        cost: new Decimal(10),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 11); },
	  },
	  13: {
        title: "Textures.",
        description: "6 Cz. per second.",
        cost: new Decimal(40),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 12); },
	  },
	  14: {
        title: "Glitching....",
        description: "x3.5 Cz. per second.",
        cost: new Decimal(200),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 13); },
	  },
	  21: {
        title: "Getting more CRAZIER",
        description: "Gain Cz. Too many Cz.",
		effect() {
            return player.points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(1500),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 14); },
	  },
	  22: {
        title: "TOO MUCH CZ",
        description: "x10 Cz. per second.",
        cost: new Decimal(10000),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 21); },
	  },
	  23: {
        title: "???",
        description: "^1.05 Cz.",
        cost: new Decimal(2e5),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 22); },
	  },
	  24: {
        title: "System Center?",
        description: "Unlock Miletones. 4DC_H grand opening!",
        cost: new Decimal(5e6),
        currencyDisplayName: "Cz.",
        currencyInternalName: "points",
		unlocked() { return hasUpgrade("cz", 23); },
	  },
    }
})
