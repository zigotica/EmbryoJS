/* ----------------------------------------------------------------------------------------------------- */
/*                                                                                                EMBRYO
/* ----------------------------------------------------------------------------------------------------- */

(function (window, undefined) {
    // add $.collection methods to collections returned by $(selector)
    var Collection = function( array ){
        $.extend(array, $.collection);    
        return array;
    };

    // add $.item methods to items returned by $(selector) or collections.forEach
    var Item = function( elm ){
        $.extend(elm, $.item);    
        return elm;
    };

    var isNodeList = function( what ){
        var pr = Object.prototype.toString.call(what); 
        return (pr === '[object HTMLCollection]' || pr === '[object NodeList]');
    };

    var isHTMLElement = function( what ){
        return what.nodeType === 1;
    };

    var normalizeArgs = function( smth ){
        var args = smth;
        if( typeof args[0] !== "string") args = smth[0];
        return args;
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

            if( isHTMLElement(elems) ) {
                return new Item(elems);
            }
            else if( isNodeList(elems) ) {
                for (var i = 0, LEN = elems.length; i < LEN; i++) {
                    if(rest) collection = collection.concat( $(rest, elems[i]) );
                    else collection.push( elems[i] );
                }
                return new Collection(collection);
            }
        }
        else { // NodeType, window, … 
            return new Item(selector);
        }
        
        // chain me
        return this;
    };

    $.extend = function(to, from){ 
        for (var key in from) {
            if(from.hasOwnProperty(key)){
                to[key] = from[key];
            }
        }
        return to;
    };

    $.collection = {
        // filter by index
        eq : function( index ){
            var elm = (this[index])? this[index] : [],
                Elm = new Item(elm);
            return Elm;
        },
        children : function(selector) {
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
    // bulk delegate to $.item:
    'show hide css attr hasClass addClass removeClass on'.split(' ').forEach(function(method){
        $.collection[method] = function(){
            var args = arguments, Elm, L = this.length;
            if(L === 1) {
                Elm = new Item(this[0]);
                return Elm[method](args);
            }
            else {
                this.forEach(function(elm){
                    Elm = new Item(elm);
                    return Elm[method](args);
                });
            }
        };
    });
    

    $.item = {
        css : function() {
            var args = normalizeArgs(arguments),
                prop = args[0],
                value = args[1];
            if (value) this.style[prop] = value;
            else return this.style[prop] || document.defaultView.getComputedStyle(this, null).getPropertyValue(prop);
            // chain me
            return this;
        },
        attr : function() {
            var args = normalizeArgs(arguments),
                name = args[0],
                value = args[1];
            if(value) this.setAttribute(name, value);
            else return this.getAttribute(name);
            // chain me
            return this;
        },
        hasClass : function() {
            // strict: contains all classes in arguments
            var args = normalizeArgs(arguments);
            for (var i = 0, len = args.length; i < len; i++) {
                if( this.classList.contains(args[i]) === false) return false;
            }
            return true;
        },
        addClass : function() {
            var args = normalizeArgs(arguments);
            for (var i = 0, len = args.length; i < len; i++) {
                this.classList.add(args[i]);
            }
            // chain me
            return this;
        },
        removeClass : function() {
            var args = normalizeArgs(arguments);
            for (var i = 0, len = args.length; i < len; i++) {
                this.classList.remove(args[i]);
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
        children : function(selector) {
            var collection  = [],
                type        = selector[0]; //type: '#', '.' or element

            var children = this.childNodes;
            for (var i = 0, LEN = children.length; i < LEN; i++) {
                var child = children[i];

                if( child.nodeType === 1 && (
                        ( type === "#" && child.attr("id") === selector.slice(1) ) ||  ( type === "." && child.classList.contains( selector.slice(1) ) )  ||  ( child.nodeName.toLowerCase() === selector ) 
                    )
                ){
                    collection.push( child );
                }
            }
            if( collection ) return new Collection(collection);
            // chain me
            return this;

        },
        on : function(){
            var args    = normalizeArgs(arguments),
                evt     = args[0], 
                fn      = (args[2])?args[2]:args[1],
                sel     = (args[2])?args[1]:null;

            this.addEventListener(evt, fn, false);

            // allow for chaining
            return this;
        },
        noop : function(){}
    };

    return $;
})(window);
