// Основная работа
// var music_directory = "/media/ifan/64_IFAN_SB/";
var music_directory = "audio/";
var images_directory = "img/";
var album_name = "";
// var
var user_pos = ["Base"];
console.log(`Позиция ${user_pos}`);
var user_folder = {};
var folders = [];
var tracks = [];
var now_play = [];
var played = [];
var type_of_play = "posled";
var album_image_1 = document.getElementById("album_image_1");
var album_image_2 = document.getElementById("album_image_2");
var site_title = document.getElementById("site_title");
var site_icon = document.getElementById("site_icon");

set_path("Base");

// Принимаем Query String
// Пример запроса: ?path=/Русское/Аквариум/1983 - Радио Африка&track=музыка серебряных спиц
// const params = new URLSearchParams(window.location.search);
// var path = params.get('path').split("/").slice(1);
// console.log(`Путь: ${path}`);
// set_path(path);
// var track = params.get('track');
// console.log(`Трек для включения: ${track}`);
// if (user_folder._tracks.indexOf(track) != -1) {
//     set_track(track, false, true);
// }

function set_path(path_str) {
    path = path_str.split("/");
    for (var f_index = 0; f_index < path.length; f_index++) {
        var folder = path[f_index];
        if (f_index == path.length - 1) {
            set_folder(folder, true);
        } else {
            set_folder(folder, false);
        }
    }
}


function next_track() {
    if (type_of_play == "posled") {
        if (tracks[tracks.indexOf(now_play.slice(-1)[0]) + 1]) {
            var track = tracks[tracks.indexOf(now_play.slice(-1)[0]) + 1];
            set_track(track, true, false);
        } else {
            var track = tracks[0];
            set_track(track, false, false);
        }
    }
    if (type_of_play == "random") {
        console.log(`tracks.length ${tracks.length}, played.length ${played.length}`)
        if (tracks.length > played.length) {
            min = 0;
            max = tracks.length;
            var random_int = Math.floor(Math.random() * (max - min) + min);
            while (played.indexOf(random_int) != -1) {
                if (played[played.indexOf(random_int)] + 1 < max) {
                    random_int = played[played.indexOf(random_int)] + 1;
                } else {
                    random_int = 0;
                }
            }
            played.push(random_int);
            var track = tracks[random_int];
            set_track(track, true, false);
        }
    }
}


function prev_track() {
    if (type_of_play == "posled") {
        if (tracks.indexOf(now_play.slice(-1)[0]) - 1 > -1) {
            var track = tracks[tracks.indexOf(now_play.slice(-1)[0]) - 1];
            set_track(track, true, false);
        }
    }
    if (type_of_play == "random") {
        played.pop();
        set_track(played[-1], true, false);
    }
}


function set_track(track_name, start_play, by_user) {
    if (by_user == true) {
        set_play_button();
        tracks = user_folder._tracks.slice(0);
        now_play = user_pos.slice(0);
        now_play.push(track_name);
        played = [tracks.indexOf(track_name)];
    } else {
        now_play.pop();
        now_play.push(track_name);
    }

    var h1 = document.getElementById("track-name");
    h1.setAttribute("class", "text now-track show");
    var h1_text = document.createTextNode(track_name.split(".").slice(0, -1).join(".").slice(0, 26));
    h1.removeChild(h1.firstChild);
    h1.appendChild(h1_text);

    site_title.innerHTML = track_name.slice(0, -4);

    var audio = document.getElementById("audio");
    var pleer = document.getElementById("pleer");

    track_name = music_directory + now_play.slice(1).join("/");
    if (track_name.indexOf("#") != -1) {
        track_name = track_name.slice(0, track_name.indexOf("#")) + "%23" + track_name.slice(track_name.indexOf("#") + 1);
    }
    pleer.setAttribute("src", track_name);

    // Ставим картинку
    image_url = images_directory + now_play.slice(1).join("/").slice(0, now_play.slice(1).join("/").lastIndexOf(".")) + ".png";
    if (image_url.indexOf("#") != -1) {
        image_url = image_url.slice(0, image_url.indexOf("#")) + "%23" + image_url.slice(image_url.indexOf("#") + 1);
    }
    album_image_1.setAttribute("src", image_url);
    site_icon.setAttribute("href", image_url);

    audio.load();
    if (start_play) {
        audio.play();
    }
}


function set_folder(folder, show) {
    // var tracks_header = document.getElementById("tracks");
    // var tracks_a = document.querySelectorAll(".track");
    // for (track of tracks_a) {
    //     track.setAttribute("class", "track hide");
    // }

    // album = album_name;
    // album_tracks = albums[album];

    // Достаём треки из системы
    // album_name = folder;
    if (user_pos.indexOf(folder) == 0) {
        user_pos = ["Base"];
        album_name = folder;
    } else if (user_pos.indexOf(folder) != -1) {
        user_pos = user_pos.slice(0, user_pos.indexOf(folder) + 1);
        album_name = folder;
    }

    user_folder = files;
    for (var u_folder of user_pos) {
        user_folder = user_folder[u_folder];
    }

    if (Object.keys(user_folder).slice(0).indexOf(folder) != -1) {
        // user_pos.push(folder);
        user_pos.push(folder);
        user_folder = user_folder[folder]
        album_name = folder;
    } else {
        show = true;
    }
    
    // user_folder = files;

    // for (folder of user_pos) {
    //     user_folder = user_folder[folder];
    // }
    if (show == true) {
        show_folders_and_tracks(user_folder);
    }
}

function show_folders_and_tracks(user_folder) {
    // album_image_2.setAttribute("src", music_directory + user_pos.slice(1).join("/") + "/cover.jpg");
    


    folders = Object.keys(user_folder).slice(0, -1);
    // Собираем плашку с папками над плеером
    var albums_head = document.getElementById("albums_head");
    albums_head.innerHTML = "< " + user_pos[user_pos.length - 1].slice(0, 25);

    var albums_head_container = document.getElementById("album_head_container");
    albums_head_container.setAttribute("onclick", "set_folder('" + user_pos[user_pos.length - 2] + "')");

    var albums_header = document.getElementById("albums");
    while (albums_header.firstChild) {
        albums_header.removeChild(albums_header.firstChild);
    }

    var elements_counter = 0;

    for (var folder of user_pos.slice(0, -1)) {
        elements_counter = elements_counter + 1;
    
        var div = document.createElement("div");
        if (elements_counter == 1) {
            div.setAttribute("class", "album-track-image-container-without-border");
        } else {
            div.setAttribute("class", "album-track-image-container");
        }
        div.setAttribute("onclick", "set_folder(`" + folder + "`, true)");

        var a = document.createElement("a");
        var a_text = document.createTextNode("{" + folder + "}");
        a.appendChild(a_text);
        a.setAttribute("class", "text track show");

        div.appendChild(a);
        albums_header.appendChild(div);
    }

    for (var folder of folders) {
        elements_counter = elements_counter + 1;

        var div = document.createElement("div");
        if (elements_counter == 1) {
            div.setAttribute("class", "album-track-image-container-without-border");
        } else {
            div.setAttribute("class", "album-track-image-container");
        }
        div.setAttribute("onclick", "set_folder(`" + folder + "`, true)");

        var a = document.createElement("a");
        var a_text = document.createTextNode("(" + folder + ")");
        a.appendChild(a_text);
        a.setAttribute("onclick", "set_folder(`" + folder + "`, true)");
        a.setAttribute("class", "text track show");
        
        div.appendChild(a);
        albums_header.appendChild(div);
    }

    for (var track_name of user_folder._tracks) {
        elements_counter = elements_counter + 1;

        var div = document.createElement("div");
        if (elements_counter == 1) {
            div.setAttribute("class", "album-track-image-container-without-border");
        } else {
            div.setAttribute("class", "album-track-image-container");
        }
        div.setAttribute("onclick", "set_track(`" + track_name + "`, true, true)");

        var img = document.createElement("img");
        img.setAttribute("class", "small-track-image");
        image_url = images_directory + user_pos.slice(1).join("/") + "/" + track_name.slice(0, track_name.lastIndexOf(".")) + ".png";
        if (image_url.indexOf("#") != -1) {
            image_url = image_url.slice(0, image_url.indexOf("#")) + "%23" + image_url.slice(image_url.indexOf("#") + 1);
        }
        img.setAttribute("src", image_url);
        div.appendChild(img);
        
        var a = document.createElement("a");
        var a_text = document.createTextNode("[" + track_name.slice(0, -4).slice(0, 30) + "]");
        a.appendChild(a_text);

        a.setAttribute("class", "text track show");
        div.appendChild(a);

        albums_header.appendChild(div);

    }
}
