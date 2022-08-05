export let explosionAnimation = (function () {

    let image1 = new Image(50, 50);
    image1.src = "../images/explosion01.png";
    image1.classList.add("hide");

    let image2 = new Image(50, 50);
    image2.src = "../images/explosion02.png";
    image2.classList.add("hide");

    let image3 = new Image(50, 50);
    image3.src = "../images/explosion03.png";
    image3.classList.add("hide");

    let image4 = new Image(50, 50);
    image4.src = "../images/explosion04.png";
    image4.classList.add("hide");

    let image5 = new Image(50, 50);
    image5.src = "../images/explosion05.png";
    image5.classList.add("hide");

    function showImage(previousImage, newImage) {
        return new Promise(resolve => {
            setTimeout(() => {
                previousImage.classList.add("hide");
                if (newImage) {
                    newImage.classList.remove("hide");
                }
                resolve();
            }, 1500)
        })
    }

    function playAnimation(targetCoord, hitSuccess) {
        let imageContainer = document.createElement('div');
        imageContainer.append(image1, image2, image3, image4, image5);
        image1.classList.remove("hide");
        targetCoord.append(imageContainer);

        let hitSpotIcon = document.createElement('ion-icon');
        hitSpotIcon.setAttribute("name", "close");
        let hitAttribute;
        hitSuccess === true ? hitAttribute = "spot-hit-green" : hitAttribute = "spot-hit-red"
        hitSpotIcon.setAttribute("class", `${hitAttribute}`);

        showImage(image1, image2).then(() => {
            return showImage(image2, image3);
        }).then(() => {
            return showImage(image3, image4);
        }).then(() => {
            return showImage(image4, image5);
        }).then(() => {
            return showImage(image5);
        }).then(() => {
            image5.classList.add("hide");
            imageContainer.append(hitSpotIcon)
        })

    }

    return {
        playAnimation
    }
})()