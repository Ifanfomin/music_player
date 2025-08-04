files.Base.playlist = {
    "_tracks": []
};

// var local_playlist = {};

function select_tracks() {
    if (!playlist_button_pressed) {
        playlist_button_pressed = true;
        playlist_button.innerHTML = "[*]";
        show_folders_and_tracks(user_folder);
    } else {
        playlist_button_pressed = false;
        playlist_button.innerHTML = "[ ]";
        show_folders_and_tracks(user_folder);
    }
}
playlist_button.addEventListener("click", select_tracks);

function add_to_playlist(track_index) {
    // добавляем трек в playlist
    // если трек уже есть в playlist, то удаляем
    if (Array.isArray(user_folder._tracks[track_index])) {
        track_info = user_folder._tracks[track_index];
    } else {
        track_info = [user_folder._tracks[track_index], user_pos.slice(0)];
    }

    if (user_pos.slice(-1)[0] == "playlist") {
        clear_playlist_track(track_index);
    } else {
        files.Base.playlist._tracks.push(track_info);
    }
}


function add_tracks(tracks, path, folder) {
    for (var track of tracks) {
        info_path = (user_pos.join("/") + "/" +  folder + path).split("/");
        
        track_info = [
            track,
            info_path
        ];
        files.Base.playlist._tracks.push(track_info);
    }
}

function rec_add_folders(dict, path, folder) {
    for (var name of Object.keys(dict)) {
        if (name == "_tracks") {
            add_tracks(dict[name], path, folder);
        } else if (Object.keys(dict).length > 1) {
            console.log(name);
            rec_add_folders(dict[name], path + "/" + name, folder);
        }
    }
}

function playlist_set_folder(folder) {
    // тут надо добавлять целые папки в плейлист
    // чтобы играли по порядку/случайно треки папки
    // думаю можно просто добавить рекурсивно треки папки в playlist._tracks
    // при удалении папки тоже рекурсивно посмотреть совпадения и удалить

    path = "";
    if (folder == "playlist") {
        clear_playlist();
    } else {
        rec_add_folders(user_folder[folder], path, folder);
    }
}

function clear_playlist() {
    files.Base.playlist._tracks = [];
}

function clear_playlist_track(track_index) {
    files.Base.playlist._tracks.splice(track_index, 1);
    show_folders_and_tracks(user_folder);
}