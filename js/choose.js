var menu = {
    id:0,
    name:"123"
};


var drinks = [];

var PayImg="";
var state=false;

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
}

function viewMenu() {
    $(".choose").text(menu.name);
    $(".ordermenu img").attr("src","./img/"+menu.id+"/Menu.jpg");
}


function creatDrink(){
      if(drinks.length == 0){
        drinks.push({
          id: 0,
          drink_name:"",
          drink_price:0,
          drink_suger:"",
          drink_ice:"",
          drink_pay:false
        });
      }
      else {
        drinks.push({
          id: drinks[drinks.length -1].id+1,
          drink_name:"",
          drink_price:0,
          drink_suger:"",
          drink_ice:"",
          drink_pay:false
        });
      }
      return drinks;
}

function neworderItem(){
      creatDrink();
      updateItem(drinks.length-1);
      inputRemove();
      readyPay(drinks.length-1);
      addorderItem(drinks.length-1);
}

function updateItem(id) {
    var target = drinks.find(function(drink){ return drink.id === id; });
    if(target) {
      target.drink_name = $("#drink").val();
      target.drink_price = $("#drink_price").val();
      target.drink_suger = $("input[name=sugerradio]:checked" ).val();
      target.drink_ice = $("input[name=iceradio]:checked" ).val();
      target.drink_pay = false;
    }
    return drinks;
}


function addorderItem(id){
      $("#orderItem").find("tbody")
        .prepend($("<tr>")
          .attr('id', id)
            .append($("<td>")
              .text(drinks[id].drink_name)
            )
            .append($("<td>")
              .text(drinks[id].drink_price)
            )
            .append($("<td>")
              .text(drinks[id].drink_suger)
            )
            .append($("<td>")
              .text(drinks[id].drink_ice)
            )
            .append($("<td>")
              .text(PayImg)
            )
      );
}


$(document).on( "dblclick",'#orderItem tbody td',function(e) {
      var $this=$(this);
      var id = $($this.parent()).attr('id');
      if(state===false){
        EditMode($this);
        //e.stopPropagation();
      }
      else {
        ViewMode();
      }
     $("#orderItem input").blur(function(){
        ViewMode();
      });

 });

function toggleEditMode(){
  state=!state;
}

function EditMode($this) {
    var input = $("<input type=\"text\" autofocus>" ).val($this.text());
    $this.replaceWith(input);
    toggleEditMode();
    $("#orderItem input").keydown(function (e){
      if (e.keyCode === 27||e.keyCode === 13){
        e.preventDefault();
        ViewMode();
      }

    });
    //console.log(state);
}

function ViewMode() {
  $("#orderItem").find("input").each(function(){
      var td = $("<td></td>").text($(this).val());
      $("#orderItem input").replaceWith(td);
  });
  toggleEditMode();
  //console.log(state);
}

function readyPay(id) {
    if (drinks[id].drink_pay) {
      PayImg="O";
    }
    else {
      PayImg="X";
    }
}

function inputRemove() {
    $("#drink").val("");
    $("#drink_price").val("");
    $("input[name=sugerradio]:checked").attr("checked", false);
    $("input[name=iceradio]:checked").attr("checked", false);
}
