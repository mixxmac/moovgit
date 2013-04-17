#pull links to outside
$("./body"){
  add_class("mw_paypal")
  $(".//ul") {
    $("./li") {
      $("./a[last()-1]") {
        wrap("div") {
          add_class("mw_to_wrap")
        }
      }
      $("./a[last()]") {
        wrap("div") {
          add_class("mw_to_wrap")
        }
      }
      wrap_together("./*[contains(@class,'mw_to_wrap')]", "p") 
      remove("br")
    }
    remove("br")
    }
  }
