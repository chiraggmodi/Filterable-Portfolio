(function ($) {
    $.fn.filterable = function (options) {
        var base = this;
        var filterFunction, energy = '',
            unique = '',
            filterData = '',
            NewFilter = '',
            classNames = $(base).children(),
            allarray = '',
            className = [];
        // Default options
        var settings = $.extend({
            menuID: '#filter',
            popup: true
        }, options);
        $.each(classNames, function (i, temVar) {
            className = $(this).attr("class").toString().split(' ');
            energy = className.toString().split(',');
            allarray += energy + ',';

            return allarray;
        });

        function resizeDiv() {
            var filterSelector = $(base).children();
            var height = 0;
            $(filterSelector).each(function () {

                if ($(this).height() > height) {
                    height = $(this).height();
                    height += 20;
                }
                return height;

            });
            filterSelector.css('height', height);
        }

        function filterableMenu() {
            allarray = allarray.split(',');
            unique = allarray.filter(function (itm, i, a) {
                if (itm != '')
                    return i == allarray.indexOf(itm);
            });
            $.each(unique, function (i, temVar) {
                filterData += '<li><a href="#">' + unique[i] + '</a></li>'

                return filterData;
            });
            filterData = filterData.replace(/-/g, ' ').toUpperCase();
            if (settings.menuID) {
                var newFilterClass = settings.menuID
                if (newFilterClass.charAt(0) == '#') {
                    var newFilterID = newFilterClass.toString().split('#');
                    NewFilter = 'id="' + newFilterID[1] + '"';
                    newFilterClass = 'class=" list-unstyled list-inline"';
                } else {
                    var newFilterClass = newFilterClass.toString().split('.');
                    newFilterClass = 'class="' + newFilterClass[1] + ' list-unstyled list-inline"';
                }
            }
            $(base).before('<ul ' + NewFilter + ' ' + newFilterClass + ' ><li class="current"><a href="#">All</a></li>' + filterData + '</ul>');
        }

        function imageFilterPopup() {
            var dataAtt = $(classNames).find("[data-image]");
            //$.each(dataAtt, function( index, value ) {

            $(dataAtt).click(function (event) {
                event.preventDefault();
                dataAtt = $(this).data('image');
                $('.Filterpopup').remove();
                $('body').append('<div class="Filterpopup"><div class="popUpImageBlock"><img class="popupImage" class="img-responsive center-block" src="' + dataAtt + '" /></div></div>');
                $('.Filterpopup').append('<span class="popupClose"><i class="fa fa-times" aria-hidden="true"></i></span>')
            });
            //});

        }

        function closePopup() {
            $('body').click(function () {
                $(this).find('.popupClose').click(function () {
                    $('.Filterpopup').remove();
                });

            });
        }
        filterFunction = function (el, options) {
            filterableMenu();
            if (settings.popup == true) {
                imageFilterPopup();
                closePopup();
            }

            var filterSelector = $(base).children();


            filterSelector = filterSelector[1].tagName.toLowerCase();

            function imageLoaded() {
                // function to invoke for loaded image
                // decrement the counter
                counter--;
                if (counter === 0) {
                    // counter is 0 which means the last
                    //    one loaded, so do something else
                    resizeDiv();
                }
            }
            var images = jQuery(filterSelector).find('img');
            var counter = images.length; // initialize the counter

            images.each(function () {
                if (this.complete) {
                    imageLoaded.call(this);
                } else {
                    jQuery(this).one('load', imageLoaded);
                }
            });



            $(settings.menuID).find('li').click(function (event) {
                event.preventDefault();
                $(settings.menuID).find('.current').removeClass('current');
                $(this).addClass('current');

                var filterVal = $(this).text().toLowerCase().replace(' ', '-');

                if (filterVal == 'all') {
                    $(base).find(filterSelector + '.hidden').fadeIn('slow').removeClass('hidden');
                } else {
                    $(base).find(filterSelector).each(function () {
                        if (!$(this).hasClass(filterVal)) {
                            $(this).fadeOut('normal').addClass('hidden');
                        } else {
                            $(this).fadeIn('slow').removeClass('hidden');
                        }
                    });
                }
            });
            $(window).resize(function () {
                resizeDiv();
            });
        };

        // Apply options
        return filterFunction(this);
    };

}(jQuery));