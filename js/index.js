function imageBox(options) {
    if (typeof options !== 'object') throw new TypeError("The 'options' parameter has to be of type object.");

    const currentOptions = setOptions(options);
    init(currentOptions);
}

function init(currentOptions) {
    const imageBoxRootElement = document.getElementById('image-box');
    appendElementToParent(imageBoxRootElement, 'image-box-container');

    const totalNumberOfImages = currentOptions.images.length;

    const imageBoxContainer = document.getElementById('image-box-container');
    appendElementToParent(imageBoxContainer, 'image-box-options-top');
    appendElementToParent(imageBoxContainer, 'image-box-images-container');
    appendElementToParent(imageBoxContainer, 'image-box-options-bottom');
    setNumberOfActiveImage(totalNumberOfImages, 1);

    const imageBoxOptionsSection = document.getElementById('image-box-options-top');
    appendElementToParent(imageBoxOptionsSection, 'close-option', '&#215;');

    const imageBoxImagesContainer = document.getElementById('image-box-images-container');
    addAllImagesToContainer(currentOptions.images, imageBoxImagesContainer);
    setCloseImageBoxFunctionality(imageBoxRootElement);

    if (currentOptions.arrows) {
        addArrows(totalNumberOfImages, imageBoxImagesContainer);
    }

    if (currentOptions.imageBorders) {
        addImageBorders();
    }

    if (currentOptions.slideShow) {
        appendElementToParent(imageBoxOptionsSection, 'slide-show-option', '&#9658;');
        setSlideShowFunctionality(totalNumberOfImages);
    }
}

function setOptions(options) {
    if (!options.url && !options.images) {
        throw new Error("The properties url and images cannot be null. One of them has to be present.");
    } else if (options.url && options.images) {
        throw new Error("The properties url and images cannot be filled at the same time. Only one of them should be present.");
    } else {
        if (options.url && typeof options.url !== 'string') throw new TypeError("The 'url' property has to be of type string.");
        if (options.images && typeof options.images !== 'object') throw new TypeError("The 'images' property has to be of type array.");
    }
    if (options.arrows && typeof options.arrows !== 'boolean') throw new TypeError("The 'arrows' property has to be of type boolean.");
    if (options.imageBorders && typeof options.imageBorders !== 'boolean') throw new TypeError("The 'imageBorders' property has to be of type boolean.");
    if (options.slideShow && typeof options.slideShow !== 'boolean') throw new TypeError("The 'slideShow' property has to be of type boolean.");

    return {
        url: options.url ? options.url : '',
        images: options.images ? options.images : [],
        arrows: getPropertyValue(options, 'arrows', true),
        imageBorders: getPropertyValue(options, 'imageBorders', true),
        slideShow: getPropertyValue(options, 'slideShow', true)
    };
}

function getPropertyValue(options, propertyName, propertyDefaultValue) {
    let propertyValue = !propertyDefaultValue;

    // If the property is set and it is "true"
    // OR
    // the property is not set at all
    // then, the property should be TRUE
    if ((options.hasOwnProperty(propertyName) && options[propertyName]) || !options.hasOwnProperty(propertyName)) {
        propertyValue = propertyDefaultValue;
    }

    return propertyValue;
}

function addArrow(container, arrowDirection, arrowId) {
    const arrow = document.createElement('div');
    arrow.innerHTML = arrowDirection;
    arrow.id = arrowId;

    container.append(arrow);
}

function addArrows(totalNumberOfImages, container) {
    addArrow(container, '<', 'arrow-left');
    addArrow(container, '>', 'arrow-right');
    setArrowsFunctionality(totalNumberOfImages);
    setArrowKeysFunctionality(totalNumberOfImages, true);
}

function setArrowsFunctionality(totalNumberOfImages) {
    const previousArrow = document.getElementById('arrow-left');
    const nextArrow = document.getElementById('arrow-right');

    previousArrow.addEventListener('click', () => {
        setActiveImage(totalNumberOfImages, 'previous');
    });

    nextArrow.addEventListener('click', () => {
        setActiveImage(totalNumberOfImages, 'next');
    });
}

// *functionalityAvailability* is a flag that helps us in the scenario when the arrow keys should and/or should not be available
// for example when the slide show is played, the arrow keys should be unavailable i.e. not to be functional and vice versa
function setArrowKeysFunctionality(totalNumberOfImages, functionalityAvailability) {
    document.onkeydown = () => {
        checkArrowKey(functionalityAvailability);
    };

    function checkArrowKey(functionalityAvailability) {
        const currentEvent = window.event;

        if (functionalityAvailability) {
            if (currentEvent.keyCode === 37) {
                // left arrow
                setActiveImage(totalNumberOfImages, 'previous');
            } else if (currentEvent.keyCode === 39) {
                // right arrow
                setActiveImage(totalNumberOfImages, 'next');
            }
        }
    }
}

function setArrowsState(visible) {
    const previousArrow = document.getElementById('arrow-left');
    const nextArrow = document.getElementById('arrow-right');

    setElementVisibility(previousArrow, visible);
    setElementVisibility(nextArrow, visible);
}

function appendElementToParent(parentElement, newElementId, content = null) {
    const element = document.createElement('div');
    element.id = newElementId;

    if (content) {
        setElementContent(element, content);
    }

    parentElement.append(element);
}

function setElementContent(element, content) {
    element.innerHTML = content;
}

function addImage(container, imageUrl, isActive, order) {
    const image = document.createElement('img');
    image.src = `${imageUrl}`;
    image.id = `image-${order}`;
    image.classList.add('slide-show-image');
    image.classList.add(isActive ? 'active' : 'inactive');
    image.dataset.order = order;

    container.append(image);
}

function addImageBorders() {
    const images = document.querySelectorAll('.slide-show-image');

    for (let i = 0; i < images.length; i++) {
        images[i].classList.add('with-border');
    }
}

function addAllImagesToContainer(images, container) {
    for (let i = 0; i < images.length; i++) {
        const order = i + 1;
        const isActive = (i === 0); // By default, only the first image is active and all the rest are inactive

        addImage(container, images[i], isActive, order);
    }
}

function setActiveImage(totalNumberOfImages = null, direction = 'next') {
    const currentActiveImage = document.querySelector('.slide-show-image.active');

    if (currentActiveImage) {
        const currentActiveImageOrder = parseInt(currentActiveImage.dataset['order'], 10);

        const nextActiveImageOrder = (direction === 'next') ? currentActiveImageOrder + 1 : currentActiveImageOrder - 1;
        const nextActiveImage = document.getElementById(`image-${nextActiveImageOrder}`);

        if (nextActiveImage) {
            setElementVisibility(currentActiveImage, false);
            setElementVisibility(nextActiveImage, true);
            if (totalNumberOfImages) {
                setNumberOfActiveImage(totalNumberOfImages, nextActiveImageOrder);
            }
        }
    }
}

function setNumberOfActiveImage(totalNumberOfImages, currentNumberOfImage) {
    const numberOfImageElement = document.getElementById('image-box-options-bottom');
    const content = `${currentNumberOfImage} / ${totalNumberOfImages}`;

    setElementContent(numberOfImageElement, content);
}

function setElementVisibility(element, visible) {
    if (visible) {
        element.classList.remove('inactive');
        element.classList.add('active');
        fadeIn(element);
    } else {
        element.classList.remove('active');
        element.classList.add('inactive');
    }
}

function setSlideShowFunctionality(totalNumberOfImages) {
    const slideShowOption = document.getElementById('slide-show-option');

    let slideShowInterval = null;
    let isSlideShowPlayed = false; // Slide show is not played by default

    slideShowOption.addEventListener('click', () => {
        if (!isSlideShowPlayed) {
            isSlideShowPlayed = true; // Slide show is played
            setArrowsState(false);
            setArrowKeysFunctionality(totalNumberOfImages, false);
            setElementContent(slideShowOption, '&#9724;'); // set it to be Pause symbol
            slideShowInterval = setInterval(() => {
                setActiveImage(totalNumberOfImages)
            }, 2000);
        } else {
            clearInterval(slideShowInterval);
            setArrowsState(true);
            setArrowKeysFunctionality(totalNumberOfImages, true);
            setElementContent(slideShowOption, '&#9658;'); // set it to be Play symbol
            isSlideShowPlayed = false; // Slide show is paused now
        }
    });
}

function fadeIn(image) {
    let imageOpacity = 0;
    image.style.opacity = imageOpacity.toString(10);

    const tick = () => {
        imageOpacity = imageOpacity + 0.02;
        image.style.opacity = imageOpacity.toString(10);
        if (imageOpacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 15)
        }
    };

    tick();
}

function setCloseImageBoxFunctionality(imageBoxRootElement) {
    const closeOptionElement = document.getElementById('close-option');
    closeOptionElement.addEventListener('click', () => {
        while (imageBoxRootElement.hasChildNodes()) {
            imageBoxRootElement.removeChild(imageBoxRootElement.lastChild);
        }
        imageBoxRootElement.remove();
    });
}

export default imageBox;