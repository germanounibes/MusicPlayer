const musicContainer = document.querySelector('.music-container')
const body = document.body
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const titulo = document.querySelector('#titulo')
const cover = document.querySelector('#cover')
const tituloPrev = document.querySelector('#tituloPrev')
const coverPrev = document.querySelector('#coverPrev')
const tituloNext = document.querySelector('#tituloNext')
const coverNext = document.querySelector('#coverNext')

const songs = [
    /*feito*/{ name: 'im so blue for you', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    /*feito*/{ name: 'Illegal', gradient: 'linear-gradient( rgba(40, 36, 0, 0.8), rgb(146, 0, 0))' },
    /*feito*/{ name: 'Orgulho', gradient: 'linear-gradient( rgba(40, 0, 0, 0.8), rgba(146, 95, 0, 0.77))' },
    { name: 'See You Again', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Hidden in the Sand', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Racing Into The Night', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Touch', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Hit The Road Jack', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Mili - Hero', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'Maça', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
    { name: 'lavender', gradient: 'linear-gradient( rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 1))' },
]

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    let prevSong = songIndex - 1
    let nextSong = songIndex + 1
    titulo.innerText = song.name
    audio.src = `music/${song.name}.mp3`
    cover.src = `images/${song.name}.jpg`

    tituloPrev.innerText = song.name
    coverPrev.src = `images/${song.name}.jpg`

    tituloNext.innerText = song.name
    coverNext.src = `images/${song.name}.jpg`

    body.style.backgroundImage = song.gradient;
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

function prevSong() {
    songIndex--
    if (songIndex < 0) songIndex = songs.length - 1
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) songIndex = 0
    loadSong(songs[songIndex])
    playSong()
}

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

progressContainer.addEventListener('click', setProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}