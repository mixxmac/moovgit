$("./body") {
  insert("div", id: "mw_side_slider_mask")
  insert("nav", class: "mw_side_slider_contents") {
    wrap("div", id: "mw_side_slider_menu", class: "mw_side_slider")
    @import _side_slider_menu.ts
  }
}