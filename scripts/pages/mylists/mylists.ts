$("./body") {
  add_class("mw_mylists")
  $(".//span[contains(@class, 'mw_cart_count')]") {
    attribute("id", "mw_cart")
  }
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
    //Begin Body
    $(".//div[@id='mylist-wrap']") {
      $(".//div[@class='mylist-title-wrap']") {
        make_two_column("./h2","./span")
      }
      remove("./div[@class='share']")
      remove("./label")
      $(".//textarea") {
        attributes(placeholder: "Enter a description for this list")
        add_class("mw_input")
      }
      $(".//div[@class='actions']") {
        $("./span[@class='select-all']") {
          add_class("mw_bar2 mw_noarrow")
        }
        $(".//div[contains(@class,'product-filter')]") {
          insert("div", id: "mw_sort_select_wrapper") {
            # SORT BY
            # inject the select here, custom js will populate the select options
            insert("select", id: "mw_sort_select", class: "mw_tbar2") 
          }
        }
        $(".//span[contains(@class, 'add-cart')]") {
          add_class("mw_btn1")
          attributes(onclick: "alert('Transferring to Cart...')")
        }
        $(".//span[contains(@class, 'copy-to-list')]") {
          add_class("mw_btn2")
        }
        make_two_column("./span[contains(@class,'select-all')]", "div[@class='product-filter']")
        make_two_column("./span[1]","./span[1]")
      }
    }
    $(".//div[contains(@id,'productFilter')]") {
      remove("./label")
    }
    //End Body
  }
}

