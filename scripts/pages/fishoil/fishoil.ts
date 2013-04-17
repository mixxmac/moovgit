$("./body") {
  add_class("mw_fish_oil")
  $("./div[@id='wrapper']") {
    # remove empty
    remove(".//div[contains(@class, 'spacer') and not(*)]")
    # top content
    $("./div[@id='features']") {
      $("./div[@id='featurebox']") {
        $("./div[@id='slide1']") {
          $(".//a[@class='firstdroplink']") {
            add_class("mw_btn1")
            $("./img[contains(@src, 'dropbutton.png')]") {
              insert_after("span", "FIND YOUR VITAPAK PROGRAM")
            }
            $("./img[contains(@src, 'button_findyourprobiotic_new.png')]") {
              insert_after("span", "FIND YOUR PROBIOTIC")
            }
            remove("./img")
          }
          $(".//ul") {
            add_class("mw_upper_list")
            remove(".//@style| .//br")
          }
        }
        remove("./div[@id='content_midlevel' or @id='whitebox']")
      }
      # video content
      $("./div[iframe[@id='youtube_vid']]") {
        remove("./div[@id='med']")
        remove("./iframe/@width | ./iframe/@height")
      }
    }
    # end top content
    remove("./div[./img[contains(@src, 'arrow')]] | .//div[contains(@class, 'ds_center')]/@style")
    $(".//div[@id='nav']") {
      wrap("div", id: "benefitline")
      remove("./@style | ./*/@style | ./div[img]")
      # hava male and female tab
      # http://www.gnclivewell.com/vitapak/?utm_source=gnc&utm_medium=banner&utm_content=Vita_doc_banner&utm_campaign=Vita_Pak
      $("./div[@id='genderbox']") {
        # remove more content
        remove("./div")
        remove("./@style")
        attributes(data-ur-set: "tabs")
        $("./a[@class='genderlink']") {
          add_class("mw_flex_box_item_1")
          $tab_button_id = fetch("./@id") {
            replace(/^gender_/, "")
          }
          attributes(data-ur-tabs-component: "button", data-ur-state: "disabled", data-ur-tab-id: $tab_button_id)
        }
        move_here("./ancestor::div[@id='nav']/div[@id='navbox']/div[@class='gendercats']", "bottom") {
          $tab_content_id = fetch("./@id") {
            replace(/box$/, "")
          }
          attributes(data-ur-tabs-component: "content", data-ur-tab-id: $tab_content_id)
        }
        wrap_together("./a[@data-ur-tabs-component='button']", "div", class: "mw_male_wrap mw_flex_box") {
          # keep navbox_title
          move_here("./ancestor::div[@id='genderbox']/following-sibling::div[contains(@class, 'navbox_title')]", "after")
        }
      }
      # end hava male and female tab
      # gendercats
      $(".//div[@class='gendercats']") {
        inner_wrap("div", data-ur-set: "tabs", data-ur-closeable: "true") {
          remove("./div[@class='clearbox']/div[not(*)]")
          $("./div[@class='clearbox']/a") {
            attributes(href: "")
            $default_selectd = ""
            $("./self::a[@style]") {
              $default_selectd = "enabled"
            }
            attributes(data-ur-tabs-component: "button", data-ur-state: "disabled", class: "mw_bar2 catlink", data-ur-tab-id: fetch("./@id"), data-ur-state: $default_selectd)
            insert_after("div", data-ur-tabs-component: "content", data-ur-tab-id: fetch("./@id"), data-ur-state: $default_selectd)
            $("./self::a[@title]") {
              text(upcase(fetch("./@title")))
            }
          }
        }
        remove(".//@style")
      }
      # end gendercats
    }
    $("./div[@id='productload']") {
      remove(".//@style | .//@width | .//@height")
      remove("./div[img] | .//div[@class='clearit']")
      $("./h2") {
        add_class("mw_h2")
      }
      $(".//table") {
        remove(".//div[@id='navleft' or @id='navright']")
        table_dump(".")
      }
    }
    $("./div[@id='productview']") {
      # remove empty
      remove("./div[@class='clearbox' and not(*)]")
      move_here("./following-sibling::div[@id='productreview']", "bottom") {
        remove("./div[@class='quote_left' or @class='quote_right' or @class='clearit']")
      }
      inner_wrap("div", class: "mw_product_wrap") {
        $(".//div[@class='quotetitle']/a") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
      }
    }
    $("./div[iframe[contains(@src, 'facebook')]]") {
      add_class("mw_social")
      remove("./@align")
    }
    $("//div[@id='features']") {
      add_class("hi")
      move_here("../div[contains(@class, 'mw_social')]", position("bottom"))
    }
    insert_bottom("div", class: "mw_fish_oil_mask")
  }
}
