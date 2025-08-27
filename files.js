// работа с картинками (получение и сохранение)
function get_picture(tag) {
    var image = tag.tags.picture;
    if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        return base64;
    } else {
        // обработать отсутсвие обложки
        // мб вернуть серую обложку или что-то подобное
    }
}

function get_metadata(url) {
    return new Promise(async function(resolve, reject) {
        var file;
        var meta_length = 32000;
        var blob_file = await (await fetch(
            url, 
            {
                headers: {Range: `bytes=0-${meta_length}`}
            })).blob();
        
        
        await jsmediatags.read(blob_file, {
        onSuccess: resolve,
        onError: async function(error) {
            console.log(':(', error.type, error.info);
            var meta_length8arr = new Uint8Array(await blob_file.slice(6, 10).arrayBuffer());

            meta_length = ((0b1111 & meta_length8arr[0]) << 24) | (meta_length8arr[1] << 16) | (meta_length8arr[2] << 8) | meta_length8arr[3];
            blob_file = await (await fetch(
                url, 
                {
                    headers: {Range: `bytes=0-${meta_length}`}
                })
            ).blob();

            await jsmediatags.read(blob_file, {
            onSuccess: resolve,
            onError: reject
            });
        }
        });
    });
}

function add_image(path, url) {

    get_metadata(url).then(
        function(tag) {
            var file = get_picture(tag);
            console.log("file1:", file);

            var new_item = {
                image_path: path,
                image_file: file
            };

            var transaction = db.transaction(["images"], "readwrite");

            var object_store = transaction.objectStore("images");

            var object_store_request = object_store.put(new_item);
        },
        function(error) {
            //
        }
    );
}

function get_image(path) {
    return new Promise(function (resolve, reject) {
        var transaction = db.transaction(["images"], "readwrite");
        var object_store = transaction.objectStore("images");
        var object_store_request = object_store.get(path);
        object_store_request.onsuccess = object_store_request => resolve(object_store_request.target.result);
        object_store_request.onerror = reject;
    });
}


// обход всех папок и файлов
async function rec_fetch_files(dict, name, path, count) {
    console.log("rec info:", count);
    path = path + name + "/";
    var tracks = [];

    cloud_api_request = cloud_api_resources + 
                        cloud_api_public_key +
                        cloud_api_disk_url + 
                        cloud_api_path +
                        path;
    
    var items = (await fetch(cloud_api_request).then(x => x.json()))._embedded.items;

    for (var item of items) {
        if (item["type"] == "dir") {
            dict[item["name"]] = {};
            await rec_fetch_files(dict[item["name"]], item["name"], path, count+1);
        } else if (item["media_type"] == "audio") {
            tracks.push(item["name"]);
            add_image(item["path"], item["file"])
        }
    }
    dict["_tracks"] = tracks;

    if (count == 0) {
        return dict;
    }
}

async function update_files() {
    // https://cloud-api.yandex.net/v1/disk/public/resources
    // ?public_key=https://disk.yandex.ru/d/Ow6aYwA6M4RjEQ
    // &path=/
    localStorage.clear();
    files = { "Base" : {} };

    files["Base"] = await rec_fetch_files(files["Base"], "", cloud_api_disk_path, 0);

    files.Base.playlist = {
        "_tracks" : []
    }
    localStorage.setItem('files', JSON.stringify(files));

    set_path("Base");
}

files_update_button.addEventListener("click", update_files);


/// publik_key section ///

function show_hide_key_input() {
    if (block_publik_key_shown == false) {
        block_input_key.setAttribute("class", "input-div level-2");
        block_publik_key_shown = true;
        
        dots_button.setAttribute("class", "text dots-button unselectable level-2");
    } else {
        cloud_api_disk_url = input_publik_key_raw.value;
        localStorage.setItem('publik_key', JSON.stringify(cloud_api_disk_url));

        block_input_key.setAttribute("class", "input-div level-1");
        block_publik_key_shown = false;

        dots_button.setAttribute("class", "text dots-button unselectable level-3");
    }
}

publik_key_button.addEventListener("click", show_hide_key_input);

publik_key_button_second.addEventListener("click", show_hide_key_input);
