'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()

    gElCanvas.addEventListener('click', onCanvasClick)
    document.getElementById('txt-input').value = 'enter a text!'
}

function onImgSelect(imgId) {
    resetMeme(imgId)

    document.getElementById('txt-input').value = 'enter a text!'
    showEditor()
    resizeCanvas()

    const imgData = getImgById(imgId)
    renderMeme(imgData, gMeme)
}

function onTextChange(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
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
    setTextColor(ev.target.value)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}
function onChangeFontSize(diff) {
    setFontSize(diff)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}

function onFontChange(ev) {
    setFontFamily(ev.target.value)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}

function onTextAlign(align) {
    setTextAlign(align)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}

function onMoveText(offset) {
    moveTextLine(offset)
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}

function onDeleteLine() {
    deleteLine()
    const meme = getMeme()
    if (meme.lines.length > 0) {
        meme.selectedLineIdx = 0
        fillLineField(meme)
        const imgData = getImgById(meme.selectedImgId)
        renderMeme(imgData, meme)
    }
    else {
    document.getElementById('txt-input').value = ''
    const imgData = getImgById(meme.selectedImgId)
    renderMeme(imgData, meme)
}
}

function renderMeme(imgData, meme) {
    const elImg = new Image()
    elImg.src = imgData.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font}`
            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            line.width = textWidth
            line.height = textHeight

            drawText(line)
            if (idx === meme.selectedLineIdx) drawFrame(line)
        })
    }
}

function drawText(line) {
    const meme = getMeme()
    const { selectedLineIdx } = meme

    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color || 'white'
    gCtx.textAlign = line.align || 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, line.x, line.y)
}

function drawFrame(line) {
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2

    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size

    var frameX = line.x
    if (line.align === 'left') frameX += textWidth / 2
    else if (line.align === 'right') frameX -= textWidth / 2

    gCtx.strokeRect(
        frameX - textWidth / 2 - 5,
        line.y - textHeight / 2 - 5,
        textWidth + 10,
        textHeight + 10
    )
}
function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()

    meme.lines.forEach((line, idx) => {
        const left = line.x - line.width / 2 - 5
        const right = line.x + line.width / 2 + 5
        const top = line.y - line.height / 2 - 5
        const bottom = line.y + line.height / 2 + 5

        if (offsetX >= left && offsetX <= right && offsetY >= top && offsetY <= bottom) {
            meme.selectedLineIdx = idx
            fillLineField(meme)
            const imgData = getImgById(meme.selectedImgId)
            renderMeme(imgData, meme)
        }
    })
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

function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('open');
}