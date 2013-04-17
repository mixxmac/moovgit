$("./body") {
  add_class("mw_goldaddr")
  $(".//div[@id='mainContent']") {
    remove(".//br")
    remove("./wrap/div[@width='100%']")

    table_dump(".//table")
    $(".//div") {
      wrap_nonempty_text("span") 
      match(fetch("./span/text()")) {
        with(/\A\*\Z/) {
          add_class("mw_float_left")
        }
      }
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
      $("../span") {
        move_to("../..//b")
      }
      $("../a[@class='details']") {
        move_to("../..//b")
      }
    }
    $(".//div[contains(@class,'subheadmed')]") {
      add_class("mw_header")
    }
    $(".//img") {
      $text = fetch("./@src") {
        replace(/.*\//, "")
        replace(/\..*/, "")
        replace(/continue\s?/, "continue ")
      }
      $("../../a") {
        add_class("mw_btn1")
        text($text)
      }
    }
    $(".//div") {
      remove_self_if_empty()
    }
  }
}
