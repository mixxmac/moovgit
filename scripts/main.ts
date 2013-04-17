# The main file executed by Tritium. The start of all other files.

log("*****************************************")
log("")
log("path: " + $path)

# API for Fuzz (our app partner)
$app_request = "false"
match($path, /fuzz=/) {
  # query parameters:
  # fuzz=true
  # requesttype=xml (pagetype=html)
  # pagetype=dealoftheday
  # os=iOS
  #
  # the xml requesttype is used for the synthetic API and is a native app call
  # the html requesttype is used for displaying custom webviews on the app
  $app_request = "true"
  match($path, /requesttype=xml/) {
    $content_type = "fuzzappxml"
  }
}

match($content_type) {
  with(/html/) {
    # Rewrite the xmlns nodes before the html parser clobbers them
    #replace(/\<(\/?)(\w+)\:\w+\>/, "$2_mwns_")
    replace(/fb:/, "fbn_") # Rewrite the xmlns facebook nodes before the html parser clobbers them
    
    # desktop site uses the malformed </br> tag for line breaks
    # need to replace this with a real <br> tag to maintain spacing
    # otherwise the parser will remove it
    replace("</br>", "<br>")
    
    match(this()) {
      with(/<html|<body/i) {
        $html_fragment = "false"
        html() {
          
          match($host) {
            with(/^m\./) {
              @import "coming_soon.ts"
            }
            else() {
              @import device_detection.ts
              @import html.ts
            }
          }
          
        }
      }
      else() {
        $html_fragment = "true"
        log("--> In an HTML Fragment")
        html_fragment() {
          @import device_detection.ts
          @import html.ts
        }
      }
    }

    replace(/fbn_/, "fb:") # Rewrite the xmlns facebook nodes to restore them
    # Rewrite the xmlns nodes to restore them
    #replace(/(\<(\/?)(\w+))_mwns_(\:\w+\>)/, "$1$4") 
  }
  with(/fuzzappxml/) {
    # Fuzz will be requesting certain sections of a webpage and we will return
    # it in XML
    # i.e. The "deal of the day" is on the home page
    # instead of returning the whole home page, we will return only the deal of day
    # section and convert it to XML
    log("--> App API call")
    html() {
      @import app_xml_mappings.ts
    }
    # replace the html doctype and content type for xml request types
    replace(/\!DOCTYPE.*dtd\"/, '?xml version="1.0"?')
    export("Content-Type", "text/xml")
  }
  # with(/plain/i) {
  #   @import plain.ts
  # }
  # with(/javascript/) {
  #   @import "ajax.ts"
  # }
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}

log("*****************************************")
log("")


