'use strict'

function renderGallery() {
    const imgs = getImgs()

    const elGallery = document.querySelector('.gallery')

    const strHTMLs = imgs.map(img => {
        return `<img onclick="onImgSelect(${img.id})" src="${img.url}" alt="">`;
    })
    elGallery.innerHTML = strHTMLs.join('')
}
