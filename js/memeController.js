'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function renderMeme(imgId) {
    gMeme.selectedImgId = imgId 
    const imgData = getImgById(imgId)
    const meme = getMeme()

    showEditor()
    resizeCanvas()
    
    renderImg(imgData, meme)
}
function onTextChange(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    renderMeme(gMeme.selectedImgId) 
}

function renderImg(imgData,meme) {
    const elImg = new Image()
    elImg.src = imgData.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[meme.selectedLineIdx])
    }
}
function drawText(line){
     gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.textAlign = 'center'
    gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function showEditor(){
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.meme-container').classList.remove('hidden')
}

function showGallery(){
     document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.meme-container').classList.add('hidden')
}