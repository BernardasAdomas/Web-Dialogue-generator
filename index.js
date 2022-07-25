
window.addEventListener("DOMContentLoaded", function (e) {
    let submitButton = document.querySelector(".submit");
    let result = this.document.querySelector("#result");

    let createButton = document.querySelector(".newButton");

    createButton.addEventListener("click", addDialogue);
    submitButton.addEventListener("click", submit_dialogue);

    let resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click",function(e)
    {
        let button= e.currentTarget;
        let container = button.parentNode;
        let sceneTag = container.querySelector("#sceneTag");
        let name = container.querySelector("#name");
        let text = container.querySelector("#text");
        sceneTag.value = "";
        name.value = "";
        text.value = "";

        let command_buttons = container.querySelector(".comContainer");
        commandNames=command_buttons.querySelectorAll(".commandName");
        commandNames.forEach(function(e){
            e.remove();
    })
})

    let commandButton = document.querySelector(".addCommand");

    commandButton.addEventListener("click", function (e) {
        let button = e.currentTarget;
        let container = button.parentNode;
        let newButtonDiv = document.querySelector(".comContainer");
        buttonCount = container.querySelectorAll(".commandName").length;
        if (buttonCount < 6) {
            let container = document.createElement("div");
            let commandInput = document.createElement("textarea");
            let removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.addEventListener("click", function (e) {
                buttonCount--;
                container.remove();
            })
            commandInput.setAttribute("class", "commandName");
            commandInput.setAttribute("placeholder", "Command Name");
            commandInput.setAttribute("maxlength", "16");
            container.appendChild(removeButton);
            container.appendChild(commandInput);
            newButtonDiv.insertBefore(container,commandButton);
        }
        else console.log("too many buttons");
    })

    let export_button = document.querySelector(".export");
    export_button.addEventListener("click",function(){
        let resultField = document.querySelector("#result");
    let scenes = resultField.textContent;
    let myFile = new File([scenes], "npc.dialogue.json");
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(myFile);
    link.download = myFile.name;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
    });

})