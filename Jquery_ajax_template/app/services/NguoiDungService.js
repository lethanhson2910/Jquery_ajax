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

    this.suaNguoiDung = function (taikhoan){
        $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatNguoiDung',
            type: "PUT",
            data: taikhoan
        })
        .done(function (result) {
            location.reload();
        })
        .fail(function (err) {
            console.log(err);
        })
    }
}