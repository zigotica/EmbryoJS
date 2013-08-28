/* ----------------------------------------------------------------------------------------------------- */
/*                                                                              EMBRYO TEST SUITE: CLASS
/* ----------------------------------------------------------------------------------------------------- */

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


