/* ----------------------------------------------------------------------------------------------------- */
/*                                                                             EMBRYO TEST SUITE: LAYOUT
/* ----------------------------------------------------------------------------------------------------- */

describe("EMBRYO LAYOUT: .show, .hide", function() {
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
