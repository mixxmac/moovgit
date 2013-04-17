move_here("/html/body//form[contains(@class, 'mw_original_seach')]") {
  wrap("div", class: "mw_search_wrapper")
  # GNC-66, GNC-67, GNC-68
  $("./table") {
    move_here(".//div[./input[@type='text']]", "bottom") {
      attributes(id: "searchInputContainer")
      $("./div") {
        add_class("mw_hide")
      }
      $(".//input[@type='image']") {
        add_class("mw_hide")
      }
      $(".//input[@type='text']") {
        attributes(id: "search-box", onkeyup: "javascript:if(event.keyCode==13){this.blur();}", style: "")
      }
    }
    $("./tr") {
      remove()
    }
    name("fieldset")
      attributes(width: "", border: "", cellspacing: "", cellpadding: "")
  }
  # GNC-66, GNC-67, GNC-68 end
  $(".//input[@type='text']") {
    attributes(placeholder: "Search", autocomplete: "off", autocorrect: "off", value: "")
  }
  $(".//input[@type='submit']") {
    add_class("mw_hide")
    attributes(style: "")
  }
  $(".//div[@id='searchError']") {
    add_class("mw_hide")
  }
}

###########################################
############ START OF SHOP TOGGLER ########
###########################################
insert_shop_toggler()
# GNC-40 Include Clearance in navigation
$("./div[@id='mainNav']/div[@class='mw_shop_toggler']") {
  move_here("/html/body//div[@id='header']/div[contains(@class,'mw_old_header')]//ul[@id='subNav']/li/a[contains(text(),'Clearance')]","top") {
    add_class("mw_bar2 mw_noarrow mw_clearance")
    insert_top("div", class: "sprites-promo")
  }
}
###########################################
############ END OF SHOP TOGGLER ##########
###########################################

###########################################
############## STORE LOCATOR ##############
###########################################
match($source_host) {
  with(/gnclivewell/) {
    $("/html/body//a[contains(@href, 'storeLocator')]") {
      attributes(id: "store-locator-nav")
      text("Stores")
    }
  }
}
copy_here("/html/body//a[@id='store-locator-nav']") {
  # store locator is also used in footer - change the id
  $href = fetch("./@href")
  $text = fetch("./text()")

  insert_after("a", $text, href: $href, class: "mw_bar2 mw_noarrow") {
    wrap_nonempty_text("span") {
      text("Stores")
    }
    insert_top("div", class: "sprites-stores")
  }
  remove()
}

###########################################
################## SIGN IN ################
###########################################
copy_here("/html/body//ul[@id='util']//a[contains(@href, 'step=register')]") {
  add_class("mw_bar2 mw_noarrow")
  wrap_nonempty_text("span")
  insert_top("div", class: "sprites-signin")
}

###########################################
################## LOG OUT ################
###########################################
copy_here("/html/body//ul[@id='util']//a[contains(@href, 'step=logout')]") {
  add_class("mw_bar2 mw_noarrow")
  wrap_nonempty_text("span")
  insert_top("div", class: "sprites-signout")
}

###########################################
############### MY ACCOUNT ################
###########################################
copy_here("/html/body//ul[@id='util']//a[contains(@href, 'process=myaccount')]") {
  add_class("mw_bar2 mw_noarrow")
  wrap_nonempty_text("span")
  insert_top("div", class: "sprites-filter")
}

###########################################
################ MY ORDERS ################
###########################################
copy_here("/html/body//ul[@id='util']//a[contains(@href, 'step=ot')]") {
  add_class("mw_bar2 mw_noarrow")
  wrap_nonempty_text("span")
  insert_top("div", class: "sprites-myorders")
}
###########################################
############### SIGN UP ###################
###########################################
match($source_host) {
  with(/gnclivewell/) {
    $("/html/body//a[contains(@href, 'profile')]") {
      attributes(id: "signup-and-save")
    }
  }
}
copy_here("/html/body//a[@id='signup-and-save']") {
  add_class("mw_bar2 mw_noarrow")
  wrap_nonempty_text("span", class: "mw_subtext")
  insert_top("span", "Sign Up")
  insert_top("div", class: "sprites-signup")
}

###########################################
############ SHOPPING CART ################
###########################################
copy_here("/html/body//ul[@id='util']/li[@id='cart']//a[@id='shoppingBag']") {
  add_class("mw_bar2 mw_noarrow mw_cart_link")
  $("./span[@id='cartPrice']") {
    add_class("mw_subtext")
    text() {
      replace(/:/, "")
      capture(/\A(.*Item[s]?)(.*)\Z/m) {
        $cartCount = $1
        $cartPrice = $2
        $cartPrice {
          replace(/^\s*/, "")
          replace(/\s*$/, "")
        }
      }
    }
    remove_text_nodes()
    insert("span", $cartCount, class: "mw_cart_count")
    insert("span", class: "mw_square_separator")
    insert("span", $cartPrice, class: "mw_cart_price")
  }
  insert_top("span", "Shopping Cart")
  insert_top("div", class: "sprites-smallcart")
}
