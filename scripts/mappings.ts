/*
  Mappings

  Mappings are matchers that we use to determine if we should execute a
  bit of Tritium during an execution. Aka, run something when we are
  are on a certain page.

  Example starting code:
*/

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")
    match($path) {
      with(/^\/$|^\/\?|^\/home\/index\.jsp/i) {
        # http://www.gnc.com/home/index.jsp
        log("--> Importing pages/home.ts in mappings.ts")
        @import "pages/home.ts"
      }
      match($path) {
        with(/\/proteinnumber\//) {
          log("-->Importing pgaes/protein/protein.ts in mappings.ts")
          @import "pages/protein/protein.ts"
        }
      }
      with(/^\/category\/index\.jsp\?categoryId=10813502/i) {
        # health center pages
        # http://mlocal.gnc.com/category/index.jsp?categoryId=10813502
        log("--> Importing pages/health_center.ts in mappings.ts")
        @import "pages/health_center.ts"
      }
      with(/^\/category\//i) {
        match($path) {
          //map pages which are pre-filtered
          with(/lmdn=[^&]*&fbn=/) {
            log("--> Importing pages/category_all.ts in mappings.ts")
            @import "pages/category_all.ts"
          }
          else() {
            # top level category landing pages (vitamins & supplements)
            # http://mlocal.gnc.com/category/index.jsp?categoryId=3593185
            log("--> Importing pages/category_landing.ts in mappings.ts")
            @import "pages/category_landing.ts"
          }
        }
      }
      with(/^\/(family)/i) {
        # http://mlocal.gnc.com/category/index.jsp?categoryId=3593185&sr=1&origkw=vitamins
        match($path) {
          with(/categoryId=3870979/) {
            log("-->Importing pages/helpdesk/helpdesk_sub.ts in mappings.ts")
            @import "pages/helpdesk/helpdesk_sub.ts"
          }
          else() {
            log("--> Importing pages/category_all.ts in mappings.ts")
            @import "pages/category_all.ts"
          }
        }
      }
      with(/^\/shop/i) {
        # shop by brand, by ingredients, etc
        # http://www.gnc.com/shop/index.jsp?categoryId=3593187&shopBy=brands
        log("--> Importing pages/shop_by.ts in mappings.ts")
        @import "pages/shop_by.ts"
      }
      with(/^\/search/i) {
        # http://www.gnc.com/search/index.jsp?kwCatId=&kw=testosterone&origkw=testosterone&f=Taxonomy/GNC/13200328&sr=1
        log("--> Importing pages/search_results.ts in mappings.ts")
        @import "pages/search_results.ts"
      }
      with(/^\/product/i) {
        # http://www.gnc.com/product/index.jsp?productId=15403956
        match($path) {
          with(/productId=2134195/) {
            log("--> Importing pages/gold_card.ts in mappings.ts")
            @import "pages/gold_card.ts"
          }
          else() {
            log("--> Importing pages/product.ts in mappings.ts")
            @import "pages/product.ts"
          }
        }
      }
      with(/^\/cartHandler/i) {
        log("--> Importing pages/cart_handler.ts in mappings.ts")
        @import "pages/cart_handler.ts"
      }
      with(/^\/cart/i) {
        # http://mlocal.gnc.com/cart/index.jsp
        log("--> Importing pages/cart.ts in mappings.ts")
        @import "pages/cart.ts"
      }
      with(/^\/storeLocator/i) {
        # http://mlocal.gnc.com/storeLocator/index.jsp
        log("--> Importing pages/store_locator.ts in mappings.ts")
        @import "pages/store_locator.ts"
      }
      
      //-------------Profile
      with(/\/profile\/profile\.cfm/i) {
        log("--> Importing pages/profile/profile.ts in mappings.ts")
        @import "pages/profile/profile.ts"
      }
      //-------------End Profile
      
      //-------------My Lists
      with(/\/mylists\/list\.jsp/) {
        match($path) {
          with(/userId=/) {
            log("--> Importing pages/mylists/mylists.ts in mappings.ts")
            @import "pages/mylists/mylists.ts"
          } 
          else() {
            log("--> Importing pages/mylists/mylists_empty.ts")
            @import "pages/mylists/mylists_empty.ts"
          }
        }
      }
      //------------End MyLists
      
      //-------------Checkout
      with(/\/checkout\/index\.jsp\?process=goldCardInfo/){
        log("--> Importing pages/checkout/checkout_goldcard.ts")
        @import "pages/checkout/checkout_goldcard.ts"
      }
      with(/\/checkout\/index\.jsp\?process=login/) {
        log("--> Importing pages/profile/profile_login.ts in mappings.ts")
        @import "pages/profile/profile_login.ts"
      }
      with(/\/checkout\/index\.jsp\?process=myaccount/) {
        log("--> Importing pages/profile/profile_landing.ts")
        @import "pages/profile/profile_landing.ts"
      }
      
      with(/\/checkout\/index\.jsp/i) {
        match($path) {
          with(/process=thanks/) {
            log("--> Importing pages/checkout/checkout_thanks.ts")
            @import "pages/checkout/checkout_thanks.ts"
          }
        }
        match($path) {
          with(/process=billMeLater/) {
            log("--> Importing pages/checkout/checkout_bill.ts in mappings.ts")
            @import "pages/checkout/checkout_bill.ts"
          }
        }
        match($path) {
          with(/process=confirm/) {
            log("--> Importing pages/checkout/checkout_confirm.ts")
            @import "pages/checkout/checkout_confirm.ts"
          }
        }
        match($path) {
          with(/process=payment/) {
            log("--> Importing pages/checkout/checkout_payment.ts in mappings.ts")
            @import "pages/checkout/checkout_payment.ts"
          }
        }
        
        match($path) {
          with(/process=shipMethods/) {
            log("--> Importing pages/checkout/checkout_shipping.ts in mappings.ts")
            @import "pages/checkout/checkout_shipping.ts"
          }
        }
        match($path) {
          with(/process=goldCardAddress/) {
            log("--> Importing pages/profile/profile_goldcard_addr.ts")
            @import "pages/profile/profile_goldcard_addr.ts"
          }
        }
        match($path) {
          with(/process=orderTrackingLogin/) {
            log("--> Importing pages/checkout/checkout_ordertrack_login.ts")
            @import pages/checkout/checkout_ordertrack_login.ts
          }
          with(/process=orderTracking/) {
            log("--> Importing pages/orderTracking/orderTracking.ts")
            @import "pages/orderTracking/orderTracking.ts"
          }
        }
        #http://mlocal.gnc.com/checkout/index.jsp?process=catalogUnsubscribe
        match ($path) {
          with(/process=catalogUnsubscribe/i) {
            log("--> Importing pages/checkout/checkout_unsub.ts")
            @import pages/checkout/checkout_unsub.ts
          }
        }
        match($path){
          with(/process=giftcardBalance/i) {
            log("--> Importing pages/checkout/checkout_cardbalance.ts")
            @import pages/checkout/checkout_cardbalance.ts
          }
        }
        with(/process=(modUserEmail|modUserPass|address)/) {
          log("--> Importing pages/profile/profile_sub.ts in mappings.ts") 
          @import "pages/profile/profile_sub.ts"
        }
      }
      //-------------END Checkout
      //-------------Gift Certificates
      with(/\/giftOptions\/index\.jsp/i) {
        #http://mlocal.gnc.com/giftOptions/index.jsp;
        log("--> Importing pages/giftoptions/giftoptions.ts in mappings.ts")
        @import pages/giftoptions/giftoptions.ts
      }
      with(/\/giftCertificates\/eGift/i) {
        log("--> Importing pages/giftoptions/giftcertificates.ts in mappings.ts")
        @import pages/giftoptions/giftcertificates.ts
      }
      //------------END Gift Certificates
      with(/\/helpdesk\/password-pop-up\.jsp/) {
        log("--> Importing password pop-up")
        @import pages/popup/password.ts
      }
      with(/\/helpdesk\/(index|popup)\.jsp/i) {
        match($path) {
          with(/display=/i) {
            #http://www.gnc.com/helpdesk/index.jsp?display=account&subdisplay=group
            log("--> Importing pages/helpdesk/helpdesk_sub.ts in mappings.ts")
            @import pages/helpdesk/helpdesk_sub.ts
            
            match($path) {
              with(/subdisplay=contact/i) {
                #http://mlocal.gnc.com/helpdesk/index.jsp?display=store&subdisplay=contact;
                log("--> Importing pages/helpdesk/helpdesk_contactcs.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_contactcs.ts
              }
              with(/subdisplay=status/i){
                #http://mlocal.gnc.com/helpdesk/index.jsp?display=order&subdisplay=statusMsg;
                log("--> Importing pages/helpdesk/helpdesk_status.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_status.ts
              }
              with(/subdisplay=order(Received)?/i) {
                #http://mlocal.gnc.com/helpdesk/index.jsp?display=store&subdisplay=order;
                log("--> Importing pages/helpdesk/helpdesk_status.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_status.ts
              }
              with(/subdisplay=about/i) {
                log("--> Importing pages/helpdesk/helpdesk_status.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_status.ts
              }
              with(/subdisplay=retail/i) {
                log("--> Importing pages/helpdesk/helpdesk_status.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_status.ts
              }
              with(/subdisplay=paypalfaq/i) {
                log("--> Impording pages/helpdesk/helpdesk_paypal.ts in mappings.ts")
                @import pages/helpdesk/helpdesk_paypal.ts
              }
            }
          }
          else(){
            #http://www.gnc.com/helpdesk/index.jsp
            log("--> Importing pages/helpdesk/helpdesk_landing.ts in mappings.ts")
            @import pages/helpdesk/helpdesk_landing.ts
          }
        }

      }
      else() {
        log("--> No page match in mappings.ts")
      }
    }
    match($path) {
      with(/\/(fishoil)|(probiotics)|(vitapak)\//) {
        log("--> Importing pages/fishoil/fishoil.ts in mappings.ts")
        @import "pages/fishoil/fishoil.ts"
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import "pages/error.ts"
  }

}
