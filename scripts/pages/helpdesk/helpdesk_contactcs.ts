$("./body") {
  add_class("mw_contactcs")
  $(".//div[@id='helpArticleBlk']") {
    move_here(".//a") {
      $text = fetch("./text()")
      $("./img[@src]") {
        $src = fetch("./@src")
        match($src) {
          with(/continue/i) {
            $text = "Continue"
            remove()
          } 
        }
      }
      attribute("class","mw_btn1")
      text($text) {
        replace(/\A[^a-zA-Z]*\s*/, "")
      }
      insert_bottom("div", class: "sprites-addtocart", style: "display: inline-block; margin-left: 10px;")
    }
    
    $(".//textarea") {
      add_class("mw_input")
    }
    
    $(".//select") {
      wrap("p") 
    }

    $id = "mw_radio_id"
    $(".//tr") {
      $index = index()
      $("./td[contains(@class, 'mw_input_radio')]"){
        attribute("valign", "middle")
        //unique id generator based off index()
        $uid = $id + $index
        $("./input") {
          attribute("id", $uid)
        }
        $("../td[2]") {
          inner_wrap("label", for: $uid)
        }
      }
      //Remove spacer trs
      $(".//td") {
        remove("br")
        remove_self_if_empty()
      }
      remove_self_if_empty()
    }
  }
}
