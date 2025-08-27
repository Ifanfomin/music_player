
function set_search_music_block() {
    if (now_search_music_block == "music") {
        now_search_music_block = "search";
        // input_raw.setAttribute("placeholder", "Search in " + user_pos[user_pos.length - 1]);

        block_search.setAttribute("class", "block-search level-2");
        block_music.setAttribute("class", "block-music level-1");

        dots_button.setAttribute("class", "text dots-button unselectable level-2");

    } else if (now_search_music_block == "search") {
        now_search_music_block = "music";
        block_music.setAttribute("class", "block-music level-2");
        block_search.setAttribute("class", "block-search level-1");
        
        dots_button.setAttribute("class", "text dots-button unselectable level-3");
    }
}

search_button.addEventListener("click", set_search_music_block);
search_button_second.addEventListener("click", set_search_music_block);


function set_path_and_track(path, track_index) {
    set_path(path);
    set_track(track_index, true, true);
}

function set_path_and_folder(path, folder_name) {
    set_path(path);
    set_folder(folder_name, true);
    set_search_music_block();
}

function add_founded_child(track_album, album_path, child_name, track_index) {
    var div = document.createElement("div");
    if (childs_count == 1) {
        div.setAttribute("class", "album-track-image-container-without-border");
    } else {
        div.setAttribute("class", "album-track-image-container");
    }

    if (track_album == "track") {
        if (playlist_button_pressed) {
            div.setAttribute("onclick", "add_to_playlist_search(`" + child_name + "`, `" + album_path + "`)");
        } else {
            div.setAttribute("onclick", "set_path_and_track(`" + album_path + "`, " + track_index + ")");            
        }

        var img = document.createElement("img");
        img.setAttribute("class", "small-track-image");
        image_url = images_directory + album_path.split("/").slice(2).join("/") + "/" + child_name.slice(0, child_name.lastIndexOf(".")) + ".png";
        if (image_url.indexOf("#") != -1) {
            image_url = image_url.slice(0, image_url.indexOf("#")) + "%23" + image_url.slice(image_url.indexOf("#") + 1);
        }
        img.setAttribute("src", image_url);
        div.appendChild(img);

        var a = document.createElement("a");
        var a_text = document.createTextNode("[" + child_name.slice(0, -4).slice(0, 30) + "]");
        a.appendChild(a_text);

        a.setAttribute("class", "text track show");
        div.appendChild(a);
    } else if (track_album == "album") {
        if (playlist_button_pressed) {
            div.setAttribute("onclick", "playlist_set_search_folder(`" + album_path + "/" + child_name + "`)");
        } else {
            div.setAttribute("onclick", "set_path_and_folder(`" + album_path + "`, `" + child_name + "`)");
        }
        
        var a = document.createElement("a");
        var a_text = document.createTextNode("(" + child_name + ")");
        a.appendChild(a_text);
        a.setAttribute("class", "text track show");

        div.appendChild(a);
    }

    fouded_albums.appendChild(div);
}

function indexOfInsensitive(str_1, str_2) {
    if (typeof str_1 === 'string') {
        return str_1.toLowerCase().split("_").join(" ").indexOf(str_2.toLowerCase().split("_").join(" ")) !== -1;
    } else {
        return false;
    }
}

function search_in_tracks(tracks, path, query) {
    for (var i = 0; i < tracks.length; i++) {
        if (indexOfInsensitive(tracks[i], query)) {
            childs_count += 1;
            add_founded_child("track", path, tracks[i], i);
        }
    }
}

function rec_search_files(dict, path, query) {
    if (childs_count < max_childs_count) {
        for (var name of Object.keys(dict)) {
            if (name == "_tracks") {
                search_in_tracks(dict[name], path, query);
            } else {
                if (indexOfInsensitive(name, query)) {
                    childs_count += 1;
                    add_founded_child("album", path, name, -1);
                }
                rec_search_files(dict[name], path + "/" + name, query);
            }
        }
    }
}

function start_search() {
    while (fouded_albums.firstChild) {
        fouded_albums.removeChild(fouded_albums.firstChild);
    }
    childs_count = 0;
    var query = input_raw.value;
    // query = "Вид";
    var path = "";
    if (query != "") {
        rec_search_files(files, path, query);
    }

}

input_raw.addEventListener("keyup", start_search)
