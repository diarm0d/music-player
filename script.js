const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const backButton = document.getElementById('prev');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progess = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Music
const song = [
    {
        name: 'mac1',
        displayName: 'Mac Miller Tribute',
        artist: ' Mac Miller',
    },
    {
        name: 'mac2',
        displayName: 'Miller Type Track',
        artist: 'Mac Miller',
    },
    {
        name: 'mac3',
        displayName: 'Mac Lofi Beat',
        artist: 'Mac Miller',
    },
    {
        name: 'mac4',
        displayName: 'Mac Miller Mac',
        artist: 'Mac Miller',
    },
    {
        name: 'mac5',
        displayName: 'RIP 27',
        artist: 'Mac Miller',
    }
];
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play(); 
}

// Pause
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length -1;
    }
    loadSong(song[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > song.length -1) {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
}


// On load - select first song
loadSong(song[songIndex]);

// Update progress bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        } 
        // Delay switching during element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent= `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate display for current time
         const currentMinutes = Math.floor(currentTime / 60);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
             currentSeconds = `0${currentSeconds}`;
         } 
         currentTimeEl.textContent= `${currentMinutes}:${currentSeconds}`;
   }
}

// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Play or Pause event listener
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextButton.addEventListener('click', nextSong);
backButton.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);