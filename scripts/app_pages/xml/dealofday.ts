# convert the deal of the day div into this xml structure:
#
# <dealoftheday>
#   <product_title>GNC WELLbeING® be-HOT#8482;</product_title>
#   <product_qty>30 paks</product_qty>
#   <product_price>Sale $19.99</product_price>
#   <coupon_instore>21272</coupon_instore>
#   <shop_link>http://www.gnc.com/product/index.jsp?productId=12435403&amp;kwCatId=</shop_link>
# </dealoftheday>

# move .//div[contains(@class, 'app_deal_of_the_day')] after the html node and convert to xml
# remove html node

$("/html") {
  move_here(".//div[contains(@class, 'app_deal_of_the_day')]", "after") {
    $("./div") {
      $xml_tag = fetch("./@class")
      attributes(class: "")
      name($xml_tag)
    }
    name("dealoftheday")
    attributes(id: "", class: "", style: "")
  }
  remove()
}
