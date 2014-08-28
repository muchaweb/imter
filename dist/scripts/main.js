(function() {
  var portfolioBlock, portfolioBlockActive;

  $('.carousel-portfolio').jcarousel();

  $(".jcarousel-control-prev").on("jcarouselcontrol:active", function() {
    $(this).removeClass("inactive");
  }).on("jcarouselcontrol:inactive", function() {
    $(this).addClass("inactive");
  }).jcarouselControl({
    target: "-=1"
  });

  $(".jcarousel-control-next").on("jcarouselcontrol:active", function() {
    $(this).removeClass("inactive");
  }).on("jcarouselcontrol:inactive", function() {
    $(this).addClass("inactive");
  }).jcarouselControl({
    target: "+=1"
  });

  portfolioBlock = $('.carousel-portfolio .portfolio-item');

  portfolioBlockActive = portfolioBlock.find(".js__action--active");

  portfolioBlock.hover(function() {
    return $(this).toggleClass("js__action--active");
  });

  $('.slider').slippry({
    useCss: true,
    transition: 'horizontal'
  });

  $("#accordion .accordion__heading").click(function() {
    $(".accordion__body").slideUp('slow');
    console.log($(this).next());
    if (!$(this).next().is(":visible")) {
      $(this).next().slideDown();
    }
    return false;
  });

}).call(this);
