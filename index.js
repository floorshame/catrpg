function nodeSwitch(skill, node) {
    if (game["active_skill"] == null && game["active_node"] == null) {
        if (game["nodes"][skill][node]["level"] <= save["skills"][skill]["level"]) {
            game["active_skill"] = skill
            game["active_node"] = node
            startNode()    
        } else {
            consoleLog(`You need level ${game["nodes"][skill][node]["level"]}`)
        }
    } else {
        if (game["active_skill"] == skill && game["active_node"] == node) {
            game["active_skill"] = null
            game["active_node"] = null
            stopNode()
        }
    }
    update("skills")
}

function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);


}

function checkResources(skill, node) {
    let nodeswitch = true
    for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill][node]["items_needed"]).length; i++) {
        let itemName = Object.getOwnPropertyNames(game["nodes"][skill][node]["items_needed"])[i]
        let itemAmmount = game["nodes"][skill][node]["items_needed"][itemName]
        if (save["inventory"][itemName] < itemAmmount) {
            nodeswitch = false
        }
    }
    return nodeswitch
}


function startNode() {
    nodeLoop = setInterval(() => {
        if (game["active_skill"] == "mining") { // mining
            save["inventory"][game["nodes"][game["active_skill"]][game["active_node"]]["item"]] += 1 // gets the item from the node and adds it to our inventory
            let xp = ran(game["nodes"][game["active_skill"]][game["active_node"]]["xp_min"], game["nodes"][game["active_skill"]][game["active_node"]]["xp_max"])
            save["skills"][game["active_skill"]]["xp"] += xp
            consoleLog(`+1 ${game["nodes"][game["active_skill"]][game["active_node"]]["item"]}, +${xp} xp`)
        }
        if (game["active_skill"] == "smithing") { // smithing
            if (checkResources(game["active_skill"], game["active_node"]) == true) {
                for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"]).length; i++) {
                    let itemName = Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"])[i]
                    let itemAmmount = game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"][itemName]
                    save["inventory"][itemName] -= itemAmmount
                    
                }
                let xp = ran(game["nodes"][game["active_skill"]][game["active_node"]]["xp_min"], game["nodes"][game["active_skill"]][game["active_node"]]["xp_max"])
                save["skills"][game["active_skill"]]["xp"] += xp
    
                consoleLog(`+1 ${game["nodes"][game["active_skill"]][game["active_node"]]["item"]}, +${xp} xp`)
                save["inventory"][game["nodes"][game["active_skill"]][game["active_node"]]["item"]] += 1
            } else {
                game["active_skill"] = null
                game["active_node"] = null
                consoleLog("not enough resources")
                update("skills")
                stopNode()
            }
        }
        update("xp")
        update("inventory")
    }, 1000);
}

function stopNode() {
    clearInterval(nodeLoop)
}

function nodeSetupInfo(skill) {
            // info box
            let node_holder = document.querySelector(`#${skill}Node_holder`)

            let node_halfBox = document.createElement("div")
            let node_halfBoxTop = document.createElement("div")
            let node_halfBoxBottom = document.createElement("div")
            let node_halfBoxSpan = document.createElement("span")
            let node_halfBoxIcon = document.createElement("img")
            let node_halfBoxText = document.createElement("p")
    
            node_halfBox.className = "halfBox"
    
            node_halfBoxTop.className = "halfBox_top"
    
            node_halfBoxBottom.className = "halfBox_bottom"
    
            node_halfBoxSpan.innerHTML = "info"
            
            node_halfBoxIcon.src = `assets/info.png`
            node_halfBoxIcon.className = "skillIcon_1"
    
    
            node_halfBoxText.className = "skillText_2"
            node_halfBoxText.innerHTML = `xp - ${save["skills"][skill]["xp"]} / ${save["skills"][skill]["level"] * game["xp_offset"]}`
            node_halfBoxTop.appendChild(node_halfBoxIcon)
            node_halfBoxTop.appendChild(node_halfBoxSpan)
    
            node_halfBoxBottom.appendChild(node_halfBoxText)
    
            node_halfBox.appendChild(node_halfBoxTop)
            node_halfBox.appendChild(node_halfBoxBottom)
            
            node_holder.appendChild(node_halfBox)
    
    
}

function nodeSetup(style, skill) {
    if (style == 1) { // normal resources (click to collect not crafting)
        $(`#${skill}Node_holder`).empty()
        nodeSetupInfo(skill)
        for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill]).length; i++) {
            if (save["skills"][skill]["level"] >= game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["level"]) {
                let node_holder = document.querySelector(`#${skill}Node_holder`)

                let node_halfBox = document.createElement("div")
                let node_halfBoxTop = document.createElement("div")
                let node_halfBoxBottom = document.createElement("div")
                let node_halfBoxSpan = document.createElement("span")
                let node_halfBoxIcon = document.createElement("img")
                let node_halfBoxButton = document.createElement("button")

                node_halfBox.className = "halfBox"

                node_halfBoxTop.className = "halfBox_top"

                node_halfBoxBottom.className = "halfBox_bottom"

                node_halfBoxSpan.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["name"]
                
                node_halfBoxIcon.src = `assets/${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["icon"]}`
                node_halfBoxIcon.className = "skillIcon_1"
                
                node_halfBoxButton.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_text"]
                if (game["active_node"] == Object.getOwnPropertyNames(game["nodes"][skill])[i]) {
                    node_halfBoxButton.className = "skillButton_1 skillButton_1Active"
                } else {
                    node_halfBoxButton.className = "skillButton_1"
                }
                node_halfBoxButton.onclick = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_function"]
                
                node_halfBoxTop.appendChild(node_halfBoxIcon)
                node_halfBoxTop.appendChild(node_halfBoxSpan)

                node_halfBoxBottom.appendChild(node_halfBoxButton)

                node_halfBox.appendChild(node_halfBoxTop)
                node_halfBox.appendChild(node_halfBoxBottom)
                
                node_holder.appendChild(node_halfBox)
            }
        }    
    }
    if (style == 2) { // for crafting skills
        $(`#${skill}Node_holder`).empty()
        nodeSetupInfo(skill)
        for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill]).length; i++) {
            if (save["skills"][skill]["level"] >= game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["level"]) {
                let node_holder = document.querySelector(`#${skill}Node_holder`)

                let node_halfBox = document.createElement("div")
                let node_halfBoxTop = document.createElement("div")
                let node_halfBoxBottom = document.createElement("div")
                let node_halfBoxSpan = document.createElement("span")
                let node_halfBoxIcon = document.createElement("img")
                let node_halfBoxButton = document.createElement("button")
                let node_halfBoxItems = document.createElement("p")

                node_halfBox.className = "halfBox"

                node_halfBoxTop.className = "halfBox_top"

                node_halfBoxBottom.className = "halfBox_bottom"

                node_halfBoxSpan.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["name"]
                
                node_halfBoxIcon.src = `assets/${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["icon"]}`
                node_halfBoxIcon.className = "skillIcon_1"
                
                nodeItemsList = []
                for (let x = 0; x < Object.getOwnPropertyNames(game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"]).length; x++) {
                    let name = Object.getOwnPropertyNames(game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"])[x]
                    nodeItemsList.push(` ${game["items"][name]["name"]} - <span style="color: var(--ac)"> ${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"][name]}</span>`)
                }
                node_halfBoxItems.innerHTML = nodeItemsList.join("\n")
                node_halfBoxItems.className = "skillText_2"
                if (game["active_node"] == Object.getOwnPropertyNames(game["nodes"][skill])[i]) {
                    node_halfBoxButton.className = "skillButton_1 skillButton_1Active"
                } else {
                    node_halfBoxButton.className = "skillButton_1"
                }
                node_halfBoxButton.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_text"]
                
                node_halfBoxButton.onclick = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_function"]
                
                node_halfBoxTop.appendChild(node_halfBoxIcon)
                node_halfBoxTop.appendChild(node_halfBoxSpan)

                node_halfBoxBottom.appendChild(node_halfBoxItems)
                node_halfBoxBottom.appendChild(node_halfBoxButton)

                node_halfBox.appendChild(node_halfBoxTop)
                node_halfBox.appendChild(node_halfBoxBottom)
                
                node_holder.appendChild(node_halfBox)
            }
        }    
        
    }

}

function update(updaie) {
    if (updaie == "all" || updaie == "tabs") {
        $("#bottomBar_tabs").empty()
        $("#sideBar_tabs").empty()
        for (let i = 0; i < Object.getOwnPropertyNames(game["bottom_tabs"]).length; i++) {
            let bottomBar_tabs = document.querySelector("#bottomBar_tabs")

            let bottomBar_button = document.createElement("button")
            if (game["bottom_tabs"][Object.getOwnPropertyNames(game["bottom_tabs"])[i]] == false) {
                document.getElementById(`bottomBar_page_${Object.getOwnPropertyNames(game["bottom_tabs"])[i]}`).style.display = "none"
                bottomBar_button.className = "bottomBar_button"
            } else {
                document.getElementById(`bottomBar_page_${Object.getOwnPropertyNames(game["bottom_tabs"])[i]}`).style.display = ""
                bottomBar_button.className = "bottomBar_button bottomBar_buttonSelected"
            }

            bottomBar_button.innerHTML = Object.getOwnPropertyNames(game["bottom_tabs"])[i]
            bottomBar_button.onclick = function() {tabSwitch('bottom_tabs', Object.getOwnPropertyNames(game["bottom_tabs"])[i])}
            bottomBar_tabs.appendChild(bottomBar_button)
        }

        for (let i = 0; i < Object.getOwnPropertyNames(game["side_tabs"]).length; i++) {
            let sideBar_tabs = document.querySelector("#sideBar_tabs")

            let sideBar_button = document.createElement("button")

            let sideBar_text = document.createElement("span")

            let sideBar_image = document.createElement("img")
            
            sideBar_image.src = `assets/${game["side_icons"][Object.getOwnPropertyNames(game["side_tabs"])[i]]}`

            sideBar_image.className = "sideBar_icon"


            sideBar_button.onclick = function() {tabSwitch('side_tabs', Object.getOwnPropertyNames(game["side_tabs"])[i])}

            if (game["side_tabs"][Object.getOwnPropertyNames(game["side_tabs"])[i]] == false) {
                document.getElementById(`page_${Object.getOwnPropertyNames(game["side_tabs"])[i]}`).style.display = "none"
                sideBar_button.className = "sideBar_button"
            } else {
                document.getElementById(`page_${Object.getOwnPropertyNames(game["side_tabs"])[i]}`).style.display = ""
                sideBar_button.className = "sideBar_button sideBar_buttonSelected"
            }
            if (Object.getOwnPropertyNames(game["skills"]).includes(Object.getOwnPropertyNames(game["side_tabs"])[i])) { // checks if the tab name is a skill
                sideBar_text.innerHTML = Object.getOwnPropertyNames(game["side_tabs"])[i] + " " + save["skills"][Object.getOwnPropertyNames(game["side_tabs"])[i]]["level"] + "/99"
            } else {
                sideBar_text.innerHTML = Object.getOwnPropertyNames(game["side_tabs"])[i]
            }

            sideBar_button.appendChild(sideBar_image)
            sideBar_button.appendChild(sideBar_text)
            sideBar_tabs.appendChild(sideBar_button)


        }
    }
    if (updaie == "all" || updaie == "skills") {
        for (let i = 0; i < Object.getOwnPropertyNames(game["skills"]).length; i++) {
            if (Object.getOwnPropertyNames(game["skills"])[i] == "mining") {
                nodeSetup(1, "mining")
            }
            if (Object.getOwnPropertyNames(game["skills"])[i] == "smithing") {
                nodeSetup(2, "smithing")
            }

        }
    }
    if (updaie == "all" || updaie == "xp") {
        for (let i = 0; i < Object.getOwnPropertyNames(game["skills"]).length; i++) {
            let skillName = Object.getOwnPropertyNames(game["skills"])[i]
            if (save["skills"][skillName]["xp"] >= save["skills"][skillName]["level"] * game["xp_offset"]) {
                save["skills"][skillName]["xp"] -= save["skills"][skillName]["level"] * game["xp_offset"]
                save["skills"][skillName]["level"] += 1
                console.log(`A level has been added to ${skillName} `) // debug 
                update("tabs")
                update("xp")
            }
        }
    }
    if (updaie == "all" || updaie == "inventory") {
        document.getElementById("moneyHolder").innerHTML = save["money"]
        $("#inventoryHolder").empty()
        for (let i = 0; i < Object.getOwnPropertyNames(save["inventory"]).length; i++) {
            let invName = Object.getOwnPropertyNames(save["inventory"])[i]
            let invOwned = save["inventory"][invName]
            let displayName = game["items"][invName]["name"]
            if (invOwned > 0) {
                let invHolder = document.querySelector("#inventoryHolder")

                let invItem = document.createElement("div")
                if (game["active_inventory"] == invName) {
                    invItem.style = "border-left: 1px solid white;"
                }
                invItem.innerHTML = `${displayName}: ${invOwned}`
                invItem.id = `invItem_${invName}`
                invItem.onclick = function() {invClick(invName)}
                invItem.className = "inventoryItem"
                invHolder.appendChild(invItem)
            }

        }
    }
    if (updaie == "all" || updaie == "motd") {
        let motd = ran(0, game["motd"].length - 1)
        console.log(motd)
        document.getElementById("motd").innerHTML = game["motd"][motd]
    }
}


function consoleLog(message) {
    let console_holder = document.querySelector("#console_holder")

    let console_child = document.createElement("p")

    console_child.innerHTML = message
    console_child.style = "margin : 0;"

    console_holder.appendChild(console_child)

}


function tabSwitch(bar, tabName) {
    for (let i = 0; i < Object.getOwnPropertyNames(game[bar]).length; i++) {
        game[bar][Object.getOwnPropertyNames(game[bar])[i]] = false;
    }
    game[bar][tabName] = true;
    update("tabs")
}

function saveGame() {
    localStorage.setItem("cookiedata", JSON.stringify(save));
    console.log("Data has been saved") // debug 
}

function loadGame() {
    let cookiedata = JSON.parse(localStorage.getItem("cookiedata"));
        //if (typeof gamedata.currentWeather !== "undefined") gameTDM.currentweather = gamedata.currentWeather;    
    if (typeof cookiedata["inventory"] == "undefined") { cookiedata["inventory"] = save["inventory"]; console.log("Data missing default setting") } // debug 
    if (typeof cookiedata["skills"] == "undefined") {cookiedata["skills"] = save["skills"]; console.log("Data missing default setting") } // debug 
    if (typeof cookiedata["money"] == "undefined") {cookiedata["money"] = save["money"]; console.log("Data missing default setting") } // debug 

        
    if (typeof cookiedata["inventory"] != "undefined") {
        for (let i = 0; i < Object.getOwnPropertyNames(save["inventory"]).length; i++) {
            if (cookiedata["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]] == undefined) {
                console.log("Data missing default setting") // debug
                cookiedata["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]] = save["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]]
            }
        }
    }

    if (typeof cookiedata["skills"] != "undefined") {
        for (let i = 0; i < Object.getOwnPropertyNames(save["skills"]).length; i++) {
            if (cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]] == undefined) {
                console.log("Data missing default setting") // debug
                cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]] = save["skills"][Object.getOwnPropertyNames(save["skills"])[i]]
            }
        }
    }

    if (typeof cookiedata["skills"] != "undefined") {
        for (let i = 0; i < Object.getOwnPropertyNames(save["skills"]).length; i++) {
            for (let x = 0; x < Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]]).length; x++) {
                if (cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]] == undefined) {
                    console.log("Data missing default setting") // debug
                    cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]] = save["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]]
                }
            }
        }
    }

    document.getElementById("versionText").innerHTML = game["version"]
    save = cookiedata
}

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.which == 83) {
        e.preventDefault();
        saveGame()
        consoleLog("game has been saved")
    }
 }, false);


function sellButton() {
    if (game["active_inventory"] != null && save["inventory"][game["active_inventory"]] >= 1) {
        console.log(save["inventory"][game["active_inventory"]])
        save["money"] += save["inventory"][game["active_inventory"]] * game["items"][game["active_inventory"]]["value"]
        save["inventory"][game["active_inventory"]] = 0

        update('inventory')
    }
}

function invClick(name) {
    if (game["active_inventory"] != name) {
        game["active_inventory"] = name
        update('inventory')
    } else {
        game["active_inventory"] = null
        update('inventory')

    }
}

window.setInterval(function() {
    var elem = document.getElementById('console_holder');
    elem.scrollTop = elem.scrollHeight;
}, 1);
  
loadGame()
update("all")
consoleLog("welcome to catrpg")
