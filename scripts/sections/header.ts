$("./body[contains(@class, 'checkoutProcessPage')]") {
  $(".//div[@id='checkoutHeader']//a") {
    $alt = fetch("./text()")
    text("")
    inner_wrap("div", class: "sprites-logo", alt: $alt)
  }
  $(".//div[@id='container']") {
    move_here("../div[@id='checkoutHeader']",position("top")) {
      wrap("div", id: "header")
    }
  }
}
match($path) {
  with(/profile\/profile\.cfm/) {
    remove(".//img[contains(@src, 'spacer')]")
    remove(".//table//tr[2]")
    remove(".//td[@width='595']/../td[2]")
    $("./body") {
      add_class("mw_app_head")
    }
  }
}
match($source_host) {
  # GNC-66, GNC-67, GNC-68
  with(/gnclivewell/) {
    $(".//img[contains(@src, 'logo')]/../../../td[1]") {
      name("div")
      attribute("id", "logo")
    }
  }
}
$("./body") {
  $(".//div[@id='header']") {
    inner_wrap("div", class: "mw_old_header mw_hide")
    insert("header", id: "mw_header", class: "mw_box1") {
      # logo, search, cart, menu
      move_here("//div[@id='logo']") {
        $(".//a") {
          add_class("sprites-logo") 
          text("")
        }
      }

      insert("div", class: "mw_btn_group") {
        # GNC-66, GNC-67, GNC-68
        $("./ancestor::div[@id='header']//form[contains(@id, 'search')][1]") {
          add_class("mw_original_seach")
        }
        copy_here("./ancestor::div[@id='header']//form[contains(@id, 'search')][1]") {

          ###########################################
          ################## SEARCH #################
          ###########################################
          attributes(class: "mw_search_contents", data-ur-toggler-component: "content")
          attribute("id") {
            # make unique id
            value() {
              prepend("mw_header_")
            }
          }
          wrap("span", data-ur-set: "toggler") {
            insert_top("div", class: "mw_search_btn mw_header_btn", data-ur-toggler-component: "button") {
              insert("div", class: "sprites-largesearch")
            }
          }
          $(".//input[@type='submit']") {
            # submit search query
            add_class("mw_hide")
            $searchid = "mw_search_submit_id"
            attributes(id: $searchid, style: "")
          }
          $(".//div[@id='searchInputContainer']") {
            add_class("mw_flex_box")
            $(".//input[@type='text']") {
              attributes(placeholder: "Enter a Keyword or Item #", autocorrect: "off", autocomplete: "off", value: "", class: "mw_flex_box_item_1")
              insert_after("div", class: "mw_submit_search", onclick: "x$('#" + $searchid + "').click();") {
                insert("div", class: "sprites-smallsearch")
              }
            }
          }
        }


        copy_here("./ancestor::div[@id='header']//ul[@id='util']/li[@id='cart']//a[@id='shoppingBag']") {
          
          ###########################################
          ############ SHOPPING CART ################
          ###########################################
          add_class("mw_cart_btn mw_header_btn")
          $(".//*[@id='cartPrice']") {
            trim_whitespace()
            $cartCount = fetch("./text()")
            $cartCount {
              replace(/Item(s)?.*/m, "")
            }
          }
          remove("./*")
          insert("div", class: "mw_cart_btn_inner") {
            insert("span", class: "mw_cart_count", $cartCount)
            insert("div", class: "sprites-largecart")
          }
        }

        insert("div", class: "mw_menu_btn mw_header_btn") {
          insert("div", class: "sprites-menu")
        }
      
      }
      
      ###########################################
      ############ BREADCRUMB ###################
      ###########################################
      move_here("//div[@id='breadcrumbs']") {
        inner_wrap("div", class: "mw_remove")
        # find and keep the last breadcrumb which is a link
        # sometimes the last breadcrumb is the current page (and not a link)
        # sometimes it is one step above the current page (which is a link)
        $(".//ul") {
          remove("./li[not(./a)]")
        }
        copy_here(".//ul/li[last()]/a") {
          wrap_nonempty_text("span")
          insert_top("span", "&lsaquo; ", class: "mw_breadcrumb_bracket")
          add_class("mw_breadcrumb")
        }
        remove("./div[@class='mw_remove']")
      }
    }
    
    $("./div[contains(@class, 'mw_old_header')]") {
      # GNC-66, GNC-67, GNC-68
      $(".//a[./img]") {
        text(fetch("./img/@alt"))
      }
      # GNC-66, GNC-67, GNC-68 end
      remove(".//img")
    }
    
  }
}
