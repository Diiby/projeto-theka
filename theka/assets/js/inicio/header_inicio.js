$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');

        $('.header-mobile .icone-verde').toggle();
        $('.navbar-mobile-inicio').toggle();
        $('main').toggle();
        $('footer').toggle();
    });
});
