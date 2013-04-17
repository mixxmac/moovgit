$("./body") {
  //add main body class for css
  add_class("mw_helpdesk_sub")
  
  //---------------- generate accordion menu
  $(".//div[@id='help-topics']") {
    $("./h3") {
      name("div")
      add_class("mw_bar1")
      inner_wrap("span", class: "mw_text_left") 
      //Makes tables accessible to keyboard for debugging
      attributes(tabindex: "0", onkeypress: "if(event.keyCode==13)this.click()")
   }
    //generates option list from sidebar of gnc.com
    $("./ul") {
      name("div")
      add_class("mw_nav")
      attributes(tabindex: index())
      //only generates unique non-self elements in the list
      $seen = ''
      $("./li") {
        $("./a") {
          $href = fetch("./@href")
          $inner = inner()
          $title = fetch("./@title")
        } 
        match (inner()) {
          //Remove empty tabs
          with (/^$/) {
            remove()
          }
        }
        match($href) {
          with($path) {
            add_class("mw_bar4")
          } else() {
            add_class("mw_bar2")
            wrap("a", href: $href, title: $title)
          } 
        }
        inner($inner)
        name("div")
      }
    }
    ur_toggler("./div[1]", "./div[2]")
  }
  //---------------- end accordion menu
  $(".//div[@id='gnc_shop_1']") {
    attribute("style") {
      value() {
        replace(/width:[^;]*;/, "")
      }
    }
    $("./p[@class='header']") {
      add_class("mw_header")
    }
  }
  //---------------- Main Text Block
  $(".//div[@id='helpArticleBlk']") {
    //add mw_header class to header elements
    $(".//*[@class='header']") {
      name("p")
      add_class("mw_header")
      //Remove brs after header
      remove("../br")
      $("../b") {
        wrap("p")
      }
      $("../img") {
        add_class("mw_img_block")
      }
      $("../a") {
        wrap("p")
      }
    }

    //Make a form's input boxes formatted correctly
    $(".//form") {
      move_here("./tr/td") {
        //remove empty tds
        remove_self_if_empty()
        //rename to p
        name("p")
        //remove font styles
        attributes(style: "")
        $("./select") {
          add_class("mw_select")
          attributes(style: "")
        }
        $("./input[not(@type)]") {
          attribute("type", "text")
        }
        $("./input[@type='button']") {
          add_class("mw_btn1")
        }
        remove("br")
      }
    }
    #Removes tr nodes with only empty tds and brs
    $(".//tr") {
      $("./td") {
        remove("br")
        $("./p") {
          match(fetch("./b/text()")) {
            with (/^.+$/) {
              add_class("mw_sub_head")
            }
          }
        }
        match(fetch("./input/@type")) {
          with(/radio/) {
            add_class("mw_input_radio")
          }
        }
        remove_self_if_empty()
      }
      remove_self_if_empty()
    }
  }

  $(".//div[@id='mainContent']") {
    remove(".//form/br")
    %mainContent = this()
    $hasRadio = 'false'
    $(".//input[@type]") {
      match (fetch("./@type")) {
        with ("radio") {
          $hasRadio = 'true'
          add_class("mw_input_radio")
        }
        with ("submit") {
          add_class("mw_btn1")
        }
      }
    }
  }
}
