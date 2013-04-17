$("./body") {
  add_class("mw_cart")  
  $("//header") {
    insert_after("div", class: "mw_title") {
      text("SHOPPING CART")
    }
  }
  $(".//td[@class='goldCardMessage']") {
    wrap_text_children("span",class:"mw_gmessage_text")
  }
  remove(".//table[not(contains(@class, 'mw_totals_section'))]/tr/td/br")  
  table_dump(".//table[@id='cart-cross-sells']")
  $(".//div[@id='cart-cross-sells']") {
    $("./div[1]") {
      add_class("mw_bar2")
      text(downcase(text()))
      inner() {
        replace(/\:$/, "")
      }
    }
    # wrap_together("./*","span") 
    #    ur_toggler("./div", "./span")
  }
  $(".//div[@id='container']") {
    $(".//img[@id='proceedtocheckoutbut']") {
      name("div")
      add_class("mw_btn1")
      text(fetch("./@alt")) {
        replace(/secure\s/i, "")
      }
      remove("../../div[@class='paypalOrDiv']")
      $("./ancestor::a") {
        move_here("..//*[@id='payPalExpressBtn']", position("after")) {
          wrap("div", style: "text-align: center;")
          $(".//img") {
            attributes(align: "center")
          }
          insert_after("div","Continue Shopping", class: "mw_btn") {
            wrap("a", href: "../../")
          }
        }
      }
    }
   # GNC-88 remove underline for "Tap Here"
    $(".//a[contains(@class,'pagelink')]") {
      attributes(style:"")
    }
    $(".//font[@class='details']") {
      name("div")
    }

    # remove the img theyre using for title
    remove(".//img[contains(@src, 'yourcart.gif')]")
    remove(".//font[contains(@class, 'alert')]/../../*")
   
    $(".//img[contains(@src, 'padlock')]") {
      add_class("mw_float_right mw_margin_left")
      $("../a") {
        text() {
          replace("Click Here", "Tap Here")
        }
      }
    }
    $(".//td[@id='checkout2cartIncludeHelpLinkHolder']") {
      attribute("width", "100%")
      remove("../td[1]")
    }
    

    $(".//table[.//img[contains(@class, 'proceed-to-checkout')]]") {
      remove(".//img[contains(@src, 'continueShopping')]")
      $(".//img[contains(@class, 'proceed-to-checkout')]") {
        insert_after("div", "PROCEED TO CHECKOUT", class: "mw_btn1") 
        remove()
      }
    }

    table_dump(".//table[@id='cartProductsTable']") {
      # table of all the products

      # add the index as a class for the labels
      $("./div[.//*[contains(@class, 'maincolor')]]") {
        add_class("mw_hide")
        $("./div[contains(@class, 'mw_was_td')]") {
          add_class("mw_tdlabel"+index())
          $(".//label[@for='quantBx']") {
            text() {
              replace(".", ":")
            }
          }
          remove(".//br")
          remove(".//img")
          $(".//a") {
            name("span")
            attributes(href: "")
          }
        }
      }
      
      $(".//div[contains(@class, 'cartrow') and contains(@class, 'mw_was_tr')]") {
        # remove the tr's that is all whitespace
        $("./div") {
          remove_self_if_empty()
        }
        remove_self_if_empty()
        insert_after("div", class:"mw_hr")
      }
      
      $(".//div[contains(@class, 'cartInfoRow')]") {
        # each product entry
        $("./div[contains(@class, 'mw_was_td')]") {
          add_class("mw_td"+index())
          $("./div[contains(@class,'mw_was_table')]//div[contains(@class,'mw_was_td')]") {
            wrap_nonempty_text("span", class: "mw_detail_text") {
              move_here("../b[1]", position("top"))
            }
          }
        }
        
        $cartInfoRowAncestor = "./ancestor::div[contains(@class, 'cartInfoRow')][1]"
        #inner_wrap("div", class: "mw_hide")
        insert("div", class: "mw_product_row") {
          
          ###########################################
          ###### PRODUCT IMAGE, TITLE, QTY ##########
          ###########################################
          insert("div", class: "mw_top_row") {
            # top row has product image, title, and then qty/removeitem at the right
            move_here($cartInfoRowAncestor+"//img[contains(@class, 'cart_prod_image')]/parent::*") {
              # product image
              wrap("div", class: "mw_product_image")
            }
            # product title
            move_here($cartInfoRowAncestor+"//a[contains(@class, 'cartProductTitle')]") {
              wrap("div", class: "mw_product_title") {
                # product size/item num
                move_here($cartInfoRowAncestor+"//div[contains(@class, 'mw_was_td') and .//*[contains(@class, 'cartItemNumber')]]")
                wrap("div", class: "mw_info_right") {
                  # product qty/remove item
                  move_here($cartInfoRowAncestor+"//div[contains(@class, 'mw_was_td') and .//input[contains(@class, 'cartQtyValue')]]") {
                    add_class("mw_qty")
                    $(".//a[contains(@href, 'Remove')]") {
                      # remove item
                      add_class("mw_remove_item")
                      text() {
                        replace(/\s*-\s*/, "")
                      }
                    }
                    $(".//input[contains(@class, 'cartQtyValue')]") {
                      attributes(type: "tel")
                      wrap("div", style: "margin-left: 50%;")
                    }
                    copy_here("./ancestor::div[@id='cartProductsTable']//*[contains(@class, 'mw_tdlabel1')]", "top")
                    remove("./*[contains(@class, 'mw_tdlabel')][position() > 1]")
                    wrap("div", class: "mw_title_qty")
                  }
                  remove(".//br")
                  
                  ###########################################
                  ############ PROMOS #######################
                  ###########################################
                  move_here($cartInfoRowAncestor+"/following-sibling::*[1]//div[contains(@class, 'mw_was_td') and .//*[contains(@class, 'promodetails')]]") {
                    add_class("mw_promos")
                  }
                  ###########################################
                  ############ STOCK/SHIPPING ###############
                  ###########################################
                  move_here($cartInfoRowAncestor+"//div[contains(@class, 'mw_was_td') and .//*[contains(text(), 'Shipping')  or contains(text(), 'BACKORDER') or contains(text(), 'STOCK')]]") {
                    remove("./br")
                    attribute("style", "margin: 10px 0;")
                  }

                  ###########################################
                  ####### UNIT PRICE/TOTAL PRICE ############
                  ###########################################
                  move_here($cartInfoRowAncestor+"//div[contains(@class, 'mw_td4')]") {
                    add_class("mw_item_unit_price")
                    copy_here("./ancestor::div[@id='cartProductsTable']//*[contains(@class, 'mw_tdlabel4')]", "top")
                    remove("./*[contains(@class, 'mw_tdlabel')][position() > 1]")
                    wrap_text_children("div" ,class:"mw_unit_price")
                  }
                  move_here($cartInfoRowAncestor+"//div[contains(@class, 'mw_td5')]") {
                    # unit price times quantity
                    add_class("mw_item_total_price")
                    copy_here("./ancestor::div[@id='cartProductsTable']//*[contains(@class, 'mw_tdlabel5')]", "top")
                    remove("./*[contains(@class, 'mw_tdlabel')][position() > 1]")
                    $("./b") {
                      # wrap("div", class:"")
                      add_class("mw_total_price")
                    }
                  }
                  $(".//*") {
                    # remove the align right leftover from table
                    attributes(align: "", valign: "")
                  }
                }
              }
            }
          }
        }
      }
    
      $(".//div[contains(@class, 'mw_was_tr') and .//a[contains(@href, 'addGoldCard')]]") {
        ###########################################
        ############ GOLD CARD ####################
        ###########################################
        $("./div[contains(@class, 'mw_was_td')]") {
          add_class("mw_td"+index())
        }
        insert("div", class: "mw_gold_card_row") {
          $goldCardAncestor = "./ancestor::div[contains(@class, 'mw_was_tr')][1]"
          insert("div", class: "mw_top_row") {
            move_here($goldCardAncestor+"//a[.//img[contains(@src, 'product_image')]]") {
              add_class("mw_product_image")
              wrap("div",class:"mw_product_image") #for GNC-88
            }
            insert("div", class: "mw_info_right") {
              move_here($goldCardAncestor+"//a[contains(text(), 'Gold Card')]")
              move_here($goldCardAncestor+"//div[contains(@class, 'mw_was_td') and .//*[contains(text(), 'Shipping') or contains(text(), 'STOCK')]]")
              move_here($goldCardAncestor+"/following-sibling::*[.//div[contains(@class, 'goldCardMessage')]]")
              
              # unit price
              move_here($goldCardAncestor+"//div[contains(@class, 'mw_td4')]")
              # total price
              move_here($goldCardAncestor+"//div[contains(@class, 'mw_td5')]")
              
              move_here($goldCardAncestor+"//div[contains(@class, 'mw_was_td') and .//a[contains(@href, 'addGoldCard')]]") {
                $(".//a[contains(@href, 'addGoldCard')]") {
                  $("./img") {
                    insert_after("div", "ADD ITEM TO CART", class: "mw_btn1 mw_add_item_text") {
                      $("ancestor::div[contains(@class,'mw_was_td')][1]") {
                        add_class("mw_gold_add_cart")
                      }
                      insert_bottom("div", class: "sprites-arrowrwhite")
                    }
                    remove()
                  }
                }
              }
              # GNC-88 for gold card
              $("./a") {
                wrap("div",class:"mw_product_title") {
                  $("./following-sibling::div[contains(@class, 'mw_was_td')][1]") {
                    add_class("mw_ship_info")
                    remove(".//br")
                    $("following-sibling::div[contains(@class, 'mw_was_tr')][.//div[contains(@class, 'goldCardMessage')]]") {
                      move_here("following-sibling::div[contains(@align, 'right')]", "before")
                    }
                  }
                }
              }
              $("./div[contains(@class,'mw_td4')]") {
                wrap("div", class: "mw_gold_card_price") {
                  insert_top("div", class:"mw_price_content", "Price")
                  $("./following-sibling::div[contains(@class,'mw_td5')]") {
                    wrap("div", class: "mw_gold_card_total") {
                      insert_top("div", class:"mw_total_content", "Total")
                    }
                  }
                }
              }
              # End GNC-88 for gold card
            }
          }
        }
      }
      
      $(".//div[contains(@class, 'mw_was_tr') and .//img[contains(@src, 'updatecart')]]") {
        ###########################################
        ############ UPDATE CART/PROMO CODE #######
        ###########################################
        $(".//a[.//img[contains(@src, 'updatecart')]]") {
          # move the update cart button out of this container
          add_class("mw_update_cart")
          move_to("./ancestor::div[contains(@class, 'mw_was_tr')][1]", "before")
          $(".//img[contains(@src, 'updatecart')]") {
            $btn_text = upcase(fetch("./@alt"))
            insert_before("div", $btn_text, class: "mw_btn2")
            remove()
          }
        }
        
        attributes(data-ur-set: "toggler")
        add_class("mw_promo_code")
        inner_wrap("div", data-ur-toggler-component: "content", style: "margin: 0 10px;") 
        move_here(".//label", "top") {
          attributes(data-ur-toggler-component: "button", class: "mw_bar2")
          text("Using a Promotional Code?")
        }
        $(".//a[contains(@href, 'updatePromo')]") {
          $(".//img") {
            $btn_text = fetch("./@alt")
            insert_before("div", $btn_text, class: "mw_btn2")
            remove()
          }
        }
      }
    }
    
    # $(".//table[.//b[contains(text(), 'Merchandise Subtotal') or contains(text(), 'Estimated Total')]]") {
      $(".//td[@class='costTotal']/ancestor::table[1]") {
      add_class("mw_totals_section")
      $(".//td[contains(@class,'costTotal') and not(@height)]") {
        $total = fetch("./b/text()")
        $("//div[contains(@class, 'mw_btn1')][not(contains(@class,'mw_add_item_text'))]") {
          add_class("mw_btn_checkout")
          insert_top("span", $total + "&middot; ")
          $("self::div[contains(@class,'mw_btn_checkout')][1]") {
            insert_after("div",class:"mw_hr")
          }
        }
        # attributes(class: "mw_costTot")
        add_class("mw_costTot")
      }
      # remove space after price
      $(".//td[@class='goldCardSavings']/b") {
        inner() {
          replace(/^[\s\u00a0]+/, "")
          replace(/\$\s+/, "$")
          replace(/[\s\u00a0]+\|$/, "")
        }
      }
      remove(".//tr[./td/table]")
      $(".//tr[./td[@class='costTotal']]") {
        add_class("mw_total_tr")
        $("preceding-sibling::tr[1]") {
          add_class("mw_total_subtr")
          $(".//a") {
            text() {
              replace("Click Here", "Tap Here")
            }
          }
          insert_after("tr",class:"mw_tr") {
            insert("td",class:"mw_td_first") {
              insert("div",class:"mw_subhr")
            }
            insert("td",class:"mw_td_last") {
              insert("div",class:"mw_subhr")
            }
          }
        }
        insert_after("tr",class:"mw_tr") {
          insert("td",class:"mw_td_first") {
            insert("div",class:"mw_subhr")
          }
          insert("td",class:"mw_td_last") {
            insert("div",class:"mw_subhr")
          }
        }
      }
    }
    $(".//a[contains(@href, 'home/index.jsp')]") {
      attribute("onclick", "")
      $(".//img[contains(@src,'checkout.gif')]") {
        insert_before("div", "PROCEED TO CHECKOUT", class: "mw_btn1")
        remove()
      }
      $(".//img[contains(@src, 'returntoshopping')]") {
        insert_before("div", "RETURN TO SHOPPING", class: "mw_btn1 mw_noarrow")
        $("//b[contains(text(), 'no products')]") {
          remove("../br")
        }
        remove()
      }
    }
  }
  $(".//div[@class='mw_title_qty']/following-sibling::div[1]") {
    add_class("mw_ship_info")
    wrap_nonempty_text("span", class:"mw_ship_detail") {
      move_here("following-sibling::font[@class='']")
      text() {
        replace(/\s-\s$/, "")
      }
    }
    $("./div") {
      wrap_nonempty_text("span")
    }
  }
  $(".//div[@id='cartCrossSells']") {
    remove("./br")
    move_to("preceding-sibling::div[@id='cartProductsTable']","after")
  }
  $(".//div[@id='cart-cross-sells']") {
    remove(".//br | .//@style | .//@align |.//@height")
    attributes(data-ur-set: "toggler") {
      inner_wrap("div", class:"mw_also_content") {
        attributes(data-ur-toggler-component: "content")
        $("./div[contains(@class,'mw_bar2')]") {
          attributes(data-ur-toggler-component: "button")
          move_to("ancestor::div[@class='mw_also_content']", "before")
        }
        $("./div[contains(@class,'mw_was')]") {
          add_class("mw_also_item")
          $(".//a[img[@class='regImage']]") {
            add_class("mw_also_img")
          }
        }
        $(".//div[@class='crossSellProdData']/ancestor::div[contains(@class,'mw_was_td')][1]") {
          add_class("mw_also_right")
          remove("./img")
          wrap_text_children("div",class:"mw_qty")
          $(".//div[@class='crossSellProdData']/following-sibling::span[1]") {
            add_class("mw_regular_price")
          }
          $("./a") {
            text(upcase(fetch("./img/@alt")))
            add_class("mw_btn1")
            attributes(style: "color: white; display: inline-block; padding-right: 30px;");
          }
          $("./ancestor::div[contains(@class, 'mw_was_tr')]") {
            insert_bottom("div") {
              attributes(style: "display: inline-block;")
              move_here("../div/div[@class='mw_qty']") {
                attributes(style: "display: inline-block; text-transform: uppercase;";)
              }
              move_here("../div/input[@name='quantity']") {
                attributes(style: "display: inline-block; margin: 0px 10px;")
                
              }
              move_here("../div/a")
            }
          }
        }
      }
    }
    # you may also interesting qty section
    $(".//div[./div[@class='mw_qty']]") {
      add_class("mw_add_cart")
      $("./a[contains(@class,'mw_btn1')]") {
        text("add item to cart")
      }
    }
  }
  $(".//tr[./td/img[contains(@src,'cart2_padlock')]]") {
    add_class("mw_lock")
    $("./td") {
      attributes(style: "padding-right: 30px;")
      wrap_nonempty_text('span') 
      $("./span[1]") {
        text() {
          replace(/\A\s*/, "")
        }
      }
    }
    insert("td", class: "sprites-lock")
    remove("./td/img")
  }
  $(".//div[contains(@class,'mw_qty')]/b") {
    text() {
      replace("every:", ":")
    }
  }
}
