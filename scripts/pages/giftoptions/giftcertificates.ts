$("./body") {
  add_class("mw_giftcertificates")
  //make gifts header at the top of the page
  $(".//div[@id='sidebar1']") {
    $("./span") {
      add_class("mw_bar2")
      $t = fetch("./img/@src")
      $t {
        replace(/.*\//, "")
        replace(/\..*/, "")
      }
      text($t)
    }
    $(".//a") {
      inner_wrap("div") {
        add_class("mw_bar1")
      }
    }
    ur_toggler("./span","./ul") 
  }
  $(".//div[contains(@id,'mainContentnew')]") {
    //removes facebook like feature for now
    remove(".//like")
    remove(".//div[class='gift-center-image']")
    
    $(".//h1") {
      add_class("mw_header")
    }
    $(".//div[not(@class='content-area3')]") {
      remove("./div[@class='gift-center-image']")
    }
    $(".//div[@class='content-area3']") {
      //input box formatting
      $(".//input") {
        add_class("mw_input")
      }
      $(".//textarea") {
        add_class("mw_input")
      }
      insert_before("hr")
    }

    //making submit buttons
    $(".//span/a[@class='gift-cards-continue']") {
      add_class('mw_btn1') 
      text("Continue")
    }
    $(".//span/a[@class='gift-cards-addtocart']") {
      add_class('mw_btn1')
      text("Add To Cart")
    }
  }
}
