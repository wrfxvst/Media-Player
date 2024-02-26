const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');



const music = new Audio();

const songs =  [
    {
        path: 'assets/music/LinkinPark-GivenUp.mp3',
        displayName: 'Given Up',
        cover: 'assets/jpg/GivenUp_LinkinPark.jpg',
        artist: 'Linkin Park',
    },
    {
        path: 'assets/music/LinkinPark-Numb.mp3',
        displayName: 'Numb',
        cover: 'assets/jpg/Numb_LinkinPark.jpg',
        artist: 'Linkin Park',
    },
    {
        path: 'assets/music/NoizeMC-OpenAir.mp3',
        displayName: 'Open Air',
        cover: 'assets/jpg/OpenAir_NoizeMC.jpg',
        artist: 'Noize MC',
    },
    {
        path: 'assets/music/Pomidor-ПоследнийГерой.mp3',
        displayName: 'Последний Герой',
        cover: 'assets/jpg/Pomidor_PosledniyGeroy.jpg',
        artist: 'Проект Помидор',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

var range = document.querySelector('.range');
var rangeNumbers = document.querySelector('.range-numbers');
var rangeNumbersB = document.querySelector('.range-numbers b');
range.oninput = function() {
    rangeNumbersB.innerHTML = range.value + '%';
    music.volume = (range.value / 100);
    rangeNumbers.classList.add('show');

}
range.onkeyup = function() {
    rangeNumbers.classList.remove('show');
}
range.onmouseout = function() {
    rangeNumbers.classList.remove('show');
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

range.value = 50;
music.volume = (range.value / 100);
loadMusic(songs[musicIndex]);