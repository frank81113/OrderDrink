$(document).ready(function(){
    $("#top").click(function() {
      var top=$("#top");
      top.addClass("top_move");
      setInterval(function () {
        top.hide();
      }, 900);
      setInterval(function () {
        $("#head").removeClass("fadingIn").addClass("fadIn");
      },400);
      setInterval(function () {
        $("#menu").removeClass("fadingIn").addClass("fadIn");
      },600);
    });

});



function store_choose(i) {
    var url;
    var name =encodeURI( $("#"+i+"name").text());
    url = "choose.html?"+i+"&"+name;
    location.assign(url);
}
