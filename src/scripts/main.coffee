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

$("#accordion .accordion__heading").click ->
  #slide up all the link lists
  $(".accordion__body").slideUp('slow')

  #slide down the link list below the h3 clicked - only if its closed
  console.log  $(this).next()
  $(this).next().slideDown()  unless $(this).next().is(":visible")
  return false
