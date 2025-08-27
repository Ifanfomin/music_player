/// music.js ///
var music_directory = "audio/";
var images_directory = "img/";
var album_name = "";
var user_pos = ["Base"];
var user_folder = {};
var folders = [];
var tracks = [];
var track_path = "";
var track_name = "";
var now_play = [];
var played = [];
var type_of_play = "posled";
var album_image_1 = document.getElementById("album_image_1");
var album_image_2 = document.getElementById("album_image_2");
var site_title = document.getElementById("site_title");
var site_icon = document.getElementById("site_icon");


/// pleer.js ///
var pleer = document.getElementById("audio");

var first_pleer_buttons_container = document.getElementById("first_pleer_buttons_container");
var second_pleer_buttons_container = document.getElementById("second_pleer_buttons_container");

var first_page_button = document.getElementById("first_page");
var second_page_button = document.getElementById("second_page");
var page_setted = "first";

var play_pause_button = document.getElementById("play_pause");
var now_play_or_pause = "pause";

var next_button = document.getElementById("next");
var prev_button = document.getElementById("prev");

// var vol_up_button = document.getElementById("volume_up");
// var vol_down_button = document.getElementById("volume_down");
// var vol_text = document.getElementById("volume_text");
// var volume = 100;
// var volume_before = 100;
// var vol_step = 10;

var timer_down_button = document.getElementById("timer_down");
var timer_up_button = document.getElementById("timer_up");
var start_stop_timer_button = document.getElementById("start_stop_timer");
var timer_time_element = document.getElementById("timer_time")
var start_or_stop_timer = "stop";
var timer_score_step = 5 * 60;
var timer_score = 0;
var timer_score_time = "[00:00]"

var score_up_button = document.getElementById("score_up");
var score_down_button = document.getElementById("score_down");
var score = 0;
var duration = pleer.duration;
var score_step = 10;

var score_time_element = document.getElementById("score_time");
var score_time = "[00:00]";

var posled_button = document.getElementById("posled");
var random_button = document.getElementById("random");

var image_button = document.getElementById("album_image_1");

// var copy_song = document.getElementById("copy_song");
// var copied = document.getElementById("copied");


/// search.js ///
var search_button = document.getElementById("search_button");
var search_button_second = document.getElementById("search_button_second");
var now_search_music_block = "music";
var input_raw = document.getElementById("input_raw")

var block_search= document.getElementById("block_search");
var block_music = document.getElementById("block_music");
var fouded_albums = document.getElementById("founded_albums");

var query = "";
var childs_count = 0;
var max_childs_count = 100;


/// playlist.js ///
var playlist_button = document.getElementById("playlist_button");
var playlist_button_pressed = false;
var track_info = [];


/// files.js ///
var files_update_button = document.getElementById("files_update_button");
var cloud_api_resources = "https://cloud-api.yandex.net/v1/disk/public/resources";
var cloud_api_download = "https://cloud-api.yandex.net/v1/disk/public/resources/download";
var cloud_api_public_key = "?public_key=";
var cloud_api_disk_url = JSON.parse(localStorage.getItem("publik_key"));
var cloud_api_path = "&path=";
var cloud_api_disk_path = "";
var cloud_api_request = "";
var response_json = {};
var files = {};

var block_input_key = document.getElementById("block_input_key");
var input_publik_key_raw = document.getElementById("input_publik_key_raw");
var publik_key_button = document.getElementById("publik_key_button");
var publik_key_button_second = document.getElementById("publik_key_button_second");
var block_publik_key_shown = false;


/// spec_buttons.js ///
var dots_button = document.getElementById("dots_button");
var block_spec_buttons = document.getElementById("block_spec_buttons");
var block_spec_buttons_shown = false;