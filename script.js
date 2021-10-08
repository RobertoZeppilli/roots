/** @type {HTMLCanvasElement} */
//this @type up here gives me auto-complete when searching canvas API built in methods

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let drawing = false

class Root {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.speedX = Math.random() * 4 - 2
        this.speedY = Math.random() * 4 - 2
        this.size = Math.random() * 10 + 5
        this.maxSize = Math.random() * 25 + 5
        this.sizeSpeed = Math.random() * 0.2 + 0.05
        this.angleX = Math.random() * 6.2
        this.angleY = Math.random() * 7.43
        this.angleXSpeed = Math.random() * 0.6 - 0.3
        this.angleYSpeed = Math.random() * 0.2 - 0.8
        this.lightness = 90
        this.saturation = Math.random() * 90
        this.hue = Math.random() * 255
    }

    update() {
        this.x += this.speedX + Math.sin(this.angleX)
        this.y += this.speedY + Math.sin(this.angleY)
        this.size += this.sizeSpeed
        this.angleX += this.angleXSpeed
        this.angleY += this.angleYSpeed
        this.lightness -= 0.1
        if (this.size < this.maxSize) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
            ctx.fill()
            ctx.stroke()
            ctx.strokeStyle = 'transparent'
            requestAnimationFrame(this.update.bind(this))
        }
    }
}


// events
window.addEventListener('mouseup', () => {
    drawing = false
})


window.addEventListener('mousedown', () => {
    drawing = true
})

window.addEventListener('mousemove', (e) => {
    if (drawing) {

        //this resize event is to fix the roots size on screen based on screen size, don't know if it's right but it seems to work.
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            ctx.clearRect(this.x, this.y, canvas.width, canvas.height);
        })
        //this resize event is to fix the roots size on screen based on screen size, don't know if it's right but it seems to work.

        for (let i = 0; i < 5; i++) {
            let root = new Root(e.x, e.y)
            root.update()
        }
    }
})


