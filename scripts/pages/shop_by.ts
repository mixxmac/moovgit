$("./body") {
  add_class("mw_shop_by")
  
  $("//header") {
     insert_after("div", class: "mw_title") {
       $title = fetch("/html/body//dd[contains(@class, 'Header')]//h3/text()")
       inner($title)
     }
   }
  
   $(".//div[@id='container']") {
     inner_wrap("div", class: "mw_remove_me")

     insert_top("div", id: "mw_main_content") {
       move_here("./ancestor::div[@id='container']//div[@class='letterContents']") {
         
         # remove back to top link
         remove(".//div[contains(@class, 'linkToAlpha')]")
         
         # remove empty sections
         remove("./self::*[.//ul[not(.//a)]]")
         
         attributes(data-ur-set: "toggler")
         $(".//h3") {
           attributes(data-ur-toggler-component: "button")
           add_class("mw_bar1")
         }
         $("./ul") {
           attributes(data-ur-toggler-component: "content")
           $(".//a") {
             add_class("mw_bar2")
           }
         }
       }
       
       $("./div[position() = 1]") {
         # enable first 2 togglers by default
         attributes(data-ur-state: "enabled")
         $(".//*[@data-ur-toggler-component]") {
           attributes(data-ur-state: "enabled")
         }
       }
       
     }
     
     remove("./div[@class='mw_remove_me']")
   }
}