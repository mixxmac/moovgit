$("./body") {
  insert("div", id: "mw_mask")
  $(".//img[contains(@src, 'pixel')]") {
    attributes(style: "display: none;")
  }
}
