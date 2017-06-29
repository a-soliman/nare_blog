$('document').ready(function() {
    
    // animate the post div
    $('.post').on('mouseenter', function() {
        
        // elements
        var titel = $(this).find($('h2.title a'));
        var readMore = $(this).find($('.more'));
        
        //styles
        var goldColor = '#d3b680';

        //actions
        $(this).find($('.post-text')).css({
            'border-right': '3px solid #d3b680',
            'border-bottom': '2px solid #d3b680',
            'border-radius' : '0 0 25px'
        });
        
        titel.css('color', goldColor);
        readMore.css('color', goldColor);

    }).on('mouseleave', function() {

        // elements
        var titel = $(this).find($('h2.title a'));
        var readMore = $(this).find($('.more'));

        //styles
        var defaultColor = 'black';

        //actions
        $(this).find($('.post-text')).css({
            'border-right': '3px solid transparent',
            'border-bottom': '2px solid transparent',
        });

        titel.css('color', defaultColor);
        readMore.css('color', defaultColor);
    })
})