const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const appPlayer = {
    songs: [
        {
            name: 'Thanh Ti',
            singer: 'Đẳng Thập Ma Quân',
            path: './assets/music/thanh-ti.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'Cánh đồng yêu thương',
            singer: 'Trung Quân',
            path: './assets/music/canh-dong-yeu-thuong.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'Loving you sunny',
            singer: 'Đen Vâu x Kimmese',
            path: './assets/music/loving-you-sunny.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'Chớ hỏi biệt ly x Ciaga',
            singer: 'Chỉ Tiêm Tiếu',
            path: './assets/music/cho-hoi-biet-ly-and-ciaga.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'Wolves',
            singer: 'Selena Gomez',
            path: './assets/music/wolves.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'Close to the sun',
            singer: 'TheFatRat & Anjulie',
            path: './assets/music/close-to-the-sun.mp3',
            image: './assets/img/song-icon.jpg'
        },
        {
            name: 'We\'ll meet again',
            singer: 'TheFatRat & Laura Brehm',
            path: './assets/music/well-meet-again.mp3',
            image: './assets/img/song-icon.jpg'
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
                    <div class="song__avatar"><img src="./assets/img/song-icon.jpg" alt=""></div>
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
        }
    },

    start: function(){
        this.renderSong();
        this.handleScroll();
    }
}

appPlayer.start();