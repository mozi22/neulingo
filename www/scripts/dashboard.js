
setTimeout(function(){

$('.recent-jobs').hide();
$('.section-wrapper:last').hide();

$('.curr-jobs-title').text('Current Jobs');

$('.info-tile:eq(0)').click(function(){
  $('.main-card').slideUp('slow',function(){

  });
});

$('.info-tile:eq(1)').click(function(){

    $('.main-card').slideUp('slow',function(){
      $('.recent-jobs').slideDown('slow');
    });
});


},100);
