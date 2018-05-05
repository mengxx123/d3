/* eslint-disable */

function draw(svg, data) {
    for (let shape of data.shapes) {
        let elem
        if (shape.type === 'rect') {
            elem = svg.append('rect')
                .attr('x', shape.x)
                .attr('y', shape.y)
                .attr('width', shape.width)
                .attr('height', shape.height)
        } else if (shape.type === 'line') {
            elem = svg.append('line')
                .attr('x1', shape.x1)
                .attr('y1', shape.y1)
                .attr('x2', shape.x2)
                .attr('y2', shape.y2)
                .attr('stroke', '#000')
                .attr('stroke-width', 1)
        } else if (shape.type === 'text') {
            elem = svg.append('text')
                .attr('x', shape.x)
                .attr('y', shape.y)
                .text(shape.text)
        } else if (shape.type === 'circle') {
            elem = svg.append('circle')
                .attr('cx', shape.cx)
                .attr('cy', shape.cy)
                .attr('r', shape.r)
        } else if (shape.type === 'ellipse') {
            elem = svg.append('ellipse')
                .attr('cx', shape.cx)
                .attr('cy', shape.cy)
                .attr('rx', shape.rx)
                .attr('ry', shape.ry)
        }
        if (shape.style && elem) {
            if (shape.style.fillColor) {
                elem.attr('fill', shape.style.fillColor)
            }
            if (shape.style.strokeColor) {
                elem.attr('stroke', shape.style.strokeColor)
            }
            if (shape.style.strokeWidth) {
                }
            elem.attr('stroke-width', shape.style.strokeWidth || 1)
            if (shape.style.textAnchor) {
                elem.attr('text-anchor', shape.style.textAnchor)
            }
            if (shape.style.dominantBaseline) {
                elem.attr('dominant-baseline', shape.style.dominantBaseline)
            }
        }
    }
}

window.toUTF8 = function(str) {
    if( typeof( str ) !== "string" ) {
        throw new TypeError("toUTF8 function only accept a string as its parameter.");
    }
    var ret = [];
    var c1, c2, c3;
    var cc = 0;
    for( var i = 0, l = str.length; i < l; i++ ) {
        cc = str.charCodeAt(i);
        if( cc > 0xFFFF ) { throw new Error("InvalidCharacterError"); }
        if( cc > 0x80 ) {
            if( cc < 0x07FF ) {
                c1 = String.fromCharCode( ( cc >>>  6 ) | 0xC0 );
                c2 = String.fromCharCode( ( cc & 0x3F ) | 0x80 );
                ret.push( c1, c2 );
            } else {
                c1 = String.fromCharCode(   ( cc >>> 12 )          | 0xE0 );
                c2 = String.fromCharCode( ( ( cc >>>  6 ) & 0x3F ) | 0x80 );
                c3 = String.fromCharCode(   ( cc          & 0x3F ) | 0x80 );
                ret.push( c1, c2, c3 );
            }
        } else {
            ret.push(str[i]);
        }
    }
    return ret.join('');
};

function download(html, width, height, fileName) {
    html = window.toUTF8(html)
    let imgSrc = 'data:image/svg+xml;base64,' + btoa(html)
    let img = new Image()
    img.onload = () => {
        let canvas = document.createElement('CANVAS')
        canvas.width = width
        canvas.height = height
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        let myctx = canvas.getContext("2d")
        myctx.width = width
        myctx.height = height

        myctx.fillStyle = '#fff'
        myctx.fillRect(0, 0, width, height)
        myctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
        canvas.toBlob(blob => {
            saveAs(blob, fileName + '.png')
        })
    }
    img.src = imgSrc
}

export {draw, download}
