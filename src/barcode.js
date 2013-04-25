/*!
 * barcode-js
 * http://github.com/justindmartin1/barcode-js
 *
 * Copyright 2013 Justin Martin
 * Released under the MIT license
 * http://github.com/justindmartin1/barcode-js/blob/master/LICENSE.md
 */

/**
* @class barcode
* @constructor
* Preps the barcode-element and initializes variables
* @param {object} barcodeElement    HTML DOM element in which the barcode will be placed
*/
function barcode(barcodeElement){
    this.barcodeElement = barcodeElement;
    var barcodeElementHeight = parseInt(window.getComputedStyle(barcodeElement).height);
    this.barcodeHeight = (barcodeElementHeight > 0) ? barcodeElementHeight : 50;
    this.barcodeThinWidth = 1;
    this.barcodeThickWidth = 2 * this.barcodeThinWidth;
    this.codeMap = {
            '0': '000110100',   '1': '100100001',   '2': '001100001',   '3': '101100000',
            '4': '000110001',   '5': '100110000',   '6': '001110000',   '7': '000100101',   
            '8': '100100100',   '9': '001100100',   'A': '100001001',   'B': '001001001',
            'C': '101001000',   'D': '000011001',   'E': '100011000',   'F': '001011000',
            'G': '000001101',   'H': '100001100',   'I': '001001100',   'J': '000011100',
            'K': '100000011',   'L': '001000011',   'M': '101000010',   'N': '000010011',
            'O': '100010010',   'P': '001010010',   'Q': '000000111',   'R': '100000110',
            'S': '001000110',   'T': '000010110',   'U': '110000001',   'V': '011000001',
            'W': '111000000',   'X': '010010001',   'Y': '110010000',   'Z': '011010000',
            ' ': '011000100',   '$': '010101000',   '%': '000101010',   '*': '010010100',
            '+': '010001010',   '-': '010000101',   '.': '110000100',   '/': '010100010'
    };
};


/**
* @method build
* Builds the barcode
* @param {string} text    Text to be encoded as a barcode
*/
barcode.prototype.build = function(text){
    text = text.toUpperCase();
    text = '*' + text + '*';

    var textLen = text.length;
    this.barcodeWidth = textLen * (7 * this.barcodeThinWidth + 3 * this.barcodeThickWidth) - this.barcodeThinWidth;
    this.barcodeElement.style.width = this.barcodeWidth + 'px';
    this.barcodeElement.style.height = this.barcodeHeight + 'px';

    this.barcodeElement.innerHTML += '<canvas width="' + this.barcodeWidth + '" height="' + this.barcodeHeight + '" style="width:' + this.barcodeWidth + 'px; height:' + this.barcodeHeight + 'px;"></canvas>';
    this.canvasContext = this.barcodeElement.getElementsByTagName('canvas')[this.barcodeElement.getElementsByTagName('canvas').length-1].getContext('2d');

    var xPos = 0;
    for(var i = 0; i < textLen; i++){
        var character = '';

        if((character = text[i]) === false){
            character = '-';
        }

        for(var j = 0; j <= 8; j++){
            var elementWidth = (this.codeMap[character][j] == 1) ? this.barcodeThickWidth : this.barcodeThinWidth;
            if((j + 1) % 2){
                if(!this.canvasContext){
                    var newBar = document.createElement('div');
                    newBar.style.position = 'absolute';
                    newBar.style.left = this.barcodeElement.offsetLeft + xPos + 'px';
                    newBar.style.top = this.barcodeElement.offsetTop + 'px';
                    newBar.style.width = elementWidth + 'px';
                    newBar.style.height = this.barcodeHeight + 'px';
                    newBar.style.backgroundColor = '#000';
                    this.barcodeElement.appendChild(newBar);
                }else{
                    this.canvasContext.fillStyle = '#000';
                    this.canvasContext.fillRect(xPos, 0, elementWidth, this.barcodeHeight*3);
                }
            }
            xPos += elementWidth;
        }
        xPos += this.barcodeThinWidth;
    }
};