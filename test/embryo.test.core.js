/* ----------------------------------------------------------------------------------------------------- */
/*                                                                               EMBRYO TEST SUITE: CORE
/* ----------------------------------------------------------------------------------------------------- */

describe("EMBRYO CORE: $, .children, .eq, .attr", function() {
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
        
    $( 'section .maindiv' ).attr('myattr','passed');

    it("$('#maindiv') should have new attribute myattr set to 'passed'", function() {
        expect($('#maindiv').attr('myattr')).toBe('passed');
        expect($('#maindiv').attr('myattr')).not.toBe('');
    });
});