// var local_playlist = {};

function select_tracks() {
    if (!playlist_button_pressed) {
        playlist_button_pressed = true;
        playlist_button.innerHTML = "[*]";
        show_folders_and_tracks(user_folder);
        start_search();
    } else {
        playlist_button_pressed = false;
        playlist_button.innerHTML = "[ ]";
        show_folders_and_tracks(user_folder);
        start_search();
    }
}
playlist_button.addEventListener("click", select_tracks);

function add_to_playlist_user(track_index) {
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

function add_to_playlist_search(track_name, track_path) {
    // добавляем трек в playlist
    // если трек уже есть в playlist, то удаляем
    // в поиске не появляются ссылки на треки

    track_info = [track_name, track_path.split("/").slice(1)];

    files.Base.playlist._tracks.push(track_info);
}


function add_tracks(tracks, path, folder, prev_path) {
    for (var track of tracks) {
        info_path = (prev_path + "/" +  folder + path).split("/");
        
        track_info = [
            track,
            info_path
        ];
        files.Base.playlist._tracks.push(track_info);
    }
}

function rec_add_folders(dict, path, folder, prev_path) {
    for (var name of Object.keys(dict)) {
        if (name == "_tracks") {
            add_tracks(dict[name], path, folder, prev_path);
        } else if (Object.keys(dict).length > 1) {
            rec_add_folders(dict[name], path + "/" + name, folder, prev_path);
        }
    }
}

function playlist_set_user_folder(folder) {
    // тут надо добавлять целые папки в плейлист
    // чтобы играли по порядку/случайно треки папки
    // думаю можно просто добавить рекурсивно треки папки в playlist._tracks
    // при удалении папки тоже рекурсивно посмотреть совпадения и удалить

    path = "";
    if (folder == "playlist") {
        clear_playlist();
    } else {
        rec_add_folders(user_folder[folder], path, folder, user_pos.join("/"));
    }
}

function playlist_set_search_folder(folder_path) {
    // тут надо добавлять целые папки в плейлист
    // чтобы играли по порядку/случайно треки папки
    // думаю можно просто добавить рекурсивно треки папки в playlist._tracks
    // при удалении папки тоже рекурсивно посмотреть совпадения и удалить

    var search_folder = files;
    folder_path = folder_path.split("/").slice(1);
    for (var folder of folder_path) {
        search_folder = search_folder[folder];
    }

    path = "";
    if (folder == "playlist") {
        clear_playlist();
    } else {
        rec_add_folders(search_folder, path, folder_path[folder_path.length - 1], folder_path.slice(0, -1).join("/"));
    }
}


function clear_playlist() {
    files.Base.playlist._tracks = [];
}

function clear_playlist_track(track_index) {
    files.Base.playlist._tracks.splice(track_index, 1);
    show_folders_and_tracks(user_folder);
}