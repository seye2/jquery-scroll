/*
 * Scrollbar - a jQuery plugin for custom scrollbars
 *
 * @author     Thomas Duerr, me@thomd.net
 * @date       03.2010
 * @requires   jquery v1.4.2 
 *
 *
 * Usage:
 * ======
 *
 *
 *
 *
 * CSS:
 * ====
 *
 *
 */
;(function($){

    /**
    * Extending jQuery namespace,
    * we could add public funtions here
    */
    $.scrollbar = {
        
        // default options
        defaults: {
            handleMinHeight: 30,         // min-height of handle (height is actually dependent on content height) 
            option2: "something"
        },

        makeSomething: function(){
//            console.log("makeSomething: ", $.scrollbar.defaults.option1);
        }
    };


    $.fn.scrollbar = function(options){

        // Extend default options
        var options = $.extend({}, $.scrollbar.defaults, options);


        // Properties
        var props = {};


        //
        // append scrollbar to container
        //
        var append = {
            scrollbar: function(i){
                return {
                    to: function(container){
                        
                        // build HTML
                        build.html(container);
                        
                        // set corrent height of handle
                        build.handleHeight(container);
                        
                    }
                }
            }
        }

        //
        // html builder
        //
        var build = {
            
            html: function(node){
                //
                // build DOM nodes for pane and scroll-handle
                //
                //      <div class="scrollbar">
                //          <div class="scrollbar-pane">
                //              [...]
                //          </div>
                //          <div class="scrollbar-handle-container">
                //              <div class="scrollbar-handle"></div>
                //          </div>
                //          <div class="scrollbar-handle-up"></div>
                //          <div class="scrollbar-handle-down"></div>
                //      </div>
                //
                node.children().wrapAll('<div class="scrollbar-pane" />');
                node.append('<div class="scrollbar-handle-container"><div class="scrollbar-handle" /></div>')
                    .append('<div class="scrollbar-handle-up" />')
                    .append('<div class="scrollbar-handle-down" />');
            },
            
            handleHeight: function(container){
                //
                // calculate height of handle.
                // height of handle should indicate height of content.
                //
                props.handleContainerHeight = container.find('.scrollbar-handle-container').height();
                props.handleHeight = Math.max(props.containerHeight * props.handleContainerHeight / props.contentHeight, options.handleMinHeight);
                container.find('.scrollbar-handle').height(props.handleHeight);
            }
        }


        //
        // append scrollbar to every found element and return jquery object
        //
        return this.each(function(i){

            var container = $(this);
            
            
            // determine heights
            props.containerHeight = container.height();

            props.contentHeight = 0;
            container.children().each(function(){
                props.contentHeight += $(this).outerHeight();
            });
            

            // append scrollbar only if neccessary
            if(props.contentHeight > props.containerHeight){
                append.scrollbar(i).to(container);
            }
        });
    }





    /**
    * Function that is not accessible from the outside
    */
    function someFunction1(){
        console.log("someFunction1: ",  $.scrollbar.defaults.option2);
    }

})(jQuery);  // inject global jQuery object
