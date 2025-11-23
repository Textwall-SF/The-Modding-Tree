addLayer("sy", {
    name: "System Center", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff0000",
	tooltip: "System Center",
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        let visible = false
        if (hasUpgrade('cz', 24) || player.sy.unlocked) visible = true
       return visible
    },
    milestones: {
        1: {
            requirementDescription: "1.00e9 Cz.",
            effectDescription: "^1.2 Cz.",
            done() { return player.points.gte(1e9) }
        },
		2: {
            requirementDescription: "5.00e10 Cz.",
            effectDescription: "Unlock new row of Cz. upgrades",
            done() { return player.points.gte(5e10) }
        },
		3: {
            requirementDescription: "1.00e13 Cz.",
            effectDescription: "Unlock TCOH's Shop",
            done() { return player.points.gte(1e13) }
        },
		4: {
            requirementDescription: "1.00e20 Cz.",
            effectDescription: "Unlock Enchanted shop upgrades",
            done() { return player.points.gte(1e20) }
        },
    }
})
