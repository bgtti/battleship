export const displayMessages = (function () {
    // HTML elements:
    const messageContainerP1 = document.querySelector(".messageContainerP1");
    const messageContainerP2 = document.querySelector(".messageContainerP2");

    function displayMessage(typeOfMessage, gameType) {
        let theMessage;
        switch (typeOfMessage) {
            case "positionShipsP1":
                if (gameType === "HC") {
                    theMessage = ["Drag your ships into position.",
                        "Click the start button when you are ready."];
                } else if (gameType === "HH") {
                    theMessage = ["Player1: drag your ships into position.",
                        "Click the button bellow when you are ready."];
                }
                break;
            case "positionShipsP2":
                if (gameType === "HH") {
                    theMessage = ["Player2: drag your ships into position.",
                        "Click the button bellow when you are ready."];
                }
                break;
            case "gameStart":
                if (gameType === "HC") {
                    theMessage = ["Game started! Human's turn to attack!",
                        "Click a coordinate on the Computer's board to shoot it."];
                } else if (gameType === "HH") {
                    theMessage = ["Game started! Player 1's turn to shoot. Click the button bellow when ready.",
                        "Click a coordinate on Player 2's board to shoot it."];
                }
                break;
            case "p1ShotMissed":
                if (gameType === "HC") {
                    theMessage = ["You shot and missed!",
                        "Computer's turn to attack!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 1 shot and missed. Player 2's turn to shoot.",
                        "Click the button bellow when ready."];
                }
                break;
            case "p2ShotMissed":
                if (gameType === "HC") {
                    theMessage = ["The computer shot and missed!",
                        "Your turn to attack!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 2 shot and missed. Player 1's turn to shoot.",
                        "Click the button bellow when ready."];
                }
                break;
            case "p1ShotSuccess":
                if (gameType === "HC") {
                    theMessage = ["You shot and hit!",
                        "Computer's turn to attack!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 1 shot and hit. Player 2's turn to shoot.",
                        "Click the button bellow when ready."];
                }
                break;
            case "p2ShotSuccess":
                if (gameType === "HC") {
                    theMessage = ["The computer shot and hit!",
                        "Your turn to attack!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 2 shot and hit. Player 1's turn to shoot.",
                        "Click the button bellow when ready."];
                }
                break;
            case "p1Wins":
                if (gameType === "HC") {
                    theMessage = ["Congratulations! You sank all Computer's ships!",
                        "Click the button bellow to play again!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 1 wins!",
                        "Click the button bellow to play again!"];
                }
                break;
            case "p2Wins":
                if (gameType === "HC") {
                    theMessage = ["Oh no! The Computer sank all your ships!",
                        "Click the button bellow to play again!"];
                } else if (gameType === "HH") {
                    theMessage = ["Player 2 wins!",
                        "Click the button bellow to play again!"];
                }
                break;
            default:
                theMessage = ["Oops, looks like something went wrong!",
                    "Re-load the page to start again."];
        }
        messageContainerP1.textContent = theMessage[0];
        messageContainerP2.textContent = theMessage[1];
    }
    return {
        displayMessage,
    }
})()