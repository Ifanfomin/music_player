window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

var db;

var DBOpenRequest = window.indexedDB.open("images", 1);

DBOpenRequest.onerror = (err) => {
    console.log(err);
};

DBOpenRequest.onsuccess = (event) => {
    db = event.target.result;
};

DBOpenRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    db.onerror = (event) => {
        console.log("Error loading database");
    };

    var object_store = db.createObjectStore("images", {
        keyPath: "image_path",
    });

    object_store.createIndex("image_file", "image_file", { unique: false });
};