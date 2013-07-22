/* ----------------------------------------------------------------------------------------------------- */
/*                                                                                                EMBRYO
/* ----------------------------------------------------------------------------------------------------- */

var Embryo = (function (window, undefined) {
    // add $.fn methods to collections returned by $(selector)
    Collection = function( array ){
        $.extend(array, $.fn);    
        return array;
    };

    // $ instanceof Embryo.constructor
    $ = function(selector, root) {
        // modified from https://github.com/james2doyle/saltjs
        // added my improved version of top-down loop from JS Ninja (p.352)
        var context = root || document,
            collection = [];

        if ( !selector ) return new Collection([]);

        if ( typeof selector === "string" ) {
            var parts   = selector.split(" "),
                query   = parts[0],
                // beware, not ready for #id.class.class selectors (just yet)
                type    = query[0],
                matches = {
                    // querySelectorAll has a scope bug http://jsfiddle.net/timmywil/swnvb/5/
                    '#': 'getElementById',
                    '.': 'getElementsByClassName'
                }[type] || 'getElementsByTagName',
                rest    = parts.slice(1).join(" "),
                elems   = null;

            //console.log("$ selector is: " + selector + " context: " + context + " query: " + query );
            query    = (type === "#" || type === ".")?query.slice(1):query;

            // do the magic selection here
            elems = context[matches](query);

            // hack: can't loop directly because getElementById result not a NodeList: lenght undefined
            if(!!elems) {
                if(type === "#") elems = [ elems ]; // now we have lenght

                for (var i = 0, LEN = elems.length; i < LEN; i++) {
                    if(rest) collection = collection.concat( $(rest, elems[i]) );
                    else collection.push( elems[i] );
                }
                return new Collection(collection);
            }
            else return new Collection([]);
        }
        else { // NodeType, window, … 
            collection.push( selector );
            return new Collection(collection);
        }
        
        // chain me
        return this;
    };

    $.extend = function(to, from){ 
        for (var key in from) to[key] = from[key];
        return to;
    };

    $.fn = {
        css : function(prop, value) {
            if(this.length > 1) {
                this.forEach(function(elm){
                    if (value) elm.style[prop] = value;
                    // we will probably need conversors (rgb-hex, opoacity, size units, …)
                    else return elm.style[prop] || document.defaultView.getComputedStyle(elm, null).getPropertyValue(prop);
                });
            }
            else {
                var Elm = this[0] || this;
                if (value) Elm.style[prop] = value;
                // we will probably need conversors (rgb-hex, opoacity, size units, …)
                else return Elm.style[prop] || document.defaultView.getComputedStyle(Elm, null).getPropertyValue(prop);
            }
            // chain me
            return this;
        },
        attr : function(name, value) {
            if(this.length > 1) {
                this.forEach(function(elm){
                    if(value) elm.setAttribute(name, value);
                    else return elm.getAttribute(name);
                });
            }
            else {
                var Elm = this[0] || this;
                if(value) Elm.setAttribute(name, value);
                else return Elm.getAttribute(name);
            }
            // chain me
            return this;
        },
        hasClass : function(className) {
            if(this.length > 1) {
                this.forEach(function(elm){
                    return elm.hasClass(className);
                });
            }
            else {
                var Elm = this[0] || this;
                return Elm.classList.contains(className);
            }
        },
        addClass : function(className) {
            if(this.length > 1) {
                this.forEach(function(elm){
                    return elm.addClass(arguments);
                });
            }
            else {
                var Elm = this[0] || this;
                for (var i = 0, len = arguments.length; i < len; i++) {
                    Elm.classList.add(arguments[i]);
                }
            }
            // chain me
            return this;
        },
        removeClass : function(className) {
            if(this.length > 1) {
                this.forEach(function(elm){
                    return elm.removeClass(arguments);
                });
            }
            else {
                var Elm = this[0] || this;
                for (var i = 0, len = arguments.length; i < len; i++) {
                    Elm.classList.remove(arguments[i]);
                }
            }
            // chain me
            return this;
        },
        show : function() {
            this.css("display", "block");
            // chain me
            return this;
        },
        hide : function() {
            this.css("display", "none");
            // chain me
            return this;
        },
        // only one level deep simple selectors, not combinators nor multiple selectors (just yet)
        find : function(selector) {
            var collection  = [],
                type        = selector[0]; //type: '#', '.' or element

            this.forEach(function(elm){
                var children = elm.childNodes;
                
                for (var i = 0, LEN = children.length; i < LEN; i++) {
                    var child = children[i];

                    if( child.nodeType === 1 && (
                            ( type === "#" && child.attr("id") === selector.slice(1) ) ||  ( type === "." && child.classList.contains( selector.slice(1) ) )  ||  ( child.nodeName.toLowerCase() === selector ) 
                        )
                    ){
                        collection.push( child );
                    }
                }
            });
            if( collection ) return new Collection(collection);
            // chain me
            return this;

        },
        forEach : Array.prototype.forEach,
        noop : function(){}
    };

    // dont like extending the whole Element DOM interface plus using 
    // if(this.length > 1) { … } else { var Elm = this[0] || this; … }
    // but it's the fastest/shortest way now
    // var Elm = this[0] || this; hack does not yet work for window elm
    $.extend(Element.prototype, $.fn);

    return $;
})(window);
