$("./body") {
  add_class("mw_checkout_goldcard")
  $(".//div[@id='checkout']") {
    $(".//div[@class='wrap']") {
      table_dump("./table")
    }
    $(".//div[contains(@class,'wizmaincolor')]") {
      remove(".//font")
      $(".//div[contains(@class, 'wiz')]") {
        match(index()){
          with('2'){
            add_class('mw_breadcrumb mw_float_right')
            text("Next: "+fetch("./text()"))
          } else() {
            remove()
          }
        }
      }
      wrap_together(".//div[contains(@class,'mw_breadcrumb')]", 'div', class: "mw_overflow")
    }
  }
  $(".//div[@id='mainContent']") {
    remove(".//br")
    table_dump(".//table")
    $(".//div[contains(@class, 'subheadmed')]") {
      add_class("mw_header")
    }
    $(".//div[contains(@class, 'maincolor')][not(contains(@class, 'wiz'))]") {
      add_class("mw_bar1")
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
      attribute("pattern", "[0-9]*")
    }
    $uid='uid_radio'
    $(".//input[@type='radio']") {
      attribute("id", $uid)
      $("../../div[2]") {
        wrap("label", for: $uid)
        $uid = $uid + 1
      } 
      $("../../div[1]") {
        wrap("span")
      }
    }
    $(".//input[@type='checkbox']") {
      attribute("id", $uid)
      $("../../div[1]") {
        wrap("span")
      }
      $("../../div[1]") {
        wrap("label", for: $uid)
        $uid = $uid + 1
      }
    }
    $(".//input[@type='text']") {
      $("../../div") {
        remove_self_if_empty()
      }
      $("../../div[last()]") {
        move_here("//img[contains(@alt, 'CONTINUE')]/../../a", position("top"))
      }
    }
    $(".//img[@alt]") {
      name("div")
      $alt = fetch("./@alt")
      match($alt) {
        with(/^$/) {
          add_class('mw_btn1')
          text("CONTINUE WITHOUT CARD")
        } else() {
          add_class('mw_btn1')
          text($alt)
          attributes(type: "button")
        }
      }
    }
    $(".//img[not(@alt)]") {
      name("div")
      match(fetch("./@src")) {
        with(/reset/) {
          add_class("mw_btn2")
        }
        else() {
          add_class("mw_btn1")
        }
      }
      text(fetch("./@src")) {
        replace(/.*\//, "")
        replace(/.*_/, "")
        replace(/\..*/, "")
      }
      attributes(type: "button")
    }
  }
}
