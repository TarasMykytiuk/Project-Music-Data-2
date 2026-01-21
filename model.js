export default class Model {
    #usrSongs
    #usrArtists
    #usrListenDates
    #usrGenres
    constructor() {
        this.#usrSongs = {};
        this.#usrArtists = {};
        this.#usrListenDates = new Set();
        this.#usrGenres = {};
    }

    processListenEvents(listenEvents, getSong) {
        if (!listenEvents.length) { return [] }
        this.clearUsrData();
        let longesStreakSong = {};
        let prevSong = [];
        listenEvents.forEach(listenEvent => {
            const song = getSong(listenEvent.song_id);
            //every day song part//
            const date = listenEvent.timestamp.substring(0, 10);
            this.#usrListenDates.add(date);
            //every day song part//
            //songs statistics//
            if (!this.#usrSongs[listenEvent.song_id]) {
                this.#usrSongs[listenEvent.song_id] = {
                    id: listenEvent.song_id,
                    artist: song.artist,
                    title: song.title,
                    totalCount: 1,
                    totalTime: song.duration_seconds,
                    friNightCount: 0,
                    friNightDuration: 0,
                    maxSteak: 1,
                    currentStreak: 1,
                    dates: new Set(),
                    genre: song.genre
                }
            } else {
                this.#usrSongs[listenEvent.song_id].totalTime += song.duration_seconds;
                this.#usrSongs[listenEvent.song_id].totalCount += 1;
            }
            //songs statistics//
            //every day song part//
            this.#usrSongs[listenEvent.song_id].dates.add(date);
            //every day song part//
            //artists statistics//
            if (!this.#usrArtists[song.artist]) {
                this.#usrArtists[song.artist] = {
                    artist: song.artist,
                    totalTime: song.duration_seconds,
                    totalCount: 1,
                }
            } else {
                this.#usrArtists[song.artist].totalTime += song.duration_seconds;
                this.#usrArtists[song.artist].totalCount += 1;
            }
            //artist statistics//
            //streak song part//
            if (prevSong.id === listenEvent.song_id) {
                this.#usrSongs[listenEvent.song_id].currentStreak += 1;
            }
            else {
                this.#usrSongs[listenEvent.song_id].currentStreak = 1;
                prevSong = song;
            }
            if (this.#usrSongs[listenEvent.song_id].currentStreak > this.#usrSongs[listenEvent.song_id].maxSteak) {
                this.#usrSongs[listenEvent.song_id].maxSteak = this.#usrSongs[listenEvent.song_id].currentStreak;
            }
            if (
                !longesStreakSong.maxSteak ||
                longesStreakSong.maxSteak < this.#usrSongs[listenEvent.song_id].maxSteak
            ) {
                longesStreakSong = this.#usrSongs[listenEvent.song_id]
            }
            //streak song part//
            //friday night part//
            if (this.isSongFridayNight(new Date(listenEvent.timestamp), listenEvent.seconds_since_midnight)) {
                this.#usrSongs[listenEvent.song_id].friNightDuration += song.duration_seconds;
                this.#usrSongs[listenEvent.song_id].friNightCount++;
            }
            //friday night part//
            //genres statistics//
            if (this.#usrGenres[song.genre]) { this.#usrGenres[song.genre].totalCount++; }
            else { this.#usrGenres[song.genre] = { genre: song.genre, totalCount: 1 } }
            //genres statistics//
        });
    }

    getSortedItems(type, property) {
        let arr = [];
        switch (type) {
            case "songs": arr = Object.values(this.#usrSongs); break;
            case "artists": arr = Object.values(this.#usrArtists); break;
            case "genres": arr = Object.values(this.#usrGenres); break;
        }
        return arr.sort((a, b) => b[property] - a[property]);
    }

    getEveryDaySongs() {
        return Object.values(this.#usrSongs).filter((song) => song.dates.size == this.#usrListenDates.size);
    }

    isSongFridayNight(date, secAfterMid) {
        const isFridayNight = date.getDay() == 5 && secAfterMid > 61200;
        const isSaturdayMorning = date.getDay() == 6 && secAfterMid < 14400;
        return isFridayNight || isSaturdayMorning;
    }

    clearUsrData() {
        this.#usrSongs = {};
        this.#usrArtists = {};
        this.#usrListenDates = new Set();
        this.#usrGenres = {};
    }
}