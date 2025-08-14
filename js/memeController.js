'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderGallery()

     document.getElementById('txt-input').value = 'enter a text!'
}

function onImgSelect(imgId) {
    gMeme.selectedImgId = imgId
    const imgData = getImgById(imgId)
    const meme = getMeme()

    showEditor()
    resizeCanvas()

    renderMeme(imgData, meme)
}
function onTextChange(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    onImgSelect(gMeme.selectedImgId)
}

function onAddLine() {
    addLine()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    
    fillLineField(gMeme)

    const imgData = getImgById(gMeme.selectedImgId)
    renderMeme(imgData, gMeme)
}
function onSwitchLine() {
    const meme = getMeme()

    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length

    fillLineField(meme)
    const currLine = meme.lines[meme.selectedLineIdx]
    document.getElementById('txt-input').value = currLine.txt

    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}


function onColorChange(ev) {
    const color = ev.target.value
    setTextColor(color)
    onImgSelect(gMeme.selectedImgId)
}

function onChangeFontSize(diff) {
    setFontSize(diff)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}
function renderMeme(imgData, meme) {
    const elImg = new Image()
    elImg.src = imgData.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            drawText(line)
            if (idx === meme.selectedLineIdx) {
                drawFrame(line)
            }
        })
    }
}

function drawText(line) {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color || 'white'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, line.x, line.y)
}

function drawFrame(line) {
    gCtx.strokeStyle = 'red'
    gCtx.lineWidth = 2

    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size

    gCtx.strokeRect(
        line.x - textWidth / 2 - 5,
        line.y - textHeight / 2 - 5,
        textWidth + 10, textHeight + 10
    )
}

function fillLineField(meme) {
    const currLine = meme.lines[meme.selectedLineIdx]
    document.getElementById('txt-input').value = currLine.txt
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function showEditor() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.meme-container').classList.remove('hidden')
}

function showGallery() {
    document.querySelector('.gallery').classList.remove('hidden')
    document.querySelector('.meme-container').classList.add('hidden')
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}