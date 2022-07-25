function submit_dialogue() {
    let scenes = document.querySelectorAll(".input");
    let listOfScenes = [];
    scenes.forEach(function (e) {
        let buttonNodeList = e.querySelectorAll(".commandName");
        let dialogue = {
            scene_tag: e.querySelector("#sceneTag").value,
            npc_name: e.querySelector("#name").value,
            text: e.querySelector("#text").value
        }
        let buttonList = [];
        buttonNodeList.forEach(function (e) {
            button = {
                name: e.value,
                commands: []
            };
            buttonList.push(button);
        })

        if (buttonNodeList.length !== 0) {
            dialogue.buttons = buttonList;
        }

        listOfScenes.push(dialogue);
    })
    replaceSubmitText(JSON.stringify(listOfScenes, null, "\t"));
};

function replaceSubmitText(text) {
    let resultField = document.querySelector("#result");
    resultField.textContent = text;
}

function downloadFile() {
    let resultField = document.querySelector("#result");
    let scenes = resultField.textContent;
    let myFile = new File([scenes], "npc.dialogue.json");
    // Create a link and set the URL using `createObjectURL`
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(myFile);
    link.download = myFile.name;

    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(link);
    link.click();

    // To make this work on Firefox we need to wait
    // a little while before removing it.
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}

function addDialogue(e) {

    let newLi = document.createElement("li");
    newLi.setAttribute("class", "newLi")
    let newDialogue = document.createElement("div");

    newDialogue.setAttribute("class", "input");
    newDialogue.setAttribute("id", "input");

    let removeButton = document.createElement("button");
    removeButton.setAttribute("id", "remove");
    removeButton.innerText = "X";
    removeButton.addEventListener("click", function (e) {
        let button = e.currentTarget;
        let container = button.parentNode;
        let containerContainer = container.parentNode;
        containerContainer.remove();
    })

    let resetButton = document.createElement("button");
    resetButton.setAttribute("id", "reset");
    resetButton.innerText = "reset";
    resetButton.addEventListener("click", function (e) {
        let button = e.currentTarget;
        let container = button.parentNode;
        let sceneTag = container.querySelector("#sceneTag");
        let name = container.querySelector("#name");
        let text = container.querySelector("#text");
        sceneTag.value = "";
        name.value = "";
        text.value = "";

        let command_buttons = container.querySelector(".comContainer");
        commandNames = command_buttons.querySelectorAll(".commandName");
        commandNames.forEach(function (e) {
            e.remove();
        })

    })

    let newSceneTag = document.createElement("textarea");
    let newNPCName = document.createElement("textarea");
    let newText = document.createElement("textarea");

    newSceneTag.setAttribute("id", "sceneTag");
    newSceneTag.setAttribute("cols", "50");
    newSceneTag.setAttribute("rows", "1");
    newSceneTag.setAttribute("placeholder", "location_name_action");
    newNPCName.setAttribute("id", "name");
    newNPCName.setAttribute("cols", "50");
    newNPCName.setAttribute("rows", "1");
    newNPCName.setAttribute("placeholder", "Name of the NPC");
    newText.setAttribute("id", "text");
    newText.setAttribute("cols", "50");
    newText.setAttribute("rows", "6");
    newText.setAttribute("placeholder", "NPC text");

    let sceneTag_text = document.createElement("h3");
    let npc_name_text = document.createElement("h3");
    let text_text = document.createElement("h3");

    sceneTag_text.innerText = "Scene tag";
    npc_name_text.innerText = "Name";
    text_text.innerText = "Text";

    let newNewButton = document.createElement("button");
    newNewButton.setAttribute("class", "newButton");
    newNewButton.innerText = "+";
    newNewButton.addEventListener("click", addDialogue);


    let newButtonDiv = document.createElement("div");
    newButtonDiv.setAttribute("class", "comContainer");

    let newButtonText = document.createElement("h3");
    newButtonText.innerText = "Buttons";
    newButtonDiv.appendChild(newButtonText);

    newDialogue.appendChild(removeButton);
    newDialogue.appendChild(resetButton);
    newDialogue.appendChild(sceneTag_text);
    newDialogue.appendChild(newSceneTag);
    newDialogue.appendChild(npc_name_text);
    newDialogue.appendChild(newNPCName);
    newDialogue.appendChild(text_text);
    newDialogue.appendChild(newText);
    newDialogue.appendChild(newButtonDiv);

    let commandButton = document.createElement("button");
    commandButton.innerText = "Add command";
    commandButton.setAttribute("class", "addCommand");

    newButtonDiv.appendChild(commandButton);

    newLi.appendChild(newDialogue);
    newLi.appendChild(newNewButton);

    // let currentDiv = document.getElementById("scenes");
    let currentDiv = document.getElementById("dialogues");
    let currentListObject = e.currentTarget.parentNode;

    // currentDiv.appendChild(newLi);
    currentDiv.insertBefore(newLi, currentListObject.nextSibling);


    commandButton.addEventListener("click", function (e) {
        let button = e.currentTarget;
        let container = button.parentNode;
        buttonCount = container.querySelectorAll(".commandName").length;
        if (buttonCount < 6) {
            let container = document.createElement("div");
            let commandInput = document.createElement("textarea");
            let removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.addEventListener("click", function (e) {
                buttonCount --;
                container.remove();
            })
            commandInput.setAttribute("class", "commandName");
            commandInput.setAttribute("placeholder", "Command Name");
            commandInput.setAttribute("maxlength", "16");
            commandInput.setAttribute("rows", "1");
            container.appendChild(removeButton);
            container.appendChild(commandInput);
            newButtonDiv.insertBefore(container,commandButton);
        }
        else console.log("too many buttons");
    })

    /*
    let currentDiv = document.getElementById("scenes");
    let inputContainer = document.getElementById("inputContainer");

    let containerClone = inputContainer.cloneNode(true);

    currentDiv.appendChild(containerClone);

    
    */
}