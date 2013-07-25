/* ----------------------------------------------------------------------------------------------------- */
/*                                                                                     EMBRYO TEST SUITE
/* ----------------------------------------------------------------------------------------------------- */

describe("EMBRYO CORE SELECTIONS: $, .children, .eq", function() {
        var q = $( 'section .maindiv p' ),
            a = q.children('a'),
            four = q.eq(3),
            hund = q.eq(99);

    it("$('section .maindiv p') should return 4 nodes", function() {
        expect(q.length).toBe(4);
        expect(q.length).not.toBe(0);
    });

    it("$('section .maindiv p').children('a') should return 2 nodes (=one level deep)", function() {
        expect(a.length).toBe(2);
        expect(q.length).not.toBe(0);
    });

    it("4th matched paragraph should exist", function() {
        expect(four.nodeType).toBe(1);
    });

    it("100th matched paragraph should not exist", function() {
        expect(hund.nodeType).toBeUndefined();
    });
});

describe("EMBRYO .css(set/get)", function() {
        var q = $( 'section .maindiv p' ),
            h = $( '#h' ),
            main = $( 'section .maindiv' );
            q.css('outline','1px solid red');
            h.css('outline','2px solid orange');
            main.css('outline','1px solid green');

    it("$('#h') should be 40px height", function() {
        expect(h.css('height')).toEqual('40px');
        expect(h.css('height')).not.toEqual('0');
    });

    it("$('#h') should have 2px outline", function() {
        expect(h.css('outline-width')).toEqual('2px');
        expect(h.css('outline-width')).not.toEqual('10px');
    });

    it("third matched paragraph should have red outline", function() {
        expect(q.eq(2).css('outline-color')).toEqual('red');
        expect(q.eq(2).css('outline-color')).not.toEqual('orange');
    });

    it("third matched paragraph should have 1px outline", function() {
        expect(q.eq(2).css('outline-width')).toEqual('1px');
        expect(q.eq(2).css('outline-width')).not.toEqual('10px');
    });
    
});

describe("EMBRYO .attr(set/get)", function() {
        $( 'section .maindiv' ).attr('myattr','passed');

    it("$('#maindiv') should have new attribute myattr set to 'passed'", function() {
        expect($('#maindiv').attr('myattr')).toBe('passed');
        expect($('#maindiv').attr('myattr')).not.toBe('');
    });
});

describe("EMBRYO .addClass, .removeClass, .hasClass (matches classList add/remove/contains)", function() {
        var h = $( '#h' ),
            s = $( 'section' );

    it("#h should have 'mainp' in classList, not 'otherclass'", function() {
        expect(h.hasClass('mainp')).toBe(true);
        expect(h.hasClass('otherclass')).not.toBe(true);
    });

    it("#h should have 'mainp otherclass yetotherclass'", function() {
        h.addClass("otherclass","yetotherclass");
        expect(h.hasClass('otherclass')).toBe(true);
    });

    it("#h should have 'mainp otherclass' but 'yetotherclass' removed", function() {
        h.removeClass("yetotherclass");
        expect(h.hasClass('yetotherclass')).not.toBe(true);
    });

    it("sections (check first) should have 'imasection supercoolsection' added", function() {
        s.addClass("imasection", "supercoolsection");
        expect(s.eq(0).hasClass('supercoolsection','imasection')).toBe(true);
    });

    it("sections (check first) should not have 'imasection supersection' added", function() {
        s.addClass("imasection", "supercoolsection");
        expect(s.eq(0).hasClass('supersection','imasection')).not.toBe(true);
    });
});

describe("EMBRYO .show, .hide", function() {
        var maindiv = $( '#maindiv' ),
            s = $( 'section' );

    it("#maindiv should be hidden now", function() {
        maindiv.hide();
        expect(maindiv.css("display")).toBe("none");
    });

    it("#maindiv should be visible now", function() {
        maindiv.show();
        expect(maindiv.css("display")).toBe("block");
    });

    it("section's should be hidden now (check first)", function() {
        s.hide();
        expect(s.eq(0).css("display")).toBe("none");
    });

    it("section's should be visible now (check first)", function() {
        s.show();
        expect(s.eq(0).css("display")).toBe("block");
    });
});

describe("EMBRYO UTILS: $.extend", function() {
    it("$.extend({'k1':'v1'}, {'k2':'v2'}) should return {'k1':'v1', 'k2':'v2'}", function() {
        expect( $.extend({'k1':'v1'}, {'k2':'v2'}) ).toEqual( {'k1':'v1', 'k2':'v2'} );
    });
});
