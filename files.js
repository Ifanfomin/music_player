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