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
        }
        if (shape.style) {
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

export default draw
