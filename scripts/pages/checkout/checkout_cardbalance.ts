$("./body") {
  add_class("mw_cardbalance") 
  
  //--------------Image Manipulation
  //remove images without classes and ids
  $(".//img/../..") {
    add_class("mw_img")
  }
  //--------------End Image Manipulation

  $(".//div[@id='mainContent']") {
    add_class("mw_content")
    $(".//span[@class='subheadmed']") {
      add_class("mw_header")
    }
    $(".//a[contains(@href, 'checkFields')]") {
      add_class("mw_btn1")
      $("./img") {
        $text = fetch("./@alt")
      }
      text($text)
    }
    
    remove(".//img[not(@class)][not(@id)]")
    
    table_dump(".//table")
    $(".//input") { 
      add_class("mw_input")
    }
    $(".//div[@id='pinErr']") {
      text("")
    }
    $(".//b") {
      wrap('p')
    }
  }
}
