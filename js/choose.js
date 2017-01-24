var menu = {
    id:0,
    name:"123"
};

$(document).ready(function(){
  setInterval(function () {
    $("#head").removeClass("fadingIn").addClass("fadIn");
  },100);
  setInterval(function () {
    $("#menu").removeClass("fadingIn").addClass("fadIn");
  },300);
  getMenuItem ();
  viewMenu();
});

function goback() {
  var url = "index.html";
  location.assign(url);
}

function getMenuItem () {
    var url = location.href;
    var temp = url.split("?");
    var menuitem = temp[1].split("&");
    menu.id = menuitem[0];
    menu.name = decodeURI(menuitem[1]);
    console.log(url);
}

function viewMenu() {
    $(".choose").text(menu.name);
    $(".ordermenu img").attr("src","img/"+menu.id+"/menu.jpg")
}
