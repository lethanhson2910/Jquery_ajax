function NguoiDungService() {

    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
        // .done(function (result) {

        // })
        // .fail(function (err) {
        //     console.log(err);
        // })
    }
    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
                url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
                type: "POST",
                data: nguoiDung
            })
            .done(function (result) {
                if (result === "tai khoan da ton tai !") {
                    alert(result);
                } else {
                    //nếu muốn truyền link
                    // location.href = "/link"
                    location.reload();
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    this.xoaNguoiDung = function (taiKhoan) {
        $.ajax({
                url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
                type: "DELETE"
            })
            .done(function (result) {
                location.reload();
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    this.timKiemNguoiDung = function (str) {
        var mangTimKiem = [];
        var dsnd = JSON.parse(localStorage.getItem('danhSachNguoiDung'));
        dsnd.map(function (item) {
            if (item.TaiKhoan.toLowerCase().indexOf(str.toLowerCase()) > -1) {
                mangTimKiem.push(item);
            }
        });
        return mangTimKiem;
    }

    this.layViTriNguoiDung = function(taikhoan){
        
        var danhSachNguoiDung = JSON.parse(localStorage.getItem('danhSachNguoiDung'));
        //Cach 1
        // var vitri;
        // danhSachNguoiDung.map(function(item, index){
        //     if(item.TaiKhoan === taikhoan)
        //     {
        //         vitri = index;
        //         return index;
        //     }
        // return vitri;
        // });

        //Cach 2
        //findIndex: tim vi tri
        return danhSachNguoiDung.findIndex(function(item){
            return item.TaiKhoan === taikhoan;
        });
    }

    this.layThongTinNguoiDung = function(taiKhoan){
        var danhSachNguoiDung = JSON.parse(localStorage.getItem('danhSachNguoiDung'));        
        return danhSachNguoiDung.find(function(item){
            return item.TaiKhoan ===taiKhoan;
        });
    }

    this.suaNguoiDung = function (nguoiDung){
        $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
            type: "PUT",
            data: nguoiDung
        })
        .done(function (result) {
            location.reload();
        })
        .fail(function (err) {
            console.log(err);
        })
    }
}