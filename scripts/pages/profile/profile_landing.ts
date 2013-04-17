
$("./body") {
  add_class("mw_profile_landing")
  $(".//div[@id='processmyaccount']") {
    remove(".//br")
    remove(".//img")
    $(".//td[contains(@class, 'checkbg_lt')]") {
      wrap_nonempty_text("span")
      $("./*[last()-2]") {
        insert_before("hr")
      }
    }
    table_dump(".//table")
    $(".//span[@class='subheadmed']") {
      add_class("mw_header")
      wrap("p")
    }
    $(".//span[contains(@class, 'details')]") {
      wrap("p")
      $("../../../div") {
        wrap_nonempty_text("p")
      }
    }

    $(".//div[contains(@class, 'maincolor')]") {
      add_class("mw_bar1")
      $("../..//li/a") {
        add_class("mw_bar2")
      }
    }
    $(".//*") {
      $bool = 'false'
      $("./b") {
        $bool = 'true'
        match_not(fetch("./text()"), /@/) {
          wrap("div") 
        }
      } 
      match($bool, 'true'){
        add_class("mw_has_b")
      }
    }
  }
  $(".//div[@id='checkout']") {
    remove(".//div[@class='wrap']/table[@width]")
  }
}
