const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const titulo = document.querySelector('#titulo')
const cover = document.querySelector('#cover')

const songs = [
  { name: 'im so blue for you'},
  { name: 'Illegal'},
  { name: 'Orgulho'},
  { name: 'See You Again'},
  { name: 'Hidden in the Sand'},
  { name: 'YOASOBI - Racing Into The Night'},
  { name: 'Touch'},
  { name: 'Ray Charles - Hit The Road Jack (Official Lyrics Video)'},
  { name: 'Nada Vai Me Colocar Pra Baixo [MUM239i4o9c]'},
  { name: 'Mili - Hero'},
  { name: 'Maça'},
  { name: 'lavender'},
]

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    titulo.innerText = song.name
    audio.src = `music/${song.name}.mp3`
    cover.src = `images/${song.name}.jpg`

    musicContainer.style.backgroundColor = song.color
    musicContainer.style.color = song.textColor
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