
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dashboard = $('.dashboard');
const cd = $('.dashboard .cd');
const cdThumb = $('.dashboard .cd .cd__thumb');
const nameSongPlaying = $('.dashboard .song-playing .name-current-song');
const nameSingerPlaying = $('.dashboard .song-playing .name-singer');
const playSongBtn = $('.dashboard .controls .controls__play');
const repeatSongBtn = $('.dashboard .controls .fa-rotate-right');
const backSongBtn = $('.dashboard .controls .fa-backward-step');
const nextSongBtn = $('.dashboard .controls .fa-forward-step');
const randomSongBtn = $('.dashboard .controls .fa-shuffle');
const timeSongInput = $('.dashboard #progress');
const audio = $('.dashboard audio');

const appPlayer = {
    currentIndexSong: 0,
    isPlaying: false,
    isRepeatSong: false,
    isRandomSong: false,

    songs: [
        {
            name: 'Thanh Ti',
            singer: 'Đẳng Thập Ma Quân',
            path: './assets/music/thanh-ti.mp3',
            image: './assets/img/thanh-ti.jpg'
        },
        {
            name: 'Cánh Đồng Yêu Thương',
            singer: 'Trung Quân',
            path: './assets/music/canh-dong-yeu-thuong.mp3',
            image: './assets/img/canh-dong-yeu-thuong.jpg'
        },
        {
            name: 'Loving You Sunny',
            singer: 'Đen Vâu x Kimmese',
            path: './assets/music/loving-you-sunny.mp3',
            image: './assets/img/loving-you-sunny.jpg'
        },
        {
            name: 'Chớ Hỏi Biệt Ly x Ciaga',
            singer: 'Chỉ Tiêm Tiếu',
            path: './assets/music/cho-hoi-biet-ly-and-ciaga.mp3',
            image: './assets/img/cho-hoi-biet-ly-and-ciaga.jpg'
        },
        {
            name: 'Hồng Nhan Xưa',
            singer: 'Lưu Đào',
            path: './assets/music/hong-nhan-xua.mp3',
            image: './assets/img/hong-nhan-xua.jpg'
        },
        {
            name: 'Đáy Biển',
            singer: 'Nhất Chi Lựu Liên',
            path: './assets/music/day-bien.mp3',
            image: './assets/img/day-bien.jpg'
        },
        {
            name: 'Wolves',
            singer: 'Selena Gomez',
            path: './assets/music/wolves.mp3',
            image: './assets/img/wolves.jpg'
        },
        {
            name: 'Close To The Sun',
            singer: 'TheFatRat & Anjulie',
            path: './assets/music/close-to-the-sun.mp3',
            image: './assets/img/close-to-the-sun.jpg'
        },
        {
            name: 'We\'ll Meet Again',
            singer: 'TheFatRat & Laura Brehm',
            path: './assets/music/well-meet-again.mp3',
            image: './assets/img/we-will-meet-again.jpg'
        },
        {
            name: 'Light It Up & Rise',
            singer: 'NCS',
            path: './assets/music/light-it-up-x-rise.mp3',
            image: './assets/img/default-song-icon.jpg'
        },
    ],

    renderSong: function(){
        var html = this.songs.map(function(song, index){
            return `
                <div class="song data${index}">
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
        
        if($('.play-list .active'))
            $('.play-list .active').classList.remove('active');
        $(`.play-list .data${this.currentIndexSong}`).classList.add('active');
    },
    
    handleScroll: function(){
        const player = $('.player');
        const cdWidth = cd.offsetWidth;
        // zoom cdThumb when scroll play-list
        player.onscroll = function(){
            const scrollTop = player.scrollY || player.scrollTop;
            let newCdWidth = cdWidth - scrollTop;
            newCdWidth = newCdWidth < 0 ? 0 : newCdWidth;

            cd.style.width = newCdWidth + 'px';
            cd.style.height = newCdWidth + 'px';
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },

    nextSong: function(){
        if(this.currentIndexSong < this.songs.length - 1)
            this.currentIndexSong++;
        else
            this.currentIndexSong = 0;
        this.loadCurrentSong();
    },

    backSong: function(){
        if(this.currentIndexSong > 0)
            this.currentIndexSong--;
        else
            this.currentIndexSong = this.songs.length - 1;
        this.loadCurrentSong();
    },

    randomSong: function(){
        let newIndexSong;
        do{
            newIndexSong = Math.floor(Math.random() * this.songs.length);
        } while (newIndexSong === this.currentIndexSong);
        this.currentIndexSong = newIndexSong;
        this.loadCurrentSong();
    },

    onRepeatPlaying: function(){
        if(this.isRepeatSong){
            audio.loop = false;
            this.isRepeatSong = false;
            repeatSongBtn.style.color = '#8400ff';
        }else{
            audio.loop = true;
            this.isRepeatSong = true;
            repeatSongBtn.style.color = '#ff0000';
            if(this.isRandomSong){
                this.isRandomSong = false;
                randomSongBtn.style.color = '#8400ff';
            }
        }
    },

    onRandomPlaying: function(){
        if(this.isRandomSong){
            randomSongBtn.style.color = '#8400ff';
            this.isRandomSong = false;
        }else{
            randomSongBtn.style.color = '#ff0000';
            this.isRandomSong = true;
            if(this.isRepeatSong){
                audio.loop = false;
                this.isRepeatSong = false;
                repeatSongBtn.style.color = '#8400ff';
            }
        }
    },

    onPlayingSong: function(){
        // animation rotate for cdThumb
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

        // Play or pause music when click on playSongBtn
        playSongBtn.onclick = function(){
            if(this.isPlaying){
                audio.pause();
                this.isPlaying = false;
            }else{
                audio.play();
                this.isPlaying = true;
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
        
        // Auto update time of song playing
        audio.ontimeupdate = function(){
            if(audio.duration > 0){
                timeSongInput.value = Math.floor((audio.currentTime / audio.duration) * 100);
            }else{
                timeSongInput.value = 0;
            }
        };

        // choose any position in song to playing
        timeSongInput.onchange = function(){
            audio.currentTime = Math.floor((timeSongInput.value * audio.duration) / 100);
            audio.play();
        };
    },

    handleEvents: function(){
        const app = this;
        const listSongs = $$('.play-list .song');

        app.onPlayingSong();

        // Turn on song repeat mode
        repeatSongBtn.onclick = function(){
            app.onRepeatPlaying();
        };
        // Turn on song random mode
        randomSongBtn.onclick = function(){
            app.onRandomPlaying();
        };
        // Skip to next song
        nextSongBtn.onclick = function(){
            app.nextSong();
        };
        // Skip to previous song
        backSongBtn.onclick = function(){
            app.backSong();
        };

        // Choose song play mode when it ended
        audio.addEventListener('ended', function(){
            if(app.isRandomSong)
                app.randomSong();
            else
                app.nextSong();
            audio.play();
        });

        // Add event play song when click it
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