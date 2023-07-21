const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const appPlayer = {
    songs: [
        {
            id: 0,
            name: 'Thanh Ti',
            singer: 'Đẳng Thập Ma Quân',
            path: './assets/music/thanh-ti.mp3',
            image: '/musicPlayer/assets/img/thanh-ti-avartar.jpg'
        },
        {
            id: 1,
            name: 'Cánh đồng yêu thương',
            singer: 'Trung Quân',
            path: './assets/music/canh-dong-yeu-thuong.mp3',
            image: '/musicPlayer/assets/img/canh-dong-yeu-thuong-avartar.jpg'
        },
        {
            id: 2,
            name: 'Loving you sunny',
            singer: 'Đen Vâu x Kimmese',
            path: './assets/music/loving-you-sunny.mp3',
            image: '/musicPlayer/assets/img/loving-you-sunny-avartar.jpg'
        },
        {
            id: 3,
            name: 'Chớ hỏi biệt ly x Ciaga',
            singer: 'Chỉ Tiêm Tiếu',
            path: './assets/music/cho-hoi-biet-ly-and-ciaga.mp3',
            image: '/musicPlayer/assets/img/cho-hoi-biet-ly-avartar.jpg'
        },
        {
            id: 4,
            name: 'Wolves',
            singer: 'Selena Gomez',
            path: './assets/music/wolves.mp3',
            image: '/musicPlayer/assets/img/wolves-avartar.jpg'
        },
        {
            id: 5,
            name: 'Close to the sun',
            singer: 'TheFatRat & Anjulie',
            path: './assets/music/close-to-the-sun.mp3',
            image: '/musicPlayer/assets/img/close-to-the-sun-avartar.jpg'
        },
        {
            id: 6,
            name: 'We\'ll meet again',
            singer: 'TheFatRat & Laura Brehm',
            path: './assets/music/well-meet-again.mp3',
            image: '/musicPlayer/assets/img/we-will-meet-again-avarta.jpg'
        },
        {
            id: 7,
            name: 'Light it up x Rise',
            singer: 'NCS',
            path: './assets/music/light-it-up-x-rise.mp3',
            image: '/musicPlayer/assets/img/song-icon.jpg'
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

    loadCurrentSong: function(currentIndexSong){
        $('.header .current-song').innerHTML = `${this.songs[currentIndexSong].name}`;
        $('.cd__thumb').style.backgroundImage = `url('${this.songs[currentIndexSong].image}')`;
        $('.dashboard audio').src = `${this.songs[currentIndexSong].path}`;
    },

    start: function(){
        const app = this;
        app.renderSong();
        app.handleScroll();
        app.loadCurrentSong(0);

        $('.fa-circle-play').onclick = function(){
            $('.controls .i')
            $('.dashboard').classList.add('playing');
            $('audio').play();
        }
        $('.fa-circle-pause').onclick = function(){
            $('.dashboard').classList.remove('playing');
            $('audio').pause();
        }
        var listSongs = $$('.song');
        
        listSongs.forEach(function(song, indexSong){
            song.onclick = function(){
                app.loadCurrentSong(indexSong);
                $('.dashboard').classList.add('playing');
                $('audio').play();
            }
        })
    }
}

appPlayer.start();