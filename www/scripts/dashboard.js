
setTimeout(function(){

$('.recent-jobs').hide();
// $('.post-status').hide();
$('.row .bottom-buttons-section').hide();

$('.curr-jobs-title:eq(0)').text('Current Jobs');

$('.info-tile:eq(0)').click(function(){
  $('.main-card').slideUp('slow',function(){
    $('.post-status').slideDown('slow');
  });
});

$('.info-tile:eq(1)').click(function(){

    $('.main-card').slideUp('slow',function(){
      $('.recent-jobs').slideDown('slow');
    });
});

autosize(document.querySelectorAll('textarea'));


$('.help-button').click(function(){
  window.location = "http://localhost:8001/index.html#/jobdetails";
})

},300);
