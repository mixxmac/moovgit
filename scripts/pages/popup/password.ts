$("./head") {
  move_here("..//title")
}

$("./body") {
  remove(".//br")
  add_class("mw_password")
  table_dump(".//table")
  $(".//div[contains(@class, 'maincolor')]") {
    add_class("mw_bar1")
  }
  $(".//form") {
    $(".//span") {
      attribute("style", "")
    }
    $(".//input[@type='text']") {
      attributes(type: "email")
    }
    $(".//div[@align='right']/../../div") {
      $("./div[1]") {
        $e1 = path()
      }
      $("./div[2]") {
        $e2 = path()
      }
      insert_bottom("div") {
        add_class("mw_two_column")
        move_here($e2, position("bottom")) 
        move_here($e1, position("top"))
      }
    }
    $(".//input[@type='submit']") {
      add_class("mw_btn1")
    }
  }
}
