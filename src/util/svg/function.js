export default {
    idIndex: 0,
    maxColumn: 1,
    maxRow: 0,
    getId() {
        return '' + this.idIndex++
    },
    getNode(node, id) {
        if (node.id === id) {
            return node
        }
        if (node.children && node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                let n = this.getNode(node.children[i], id)
                if (n) {
                    return n
                }
            }
        } else {
        }
        return null
    },
    convert(content) {
        this.maxRow = 0
        this.maxColumn = 0
        this._yIndex = 0
        let arr = content.split('\n')
        arr = arr.filter(line => line.replace(/\s/g, '').length)
        let arr2 = []
        for (let item of arr) {
            arr2.push({
                id: this.getId(),
                level: item.match(/^\s*/)[0].length / 4,
                content: item.replace(/^\s*\*\s*/, '')
            })
        }
        let root = null
        // let lastLevel = 0
        let stack = []
        for (let i = 0; i < arr2.length; i++) {
            let item = arr2[i]
            if (item.level === 0) {
                root = {
                    id: item.id,
                    value: item.content,
                    children: []
                }
            } else {
                let lastItem = arr2[i - 1]
                if (item.level > lastItem.level) {
                    if (item.level > this.maxColumn) {
                        this.maxColumn = item.level
                    }
                    stack.push(lastItem)
                    let top = stack[stack.length - 1]
                    item.parent = top.id
                } else if (item.level === lastItem.level) {
                    let top = stack[stack.length - 1]
                    item.parent = top.id
                } else {
                    while (stack.length > item.level) {
                        stack.pop()
                    }
                    let top = stack[stack.length - 1]
                    item.parent = top.id
                }
            }
        }

        for (let i = 0; i < arr2.length; i++) {
            let item = arr2[i]
            if (i > 0) {
                let node = this.getNode(root, item.parent)
                if (node) {
                    node.children.push({
                        id: item.id,
                        value: item.content,
                        children: []
                    })
                }
            }
        }
        return root
    },
    calculate(node, x) {
        if (!node) {
            return
        }
        let padding = 16
        let width = 140
        let height = 40
        let offsetX = 32
        let offsetY = 16

        node._width = width
        node._height = height
        // let y = 0
        if (node.children && node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                this.calculate(node.children[i], x + 1)
            }
            node._y = (node.children[0]._y + node.children[node.children.length - 1]._y) / 2
        } else {
            node._y = this._yIndex * (height + offsetY) + padding
            this._yIndex++
        }
        node._x = x * (width + offsetX) + padding
    },
    getJson(content) {
        this.data = this.convert(content)
        this.calculate(this.data, 0)
        let shapes = this._draw(this.data, [])
        if (!shapes) {
            return
        }
        let json = {
            version: '1.0.0',
            shapes: shapes
        }
        return json
    },
    _draw(node, retArr) {
        let RECT_STYLE = {
            strokeColor: '#000',
            strokeWidth: 1,
            fillColor: 'none'
        }
        if (!node) {
            return
        }
        if (node.value) { // hack
            retArr.push({
                type: 'rect',
                x: node._x,
                y: node._y,
                width: node._width,
                height: node._height,
                style: RECT_STYLE,
                title: node.value
            })
        }
        retArr.push({
            type: 'text',
            text: node.value,
            x: node._x + node._width / 2,
            y: node._y + node._height / 2,
            width: node._width,
            height: node._height,
            style: {
                textAnchor: 'middle',
                dominantBaseline: 'middle'
            }
        })
        if (node.children && node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                this._draw(node.children[i], retArr)
                // line
                let pt0 = {
                    x: node._x + node._width,
                    y: node._y + node._height / 2
                }
                let pt3 = {
                    x: node.children[i]._x,
                    y: node.children[i]._y + node._height / 2
                }
                let pt1 = {
                    x: (pt0.x + pt3.x) / 2,
                    y: pt0.y
                }
                let pt2 = {
                    x: (pt0.x + pt3.x) / 2,
                    y: pt3.y
                }
                let LINE_STYLE = {
                    strokeColor: '#000',
                    strokeWidth: 1
                }
                retArr.push({
                    type: 'line',
                    x1: pt0.x,
                    y1: pt0.y,
                    x2: pt1.x,
                    y2: pt1.y,
                    style: LINE_STYLE
                })
                retArr.push({
                    type: 'line',
                    x1: pt1.x,
                    y1: pt1.y,
                    x2: pt2.x,
                    y2: pt2.y,
                    style: LINE_STYLE
                })
                retArr.push({
                    type: 'line',
                    x1: pt2.x,
                    y1: pt2.y,
                    x2: pt3.x,
                    y2: pt3.y,
                    style: LINE_STYLE
                })
            }
        } else {
            this.maxRow++
        }
        return retArr
    }
}
