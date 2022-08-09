export let explosionAnimation = (function () {

    let image0 = new Image(50, 50);
    image0.src = "./images/explosion00.png";
    image0.classList.add("hide");

    let image1 = new Image(50, 50);
    image1.src = "./images/explosion01.png";
    image1.classList.add("hide");

    let image2 = new Image(50, 50);
    image2.src = "./images/explosion02.png";
    image2.classList.add("hide");

    let image3 = new Image(50, 50);
    image3.src = "./images/explosion03.png";
    image3.classList.add("hide");

    let image4 = new Image(50, 50);
    image4.src = "./images/explosion04.png";
    image4.classList.add("hide");

    let image5 = new Image(50, 50);
    image5.src = "./images/explosion05.png";
    image5.classList.add("hide");

    let image6 = new Image(50, 50);
    image6.src = "./images/explosion06.png";
    image6.classList.add("hide");

    let image7 = new Image(50, 50);
    image7.src = "./images/explosion07.png";
    image7.classList.add("hide");

    function showImage(previousImage, newImage) {
        return new Promise(resolve => {
            setTimeout(() => {
                previousImage.classList.add("hide");
                if (newImage) {
                    newImage.classList.remove("hide");
                }
                resolve();
            }, 50)
        })
    }

    function playAnimation(targetCoord, hitSuccess, shipParts) {
        let imageContainer = document.createElement('div');
        imageContainer.append(image0, image1, image2, image3, image4, image5, image6, image7);
        image0.classList.remove("hide");
        targetCoord.append(imageContainer);

        let hitSpotIcon = document.createElement('ion-icon');
        hitSpotIcon.setAttribute("name", "close");
        let hitAttribute;
        hitSuccess === true ? hitAttribute = "spot-hit-red" : hitAttribute = "spot-hit-blue";
        hitSpotIcon.setAttribute("class", `${hitAttribute}`);
        hitSpotIcon.classList.add("spotWasHit");

        showImage(image0, image1).then(() => {
            return showImage(image1, image2);
        }).then(() => {
            return showImage(image2, image3);
        }).then(() => {
            return showImage(image3, image4);
        }).then(() => {
            return showImage(image4, image5);
        }).then(() => {
            return showImage(image5, image6);
        }).then(() => {
            return showImage(image6, image7);
        }).then(() => {
            return showImage(image7);
        }).then(() => {
            setTimeout(() => {
                imageContainer.append(hitSpotIcon);
            }, 150);
        }).then(() => {
            setTimeout(() => {
                if (shipParts !== false) {
                    const shipPartParents = [];
                    shipParts.forEach(part => {
                        shipPartParents.push(part.parentElement);
                        part.classList.add("ship-part-sunk");
                        part.classList.remove("hide");
                    })
                    shipPartParents.forEach(parent => {
                        if (parent.querySelector(".spotWasHit") !== null) {
                            parent.querySelector(".spotWasHit").classList.add("hide");
                        }
                    })
                }
            }, 150);

        })

    }

    return {
        playAnimation
    }
})()