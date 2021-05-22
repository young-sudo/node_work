var t = 10;
setInterval("refer()", 1000);
function refer() {
    if (t == 0) {
        document.getElementById('show').innerHTML = t;
        move();
    }
    document.getElementById('show').innerHTML = t;
    t--;
}

function move() {
    document.getElementsByClassName("frame")[0].style.display = "block"
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            //跳转login页面
            login();
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function login() {
    window.location.href = "/login";
}

function but_d() {
    window.location.href = "/"
}