/* const player = document.querySelector('video')
const player_button = document.querySelector('.player__button')

let playing = false

function togglePlay(){
    if(!playing){
        player.play()
        playing = !playing
    }else{
        player.pause()
        playing = !playing
    }
}

player_button.addEventListener('click', togglePlay)  */


// GET OUR ELEMENTS
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')



// BUILD OUR FUNCTIONS

function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

function updateButton(){
    const icon = this.paused ? '▶' : '▮▮'
    toggle.textContent = icon
    console.log('Updating the button')
}

function skip(){
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value
}

function handleProgressBar(){
    console.log(this.value)
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

//HOOK UP THE EVENT LISTENERS
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgressBar)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
progressBar.addEventListener('change', handleProgressBar)
progress.addEventListener('click', scrub)