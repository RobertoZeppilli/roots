/** @type {HTMLCanvasElement} */
//this @type up here gives me auto-complete when searching canvas API built in methods

const draw = document.getElementById('draw')
const container = document.getElementById('container')

const box = document.getElementById('box')
const message = document.getElementById('message')

const r = document.getElementById('r')
const z = document.getElementById('z')

const aboutButton = document.getElementById('about')
const aboutPage = document.getElementById('about-page')

const worksButton = document.getElementById('works')
const worksPage = document.getElementById('works-page')

const skillsButton = document.getElementById('skills')
const skillsPage = document.getElementById('skills-page')

const carousel = document.getElementById('carousel')

let close = document.getElementsByClassName('close')
// console.log(close[0])

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let works = [
    {
        workName: "Bool 'N' Roll",
        workImage: 'boolnroll.jpg',

    },
    {
        workName: 'Todoodle',
        workImage: 'todoodle.jpg',

    },
    {
        workName: 'Boolflix',
        workImage: 'boolflix.png',

    },
    {
        workName: 'WhatsApp Web',
        workImage: 'whatsapp_web.png',
    },
    {
        workName: 'Spotify Web',
        workImage: 'spotify_web.jpg',

    },

]



works.forEach(work => {
    const { workName, workImage } = work
    let workContainer = document.createElement('div')
    workContainer.classList.add('work-container')
    carousel.appendChild(workContainer)
    let imgTitle = document.createElement('h3')
    workContainer.appendChild(imgTitle)
    imgTitle.innerHTML = `${workName}`
    let img = document.createElement('img')
    workContainer.appendChild(img)
    img.setAttribute('src', `images/${workImage}`)
    img.setAttribute('alt', `${workName}`)
})


let aboutBtnMeasures = aboutButton.getBoundingClientRect()
let aboutObj = {
    x: aboutBtnMeasures.left,
    y: aboutBtnMeasures.top,
    width: aboutBtnMeasures.width,
    height: aboutBtnMeasures.height
}

let worksBtnMeasures = worksButton.getBoundingClientRect()
let worksObj = {
    x: worksBtnMeasures.left,
    y: worksBtnMeasures.top,
    width: worksBtnMeasures.width,
    height: worksBtnMeasures.height
}

let skillsBtnMeasures = skillsButton.getBoundingClientRect()
let skillsObj = {
    x: skillsBtnMeasures.left,
    y: skillsBtnMeasures.top,
    width: skillsBtnMeasures.width,
    height: skillsBtnMeasures.height
}

let drawing = false
let aboutToggle = false
let worksToggle = false
let skillsToggle = false

// let worksBtnPresence = false
// let skillsBtnPresence = false
// let aboutBtnPresence = false
class Root {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.speedX = Math.random() * 4 - 2
        this.speedY = Math.random() * 4 - 2
        this.size = Math.random() * 1 + 5
        this.maxSize = Math.random() * 20 + 5
        this.sizeSpeed = Math.random() * 0.2 + 0.05
        this.angleX = Math.random() * 6.2
        this.angleY = Math.random() * 7.43
        this.angleXSpeed = Math.random() * 0.6 - 0.3
        this.angleYSpeed = Math.random() * 0.2 - 0.8
        this.lightness = 90
        this.saturation = Math.random() * 100
        this.hue = Math.random() * 155 + 0
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

        if (this.x < aboutObj.x + aboutObj.width
            &&
            this.x + this.size > aboutObj.x
            &&
            this.y < aboutObj.y + aboutObj.height
            &&
            this.y + this.size > aboutObj.y) {
            aboutButton.classList.add('white-btn')
            // aboutBtnPresence = true
        }

        if (this.x < worksObj.x + worksObj.width
            &&
            this.x + this.size > worksObj.x
            &&
            this.y < worksObj.y + worksObj.height
            &&
            this.y + this.size > worksObj.y) {
            worksButton.classList.add('white-btn')
            // worksBtnPresence = true

        }

        if (this.x < skillsObj.x + skillsObj.width
            &&
            this.x + this.size > skillsObj.x
            &&
            this.y < skillsObj.y + skillsObj.height
            &&
            this.y + this.size > skillsObj.y) {
            skillsButton.classList.add('white-btn')
            // skillsBtnPresence = true

        }

        // if(skillsBtnPresence && worksBtnPresence && aboutBtnPresence) {
        //     message.classList.add('none')
        // }
    }
}


// events

draw.addEventListener('click', () => {
    drawing = !drawing
    if (!drawing) {
        draw.innerText = 'disegna'
    } else {
        draw.innerText = 'stop'
    }
})

draw.addEventListener('mouseover', () => {
    if (!drawing) {
        box.classList.remove('none')
    }
})
draw.addEventListener('mouseout', () => {
    box.classList.add('none')
})

aboutButton.addEventListener('click', () => {
    aboutToggle = true
    if (aboutToggle) {
        aboutPage.classList.remove('none')
    }
})

worksButton.addEventListener('click', () => {
    worksToggle = true
    if (worksToggle) {
        worksPage.classList.remove('none')
    }
})
skillsButton.addEventListener('click', () => {
    skillsToggle = true
    if (skillsToggle) {
        skillsPage.classList.remove('none')
    }
})

for (let item of close) {
    item.addEventListener('click', () => {
        if (aboutToggle) {
            aboutToggle = false
        }

        if (worksToggle) {
            worksToggle = false
        }

        if (skillsToggle) {
            skillsToggle = false
        }
        aboutPage.classList.add('none')
        worksPage.classList.add('none')
        skillsPage.classList.add('none')
    })
}


window.addEventListener('mousemove', (e) => {
    if (drawing) {

        //this resize event is to fix the roots size on screen based on screen size, don't know if it's right but it seems to work.
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            ctx.clearRect(this.x, this.y, canvas.width, canvas.height);

            // skillsButton.classList.remove('white-btn')
            // skillsBtnPresence = false

            // worksButton.classList.remove('white-btn')
            // worksBtnPresence = false

            // aboutButton.classList.remove('white-btn')
            // aboutBtnPresence = false
        })
        //this resize event is to fix the roots size on screen based on screen size, don't know if it's right but it seems to work.

        for (let i = 0; i < 5; i++) {
            let root = new Root(e.x, e.y)
            root.update()
        }
    }
})


