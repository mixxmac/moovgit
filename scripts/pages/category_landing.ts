$("./body") {
  add_class("mw_category_landing")
  
  $("//header") {
     insert_after("div", class: "mw_title") {
       $title = fetch("/html/body//div[@id='subCatWrap']//dt/text()")
       inner($title)
     }
   }
  
   $(".//div[@id='container']") {
     inner_wrap("div", class: "mw_remove_me")

     insert_top("div", id: "mw_main_content") {
       move_here("./ancestor::div[@id='container']//div[@id='subCatWrap']") {
         inner_wrap("div", class: "mw_remove_me")
         insert("div", "Browse", class: "mw_bar1")
         move_here(".//a") {
           add_class("mw_bar2")
         }
         remove("./div[@class='mw_remove_me']")
       }
     }
     
     remove("./div[@class='mw_remove_me']")
   }
  
}