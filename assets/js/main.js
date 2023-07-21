const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const dashboard = $('.dashboard');
const cdThumb = $('.dashboard .cd .cd__thumb');
const audio = $('.dashboard audio');
const nameSongPlaying = $('.dashboard .song-playing .name-current-song');
const nameSingerPlaying = $('.dashboard .song-playing .name-singer');
const playBtn = $('.dashboard .controls .controls__play');
const timeSong = $('#progress');

const appPlayer = {
    currentIndexSong: 0,
    isPlaying: false,

    songs: [
        {
            name: 'Thanh Ti',
            singer: 'Đẳng Thập Ma Quân',
            path: './assets/music/thanh-ti.mp3',
            image: './assets/img/thanh-ti-avartar.jpg'
        },
        {
            name: 'Cánh đồng yêu thương',
            singer: 'Trung Quân',
            path: './assets/music/canh-dong-yeu-thuong.mp3',
            image: './assets/img/canh-dong-yeu-thuong-avartar.jpg'
        },
        {
            name: 'Loving you sunny',
            singer: 'Đen Vâu x Kimmese',
            path: './assets/music/loving-you-sunny.mp3',
            image: './assets/img/loving-you-sunny-avartar.jpg'
        },
        {
            name: 'Chớ hỏi biệt ly x Ciaga',
            singer: 'Chỉ Tiêm Tiếu',
            path: './assets/music/cho-hoi-biet-ly-and-ciaga.mp3',
            image: './assets/img/cho-hoi-biet-ly-avartar.jpg'
        },
        {
            name: 'Wolves',
            singer: 'Selena Gomez',
            path: './assets/music/wolves.mp3',
            image: './assets/img/wolves-avartar.jpg'
        },
        {
            name: 'Close to the sun',
            singer: 'TheFatRat & Anjulie',
            path: './assets/music/close-to-the-sun.mp3',
            image: './assets/img/close-to-the-sun-avartar.jpg'
        },
        {
            name: 'We\'ll meet again',
            singer: 'TheFatRat & Laura Brehm',
            path: './assets/music/well-meet-again.mp3',
            image: './assets/img/we-will-meet-again-avarta.jpg'
        },
        {
            name: 'Light it up x Rise',
            singer: 'NCS',
            path: './assets/music/light-it-up-x-rise.mp3',
            image: './assets/img/song-icon.jpg'
        },
    ],

    renderSong: function(){
        var html = this.songs.map(function(song){
            return `
                <div class="song">
                    <div class="song__avatar"><img src="${song.image}" alt=""></div>
                    <div class="song__info">
                        <div class="song__info-name">${song.name}</div>
                        <div class="song__info-singer">${song.singer}</div>
                    </div>
                    <div class="song__more"><i class="fa-solid fa-ellipsis"></i></div>
                </div>
            `;    
        });
        $('.play-list').innerHTML = html.join('');
    },
    
    getCurrentSong: function(){
        nameSongPlaying.innerHTML = `${this.songs[this.currentIndexSong].name}`;
        nameSingerPlaying.innerHTML = `${this.songs[this.currentIndexSong].singer}`;
        cdThumb.style.backgroundImage = `url('${this.songs[this.currentIndexSong].image}')`;
        audio.src = `${this.songs[this.currentIndexSong].path}`;
    },
    
    handleScroll: function(){
        const cdWidth = $('.dashboard .cd').offsetWidth;
        const player = $('.player');
        const cdThumb = $('.cd');

        player.onscroll = function(){
            const scrollTop = player.scrollY || player.scrollTop;
            var newCdWidth = cdWidth - scrollTop;
            newCdWidth = newCdWidth < 0 ? 0 : newCdWidth;
            cdThumb.style.width = newCdWidth + 'px';
            cdThumb.style.height = newCdWidth + 'px';
            cdThumb.style.opacity = newCdWidth / cdWidth;
        }
    },

    handleEvents: function(){
        const app = this;
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();
                app.isPlaying = false;
            }else{
                audio.play();
                app.isPlaying = true;
            }
        };
        audio.onplay = function(){
            dashboard.classList.add('playing');
            cdThumb.style.animation = 'spinning 10s linear infinite';
        };
        audio.onpause = function(){
            dashboard.classList.remove('playing');
            cdThumb.style.animation = 'none';
        };
        
        audio.ontimeupdate = function(){
            var currentTimeSong = audio.currentTime;
            timeSong.value = currentTimeSong;
        }

        const listSongs = $$('.song');
        listSongs.forEach(function(song, indexSong){
            song.onclick = function(){
                app.currentIndexSong = indexSong;
                app.getCurrentSong();
                dashboard.classList.add('playing');
                audio.play();
            };
        });
    },

    start: function(){
        const app = this;
        app.renderSong();
        app.handleScroll();
        app.getCurrentSong();
        app.handleEvents();
        
    }
}

appPlayer.start();