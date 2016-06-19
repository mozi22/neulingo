
setTimeout(function(){

$('.recent-jobs').hide();
$('.post-status').hide();
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


$('.post-message-to-job').click(function(){
  location.reload();
  window.location = "http://localhost:8000/index.html#/jobdetail2";
});

$('.curr-jobs-link').click(function(){
  location.reload();
  window.location = "http://localhost:8000/index.html#/dashboard";
});


$('#tokenfield').tokenfield({
  autocomplete: {
    source: ['Documents','Translation','Language','Hand','Pickup','Groceries','Freiburg','Tour'],
    delay: 100
  },
  showAutocompleteOnFocus: true
});


},300);
