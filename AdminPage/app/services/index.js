function Services(){
    //Lấy cả mãng dữ liệu từ API
    this.getListTeachersAPI = function(){
        return axios({
            url: "https://62986710f2decf5bb7416a75.mockapi.io/TeacherTeam",
            method: "GET"
        });
    }

    //Xóa một dữ liệu từ API
    this.deleteTeacherAPI = function(id){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/TeacherTeam/${id}`,
            method: "DELETE"
        })
    }

    //Thêm cả mãng dữ liệu lên API
    this.addTeacherAPI = function(newTeacher){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/TeacherTeam`,
            method: "POST",
            data: newTeacher
        })
    }

    //Thêm một dữ liệu lên API
    this.editTeacherAPI = function(id, teacher){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/TeacherTeam/${id}`,
            method: "PUT",
            data: teacher
        })
    }

    //Lấy một dữ liệu từ API
    this.getTeacherAPI = function(id){
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/TeacherTeam/${id}`,
            method: "GET",
        })
    }
}