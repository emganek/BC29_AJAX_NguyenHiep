var tBody = document.querySelector("#tblDanhSachNguoiDung");
var services = new Services();

//Render list teacher
function renderList(arr) {
    var content = "";
    arr.forEach(function (item, index) {
        content += `  
            <tr>
                <td>${index}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-primary" onclick="editHandler(${item.id})"  data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class="btn btn-danger" onclick="deleteHandler(${item.id})">Delete</button>
                </td>
            </tr>     
`
    });
    tBody.innerHTML = content;
}

//Lấy data của teachers từ server và render ra màng hình
function getListTeachers() {
    services.getListTeachersAPI()
        .then(function (result) {
            renderList(result.data);
        })

        .catch(function (error) {
            console.log(error);
        })
}

getListTeachers();

// Process thêm edit-----------------------
//Function khi click vào nút Edit
function editHandler(id) {
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-warning" onclick = "updateHandler(${id})">Update</button>`
    console.log("heelo" + id)
    services.getTeacherAPI(id)
        .then(function (result) {
            document.querySelector("#TaiKhoan").value = result.data.taiKhoan;
            document.querySelector("#HoTen").value = result.data.hoTen;
            document.querySelector("#MatKhau").value = result.data.matKhau;
            document.querySelector("#Email").value = result.data.email;
            document.querySelector("#HinhAnh").value = result.data.hinhAnh;
            document.querySelector("#loaiNguoiDung").value = result.data.loaiND;
            document.querySelector("#loaiNgonNgu").value = result.data.ngonNgu;
            document.querySelector("#MoTa").value = result.data.moTa;
        })

        .catch(function (error) {
            console.log(error)
        })
}
//Function khi click vào nút Update
function updateHandler(id) {
    // if (getInfoFromInput() != null) {
    //     services.editTeacherAPI(id, getInfoFromInput())
    //         .then(function () {
    //             getListTeachers();
    //             document.querySelector(".close").click();
    //         })

    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }
    validateInput(false, updateAction, id);
}
//Fuction hành động update
function updateAction(id, data) {
    services.editTeacherAPI(id, data)
        .then(function () {
            getListTeachers();
            document.querySelector(".close").click();
        })

        .catch(function (error) {
            console.log(error);
        })

}
// --------------------------------------------------

//Function khi click vào nút Delete
function deleteHandler(id) {
    services.deleteTeacherAPI(id)
        .then(function () {
            getListTeachers();
        })

        .catch(function (error) {
            console.log(error);
        })

}

// Process thêm nhân viên mới-----------------------
//Khi nhấn vào nút Thêm mới
document.querySelector("#btnThemNguoiDung").onclick = function () {
    document.querySelector(".modal-title").innerHTML = "Thêm mới người dùng";
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-success" onclick = "addHandler()">Add</button>`;
    clearInput();
}
//Khi nhấn vào nút Add
function addHandler() {
    validateInput(true, addAction, "");
}
//Hành động Add mới
function addAction(data) {
    services.addTeacherAPI(data)
        .then(function () {
            getListTeachers();
            document.querySelector(".close").click();
        })

        .catch(function (error) {
            console.log(error);
        })
}
// --------------------------------------------------

//Lấy thông tin từ Input
function getInfoFromInput(teacher) {
    return teacher;
}

//Validate thông tin của input
function validateInput(isAdding, callBackFunction, id) {
    var taiKhoan = document.querySelector("#TaiKhoan").value;
    var hoTen = document.querySelector("#HoTen").value;
    var matKhau = document.querySelector("#MatKhau").value;
    var email = document.querySelector("#Email").value;
    var hinhAnh = document.querySelector("#HinhAnh").value;
    var loaiNguoiDung = document.querySelector("#loaiNguoiDung").value;
    var loaiNgonNgu = document.querySelector("#loaiNgonNgu").value;
    var moTa = document.querySelector("#MoTa").value;
    var validation = new Validation();
    var isValid = true;

    services.getListTeachersAPI()
        .then(function (result) {
            var teacherList = result.data;
            //Validation tài khoảng
            isValid &= validation.empty(taiKhoan, document.querySelector(".TaiKhoanMess"));
            if (isAdding) {
                isValid &= validation.present(taiKhoan, teacherList, document.querySelector(".TaiKhoanMess"));
            }
            //Validation họ tên
            isValid &= validation.empty(hoTen, document.querySelector(".HoTenMess")) && validation.isAnyNumber(hoTen, document.querySelector(".HoTenMess"));
            //Validation mật khẩu
            isValid &= validation.empty(matKhau, document.querySelector(".MatKhauMess")) && validation.isPassValid(matKhau, document.querySelector(".MatKhauMess"));
            //Validation email
            isValid &= validation.empty(email, document.querySelector(".EmailMess")) && validation.isEmailValid(email, document.querySelector(".EmailMess"));
            //Validation hình ảnh
            isValid &= validation.empty(hinhAnh, document.querySelector(".HinhAnhMess"));
            //Validation loại người dùng
            isValid &= validation.isOptionValid(document.querySelector("#loaiNguoiDung").selectedIndex, document.querySelector(".loaiNguoiDungMess",), 0);
            //Validation loại người dùng
            isValid &= validation.isOptionValid(document.querySelector("#loaiNgonNgu").selectedIndex, document.querySelector(".loaiNgonNguMess"), 0);
            //Validation mô tả
            isValid &= validation.empty(moTa, document.querySelector(".MoTaMess")) && validation.lengthLitmit(moTa, document.querySelector(".MoTaMess"), 10, 60);
            if (isValid) {
                var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);
                if (isAdding){
                    callBackFunction(teacher);
                }
                else{
                    callBackFunction(id, teacher);
                }
            };
        })

        .catch(function (error) {
            console.log(error);
        })

}

//Xóa thông tin input
function clearInput() {
    document.querySelector("#TaiKhoan").value = "";
    document.querySelector("#HoTen").value = "";
    document.querySelector("#MatKhau").value = ""
    document.querySelector("#Email").value = "";
    document.querySelector("#HinhAnh").value = "";
    document.querySelector("#loaiNguoiDung").selectedIndex = 0;
    document.querySelector("#loaiNgonNgu").selectedIndex = 0;
    document.querySelector("#MoTa").value = "";
    hideErrorMess();
}

//Ẩn thông báo lỗi
function hideErrorMess() {
    document.querySelector(".TaiKhoanMess").style.display = "none"
    document.querySelector(".HoTenMess").style.display = "none"
    document.querySelector(".MatKhauMess").style.display = "none"
    document.querySelector(".EmailMess").style.display = "none"
    document.querySelector(".HinhAnhMess").style.display = "none"
    document.querySelector(".loaiNguoiDungMess").style.display = "none"
    document.querySelector(".loaiNgonNguMess").style.display = "none"
    document.querySelector(".MoTaMess").style.display = "none"
}
