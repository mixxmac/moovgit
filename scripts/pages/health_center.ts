$("./body") {
  add_class("mw_health_center")
  $(".//div[@id='hni_GNCLeftNav']")  {
    $("./ul/li") {
      $("./div") {
        add_class("mw_bar1")
        attribute("style", "")
      }
      $("./ul") {
        attribute("style", "")
        $("./li") {
          move_here("./a", position("after")) {
            inner_wrap("li", class: "mw_bar2";)
            attributes(style: "")
          }
          remove()
        }
      }
      ur_toggler("./div", "./ul")
    }
  }
  $(".//div[@id='hni_TabsWrapper']") {
    $("./ul/li") {
      match(fetch("./@class")) {
        with(/hni_Active/) {
          $index = index()
          add_class("mw_save")
          $(".//span") {
            add_class("mw_header")
          }
          $("./preceding-sibling::li[1]") {
            add_class("mw_save mw_left")
          }
          $("./following-sibling::li[1]") {
            add_class("mw_save mw_right")
          }
        }
      }
    }
    remove("./ul/li[not(contains(@class, 'mw_save'))]")
    move_here("./ul/li[contains(@class, 'hni_Active')]", position("after")) {
      name("div")
    }
  }
  
  remove(".//div[@id='hni_HomeCallouts']/a") 

  $(".//div[contains(@class, 'hnie_SHRecipeMenu')]") {
    $("./h3") {
      add_class("mw_bar1")
      attributes(style: "color: white;")
    }
    $("ul/li") {
      move_here("./a", position("after")) {
        inner_wrap("li", class: "mw_bar2")
      }
      remove()
    }
    ur_toggler("./h3", "./ul")
  }

  $(".//div[contains(@class, 'hni_RelatedContentWrapper')]") {
    $(".//div[contains(@class, 'hni_RelatedTopicsHeading')]") {
      add_class("mw_bar1")
    }
    $(".//div[contains(@class,'hnise_RelatedContentList')]") {
      $("./ol/li") {
        move_here("./a",position("after")) {
          inner_wrap("li", class: "mw_bar2")
        }
        remove()
      }
    }
    move_here("../div[contains(@class, 'hnie_Byline')]", position("after"))
    move_here("../h2[contains(@class, 'hnise_Title')]", position("after"))
    move_here("../div[contains(@class,'hni_Active')]", position("after"))
    move_here("../div[@id='hni_TabsWrapper']", position("after"))
  }
  ur_toggler(".//div[contains(@class,'hni_RelatedTopicsHeading')]", ".//div[contains(@class,'hnise_RelatedContentList')]")  
  # main content comes in via 3rd party js (monetate)
}
