


$(document).ready(function(){
  $('#update').click(function(event){
    var name = $('#name').val();
    if(!name) alert('请输入你的名字');
    var url = location.href + 'update/' + encodeURIComponent(name);
    $.get(url, function(data){
      if(data) location.reload();
    });
  });


  $('#release').click(function(event){
    if(!window.confirm('你确定要执行一键打包脚本吗？'))return;
    $('#releaserResult').css({'display':'block'});
    var url = location.href + 'release';
    $.get(url, function(data){
      if(data) {
        $('#releaserResult').html('<pre>' + data + '</pre>');
        $('#releaserResult').scrollTop(5000);
        alert('脚本执行完毕');
      } else {
        alert('脚本执行异常，请检查！');
      }
    });
  });

  window.setTimeout(function(){
    location.reload();
  }, 5000);

});