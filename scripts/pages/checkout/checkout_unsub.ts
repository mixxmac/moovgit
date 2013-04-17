$("body") {
  add_class("mw_checkout_unsub")
  $(".//div[@id='processcatalogUnsubscribe']") {
    $("./table") {
      $("./tr/td") {
        remove("./br")
        $("./b[1]") {
          name("p")
          add_class("mw_header")
        }
        $("./span") {
          insert_before("br")
        }
      }
    }
    move_here(".//form") {
      move_here(".//td") {
        name("div")
        $("./img") {
          remove()
        }
        $("./input") {
          $text = fetch("./text()")
          match(fetch("./@type")) {
            with(/image/) {
              wrap("div", class: "mw_btn1") {
                text("Submit")
              }
            }
          }
        }
        remove_self_if_empty()
      }
      $(".//table") {
        $("./tr") {
          $("./td") {
            remove_self_if_empty()
          }
          remove_self_if_empty()
        }
        remove_self_if_empty()
      }
      remove_self_if_empty()
    }
  }
}
