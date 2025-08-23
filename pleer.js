
function set_first_page() {
    first_pleer_buttons_container.setAttribute("class", "show-pleer-buttons-container");
    second_pleer_buttons_container.setAttribute("class", "hide-pleer-buttons-container");
    first_page_button.setAttribute("class", "text simple-button-clicked");
    second_page_button.setAttribute("class", "text simple-button");
}

function set_second_page() {
    second_pleer_buttons_container.setAttribute("class", "show-pleer-buttons-container");
    first_pleer_buttons_container.setAttribute("class", "hide-pleer-buttons-container");
    second_page_button.setAttribute("class", "text simple-button-clicked");
    first_page_button.setAttribute("class", "text simple-button");
}

first_page_button.addEventListener("click", set_first_page);
second_page_button.addEventListener("click", set_second_page);


function set_play_button() {
    now_play_or_pause = "play";
    play_pause_button.innerHTML = "[stop]";
    play_pause_button.setAttribute("class", "text pause-button");
    pleer.play();
}

function play_pause_track() {
    if (now_play_or_pause == "pause") {
        now_play_or_pause = "play";
        play_pause_button.innerHTML = "[stop]";
        play_pause_button.setAttribute("class", "text pause-button");
        pleer.play();
    } else {
        now_play_or_pause = "pause";
        play_pause_button.innerHTML = "[play]";
        play_pause_button.setAttribute("class", "text play-button");
        pleer.pause();
    }
}

// play_button.addEventListener("click", play_track);
// pause_button.addEventListener("click", pause_track);
play_pause_button.addEventListener("click", play_pause_track)


next_button.addEventListener("click", next_track);
prev_button.addEventListener("click", prev_track);


// function space_stop_start(e) {
//     if (e.code == "Space") {
//         if (pleer.paused) {
//             play_track();
//         } else {
//             pause_track();
//         }
//     }
// }

// document.addEventListener("keydown", space_stop_start);
// document.addEventListener("", next_track);


// function volume_up() {
//     if (volume + vol_step > 100) {
//         volume = 100;
//     } else {
//         volume = volume + vol_step;
//     }
//     pleer.volume = volume / 100;
//     vol_text.innerHTML = "[" + volume + "]";

// }

// function volume_down() {
//     if (volume - vol_step < 0) {
//         volume = 0;
//     } else {
//         volume = volume - vol_step;
//     }
//     pleer.volume = volume / 100;
//     vol_text.innerHTML = "[" + volume + "]";
// }

// function volume_on_off() {
//     if (volume == 0) {
//         volume = volume_before;
//     } else {
//         volume_before = volume;
//         volume = 0;
//     }
//     pleer.volume = volume / 100;
//     vol_text.innerHTML = "[" + volume + "]";
// }

// vol_up_button.addEventListener("click", volume_up);
// vol_down_button.addEventListener("click", volume_down);
// vol_text.addEventListener("click", volume_on_off);


function score_up() {
    score = pleer.currentTime;
    if (score + score_step > duration) {
        score = duration;
    } else {
        score = score + score_step;
    }
    pleer.currentTime = score;
}

function score_down() {
    score = pleer.currentTime;
    if (score - score_step < 0) {
        score = 0;
    } else {
        score = score - score_step;
    }
    pleer.currentTime = score;
}

score_up_button.addEventListener("click", score_up);
score_down_button.addEventListener("click", score_down);


function score_time_update() {
    time = Math.floor(pleer.currentTime);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60) - 60 * hours;
    var seconds = Math.floor(time - minutes * 60 - hours * 3600);
    var minutes_val = minutes;
    var seconds_val = seconds;

    if (minutes  < 10) {
        minutes_val = "0" + minutes;
    }
    if (seconds < 10) {
        seconds_val = "0" + seconds;
    }
    if (hours > 0) {
        score_time = "[" + hours + ":" + minutes_val + ":" + seconds_val + "]";
    } else {
        score_time = "[" + minutes_val + ":" + seconds_val + "]";
    }
    score_time_element.innerHTML = score_time;
}

pleer.addEventListener("timeupdate", score_time_update);


function timer_score_down() {
    if (timer_score - timer_score_step < 0) {
        timer_score = 0;
    } else {
        timer_score = timer_score - timer_score_step;
    }
    timer_time_update();
}

function timer_score_up() {
    if (timer_score + timer_score_step > 3600) {
        timer_score = 3600;
    } else {
        timer_score = timer_score + timer_score_step;
    }
    timer_time_update();
}

timer_down_button.addEventListener("click", timer_score_down);
timer_up_button.addEventListener("click", timer_score_up);


// setInterval(() => {
//     timer_score = timer_score - 1;
// }, 1000);


function start_stop_checker() {
    if (start_or_stop_timer == "stop") {
        start_or_stop_timer = "start";
        start_stop_timer_button.innerHTML = "[*]";
        timer_interval = setInterval(() => {
            timer_score = timer_score - 1;
            timer_time_update()
        }, 1000);
    } else {
        start_or_stop_timer = "stop";
        start_stop_timer_button.innerHTML = "[ ]";
        clearInterval(timer_interval);
    } 
}
start_stop_timer_button.addEventListener("click", start_stop_checker);


function timer_time_update() {
    if (timer_score > 0) {
        time = Math.floor(timer_score);
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time / 60) - 60 * hours;
        var seconds = Math.floor(time - minutes * 60 - hours * 3600);
        var minutes_val = minutes;
        var seconds_val = seconds;

        if (minutes  < 10) {
            minutes_val = "0" + minutes;
        }
        if (seconds < 10) {
            seconds_val = "0" + seconds;
        }
        if (hours > 0) {
            timer_score_time = "[" + hours + ":" + minutes_val + ":" + seconds_val + "]";
        } else {
            timer_score_time = "[" + minutes_val + ":" + seconds_val + "]";
        }
        timer_time_element.innerHTML = timer_score_time;
    } else {
        start_or_stop_timer = "stop";
        start_stop_timer_button.innerHTML = "[ ]";
        clearInterval(timer_interval);
        pleer.pause();
    }
}


function set_posled_play() {
    type_of_play = "posled";
    random_button.setAttribute("class", "text simple-button");
    posled_button.setAttribute("class", "text simple-button setted");
}

function set_random_play() {
    type_of_play = "random";
    posled_button.setAttribute("class", "text simple-button");
    random_button.setAttribute("class", "text simple-button setted");
}

posled_button.addEventListener("click", set_posled_play);
random_button.addEventListener("click", set_random_play);


function go_to_track() {
    set_path(tracks[now_play]);
}

image_button.addEventListener("click", go_to_track);


// function copy(str){
//     var tmp = document.createElement('INPUT');
//     var focus = document.activeElement;
  
//     tmp.value = str;
  
//     document.body.appendChild(tmp);
//     tmp.select();
//     document.execCommand('copy');
//     document.body.removeChild(tmp);
//     focus.focus();
// }

// function copy_album_song() {
//     console.log(`Сейчас играет: ${now_play[now_play.length - 1]}`)
//     var url_to_copy = "http://ifanfomin.ru/music/music.html?path=/" + user_pos.slice(1).join("/") + "&track=" + now_play[now_play.length - 1];
//     console.log(`Путь: ${url_to_copy}`);
//     copy(url_to_copy);

//     copied.setAttribute("class", "text copied-text");
//     void copied.offsetParent;
//     copied.setAttribute("class", "text copied-text show-and-hide");
// }

// copy_song.addEventListener("click", copy_album_song);
