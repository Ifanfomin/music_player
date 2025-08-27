// Основная работа


// загрузка из localStorage
try {
    files = JSON.parse(localStorage.getItem("files"));
    console.log
    set_folder("Base");
} catch (err) {
    console.log(err);
    update_files();
}


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
    set_folder("Base");
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
        if (now_play + 1 != tracks.length) {
            now_play += 1;
            set_track(now_play, true, false);
        } else {
            set_track(0, false, false);
        }
    }

    if (type_of_play == "random") {
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
            var track_index = random_int;
            set_track(track_index, true, false);
        }
    }
}


function prev_track() {
    if (type_of_play == "posled") {
        if (now_play - 1 > -1) {
            now_play -= 1;
            set_track(now_play, true, false);
        }
    }
    if (type_of_play == "random") {
        if (played.length > 1) {
            played.pop();
            set_track(played.slice(-1)[0], true, false);
        } else {
            set_track(played[0], true, false);
        }
    }
}

/////// Трек ///////
// Либо: 
// .mp3 файл
// 
// Либо:
// Список:
//    название
//    путь
// 

async function set_track(track_index, start_play, by_user) {
    if (by_user == true) {
        set_play_button();
        // tracks = user_folder._tracks.slice(0);
        tracks = [];
        for (var track of user_folder._tracks) {
            if (Array.isArray(track)) {
                tracks.push(track[1].slice(1).join("/") + "/" + track[0]);
            } else {
                tracks.push(user_pos.slice(1).join("/") + "/" + track);
            }
        }

        now_play = track_index;
        played = [track_index];
    } else {
        now_play = track_index;
    }

    track_path = tracks[track_index];

    track_name = track_path.split("/").slice(-1)[0];

    image_path = images_directory + 
                 track_path.slice(0, track_path.lastIndexOf(".")) +
                 ".png";

    var h1 = document.getElementById("track-name");
    h1.setAttribute("class", "text now-track show");
    var h1_text = document.createTextNode(track_name.split(".").slice(0, -1).join(".").slice(0, 26));
    h1.removeChild(h1.firstChild);
    h1.appendChild(h1_text);

    site_title.innerHTML = track_name.slice(0, -4);

    var audio = document.getElementById("audio");
    var pleer = document.getElementById("pleer");

    var track_url = cloud_api_download +
                    cloud_api_public_key +
                    cloud_api_disk_url +
                    cloud_api_path + "/" +
                    track_path;
    
    track_url = (await fetch(track_url).then(x => x.json())).href

    console.log(track_url);
    
    
    pleer.setAttribute("src", track_url);

    // Ставим картинку
    // image_url = images_directory + now_play.slice(1).join("/").slice(0, now_play.slice(1).join("/").lastIndexOf(".")) + ".png";
    // if (image_url.indexOf("#") != -1) {
    //     image_url = image_url.slice(0, image_url.indexOf("#")) + "%23" + image_url.slice(image_url.indexOf("#") + 1);
    // }

    get_image("/" + track_path).then(
        function(image_info) {
            album_image_1.setAttribute("src", image_info.image_file);
            site_icon.setAttribute("href", image_info.image_file);
        }
    )

    audio.load();
    if (start_play) {
        audio.play();
    }
}


async function set_folder(folder, show) {
    if (!playlist_button_pressed) {
        classic_set_folder(folder, show);
    } else {
        playlist_set_user_folder(folder, show);
    }

}

function classic_set_folder(folder, show) {

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
    
    if (show == true) {
        show_folders_and_tracks(user_folder);
    }
}


function show_folders_and_tracks(user_folder) {

    folders = Object.keys(user_folder);

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

    // {вот такие папки}
    for (var folder of user_pos.slice(0, -1)) {
        elements_counter = elements_counter + 1;
    
        var div = document.createElement("div");
        if (elements_counter == 1) {
            div.setAttribute("class", "album-track-image-container-without-border");
        } else {
            div.setAttribute("class", "album-track-image-container");
        }

        if (!playlist_button_pressed) {
            div.setAttribute("onclick", "set_folder(`" + folder + "`, true)");
        } else {
            div.setAttribute("onclick", "playlist_set_folder(`" + folder + "`)");
        }

        var a = document.createElement("a");
        var a_text = document.createTextNode("{" + folder + "}");
        a.appendChild(a_text);
        a.setAttribute("class", "text track show");

        div.appendChild(a);
        albums_header.appendChild(div);
    }

    // (вот такие папки)
    for (var folder of folders) {
        console.log(folder);
        if (folder != "_tracks") {
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
    }

    // тут обложка [вот такие треки]
    for (var track_index = 0; track_index < user_folder._tracks.length; track_index++) {
        elements_counter = elements_counter + 1;

        track_info = user_folder._tracks[track_index];
        if (!Array.isArray(track_info)) {
            track_path = "/" + user_pos.slice(1).join("/") + "/" + track_info;
        } else {
            track_path = "/" + track_info[1].slice(1).join("/") + "/" + track_info[0];
        }

        var div = document.createElement("div");
        div.setAttribute("id", track_path);
        if (elements_counter == 1) {
            div.setAttribute("class", "album-track-image-container-without-border");
        } else {
            div.setAttribute("class", "album-track-image-container");
        }

        if (playlist_button_pressed) {
            div.setAttribute("onclick", "add_to_playlist_user(" + track_index + ")");
        } else {
            div.setAttribute("onclick", "set_track(" + track_index + ", true, true)");
        }
 
        var a = document.createElement("a");
        if (!Array.isArray(track_info)) {
            var a_text = document.createTextNode("[" + track_info.slice(0, -4).slice(0, 30) + "]");
        } else {
            var a_text = document.createTextNode("[" + track_info[0].slice(0, -4).slice(0, 30) + "]");
        }
        a.appendChild(a_text);

        a.setAttribute("class", "text track show");
        div.appendChild(a);

        get_image(track_path).then(
            function(image_info) {
                var img = document.createElement("img");
                img.setAttribute("class", "small-track-image");
                img.setAttribute("src", image_info.image_file);
                var div = document.getElementById(image_info.image_path);
                var text = div.firstChild;
                div.removeChild(div.firstChild);
                div.appendChild(img);
                div.appendChild(text);
            }
        );

        albums_header.appendChild(div);
        
        if (track_index > 300) {
            break;
        }
    }

    // добавляем картинка рядом с треком
    // var images_counter = 0;
    // for (var track_info of user_folder._tracks) {
    //     images_counter = images_counter + 1;

    //     if (!Array.isArray(track_info)) {
    //         track_path = "/" + user_pos.slice(1).join("/") + "/" + track_info;
    //     } else {
    //         track_path = "/" + track_info[1].slice(1).join("/") + "/" + track_info[0];
    //     }



    //     if (images_counter > 300) {
    //         break;
    //     }
    // }
}
