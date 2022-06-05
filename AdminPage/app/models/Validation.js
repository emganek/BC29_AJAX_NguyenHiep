function Validation(){
    this.empty = function(input,output){
        if (input.trim() ===""){
            output.innerHTML =  `(*) Vui lòng nhập thông tin`;
            output.style.display =  "block";
            return false;
        }
        output.style.display =  "none";
        return true;
    }

    this.present = function(input, inputArr ,output){
        for (let i = 0; i < inputArr.length; i++){
            if (input == inputArr[i].taiKhoan){
                output.innerHTML =  `(*) Tài khoảng đã tồn tại`;
                output.style.display =  "block";
                return false;
            }
        }
        output.style.display =  "none";
        return true;
    }

    this.isPassValid = function(input, output){
        pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (!pattern.test(input)){
            output.innerHTML =  `(*) Mật khẩu phải chứa ít nhất 1 số, 1 ký tự đặt biệt,1 chữ in hoa và từ 6-8 ký tự`;
            output.style.display =  "block";
            return false;
        }
        else{
            output.style.display =  "none";
            return true;
        }
    }

    this.isAnyNumber = function(input, output){
        pattern = /\d|[-+={},_`~<>./<>?:";[\]|\\'!@#$%^&*()]/g;
        if (pattern.test(input)){
            output.innerHTML =  `(*) Vui lòng không chứa số hoặc ký tự đặc biệt`;
            output.style.display =  "block";
            return false;
        }
        else{
            output.style.display =  "none";
            return true;
        }
    }

    this.isEmailValid = function(input, output){
        pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!pattern.test(input)){
            output.innerHTML =  `(*) Email không đúng vui lòng nhập lại`;
            output.style.display =  "block";
            return false;
        }
        else{
            output.style.display =  "none";
            return true;
        }
    }

    this.isOptionValid = function(input, output, value){
        if (input == value){
            output.innerHTML =  `(*) Vui lòng thay đổi lựa chọn`;
            output.style.display =  "block";
            return false;
        }
        output.style.display =  "none";
        return true;
    }

    this.lengthLitmit = function(input, output, min, max){
        if (input.trim().length < min || input.trim().length > max) {
            output.innerHTML =  `(*) Vui lòng nhập từ ${min} đến ${max} ký tự`;
            output.style.display =  "block";
            return false;
        }
        output.style.display =  "none";
        return true;
    }
}