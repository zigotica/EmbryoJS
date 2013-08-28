/* ----------------------------------------------------------------------------------------------------- */
/*                                                                             EMBRYO TEST SUITE: LAYOUT
/* ----------------------------------------------------------------------------------------------------- */

describe("EMBRYO LAYOUT: .css(set/get), .show, .hide", function() {
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
