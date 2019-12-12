function imageBox(options = {}) {
    if (typeof options !== 'object') throw new TypeError("The 'options' parameter has to be of type object.");

    const imageBoxRootElement = document.getElementById('image-box');
    addElementToParent(imageBoxRootElement, 'image-box-container');

    const imageBoxContainer = document.getElementById('image-box-container');
    addElementToParent(imageBoxContainer, 'image-box-images-container');

    const imageBoxImagesContainer = document.getElementById('image-box-images-container');
    addImage(imageBoxImagesContainer, 'https://picsum.photos/200/300');
}

function addElementToParent(parentElement, newElementId) {
    const imageBoxContainer = document.createElement('div');
    imageBoxContainer.id = newElementId;

    parentElement.append(imageBoxContainer);
}

function addImage(container, imageUrl) {
    const image = document.createElement('img');
    image.src = `${imageUrl}`;
    container.append(image);
}

export default imageBox;