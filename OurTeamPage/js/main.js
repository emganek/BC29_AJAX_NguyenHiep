var services = new Services();
var teacherListHTML = document.querySelector("#ourTeam .container .row");

// INIT
function getMyEle(id) {
    return document.getElementById(id);
}

window.onscroll = function () {
    if (window.scrollY >= 2) {
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("header").style.boxShadow = "0 0 10px 0 rgba(204 204 204 / 50%)"
    }
    else {
        document.getElementById("header").style.backgroundColor = "transparent";
        document.getElementById("header").style.boxShadow = "none"
    }
}

//Render list teacher
function renderList(arr) {
    var content = "";
    arr.forEach(function (item) {
        if (item.loaiND === "GV") {
            content += `  
    <div class="col-sm-6 col-lg-3 mb-4 animate__animated animate__fadeIn wow">
        <div class="ourTeam-item">
            <div class="card text-center">
                <div class="ourTeam-item-image">
                    <img class="card-img-top" src="./images/${item.hinhAnh}" alt="Card image">
                </div>
                <div class="card-body">
                    <h6>${item.ngonNgu}</h6>
                    <h4>${item.hoTen}</h4>
                    <p>${item.moTa}</p>
                </div>
            </div>
        </div>
    </div>              
`
        }
    });
    teacherListHTML.innerHTML = content;
}

//Lấy data của teachers từ server và render ra màng hình
function getListTeachers() {
    services.getListTeachersAPI()
        .then(function (result) {
            renderList(result.data);
        })

        .catch(function (error) {
            console.log("error");
        })
}

getListTeachers();
