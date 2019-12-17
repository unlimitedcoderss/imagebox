function imageBox(options) {
    if (typeof options !== 'object') throw new TypeError("The 'options' parameter has to be of type object.");

    const currentOptions = setOptions(options);

    const imageBoxRootElement = document.getElementById('image-box');
    addElementToParent(imageBoxRootElement, 'image-box-container');

    const imageBoxContainer = document.getElementById('image-box-container');
    addElementToParent(imageBoxContainer, 'image-box-images-container');

    const imageBoxImagesContainer = document.getElementById('image-box-images-container');
    addAllImagesToContainer(options.images, imageBoxImagesContainer);

    if (currentOptions.arrows) {
        addArrows(imageBoxImagesContainer);
    }

    if (currentOptions.imageBorders) {
        addImageBorders();
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

    return {
        url: options.url ? options.url : '',
        images: options.images ? options.images : [],
        arrows: getPropertyValue(options, 'arrows', true),
        imageBorders: getPropertyValue(options, 'imageBorders', true)
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

function addArrowsFunctionality() {
    const previousArrow = document.getElementById('arrow-left');
    const nextArrow = document.getElementById('arrow-right');

    previousArrow.addEventListener('click', () => {
        const currentActiveImage = document.querySelector('.slide-show-image.active');
        setPreviousActiveImage(currentActiveImage);
    });

    nextArrow.addEventListener('click', () => {
        const currentActiveImage = document.querySelector('.slide-show-image.active');
        setNextActiveImage(currentActiveImage);
    });
}

function addArrows(container) {
    addArrow(container, '<', 'arrow-left');
    addArrow(container, '>', 'arrow-right');
    addArrowsFunctionality();
}

function addElementToParent(parentElement, newElementId) {
    const element = document.createElement('div');
    element.id = newElementId;

    parentElement.append(element);
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

function addAllImagesToContainer(images, container) {
    for (let i = 0; i < images.length; i++) {
        const order = i + 1;
        const isActive = (i === 0); // By default, only the first image is active and all the rest are inactive

        addImage(container, images[i], isActive, order);
    }
}

function addImageBorders() {
    const images = document.querySelectorAll('.slide-show-image');

    for (let i = 0; i < images.length; i++) {
        images[i].classList.add('with-border');
    }
}

function setNextActiveImage(currentActiveImage) {
    const currentActiveImageOrder = parseInt(currentActiveImage.dataset['order'], 10);

    const nextActiveImageOrder = currentActiveImageOrder + 1;
    const nextActiveImage = document.getElementById(`image-${nextActiveImageOrder}`);

    if (nextActiveImage) {
        currentActiveImage.classList.remove('active');
        currentActiveImage.classList.add('inactive');

        nextActiveImage.classList.remove('inactive');
        nextActiveImage.classList.add('active');
    }
}

function setPreviousActiveImage(currentActiveImage) {
    const currentActiveImageOrder = parseInt(currentActiveImage.dataset['order'], 10);

    const previousActiveImageOrder = currentActiveImageOrder - 1;
    const previousActiveImage = document.getElementById(`image-${previousActiveImageOrder}`);

    if (previousActiveImage) {
        currentActiveImage.classList.remove('active');
        currentActiveImage.classList.add('inactive');

        previousActiveImage.classList.remove('inactive');
        previousActiveImage.classList.add('active');
    }
}

export default imageBox;