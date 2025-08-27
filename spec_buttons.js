function show_hide_spec_buttons() {
    if (block_spec_buttons_shown == false) {
        block_spec_buttons.setAttribute("class", "block-spec-buttons level-2");
        block_spec_buttons_shown = true;
    } else {
        block_spec_buttons.setAttribute("class", "block-spec-buttons level-1");
        block_spec_buttons_shown = false;
    }
}

dots_button.addEventListener("click", show_hide_spec_buttons);