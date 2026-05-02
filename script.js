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
  { name: 'im so blue for you', color: '#0000ff', textColor: '#c8c9ff' },
  { name: 'Illegal',            color: '#5c1a18', textColor: '#f88884' },
  { name: 'Orgulho',            color: '#4a2a1a', textColor: '#e7ad8f' },
  { name: 'See You Again',      color: '#555f22', textColor: '#c8ceac' },
  { name: 'Hidden in the Sand', color: '#3b3b3b', textColor: '#ffffff' },
  { name: 'YOASOBI - Racing Into The Night', color: '#ff88d1', textColor: '#003f69' },
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