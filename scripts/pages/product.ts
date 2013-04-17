$("./body") {
  add_class("mw_product")
  
  insert("div", id: "mw_zoom_mask")
  
  remove(".//p[@id='BMLContainer']")
  $product_type = "one"
  
  # http://www.gnc.com/product/index.jsp?productId=4033437
  $(".//div[@class='productDescriptionBlock']/form[@id='orderFormProd']/div[@id='remindmeBlock']/div[contains(@class, 'remindeMeContainer')]") {
    remove("following-sibling::h2")
    $product_type = "two"
  }
  
  insert_top("script", data-keep: "true", type: "text/javascript", src: "https://www.gnc.com/js/mylists.js") 
   
  $("//header") {
    insert_after("div", class: "mw_title") {
      $title = fetch("/html/body//div[@class='productImageBlock']//h3/text()")
      inner($title)
    }
  }
  $(".//div[@id='lightBox']") {
    $(".//a[@id='acceptTerms']") {
      add_class("mw_accept_terms")
      $("../input") {
        attribute("style", "display: none;")
      }
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
        # price, product quantity, and sku/item code
        match($product_type, /one/) {
          move_here("./ancestor::div[@id='container']//*[@class='priceBlock']") {
            move_here("./*[@class='priceNow']", "top")
            $("./*[@class='priceWas']") {
              text() {
                replace(/Price:\s*/, "")
              }
            }
          }
        }
        move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']/small")
        move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']//*[@class='textitemCode']")
        $("./*") {
          name("span")
        }
        $("./*[position() < last()]") {
          insert_after("span", class: "mw_square_separator")
        }
      }
      
      wrap_text_children("div", class:"mw_add_cart_text") {
        insert_bottom("div", class: "sprites-arrowrwhite")
      }
      ###########################################
      ############ REVIEWS AT THE TOP ###########
      ###########################################
      move_here("./ancestor::div[@id='container']//*[@class='ratingBlock']") {
        $(".//div") {
          wrap_nonempty_text('span')
        }
      }
      
      ###########################################
      ############ GOLD CARD PRICE ##############
      ###########################################
      match($product_type, /one/) {
        move_here("./ancestor::div[@id='container']//*[contains(@class, 'cardText')]") {
          name("div")
          $("./img") {
            insert_after("div", class: "sprites-goldcard")
            remove()
          }
          wrap_nonempty_text("span")
          $("./a") {
            insert_before("span", class: "mw_square_separator")
          }
        }
      }
      
      ###########################################
      ############ PRODUCT IMAGE/PROMOS #########
      ###########################################
      # image carousel
      move_here("./ancestor::div[@id='container']//div[@class='productImageBlock']") {
        # remove extra product label button
        remove(".//ul[@id='techIcons']")
        
        $(".//div[@id='imgZoom']") {
          # use basic zoom
          # large image just takes up the whole width of the page
          remove(".//a[@id='showEnlargedImageButton']")
          $(".//div[@id='enlargedImageContent']") {
            $largeImgSource = fetch(".//img/@src")
            insert_before("div", id: "mw_large_image") {
              insert("img", src: $largeImgSource)
              insert("div", "&times;", class: "mw_close", onclick: "x$('#mw_zoom_btn').click();")
            }
            remove()
          }
          $("./a[@id='showEnlargedImage']") {
            # small image
            name("div")
            insert("div", id: "mw_zoom_btn", class: "sprites-zoomin", onclick: "x$('#mw_large_image').toggleClass('mw_active');")
            insert("div", class: "mw_zoom_btn_background")
          }
        }
        
        match($product_type) {
          with(/one/) {
            wrap("div", class: "mw_product_promo_section") {
              insert("div", class: "mw_promos") {
                move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']//*[@class='saleOfferText']") {
                  $(".//img[contains(@src, 'sale_tag')]") {
                    # replace existing promo icon with our own
                    insert_before("div", class: "sprites-promo")
                    remove()
                  }
                }
                # all available promos link
                move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']/a[contains(text(), 'all available promo')]")
              }
              $("./div[@class='mw_promos']/p") {
                wrap_text_children("div",class:"mw_promos_text") {
                  wrap("div", class:"mw_sale_tag") {
                    move_here("preceding-sibling::div[@class='sprites-promo']", "top")
                  }
                  move_here("ancestor::div[@class='mw_sale_tag']/following-sibling::a[1]")
                }
              }
            }
          }
          else() {
            wrap("div", class: "mw_product_promo_section") {
              insert("div", class: "mw_promos") {
                move_here("./ancestor::div[@id='container']//form[@id='orderFormProd']//div[@class='remindeMeContainer']") { 
                  $(".//img[contains(@src, 'sale_tag')]") {
                    insert_before("div", class: "sprites-promo")
                    remove()
                  }
                }
                # all available promos link
                move_here("./ancestor::div[@id='container']//*[@class='productDescriptionBlock']/a[contains(text(), 'all available promo')]")
              }
               # replace existing promo icon with our own
              $(".//div[@class='gncRecurringDetails']/p") {
                wrap_text_children("div",class:"mw_promos_text") {
                  wrap("div", class:"mw_sale_tag") {
                    move_here("preceding-sibling::div[@class='sprites-promo']", "top")
                  }
                  move_here("ancestor::div[@class='mw_sale_tag']/following-sibling::a[1]")
                }
              }
              
            }
          }
        }
        $uid = 'mw_id0'
        match($product_type) {
          with(/two/) {
            attributes(style: "text-align: center; float: none; padding-left: 50%; margin-top: 20px; margin-left: -65px;")
            $(".//div[@id='showEnlargedImage']") {
              attributes(style: "width: 130px;")
            }
            $("..//div[@id='individualContainer']") {
              add_class("mw_option")
              $(".//div[contains(@class,'productDescriptionBlock')]") {
                $("./*[contains(@class, 'priceBlock')]") {
                  move_here("./*[contains(@class,'priceWas')]", position("bottom")) {
                    text() {
                      replace("Price: ", "(")
                      replace(/\Z/, ")")
                    }
                  }
                }
                wrap_together("./p[position()>1]", "div") {
                  attributes(class: "mw_goldcard_text")
                  wrap_nonempty_text("div")
                }
              }

              $("./div[@class='freqTop']") {
                $("./input[@type='radio']") {
                  attributes(id: $uid)
                  insert_after("label", for: $uid, "ONE-TIME PURCHASE", style: "display: inline;"){
                    inner_wrap("div", style: "display:inline;")
                  }
                  $uid = $uid + "1"
                }
              }
              $(".//img[contains(@src,'creditcard')]") {
                name("div")
                add_class("sprites-goldcard")
              }
            }
            $("..//div[@id='autoContainer']") {
              add_class("mw_option")
              $(".//div[contains(@class,'productDescriptionBlock')]") {
                wrap_together(".//p[position()>1]", "div") {
                  attributes(class: "mw_goldcard_text")
                  wrap_nonempty_text("div")
                  $("./p[@style]") {
                    $tomove = path()
                  }
                  $("../div[@id='replenishContent']") {
                    move_here($tomove, position("bottom"))
                    remove("./div[@class='clearFloat']")
                    $("./p") {
                      attributes(style: "display: inline;")
                    }
                  }
                }
              }

              $("./div[@class='freqTop']") {
                remove("./a|./img")
                $("./input[@type='radio']") {
                  attributes(id: $uid)
                  insert_after("label", for: $uid, "AUTO DELIVERY", style: "display: inline;") {
                    inner_wrap("div", style: "display:inline;")
                    insert_bottom("div", " - SIGN UP & SAVE", style: "display:inline;")
                  }
                  $uid=$uid+"1"
                }
              }
              $(".//img[contains(@src,'creditcard')]") {
                name("div")
                add_class("sprites-goldcard")
              }
            }
          }
        }
      }
      
      ###########################################
      ############ PRODUCT AVAILABILITY #########
      ###########################################
      move_here("./ancestor::div[@id='container']//*[@class='availabilityBlock']") {
        $("./p[not(*)]") {
          match(text(), (/\A\s+\Z/)) {
            remove()
          }
        }
        $("./p[@id='BMLContainer']/a[@id='BMLLink']") {
          move_here("following-sibling::img")
        }
      }
      
      ###########################################
      ############ ADD TO CART/LIST #############
      ###########################################
      move_here("./ancestor::div[@id='container']//form") {
         # GNC-76
         $("./select[@id='amount']/following-sibling::a[1]") {
            wrap_text_children("div", class:"mw_btn1 mw_egift") {
              text(upcase(fetch("./text()")))
              insert_bottom("div", class: "sprites-arrowrwhite")
            }
         }
         $("./label[@for='qty']") {
           add_class("mw_qty_label")
         }
         # end GNC-76
         match($product_type) {
           with(/one/) {
             $(".//div[contains(@class, 'qty')]") {
               add_class("mw_flex_box checkout")
             }
             $(".//*[contains(@class, 'add-my-list')]") {
               # add to my list
               add_class("mw_btn2")
             }
             $(".//a[contains(@class, 'addToCart')]") {
               # add to cart
               add_class("mw_btn1")
               wrap_text_children("div", class:"mw_add_cart_text") {
                 insert_bottom("div", class: "sprites-arrowrwhite")
               }
               wrap("div", class: "mw_action_btns") {
                 add_class("mw_flex_box_item_1")
                 move_here("../a|../*[contains(@class,'mw_btn2')]")
               }
             }
             $(".//div[contains(@class, 'qty')]") {
               $(".//input[contains(@id, 'qty')]") {
                 attributes(type: "tel")
                 wrap("div", class: "mw_qty") {
                   move_here("../label", "top")
                   move_here("..//a[@class='learn-more']") {
                     wrap("div", class: "mw_learn_more_wrapper")
                   }
                 }
               }
             }
           }
           else() {
             $(".//div[contains(@class, 'qty')]") {
               add_class("mw_flex_box checkout")
               
               # qty
               $(".//input[contains(@id, 'qty')]") {
                 attributes(type: "tel")
                 wrap("div", class: "mw_qty") {
                   move_here("../label", "top")
                   
                   # learn more
                   move_here("ancestor::div[@id='remindmeBlock']/div[@id='recurring-mylist']/a[@class='learn-more']") {
                     wrap("div", class: "mw_learn_more_wrapper")
                   }
                 }
               }
               
               move_here("following-sibling::div[@id='recurring-mylist']") {
                 add_class("mw_action_btns mw_flex_box_item_1")
                 remove_text_nodes()
                 # add to my list
                 $("./a[contains(@class, 'add-my-list')]") {
                   add_class("mw_btn2")
                   text("ADD TO MY LIST")
                 }
                 
                 # add to cart
                 move_here("preceding-sibling::a[@class='addToCart']", "top") {
                   add_class("mw_btn1")
                   wrap_text_children("div", class:"mw_add_cart_text") {
                     insert_bottom("div", class: "sprites-arrowrwhite")
                   }
                   wrap("div", class: "mw_action_btns") {
                     add_class("mw_flex_box_item_1")
                     move_here("../a|../*[contains(@class,'mw_btn2')]")
                   }
                 }
               }
             }
           }
         }
      }
      
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
        move_here("./ancestor::div[@id='container']//a[contains(@class, 'button_facebook')]") {
          # facebook and twitter share
          add_class("sprites-facebooksquare")
          wrap("div", class: "mw_share_right") {
            insert_top("span", "Share", class: "mw_share_label")
            move_here("./ancestor::div[@id='container']//a[contains(@class, 'button_twitter')]") {
              add_class("sprites-twittersquare")
            }
          }
        }
        # GNC-18 PDP social area borders
        insert_before("div",class:"mw_circle") {
          insert_top("div", class:"mw_top_circle") {
            wrap("div",class:"mw_top")
          }
          insert_bottom("div", class:"mw_bottom_circle") {
            wrap("div",class:"mw_bottom")
          }
        }
      }

      ###########################################
      ##### YOU MAY ALSO BE INTERESTED IN #######
      ##### PEOPLE WHO BUY THIS ALSO BUY ########
      ###########################################
      move_here("./ancestor::div[@id='container']//div[@id='crossSellProducts']") {
        $(".//li[contains(@class, 'productListing')]") {
          inner_wrap("div", class: "mw_right")
          move_here("./div/a[@class='prodThumbnail']", "top")
          $href = fetch(".//*[@class='prodThumbnailDesc']//a/@href")
        }
        $(".//h3") {
          add_class("mw_bar2")
          text(downcase(text()))
          text() {
            replace(/:\s*$/, "")
          }
          attributes(data-ur-toggler-component: "button")
          wrap("div", data-ur-set: "toggler") {
            move_here("./following-sibling::div") {
              attributes(data-ur-toggler-component: "content")
            }
          }
        }
        $(".//img[contains(@class, 'goldCardImg')]") {
          insert_after("div", class: "sprites-goldcard")
          remove()
        }
      }
      
    }

    //fix javascript error
    $("//form[@id='orderFormProd']") {
      move_here("../div[@class='availabilityBlock']", position("top"))
      move_here("../div[@class='mw_product_promo_section']", position("top"))  {
        $(".//div[@class='mw_goldcard_text']") {
          move_here(".//div[contains(@class,'sprites')]", position("before"))
        }
      }
    }
    @import "_product_tab_carousel.ts"
    # GNC-31, GNC-55, Handle this because the "Rating" table will break the view port
    $(".//table[contains(@class, 'hni_RelTable')]") {
      $(".//tr[./th]") {
        $("./th") {
          var("mw_header"+index(), fetch("./text()"))
          remove()
        }
      }
      $(".//tr[not(contains(@class, 'hni_RelationshipDetailRow'))]") {
        $("./td") {
          $header_index = index()
          insert_top("span", var("mw_header"+$header_index) + ":", class: "mw_rating_title")
          $("./div[@class='hni_RelConceptNameTitle']") {
            name("span")
          }
        }
      }
    }
  }
}
