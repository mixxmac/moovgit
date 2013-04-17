$("./body[contains(@class, 'mw_app_head')]") {
  add_class("mw_app_footer")
  $("./table/tr[last()]") {
    table_dump(".//table")
    //Configure buttons
    $(".//img") {
      name("div")
      $alt = fetch("./@alt")
      text($alt)
      match($alt) {
        with (/Contact/) {
          add_class("mw_group")
          wrap("a", href: "tel:18774624700", class: "mw_btn3")
          text("877-GNC-4700")
          insert_top("div", class: "sprites-phone")
        }
        with(/Locator/) {
          add_class("mw_btn3 mw_group")
          insert_top("div", class: "sprites-stores")
        }
        with(/Gold Card/) {
          add_class("mw_goldcard mw_btn4")
          text("Become a Gold Card Member")
          insert_top("div", class: "sprites-goldcard")
        }
        else() {
          remove()
        }
      }
    }

    //Social icons
    $("./td/div") {
      insert("div", class: "mw_social") {
        move_here("../div//a[contains(@href, 'youtube')]") {
          insert("div") {
            add_class("sprites-youtube")
            text("")
          }
        }
        move_here("../div//a[contains(@href, 'facebook')]") {
          insert("div") {
            add_class("sprites-facebook")
            text("")
          }
        }
        move_here("../div//a[contains(@href, 'twitter')]") {
          insert("div") {
            add_class("sprites-twitter")
            text("")
          }
        }
        move_here("../div//a[contains(@href, 'pinterest')]") {
          insert("div") {
            add_class("sprites-pinterest")
            text("")
          }
        }
      }
      make_columns(".//div[contains(@class,'mw_group')]/../../a", position("top"))
    }
  }
}

$("./body") {
  $(".//div[@id='footer']") {
    add_class("mw_back_bar")
    attribute("style","")
    inner_wrap("div", class: "mw_old_footer mw_hide")
    insert("footer", id: "mw_footer") {
      # number, store locator
      # gold card
      # contact us, help, privacy, terms
      # email sign up, gift cards
      # paypal, social icons
      # 

      insert("div") {
        # phone number, store locator
        insert("a", href: "tel:18774624700", "877-GNC-4700", class: "mw_btn3") {
          insert_top("div", class: "sprites-phone")
        }
        insert("a", href: fetch("//form[@id='sStoreLocFrm']/@action"), "Store Locator", class: "mw_btn3") {
          insert_top("div", class: "sprites-stores")
        }
        make_two_column("./*[1]", "./*[2]")
      }
      
      # gold card
      move_here("/html/body//div[@id='become-a-gold-card-member']") {
        $text = fetch("./h4/text()")
        remove("./h4")
        $("./a") {
          # become a gold card member
          remove_text_nodes()
          add_class("mw_goldcard mw_btn4")
          insert_top("div", class: "sprites-goldcard")
          insert("span", $text)
        }
      }

      insert("div") {
        move_here("/html/body//ul[@id='footer-index']")
        
        insert("div", class: "mw_footer_links") {
          # contact us
          move_here("..//a[contains(text(), 'Contact')]")

          # help/customer service
          move_here("..//a[contains(text(), 'Customer Service')]") {
            text("Help")
          }

          # privacy
          insert("a", href: "http://www.gnc.com/helpdesk/index.jsp?display=safety&subdisplay=privacy", "Privacy")

          # terms
          insert("a", href: "http://www.gnc.com/helpdesk/index.jsp?display=safety&subdisplay=terms", "Terms")
          
          $("./a[position() < last()]") {
            insert_after("span", class: "mw_square_separator")
          }
        }
        
        insert("div", class: "mw_footer_links") {
          
          # ticket GNC-86 add careers link
          insert("a", href: "https://mobile-gnc.icims.com/jobs/intro?hashed=0", "Careers")
          
          move_here("/html/body//div[@id='email-sign-up']") {
            # email signup
            $text = fetch("./h4/text()")
            remove("./h4")
            $("./a") {
              text($text)
            }
          }
          
          # gift cards
          move_here("./ancestor::div[@id='footer']//a[contains(@href, 'giftOptions/index')]") {
            text() {
              replace("Gift", "E-Gift")
            }
          }
          
          $("./*[position() < last()]") {
            insert_after("span", class: "mw_square_separator")
          }
        }
        
        insert("div", class: "mw_paypal_social") {
          insert("div", class: "mw_paypal") {
            insert("div", class: "sprites-paypal")
          }
          insert("div", class: "mw_social") {
            move_here("/html/body//ul[@id='footer-util']/li[@class='social-media']//a")
            $("./a[contains(@class, 'youtube')]") {
              add_class("sprites-youtube")
            }
            $("./a[contains(@class, 'facebook')]") {
              add_class("sprites-facebook")
            }
            $("./a[contains(@class, 'twitter')]") {
              add_class("sprites-twitter")
            }
            $("./a[contains(@class, 'pinterest')]") {
              add_class("sprites-pinterest")
            }
          }
        }
        
        # copyright
          match($source_host) {
            with(/gnclivewell/) {
              $("./ancestor::div[@id='footer']//div[./a[contains(./text(), 'Terms & Conditions')]]") {
                wrap_text_children("small")
              }
              move_here("./ancestor::div[@id='footer']//div/small") {
                wrap("div", class: "mw_copyright")
              }
            }
          }
          move_here("./ancestor::div[@id='footer']//ul[@id='footer-util']/parent::*/small") {
          wrap("div", class: "mw_copyright")
        }
        insert("div", class: "mw_powered") {
          insert("a", href: "http://moovweb.com") {
            insert("span", "Mobile Site Powered by ")
            insert("b", "Moovweb")
          }
        }
        
        $(".//a") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
        
        remove("./ul")
      }
      
    }
  }
}
