save = { // all these variables get saved

    "money": 0, // *

    "inventory": { // *
        "coal": 0,
        "copper_ore": 0,
        "iron_ore": 0,
        "gold_ore": 0,
        "steel_ore": 0,

        "copper_bar": 0,
        "iron_bar": 0,
        "gold_bar": 0,
        "steel_bar": 0,

        "oak_wood": 0,
        "birch_wood": 0,
        "spruce_wood": 0,
        "willow_wood": 0

    },

    "skills": { // *
        "mining": {
            "level": 1,
            "xp": 1
        },
        "smithing": {
            "level": 1,
            "xp": 1
        },
        "woodcutting": {
            "level": 1,
            "xp": 1
        },
        "firemaking": {
            "level": 1,
            "xp": 1
        }

    },

    "profile": {
        "color": "#00aeff"
    }
}

game = { // all variables that are not saved
    "version": "build 1.4",
    
    "xp_offset": 140, // xp to level offset
    "active_inventory": null, // what item is selected in the inventory
    "active_skill": null, // when pushing a node buttton this is the selected skill
    "active_node": null, // when pushing a node buttton this is the selected node

    "bottom_tabs": { // tabs at the bottom of the screen
        "console": true,
        "settings": false
    },
    "side_tabs": { // tabs at the side of the screen
        "home": true,
        "inventory": false,
        "mining": false,
        "smithing": false,
        "woodcutting": false,
        "firemaking": false,

    },
    "side_icons": { // the icons for the tabs at the side of the screen
        "home": "home.png",
        "inventory": "backpack.png",
        "mining": "mining.png",
        "smithing": "bar.png",
        "woodcutting": "axe.png",
        "firemaking": "fire.png"

    },

    "skills": {
        "mining": {
            
        },
        "smithing": {

        },
        "woodcutting": {

        },
        "firemaking": {
            "selectedNode": "oak_wood"
        }

    },

    "nodes": {
        "mining": {
            "coal_mine": {
                "item": "coal",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Coal mine",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 1,
                "button_function": function() {nodeSwitch('mining', 'coal_mine')}
            },
            "copper_vein": {
                "item": "copper_ore",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Copper vein",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 1,
                "button_function": function() {nodeSwitch('mining', 'copper_vein')}
            },
            "iron_quarry": {
                "item": "iron_ore",
                "xp_min": 10,
                "xp_max": 15,
                "name": "Iron quarry",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 5,
                "button_function": function() {nodeSwitch('mining', 'iron_quarry')}
            },
            "gold_lake": {
                "item": "gold_ore",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Gold lake",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 15,
                "button_function": function() {nodeSwitch('mining', 'gold_lake')}
            },
            "steel_cave": {
                "item": "steel_ore",
                "xp_min": 15,
                "xp_max": 17,
                "name": "Steel cave",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 20,
                "button_function": function() {nodeSwitch('mining', 'steel_cave')}
            },

        },
        "smithing": {
            "copper_bar": {
                "item": "copper_bar",
                "items_needed": { // only crafting nodes need this
                    "copper_ore": 1,
                    "coal": 1
                },
                "xp_min": 3,
                "xp_max": 5,
                "level": 1,
                "name": "Copper bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'copper_bar')}
            },
            "iron_bar": {
                "item": "iron_bar",
                "items_needed": { // only crafting nodes need this
                    "iron_ore": 1,
                    "coal": 1
                },
                "xp_min": 10,
                "xp_max": 15,
                "level": 5,
                "name": "Iron bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'iron_bar')}
            },
            "gold_bar": {
                "item": "gold_bar",
                "items_needed": { // only crafting nodes need this
                    "gold_ore": 1,
                    "coal": 2
                },
                "xp_min": 3,
                "xp_max": 5,
                "level": 15,
                "name": "Gold bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'gold_bar')}
            },
            "steel_bar": {
                "item": "steel_bar",
                "items_needed": { // only crafting nodes need this
                    "steel_ore": 1,
                    "coal": 1
                },
                "xp_min": 10,
                "xp_max": 15,
                "level": 20,
                "name": "Steel bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'steel_bar')}
            },

        },
        "woodcutting": {
            "oak_trees": {
                "item": "oak_wood",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Oak trees",
                "icon": "axe.png",
                "button_text": "chop",
                "level": 1,
                "button_function": function() {nodeSwitch('woodcutting', 'oak_trees')}
            },
            "birch_trees": {
                "item": "birch_wood",
                "xp_min": 10,
                "xp_max": 15,
                "name": "Birch trees",
                "icon": "axe.png",
                "button_text": "chop",
                "level": 5,
                "button_function": function() {nodeSwitch('woodcutting', 'birch_trees')}
            },
            "spruce_trees": {
                "item": "spruce_wood",
                "xp_min": 13,
                "xp_max": 15,
                "name": "Spruce trees",
                "icon": "axe.png",
                "button_text": "chop",
                "level": 15,
                "button_function": function() {nodeSwitch('woodcutting', 'spruce_trees')}
            },
            "willow_trees": {
                "item": "willow_wood",
                "xp_min": 15,
                "xp_max": 18,
                "name": "Willow trees",
                "icon": "axe.png",
                "button_text": "chop",
                "level": 20,
                "button_function": function() {nodeSwitch('woodcutting', 'willow_trees')}
            },



        },
        "firemaking": {
            "oak_wood": {
                "xp_min": 3,
                "xp_max": 5,
                "level": 1,
                "name": "Oak Wood",
                "items_needed": { // only crafting nodes need this
                    "oak_wood": 1,
                },

            },
            "birch_wood": {
                "xp_min": 10,
                "xp_max": 15,
                "level": 5,
                "name": "Birch Wood",
                "items_needed": { // only crafting nodes need this
                    "birch_wood": 1,
                },

            },
            "spruce_wood": {
                "xp_min": 13,
                "xp_max": 15,
                "level": 15,
                "name": "Spruce Wood",
                "items_needed": { // only crafting nodes need this
                    "spruce_wood": 1,
                },

            },
            "willow_wood": {
                "xp_min": 15,
                "xp_max": 18,
                "level": 20,
                "name": "Willow Wood",
                "items_needed": { // only crafting nodes need this
                    "willow_wood": 1,
                },

            },

        }
    },

    "items": {
        // mining
        "coal": {
            "value": 5,
            "name": "Coal"
        },
        "copper_ore": {
            "value": 10,
            "name": "Copper ore"
        },
        "iron_ore": {
            "value": 15,
            "name": "Iron ore"
        },
        "gold_ore": {
            "value": 30,
            "name": "Gold ore"
        },
        "steel_ore": {
            "value": 20,
            "name": "Steel ore"
        },
        // smithing
        "copper_bar": {
            "value": 20,
            "name": "Copper bar"
        },
        "iron_bar": {
            "value": 25,
            "name": "Iron bar"
        },
        "gold_bar": {
            "value": 60,
            "name": "Gold bar"
        },
        "steel_bar": {
            "value": 35,
            "name": "Steel bar"
        },
        // woodcutting
        "oak_wood": {
            "value": 5,
            "name": "Oak wood"
        },
        "birch_wood": {
            "value": 10,
            "name": "Birch wood"
        },
        "spruce_wood": {
            "value": 15,
            "name": "Spruce wood"
        },
        "willow_wood": {
            "value": 20,
            "name": "Willow wood"
        },





    },

    "motd": [ // message of the day
        "guess who's back in town",
        "click, wait, repeat",
        "two trucks moment",
        "undefeined",
        "you should play fiish",
        "NEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERD",
        "meow mix, now available at all local stores",
        "play today at catrpg.xyz",
        "check out the discord catrpg.xyz/discord"
    ]
}