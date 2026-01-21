import Model from "./model.js";
import DataModel from "./dataModel.js";

const model = new Model();
const dataModel = new DataModel();
const mockListenEvents = [
    { "timestamp": "2024-08-01T00:20:07", "seconds_since_midnight": 1207, "song_id": "song-9" },
    { "timestamp": "2024-08-01T02:00:31", "seconds_since_midnight": 7231, "song_id": "song-8" },
    { "timestamp": "2024-08-03T03:12:51", "seconds_since_midnight": 13971, "song_id": "song-10" },
    { "timestamp": "2024-08-03T05:07:06", "seconds_since_midnight": 8906, "song_id": "song-2" },
    { "timestamp": "2024-08-02T16:24:57", "seconds_since_midnight": 63497, "song_id": "song-1" },
    { "timestamp": "2024-08-01T06:23:20", "seconds_since_midnight": 23000, "song_id": "song-8" },
    { "timestamp": "2024-08-02T11:30:01", "seconds_since_midnight": 9001, "song_id": "song-8" },
    { "timestamp": "2024-08-02T18:30:01", "seconds_since_midnight": 9001, "song_id": "song-8" },
    { "timestamp": "2024-08-04T00:11:29", "seconds_since_midnight": 689, "song_id": "song-10" },
    { "timestamp": "2024-08-01T00:20:07", "seconds_since_midnight": 1207, "song_id": "song-9" },
    { "timestamp": "2024-08-01T16:24:57", "seconds_since_midnight": 63497, "song_id": "song-1" },
    { "timestamp": "2024-08-01T02:00:31", "seconds_since_midnight": 7231, "song_id": "song-8" },
    { "timestamp": "2024-08-02T01:12:36", "seconds_since_midnight": 4356, "song_id": "song-10" },
    { "timestamp": "2024-08-02T01:21:23", "seconds_since_midnight": 4883, "song_id": "song-5" },
    { "timestamp": "2024-08-04T11:18:33", "seconds_since_midnight": 62713, "song_id": "song-1" },
    { "timestamp": "2024-08-02T01:47:41", "seconds_since_midnight": 6461, "song_id": "song-9" },
    { "timestamp": "2024-08-03T16:24:57", "seconds_since_midnight": 63497, "song_id": "song-1" },
    { "timestamp": "2024-08-02T02:18:09", "seconds_since_midnight": 8289, "song_id": "song-4" },
    { "timestamp": "2024-08-05T13:09:36", "seconds_since_midnight": 6376, "song_id": "song-1" },
    { "timestamp": "2024-08-02T03:01:48", "seconds_since_midnight": 10908, "song_id": "song-9" },
    { "timestamp": "2024-08-02T03:49:44", "seconds_since_midnight": 13784, "song_id": "song-9" },
    { "timestamp": "2024-08-06T16:24:57", "seconds_since_midnight": 63497, "song_id": "song-1" },
    { "timestamp": "2024-08-05T07:00:22", "seconds_since_midnight": 25222, "song_id": "song-9" },
    { "timestamp": "2024-08-01T00:19:07", "seconds_since_midnight": 1207, "song_id": "song-9" },
    { "timestamp": "2024-08-03T14:02:23", "seconds_since_midnight": 50543, "song_id": "song-8" },
    { "timestamp": "2024-08-01T00:20:07", "seconds_since_midnight": 1207, "song_id": "song-9" },
    { "timestamp": "2024-08-07T16:24:57", "seconds_since_midnight": 63497, "song_id": "song-1" },
    { "timestamp": "2024-08-01T02:00:31", "seconds_since_midnight": 7231, "song_id": "song-8" },
]
model.processListenEvents(mockListenEvents, (songId) => dataModel.getSong(songId));
test("Each song has unique record", () => {
    expect(model.getSortedItems("songs", "totalCount").length).toEqual(7);
});

test("Each artist has unique record", () => {
    expect(model.getSortedItems("artists", "totalCount").length).toEqual(5);
});

test("Each genre has unique record", () => {
    expect(model.getSortedItems("genres", "totalCount").length).toEqual(3);
});

test("Correct result for most listened song, both by count and by time", () => {
    expect(model.getSortedItems("songs", "totalCount")[0].id).toEqual("song-9");
    expect(model.getSortedItems("songs", "totalTime")[0].id).toEqual("song-8");
});

test("Correct result for most listened artist, both by count and by time", () => {
    expect(model.getSortedItems("artists", "totalCount")[0].artist).toEqual("The Divine Comedy");
    expect(model.getSortedItems("artists", "totalTime")[0].artist).toEqual("The Swell Season");
});

test("Correct result for friday night song, both by count and by time", () => {
    expect(model.getSortedItems("songs", "friNightCount")[0].id).toEqual("song-10");
    expect(model.getSortedItems("songs", "friNightDuration")[0].id).toEqual("song-2");
});

test("Correct result for longest streak song", () => {
    expect(model.getSortedItems("songs", "maxSteak")[0].id).toEqual("song-8");
});

test("Correct result for every day songs", () => {
    expect(model.getEveryDaySongs().map((song) => song.id)).toEqual(["song-1"]);
});

test("Result for genres: correct quantity and sorting", () => {
    expect(model.getSortedItems("genres", "totalCount").map((genre) => genre.genre))
        .toEqual(["Pop", "Folk", "Punk"]);
});
