#URI=http://www.gnc.com/product/index.jsp?productId=2134195
$("./body") {
  add_class("mw_product")
  
  $("//header") {
    insert_after("div", class: "mw_title") {
      $title = fetch("/html/body//div[@class='centerBlock']//h2/text()")
      inner($title)
    }
  }
  
  # price, qty, sku
  # reviews
  # gold card
  # img | promo
  # stock
  # qty | add to cart
  # learn more | add to list
  # fb share
  # ppl who but this also buy toggler
  # you may also be interested in toggler
  
  # tab carousel
  
  $(".//div[@id='container']") {
    inner_wrap("div", class: "mw_hide")
    
    insert_top("div", id: "mw_main_content") {
      ###########################################
      ####### PRICE, QUANTITY, ITEM CODE ########
      ###########################################
      insert("div", class: "mw_price_row") {
        attributes(style: "margin-bottom: 10px;")
        # price, product quantity, and sku/item code
        move_here("/html/body//div[@class='centerBlock']//*[@class='priceText']") {
          add_class("priceNow")
        }
        $("./*") {
          name("span")
        }
        $("./*[position() < last()]") {
          insert_after("span", class: "mw_square_separator")
        }
      }
      
      ###########################################
      ############ PRODUCT IMAGE/PROMOS #########
      ###########################################
      # image carousel
      move_here("./ancestor::div[@id='container']//div[@class='cardContentBlock']/div[@class='leftBlock']") {
        add_class("productImageBlock")
        $none = 'true'
        $(".//img") {
          $none = 'false'
        }
        
        log($none)
        match($none, 'true') {
          insert_top("a", class: "largeImg", id: "showEnlargedImage") {
            insert("img", id: "mainProductImage", style: "margin-bottom: -20px;", src: "http://www.gnc.com/images/card_leftad.gif", alt: "Gold Card Image")
            insert_bottom("a", id: "showEnlargedImageButton";)
          }
        }

        # remove extra product label button
        remove(".//ul[@id='techIcons']")
        
        wrap("div", class: "mw_product_promo_section") {
          insert("div", class: "mw_promos") {
            move_here("./ancestor::div[@id='container']//*[@class='shippingDetails']") {
              $(".//img[contains(@src, 'promo')]") {
                # replace existing promo icon with our own
                insert_before("div", class: "sprites-promo")
                remove()
              }
              $(".//*[@class='promodetails']") {
                attributes(style: "display: inline;")
                text() {
                  replace("See Promotion ", "")
                }
              }
              $(".//font[@class='alert']") {
                name("div")
                add_class("mw_promos_text")
                text() {
                  replace(/^\s/, "")
                  replace(/$/, " ")
                }
                move_here("./following-sibling::*", position("bottom"))
                wrap("div", class: "mw_sale_tag") {
                  attributes(style: "margin-left: 10px;")
                  move_here("./preceding-sibling::*", position("top"))
                }
              }
              remove("./br")
              remove_text_nodes()
            }
            # all available promos link
            //move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']/a[contains(text(), 'all available promo')]")
          }
        }
      }
      
      ###########################################
      ############ PRODUCT AVAILABILITY #########
      ###########################################
      move_here("./ancestor::div[@id='container']//*[@class='availabilityBlock']") {
        remove("./*[./img]")
        attributes(style: "margin: 10px 0;")
        $(".//font[@class='details']") {
          remove_text_nodes()
        }
      }
      move_here("./ancestor::div[@id='container']//*[@class='showPrice']") {
        $("./a[not(contains(@class, 'mw_btn1'))]") {
          insert_top("div", class: "sprites-arrowrwhite", style: "display: inline-block;-webkit-transform: rotateY(180deg);margin-right: 10px;")
          add_class("mw_btn1")
          attributes(style: "text-transform:uppercase;")
        }
      }
      move_here("./ancestor::div[@id='container']//*[@class='remindmeBlock']") {
        $("./div[contains(@class,'qty')]") {
          add_class("mw_flex_box")
        }
        $(".//a[./img[@name='addtocart']]") {
          add_class("mw_btn1")
          wrap("div", class: "mw_action_btns") {
            attributes(style: "margin: 10px 0;")
            $btn = path()
            add_class("mw_flex_box_item_1")
            insert_after("a")
          }
          text("ADD TO CART")
          insert_bottom("div", class: "sprites-addtocart", style: "margin-left: 10px;display: inline-block;")
        }
        $("./div[contains(@class, 'qty') and not(contains(@class, 'mw_qty'))]") {
          add_class("mw_qty")
          $("./img") {
            name("input")
            add_class("textboxSingle")
            attributes(type: "tel", src: "", id: "qty_0", disabled: "true", value: "1")
          }
          wrap("div", class: "qty") {
            move_here("../label","top")
            insert("div", class: "mw_learn_more_wrapper")
            move_here($btn, position("bottom"))
          }
        }
      }
      
      ###########################################
      ############ ADD TO CART/LIST #############
      ###########################################
      move_here("./ancestor::div[@id='container']//div[@class='wrap']/form")
      
      #links to account
      move_here("./ancestor::div[@id='container']//div[@class='rightBlock']/div[@class='floatLeft']") {
        $("./div[@class='cardRightAdv']") {
          move_here("./p/a") {
            add_class("mw_bar2")
            text(fetch("../h3/text()"))
          }
          remove("./h3")
          remove("./p")
        }
      }
      
      move_here("./ancestor::div[@id='container']//div[@class='cardBottomBlock']", position("after"))
      
      ###########################################
      ############ SOCIAL LINKS #################
      ###########################################
      insert("div", class: "mw_share_product") {

        move_here("./ancestor::div[@id='container']//div[@id='facebook-like']") {
          # facebook like
          $("./fbn_like") {
            # show short version of the # of likes
            attributes(layout: "button_count")
          }
        }
        move_here("./ancestor::div[@id='container']//a[contains(@class, 'button_facebook')][1]") {
          add_class("sprites-facebooksquare")
          wrap("div", class: "mw_share_right") {
            move_here("./ancestor::div[@id='container']//a[contains(@class, 'button_twitter')]") {
              add_class("sprites-twittersquare")
            }
            insert_top("span", "Share", class: "mw_share_label")
          }
        }
        insert_before("div",class:"mw_circle") {
          insert_top("div", class:"mw_top_circle") {
            wrap("div",class:"mw_top")
          }
          insert_bottom("div", class:"mw_bottom_circle") {
            wrap("div",class:"mw_bottom")
          }
        }
      }

      

      remove(".//div[@class='mw_share_product']/following::div[@class='mw_share_product']")
    }
  }
}
