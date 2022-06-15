var clipboard = new ClipboardJS('.mail_copy');
var myToolTip = document.getElementById("myTooltip");
var mailCcopy = document.getElementByClassName("mail_copy")

$(".mail-copy").onclick(function(){
    let MyTooltip =document.getElementById("myTooltip");
    MyTooltip.textContent = "Email copied";
});