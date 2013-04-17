$("./body") {
  add_class("mw_home")
  
  # jsonp client controlled content
  insert("script", src: "http://gnclivewell.com/mobile/mw-content.js", data-keep: "true")
  
  $(".//div[@id='container']") {
    insert("section", id: "mw_main_content", class: "mw_box1") {
      
      insert("div", class: "mw_carousel_wrapper") {
        insert("div", data-ur-set: "carousel", data-ur-carousel-component: "view_container", data-ur-fill: "1") {
          # will be populated via jsonp
          insert("div", data-ur-carousel-component: "scroll_container")
          insert("div", data-ur-carousel-component: "dots")
        }
      }
      
      # copy the side slider menu contents into the home page
      copy_here("/html/body//*[@id='mw_side_slider_menu']/*[contains(@class, 'mw_side_slider_contents')]/*")
    }
    
    remove("./*[not(@id='mw_main_content')]")
  }
}
