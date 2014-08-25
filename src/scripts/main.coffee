$('.carousel-portfolio').jcarousel()

$(".jcarousel-control-prev").on("jcarouselcontrol:active", ->
  $(this).removeClass "inactive"
  return
).on("jcarouselcontrol:inactive", ->
  $(this).addClass "inactive"
  return
# Options go here
).jcarouselControl target: "-=1"

$(".jcarousel-control-next").on("jcarouselcontrol:active", ->
  $(this).removeClass "inactive"
  return
).on("jcarouselcontrol:inactive", ->
  $(this).addClass "inactive"
  return

# Options go here
).jcarouselControl target: "+=1"

portfolioBlock = $('.carousel-portfolio .portfolio-item')
portfolioBlockActive = portfolioBlock.find ".js__action--active"

portfolioBlock.hover ->
  $(this).toggleClass "js__action--active"

$('.slider').slippry( useCss: true, transition: 'horizontal' )
