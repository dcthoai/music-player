
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dashboard = $('.dashboard');
const cdThumb = $('.dashboard .cd .cd__thumb');
const nameSongPlaying = $('.dashboard .song-playing .name-current-song');
const nameSingerPlaying = $('.dashboard .song-playing .name-singer');
const playSongBtn = $('.dashboard .controls .controls__play');
const loopSongBtn = $('.dashboard .controls .fa-rotate-right');
const backSongBtn = $('.dashboard .controls .fa-backward-step');
const nextSongBtn = $('.dashboard .controls .fa-forward-step');
const shuffleSongBtn = $('.dashboard .controls .fa-shuffle');
const timeSongInput = $('.dashboard #progress');
const audio = $('.dashboard audio');

const appPlayer = {
    currentIndexSong: 0,
    isPlaying: false,
    isLoopSong: false,
    isRandomSong: false,

    songs: [
        {
            name: 'Thanh Ti',
            singer: 'Đẳng Thập Ma Quân',
            path: './assets/music/thanh-ti.mp3',
            image: './assets/img/thanh-ti-avartar.jpg'
        },
        {
            name: 'Cánh Đồng Yêu Thương',
            singer: 'Trung Quân',
            path: './assets/music/canh-dong-yeu-thuong.mp3',
            image: './assets/img/canh-dong-yeu-thuong-avartar.jpg'
        },
        {
            name: 'Loving You Sunny',
            singer: 'Đen Vâu x Kimmese',
            path: './assets/music/loving-you-sunny.mp3',
            image: './assets/img/loving-you-sunny-avartar.jpg'
        },
        {
            name: 'Chớ Hỏi Biệt Ly x Ciaga',
            singer: 'Chỉ Tiêm Tiếu',
            path: './assets/music/cho-hoi-biet-ly-and-ciaga.mp3',
            image: './assets/img/cho-hoi-biet-ly-avartar.jpg'
        },
        {
            name: 'Hồng Nhan Xưa',
            singer: 'Lưu Đào',
            path: './assets/music/hong-nhan-xua.mp3',
            image: './assets/img/avatar-hong-nhan-xua.jpg'
        },
        {
            name: 'Đáy Biển',
            singer: 'Nhất Chi Lựu Liên',
            path: './assets/music/day-bien.mp3',
            image: './assets/img/avatar-day-bien.jpg'
        },
        {
            name: 'Wolves',
            singer: 'Selena Gomez',
            path: './assets/music/wolves.mp3',
            image: './assets/img/wolves-avartar.jpg'
        },
        {
            name: 'Close To The Sun',
            singer: 'TheFatRat & Anjulie',
            path: './assets/music/close-to-the-sun.mp3',
            image: './assets/img/close-to-the-sun-avartar.jpg'
        },
        {
            name: 'We\'ll Meet Again',
            singer: 'TheFatRat & Laura Brehm',
            path: './assets/music/well-meet-again.mp3',
            image: './assets/img/we-will-meet-again-avarta.jpg'
        },
        {
            name: 'Light It Up & Rise',
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
    
    loadCurrentSong: function(){
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

    nextSong: function(){
        if(this.currentIndexSong < this.songs.length - 1)
            this.currentIndexSong++;
        else
            this.currentIndexSong = 0;
        this.loadCurrentSong();
        audio.play();
    },

    backSong: function(){
        if(this.currentIndexSong > 0)
            this.currentIndexSong--;
        else
            this.currentIndexSong = this.songs.length - 1;
        this.loadCurrentSong();
        audio.play();
    },

    playRandomSong: function(){
        this.currentIndexSong = Math.floor(Math.random() * this.songs.length);
        this.loadCurrentSong();
        audio.play();
    },

    onLoopPlaying: function(){
        if(this.isLoopSong){
            audio.loop = false;
            this.isLoopSong = false;
            loopSongBtn.style.color = '#8400ff';
        }else{
            audio.loop = true;
            this.isLoopSong = true;
            loopSongBtn.style.color = '#ff0000';
            if(this.isRandomSong){
                this.isRandomSong = false;
                shuffleSongBtn.style.color = '#8400ff';
            }
        }
    },

    onRandomPlaying: function(){
        if(this.isRandomSong){
            shuffleSongBtn.style.color = '#8400ff';
            this.isRandomSong = false;
        }else{
            shuffleSongBtn.style.color = '#ff0000';
            this.isRandomSong = true;
            if(this.isLoopSong){
                this.isLoopSong = false;
                loopSongBtn.style.color = '#8400ff';
            }
        }
    },

    handleEvents: function(){
        const app = this;
        const listSongs = $$('.play-list .song');
        const cdThumbRotate = cdThumb.animate(
            [
                {transform: 'rotate(360deg)'}
            ],  
            {
                duration: 15000,   // 15 seconds
                iterations: Infinity
            }
        )
        cdThumbRotate.pause();

        playSongBtn.onclick = function(){
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
            cdThumbRotate.play();
        };
        audio.onpause = function(){
            dashboard.classList.remove('playing');
            cdThumbRotate.pause();
        };
        
        audio.ontimeupdate = function(){
            if(audio.duration > 0){
                timeSongInput.value = Math.floor((audio.currentTime / audio.duration) * 1000);
            }else{
                timeSongInput.value = 0;
            }
        };

        timeSongInput.onchange = function(){
            audio.currentTime = Math.floor((timeSongInput.value * audio.duration) / 1000);
            audio.play();
        };

        loopSongBtn.onclick = function(){
            app.onLoopPlaying();
        };
        shuffleSongBtn.onclick = function(){
            app.onRandomPlaying();
        };
        
        nextSongBtn.onclick = function(){
            app.nextSong();
        };
        backSongBtn.onclick = function(){
            app.backSong();
        };

        audio.addEventListener('ended', function(){
            if(app.isRandomSong)
                app.playRandomSong();
            else
                app.nextSong();
        });

        listSongs.forEach(function(song, indexSong){
            song.onclick = function(){
                app.currentIndexSong = indexSong;
                app.loadCurrentSong();
                dashboard.classList.add('playing');
                audio.play();
            };
        });
    },

    start: function(){
        this.renderSong();
        this.handleScroll();
        this.loadCurrentSong();
        this.handleEvents();
    }
}

appPlayer.start();