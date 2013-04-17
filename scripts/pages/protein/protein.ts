$("./body") {
  insert_top("a", name: "mw_top")
  add_class("mw_protein")
  remove(".//img")
  remove(".//div[contains(@style, 'line-height:1px;')][contains(@style,'background-color')]")
  insert_top("script", src: "http://www.gnclivewell.com/proteinnumber/js/scripts.js")
  $(".//div[@id='maincontent']/div[contains(@class,'pad15')]") {
    remove("./div[contains(@class, 'spacer')][1]")
    remove(".//div[contains(@class,'clearit')]/../p")
    $("./script") {
      text() {
        rewrite_js()
      }
    }

    //Protein sub page 
    $(".//div[@id='protein_meals']") {
      remove(".//div[contains(@class,'col_spacer')]")
      $(".//div[contains(@class,'col_')]") {
        attributes(style:"")
        $("./div[not(@class)]") {
          add_class("mw_active_text")
        }
        $("./div[contains(@class,'header')]") {
          add_class("mw_bar1")
        }
        ur_toggler("./div[contains(@class,'header')]","./div[contains(@class,'mw_active_text')]")
      }
    }
    $(".//div[contains(@class, 'button_addtocart')]") {
      add_class("mw_btn1")
      text("Add to Cart")
      insert_bottom("div", class: "sprites-addtocart", style: "display:inline;vertical-align:center;")
      $("../div[not(class)]") {
        $id = ''
        $("./input") {
          $id = fetch("./@id")
        }
        wrap_nonempty_text("label", for: $id) 
      }
    }
    //end sub page
    
    remove(".//div[contains(@style, 'height:30px;') or contains(@style,'height:40px;')]")

    //ADD SOCIAL ICONS
    $("./div[last()][not(contains(@class,'rightcontent'))]") {
      add_class("mw_social")
      $("./div[1]"){
        attributes(style: "margin: 10px 0px 0px 20px; display: block;")
      }
      $("./div[2]") {
        attributes(style: "margin: 0px 0px 10px 20px; display: block;")
        $("./iframe") {
          name("a")
          attributes(href: fetch("./@src"))
          insert("div", class: "sprites-twitter mw_inline") 
        }
      }
      move_here("//div[@id='contentswap']", position("after"))
      move_here("//div[@id='contentswapnav']", position("after"))
    }
    //END SOCIAL ICONS

    table_dump(".//table")
    $(".//div[contains(@class, 'error')]") {
      remove_self_if_empty()
    }
    $(".//h1") {
      attributes(style:"")
      add_class("mw_header")
    }
    $("./div[@id='contentswap']") {
      insert_after("div", "Find My Protein Number", class: "mw_btn1") {
        wrap("a", href: "#mw_top")
        insert_bottom("div", class: "sprites-smalladdtocart", style: "float:right; margin:5px;")
      }
      insert_after("div", "Why Does My Body Need Protein?", class:"mw_btn2", id: "mw_btn_update", onclick:'clicknext(this)')
    }
    $(".//input[@type='image']") {
      attributes(value: fetch("./@alt"), type: "submit", class: "mw_btn1 mw_float_left")
      move_here("//div[contains(@class, 'mw_social')]", position("after")) {
        remove_self_if_empty()
      }
    }
    $(".//input[@type='radio'][@name='gender']") {
      $id = fetch("./@id")
      $name = fetch("./@id")
      $id {
        log($id)
        replace("gender", "")
        replace("2", "3")
        replace("1", "2")
      }
        log($id)
      $("../../div["+$id+"]") {
        wrap("label", for: $name)
      }
    }
  }
}
