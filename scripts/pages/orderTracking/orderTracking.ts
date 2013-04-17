$("./body") {
  add_class("mw_ordertrack")
  table_dump(".//table")
  $(".//div") {
    attributes(style: "", align: "")
    wrap_nonempty_text("div") {
      add_class("mw_was_text")
    }
  }
  remove(".//br")
  $(".//div[contains(@class,'mw_was_')]") {
    remove_self_if_empty()
  }
  $(".//span") {
    remove_self_if_empty()
  }
  $(".//span[contains(@class,'subheadmed')]") {
    name("div")
    add_class("mw_header")
  }
  $(".//b") {
    match(fetch("./text()")) {
      with("Questions?") {
        wrap("div", class: "mw_header mw_small")
      }
      with("Total:") {
        $("../../div[1]") {
          insert_before("hr")
        }
      }
      with(/\A\s+\Z/) {
        wrap("div", class: "store-specific-control")
      }
      log(fetch("./text()"))
    }
  }
  $(".//div[contains(@class, 'maincolor') and contains(@class,'heading')]") {
    add_class("mw_bar1")
    attributes(style:"width:100%")
    text(text())
    $("../../div") {
      remove_self_if_empty()
    }
  }
  $(".//*[contains(@class, 'store-specific-control')]") {
    name("div")
    add_class("mw_subheader")
  }
  $(".//div[contains(@class, 'second-table')]") {
    $("../div[contains(@class, 'mw_was_table')][3]") {
      add_class("mw_table3")
    }
    remove("../div[contains(@class,'mw_was_text')]")
  } 
  $(".//div[@id='processorderTrackingDetail']") {
    $("./a") {
      add_class("mw_btn"+index())
    }
    make_two_column("./a[1]","./a[1]")
    $("./div[contains(@class, 'mw_flex_box')]") {
      add_class("mw_was_tr")
    }
  }

  $(".//div[contains(@class, 'itemized-table')]") {
    $(".//div[contains(@class, 'mw_was_table')]") {
      $path = path()
      $("./div[preceding-sibling::*]") {
        add_class("mw_item")
        $("./div[contains(@class, 'cartrow')]") {
          $index = index()
          wrap("div", class: "mw_i"+$index) {
            copy_here($path+"/div[1]/div["+$index+"]", position("top"))
          }
        }
      }
      remove("div[1]")
    }
  }
  //orderTracking page
  $(".//span[contains(@class,'subheadlarge')]") {
    name("div")
    attributes(style: "margin-top: 10px;")
  }

  $(".//img[contains(@src, 'shopping')]") {
    name("div")
    add_class("mw_btn1")
    text(fetch("./@alt"))
  }
  //end orderTracking
}
