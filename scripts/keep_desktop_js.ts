# Keep Desktop Site Javascript
#
# By default we remove all the desktop site Javascript.
# If you need to retain some of the desktop site JS set the
# the attribute `data-keep` to `true` here.
#

##########################################################
################## Global Javascript #####################
##########################################################
$("/html") {
}
##########################################################
############ End of Global Javascript ####################
##########################################################


##########################################################
################## Global Javascript Fix #################
##########################################################
$("//a[contains(@href, 'javascript:showCustomPopUp')]") {
  $x = fetch("./@href") {
    replace(/javascript:showCustomPopUp\('/, "javascript:window.open('")
  }
  attribute("href", $x)
}

##########################################################
################ Page Specific Javascript ################
##########################################################
$("/html/body[contains(@class,'mw_protein')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_health_center')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_store_locator')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_category_landing')]") {

}

$("/html/body[contains(@class, 'mw_product')]") {
  $("//script[contains(@src, 'product-js')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'site-js')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'site-head')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'Product')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'product.pr')]") {
    # reviews
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'addthis')]") {
    # social links
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'jquery')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'full')]") {
    # reviews
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_category_shared')]") {
  $("//script[contains(@src, 'site-js')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'site-head')]") {
    attributes(data-keep: "true")
  }
  $("//script[contains(@src, 'jquery')]") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_checkout_goldcard')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}
$("/html/body[contains(@class, 'mw_checkout_payment')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_mylists')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

$("/html/body[contains(@class, 'mw_profile_sub')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}
$("/html/body[contains(@class, 'mw_fish_oil')]") {
  $("//script") {
    attributes(data-keep: "true")
  }
}

##########################################################
############ End of Page Specific Javascript #############
##########################################################

