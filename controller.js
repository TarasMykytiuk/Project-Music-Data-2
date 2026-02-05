export default class Controller {
    constructor(view, dataModel, model) {
        this.view = view;
        this.dataModel = dataModel;
        this.model = model;
    }

    init() {
        this.view.addOptions(this.dataModel.getUserIds());
        this.view.bindUsrSelection((usrId) => this.handleUsrSelection(usrId));
    }

    handleUsrSelection(usrId) {
        const listenEvents = this.dataModel.getListenEvents(usrId);
        this.view.resetTable(listenEvents, usrId);
        this.model.processListenEvents(listenEvents, (songId) => this.dataModel.getSong(songId));
        if (listenEvents.length == 0) { return }
        const mostSongByCount = this.model.getSortedItems("songs", "totalCount")[0];
        const mostSongByTime = this.model.getSortedItems("songs", "totalTime")[0];
        const mostArtistByCount = this.model.getSortedItems("artists", "totalCount")[0];
        const mostArtistByTime = this.model.getSortedItems("artists", "totalTime")[0];
        const mostFriSongByCount = this.model.getSortedItems("songs", "friNightCount")[0];
        const mostFriSongByTime = this.model.getSortedItems("songs", "friNightDuration")[0];
        const longestStreak = this.model.getSortedItems("songs", "maxSteak")[0];
        const everyDaySongs = this.model.getEveryDaySongs();
        const sortedGenres = this.model.getSortedItems("genres", "totalCount");
        this.view.addQuestionRow("Most listened song (count)", mostSongByCount.artist + " - " + mostSongByCount.title);
        this.view.addQuestionRow("Most listened song (time)", mostSongByTime.artist + " - " + mostSongByTime.title);
        this.view.addQuestionRow("Most listened artist (count)", mostArtistByCount.artist);
        this.view.addQuestionRow("Most listened artist (time)", mostArtistByTime.artist);
        if (mostFriSongByCount.friNightCount != 0) {
            this.view.addQuestionRow("Friday night song (count)", mostFriSongByCount.artist + " - " + mostFriSongByCount.title);
            this.view.addQuestionRow("Friday night song (time)", mostFriSongByTime.artist + " - " + mostFriSongByTime.title);
        }
        this.view.addQuestionRow("Longest streak song", longestStreak.artist + " - " + longestStreak.title + " (length: " + longestStreak.maxSteak + ")");
        if (everyDaySongs.length != 0) {
            const everyDaySongsAnswer = everyDaySongs
                .map((song) => { return song.artist + " - " + song.title })
                .join(", ");
            this.view.addQuestionRow("Every day songs", everyDaySongsAnswer);
        }
        let genresQuestion = sortedGenres.length == 1 ? "Top genre" : "Top two genres";
        const genresAnswer = sortedGenres
            .map((item) => item.genre)
            .slice(0, 3)
            .join(", ");
        this.view.addQuestionRow(genresQuestion, genresAnswer);
    }
}