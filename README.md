barcode-js
==========
A JavaScript barcode generator


## Code Example

Usage Example:

```javascript
//get HTML DOM object of the barcode holder
var barcodeElement = document.getElementById('barcode-example');
//make a new instance of our barcode class, inside the barcode holder element
var barcodeExample = new barcode(barcodeElement);
//build a new barcode for 978-0262018029
barcodeExample.build('978-0262018029');
```

*Supports HTML5 Canvas and has a non-canvas fallback*