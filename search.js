var search_button = document.getElementById("search_button");
var now_search_music_block = "music";
var input_raw = document.getElementById("input_raw")

var block_search= document.getElementById("block_search");
var block_music = document.getElementById("block_music");
var fouded_albums = document.getElementById("founded_albums");

var query = "";
var childs_count = 0;
var max_childs_count = 100;


function set_search_music_block() {
    if (now_search_music_block == "music") {
        now_search_music_block = "search";
        // input_raw.setAttribute("placeholder", "Search in " + user_pos[user_pos.length - 1]);

        block_search.setAttribute("class", "block-search level-2");
        block_music.setAttribute("class", "block-music level-1");

    } else if (now_search_music_block == "search") {
        now_search_music_block = "music";
        block_music.setAttribute("class", "block-music level-2");
        block_search.setAttribute("class", "block-search level-1");
    }
}

search_button.addEventListener("click", set_search_music_block);


function set_path_and_track(path, track_name) {
    set_path(path);
    set_track(track_name, true, true);
}

function set_path_and_folder(path, folder_name) {
    set_path(path);
    set_folder(folder_name, true);
    set_search_music_block();
}

function add_founded_child(track_album, album_path, child_name) {
    var div = document.createElement("div");
    if (childs_count == 1) {
        div.setAttribute("class", "album-track-image-container-without-border");
    } else {
        div.setAttribute("class", "album-track-image-container");
    }

    if (track_album == "track") {
        div.setAttribute("onclick", "set_path_and_track(`" + album_path + "`, `" + child_name + "`)");

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
        div.setAttribute("onclick", "set_path_and_folder(`" + album_path + "`, `" + child_name + "`)");
        
        var a = document.createElement("a");
        var a_text = document.createTextNode("(" + child_name + ")");
        a.appendChild(a_text);
        a.setAttribute("class", "text track show");

        div.appendChild(a);
    }

    fouded_albums.appendChild(div);
}

function indexOfInsensitive(str_1, str_2) {
    return str_1.toLowerCase().split("_").join(" ").indexOf(str_2.toLowerCase().split("_").join(" ")) !== -1;
}

function search_in_tracks(tracks, path, query) {
    for (var track of tracks) {
        if (indexOfInsensitive(track, query)) {
            childs_count += 1;
            add_founded_child("track", path, track);
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
                    add_founded_child("album", path, name);
                }
                rec_search_files(dict[name], path + "/" + name, query)
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
