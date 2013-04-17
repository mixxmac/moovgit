$("./body") {
  add_class("mw_ordertrack_login")
  $(".//div[@id='mainContent']") {
    remove(".//br")
    remove(".//font[contains(@class,'details')]")
    table_dump(".//table")
    $(".//span[contains(@class, 'subheadlarge')]") {
      add_class("mw_header")
    }
    $(".//div") {
      remove_self_if_empty()
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
    }
    $(".//input[@type='password']") {
      add_class("mw_input")
    }
    $(".//input[@type='image']") {
      attributes(type: "submit", class: "mw_btn2", value: fetch("./@value"))
      $("../../*[not(./a)]") {
        insert("div")
        make_two_column("./div", "./input[@type='submit']")
      }
      $("../../*[./a]") {
        make_two_column("./a", "./input[@type='submit']")
      }
    }
    $(".//input[@type='submit']") {
      insert_after("div", class: "mw_sign_in")
    }
    $(".//font") {
      attribute("size", "")
      text() {
        replace(".", ".\n")
      }
    }
    # GNC-44
    $(".//form[contains(@name,'otracking_sign_in')] | .//form[contains(@name,'viewSingleOrderTrackingLogin')]") {
      $("./div[contains(@class,'mw_was_table')]") {
        inner_wrap("div",class:"mw_under_title") {
          $("./div[1]") {
            move_to("./parent::div","before")
          }
      }
    }
      $(".//div[./div[contains(@class,'maincolor')]]") {
        add_class("mw_bar1 mw_styling_bar")
        text(upcase(fetch("./div[contains(@class,'maincolor')]/b/text()")))
        $("ancestor::form[contains(@name,'otracking_sign_in')]//div[contains(@class, 'mw_flex_box')]/input[contains(@class, 'mw_flex_box_item_1')]") {
          %value=text(upcase(fetch("./@value")))
          attributes(class:"mw_flex_box_item_1 mw_btn1",value: %value)
        }
        $("ancestor::form[contains(@name,'viewSingleOrderTrackingLogin')]//div[contains(@class, 'mw_flex_box')]/input[contains(@class, 'mw_flex_box_item_1')]") {
          %value=text(upcase(fetch("./@type")))
          attributes(class:"mw_flex_box_item_1 mw_btn1",value: %value)
        }
      }
    }
    # end GNC-44
  }
}
