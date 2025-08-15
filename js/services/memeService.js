'use strict'

var gImgs = getImgs()
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'enter a text!',
            size: 40,
            font: 'Impact',
            color: 'white',
            strokeColor: 'black',
            x: 250,
            y: 100,
            width: 200,    
            height: 40,
            align: 'center',
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgById(id) {
    return gImgs.find(img => img.id === id) || null
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}


function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    gMeme.lines.push({
           txt: 'enter a text!',
            size: 40,
            font: 'Impact',
            color: 'white',
            strokeColor: 'black',
            x: 250,
            y: 100,
            width: 200,    
            height: 40,
            align: 'center',
    })
}

function setLinePos(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].x = x
    gMeme.lines[gMeme.selectedLineIdx].y = y
}