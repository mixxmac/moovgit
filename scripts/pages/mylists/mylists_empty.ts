$("./body") {
  add_class("mw_mylists") 
  $(".//div[@id='mainContent']"){
    remove(".//img[not(contains(@src, 'product'))]")
    remove(".//div[contains(@class, 'addthis_toolbox')]") 
    //move sidebar to the top as a toggler
    move_here(".//div[contains(@class, 'mylist-sidebar')]", position("top")) {
      $(".//dt") {
        name("div")
        add_class("mw_bar1")
      }
      $(".//dd[contains(@class, 'current')]") {
        add_class("mw_bar4")
        insert_top("div", class: "sprites-addtocart")
      }
      $(".//dd[not(@class)]") {
        $("./a") {
          inner_wrap("div", class: "mw_bar2")
        }
      }
      $(".//div[contains(@class,'callout')]") {
        name("dd")
        $("./a|./span") {
          add_class("mw_header mw_bar2")
        }
        remove("./p")
      }
      $("./dl") {
        move_here("../dd")
      }
      wrap_together(".//dd", "div") {
        $(".//dd") {
          name("div")
        }
      }
      $("./dl") {
        name("div")
        ur_toggler("./div[1]", "./div[2]")
      }
    }
    //end toggler
    //Header Text
    move_here(".//div[@class='mylist-header']", position("top")) {
      add_class("mw_header")
      text() {
        replace(/:/,"")
      }
    }
    //End Header
    $(".//ol[contains(@class,'items')]") {
      insert_before("div", class: "mw_btn1 mw_noformat") {
        copy_here("//ancestor::a[@id='view-my-lists']") {
          text("Log in to View My Lists")
          insert_bottom("span", "&rsaquo;", style: "margin-left: 20px;")
        }
      }
      remove()
    }
  }
}
