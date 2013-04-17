$("./body") {
  add_class("mw_helpdesk_landing")
  $(".//h1") {
    add_class("mw_header")
  }
#grabs title and content underneath help 
  $(".//dl[@class='help']") {
    name("div")
    $("./dt") {
      //Add tab indexing for keyboard access
      attributes(tabindex: "0", onkeypress: "if(event.keyCode==13)this.click()")
      #makes dt into div as toggle bar
      name("div")
      $("./a") {
        #remove links from headers
        name("div")
      }
      add_class("mw_bar1")
    }
    wrap_together("./dd","div") {
      #inserts nav div for hidden buttons
      $("./dd") {
        match (inner()){
          with(/(\A\Z)|(\A\s+\Z)/) {
            #if totally empty space remove
            remove()
          }
          else() {
            #else add to list of options
            add_class("mw_bar2")
            $("./a") {
              $href = fetch("./@href")
              $title = fetch("./@title")
              $inner = inner()
            }
            inner($inner)
            wrap("a", href: $href, title: $title)
            name("div")
          }
        }
      }
    }
    ur_toggler("./div[1]","./div[2]")
  }  
}
