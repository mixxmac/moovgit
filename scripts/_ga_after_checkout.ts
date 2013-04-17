# ecommerce conversion tracking
# https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce
# contains transaction cost, order id, etc
# also contains info on each item ordered (cost, sku, title, etc)

###########################################
####### Extract Transaction Data ##########
###########################################
$trans_ordernum = "" # required
$trans_storename = "GNC"
$trans_ordertotal = "" # required
$trans_salestax = ""
$trans_shipping = ""
$trans_city = ""
$trans_state = ""
$trans_country = ""

$(".//*[@class='orderNum']") {
  $trans_ordernum = fetch_for_ga_conversions("./b/text()")
}

copy_here(".//table[@id='costSummarySection']") {
  # copy the node since I don't want to make any changes
  # just want to extract the data
  add_class("mw_remove_me")
  
  $(".//*[contains(@class, 'co2-costsummary-value') and contains(@class, 'thksTotal')]") {
    $trans_ordertotal = fetch_for_ga_conversions("./text()")
  }
  $(".//*[@class='co2-costsummary-label' and contains(text(), 'Tax')]") {
    $("../*[contains(@class, 'co2-costsummary-value')]") {
      # problem using fetch text with html comments
      # use inner() workaround
      $trans_salestax = inner()
      $trans_salestax {
        replace(/\$/, "")
        replace(/^\s*/, "")
        replace(/\s*$/, "")
      }
    }
  }
  $(".//*[contains(@class, 'co2-costsummary-label') and contains(text(), 'Shipping')]") {
    $("../*[contains(@class, 'co2-costsummary-value')]") {
      $trans_shipping = fetch_for_ga_conversions("./text()")
    }
  }
}
remove(".//*[contains(@class, 'mw_remove_me')]")

###########################################
#### END of Extract Transaction Data ######
###########################################

$("/html/head") {
  # transaction info (order totals)
  insert_bottom("script", type:"text/javascript") {
    inner() {
      append(" _gaq.push(['_addTrans','" +
        $trans_ordernum    + "','" +
        $trans_storename   + "','" +
        $trans_ordertotal  + "','" +
        $trans_salestax    + "','" +
        $trans_shipping    + "','" +
        $trans_city        + "','" +
        $trans_state       + "','" +
        $trans_country + "']);"
      )   
    }
  } #end transaction info
  
  # log("trans_ordernum: " + $trans_ordernum)
  #   log("trans_storename: " + $trans_storename)
  #   log("trans_ordertotal: " + $trans_ordertotal)
  #   log("trans_salestax: " + $trans_salestax)
  #   log("trans_shipping: " + $trans_shipping)
  #   log("trans_city: " + $trans_city)
  #   log("trans_state: " + $trans_state)
  #   log("trans_country: " + $trans_country)
  #   log("---------------------")
}

###########################################
######## Track Individual Item Data #######
###########################################
$item_transactionid = $trans_ordernum # required

$(".//table[@id='items']/tr[./td[contains(@class, 'totalColumn')]]") {
  
  ###########################################
  ##### Extract Data from Each Item #########
  ###########################################
  
  # each individual item purchased
  $item_sku = "" # required
  $item_productname = ""
  $item_category = ""
  $item_unitprice = "" # required
  $item_quantity = "" # required
  
  copy_here("./td[contains(@class, 'itemDescriptionColumn')]") {
    # copy the node since I don't want to make any changes
    # just want to extract the data
    add_class("mw_remove_me")
    $("./span") {
      # item text dumped here in a bunch of text nodes
      wrap_nonempty_text("span")
    }
    
    # product title
    $item_productname = fetch_for_ga_conversions("./span/span[1]/a/text()")
    
    $(".//*[./b[contains(text(), 'Item#')]]/following-sibling::span[1]") {
      # the span right after "Item#" label is the actual item #
      $item_sku = fetch_for_ga_conversions("./text()")
    }
  }
  remove(".//*[contains(@class, 'mw_remove_me')]")

  $item_unitprice = fetch_for_ga_conversions("./td[contains(@class, 'totalColumn')]/text()")
  $item_quantity = fetch_for_ga_conversions("./td[1]/span/text()")
  
  ###########################################
  ## End of Extract Data from Each Item #####
  ###########################################
  
  # now that we've extracted the item data
  # we can add this data to google analytics
  $("/html/head") {
    # transaction info (order totals)
    # this runs once per item
    insert_bottom("script", type:"text/javascript") {
      inner() {
        append(" _gaq.push(['_addItem','" +
          $item_transactionid    + "','" +
          $item_sku              + "','" +
          $item_productname      + "','" +
          $item_category         + "','" +
          $item_unitprice        + "','" +
          $item_quantity         + "']);"
        )   
      }
    } #end transaction info
  }
  
  # log("item_transactionid: " + $item_transactionid)
  #   log("item_sku: " + $item_sku)
  #   log("item_productname: " + $item_productname)
  #   log("item_category: " + $item_category)
  #   log("item_unitprice: " + $item_unitprice)
  #   log("item_quantity: " + $item_quantity)
  #   log("---------------------")
  
}
###########################################
## End of Track Individual Item Data ######
###########################################
  
$("/html/head") {
  # tell the analytics servers to track the order data
  insert_bottom("script", type:"text/javascript") {
    inner() {
      append("_gaq.push(['_trackTrans']);")
    }
  }
}