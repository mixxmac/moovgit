// shared between search results page and category_all page

match($cookie, /mw_grid_view=1/) {
  $grid_view = "true"
}

$("/html/body") {
  add_class("mw_category_shared")
  match($grid_view) {
    with(/true/i) {
      add_class("mw_grid_view")
    }
    else() {
      add_class("mw_list_view")
    }
  }
  
  ###########################################
  ############ TEMP #############
  ###########################################
  $(".//div[@id='container']") {
    remove(".//div[@class='partner-content']")
    #remove(".//div[@id='sidebar1']")
  }
  ###########################################
  ############ end temp #############
  ###########################################
  
  $(".//div[@id='sidebar1']") {
    remove(".//dl[@id='recentlyViewedNav']")
    
    $(".//dl[@id='parametricNav']") {
      ###########################################
      ############ FILTER / SORT BY #############
      ###########################################
      
      $filtersApplied = "false"
      $(".//*[@id='appliedFilters']") {
        $filtersApplied = "true"
      }
      
      # this is the content that opens when you click "Filter"
      attributes(data-ur-toggler-component: "content")
      
      wrap("div", class: "mw_filter_row_wrapper", data-ur-set: "toggler") {
        match($filtersApplied) {
          with("true") {
            add_class("mw_filters_applied")
          }
          else() {
            add_class("mw_no_filters_applied")
          }
        }
        
        insert("div", class: "mw_filter_row") {
          insert("div", class: "mw_filter") {
            insert_top("div", "Filter", data-ur-toggler-component: "button")  {
              match($filtersApplied) {
                with("true") {
                  add_class("mw_bar4")
                }
                else() {
                  add_class("mw_bar2")
                }
              }
            }
          }
          insert("div", id: "mw_sort_select_wrapper") {
            # SORT BY
            # inject the select here, custom js will populate the select options
            insert("select", id: "mw_sort_select", class: "mw_tbar2") 
          }
          make_two_column("./*[1]", "./*[2]")
        }
      }
      $("./dt") {
        # these are the togglers inside the FILTER content
        # each dt is the toggler button
        # each dt has a dd that is directly after it, this is the content for that dt
        # <dt> // button
        # <dd> // content
        attributes(data-ur-toggler-component: "button", class: "mw_bar2 mw_text_red")
        wrap("div", data-ur-set: "toggler") {
          move_here("./following-sibling::*[1]/self::dd") {
            attributes(data-ur-toggler-component: "content", class: "mw_filter_by_links")
            $(".//li[./a][not(contains(@class,'clearSelections'))]") {
              wrap_nonempty_text("span", class: "mw_count") {
                move_to("../a")
              }
              $("./a") {
                wrap_nonempty_text("span")
                add_class("mw_bar1")
              }
            }
            $(".//li[./a][contains(@class, 'clearSelections')]") {
              $("./a") {
                wrap_nonempty_text("span")
                add_class("mw_bar4")
              }
            }
          }
        }
      }
      
      $(".//ul[@id='appliedFilters']") {
        # already filtered by these categories
        # also open the applied filters by default
        $("./li[not(./a)]") {
          add_class("mw_bar1")
        }
        $("./ancestor::*[@data-ur-set='toggler'][1]/*[@data-ur-toggler-component]") {
          attributes(data-ur-state: "enabled")
        }
      }
      
      # move the FILTER content below the Filter/Sort By buttons
      move_to("..", "bottom")
    }
    
  }
  
  $(".//div[@id='container']//div[@id='mainContent']") {
    
    # already copied page type from above
    # let's remove it esp since their js inserts a flash obj here
    remove(".//h3[contains(@class, 'root')]")
    
    $(".//div[@id='productFilter']") {
      # will be handled in js
      add_class("mw_hide")
    }
    
    ###########################################
    # ITEM COUNT, GRID/LIST VIEW, PAGINATION ##
    ###########################################
    $(".//div[@id='searchTop']") {
      # item count, grid/list view, pagination
      move_here(".//li[contains(@class, 'item-count')]")
      
      insert("div", class: "mw_right") {
        insert("div", class: "mw_view_selectors") {
          insert("div", class: "mw_list_view_btn") {
            insert("div", class: "sprites-list")
            insert("div", "List View")
          }
          insert("div", class: "mw_grid_view_btn") {
            insert("div", class: "sprites-grid")
            insert("div", "Grid View")
          }
        }

        insert("div", class: "mw_pagination_arrows") {
          move_here("./ancestor::div[@id='searchTop']//li[contains(@class, 'prev')]//a") {
            add_class("mw_prev sprites-pagination")
            text("")
          }
          move_here("./ancestor::div[@id='searchTop']//li[contains(@class, 'next')]//a") {
            add_class("mw_next sprites-pagination mw_180")
            text("")
          }
        }
        $(".//li") {
          name("div")
        }
      }
      
      # remove pagination numbers and view x number of products per page
      remove(".//div[@class='product-nav']")
      remove(".//div[@id='productPerPage']")
    }
    
    ###########################################
    ############ BOTTOM PAGINATION ############
    ###########################################
    $(".//div[@id='searchBottom']") {
      
      # remove item count and view # products per page
      remove(".//div[@id='productPerPageBottom']")
      remove(".//li[contains(@class, 'item-count')]")
    
      $(".//ul") {
        name("div")
        $("./li") {
          name("div")
        }
      }
      $(".//div[@class='product-nav']") {
        add_class("mw_pagination")
        $("./div") {
          add_class("mw_page_numbers") 
        }
        move_here(".//div[contains(@class, 'next')]", "top") {
          $("./a") {
            add_class("sprites-pagination mw_180")
            text("") 
          }
        }
        move_here(".//div[contains(@class, 'prev')]", "top") {
          $("./a") {
            add_class("sprites-pagination")
            text("") 
          }
        } 
      }
      
    }
    
    $(".//*[@id='products']") {
      # list of products
      name("div")
      remove(".//li[contains(@class, 'Divider')]")
      
      $("./*[contains(@class, 'productListing')]") {
        name("div")
        # each product
        wrap("a", class: "mw_product_listing_wrapper") {
          attribute("href", fetch("./div[contains(@class, 'productListing')]/div[contains(@class, 'prodImage')]/a/@href"))
        }
        $(".//dt/a") {
          add_class("mw_product_title")
        }
        $(".//a") {
          name("span")
          remove("./@href")
        }
      }
      $(".//*[contains(@class, 'prSummaryEntry') and .//div[contains(@class, 'write-first-review')]]") {
        # remove empty reviews
        remove()
      }
    }
  }
}
