$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();

    layDanhSachNguoiDung();

    function getInput(title, btnTitle, btnID) {
        $('.modal-title').html(title);
        var footer = `
            <button class="btn btn-success" id="${btnID}">${btnTitle}</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            `;
        $('.modal-footer').html(footer);
    }

    //DOM them
    $('#btnThemNguoiDung').click(function () {
        getInput('Thêm người dùng', 'Thêm', 'btnThem');
    })
    //Dom sua
    $('body').delegate('.btnSua', 'click', function () {
        getInput('Cập nhật người dùng', 'Cập nhật', 'btnSua');
        var taiKhoan = $(this).data('taikhoan');

        //Cach 1
        // var viTri = nguoiDungService.layViTriNguoiDung(taiKhoan);
        // var danhSachNguoiDung = JSON.parse(localStorage.getItem('danhSachNguoiDung'));

        //Cach 2
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);

        $('#TaiKhoan').val(taiKhoan);
        $('#MatKhau').val(nguoiDung.MatKhau);
        $('#HoTen').val(nguoiDung.HoTen);
        $('#Email').val(nguoiDung.Email);
        $('#SoDienThoai').val(nguoiDung.SoDT);
        $('#loaiNguoiDung').val(nguoiDung.MaLoaiNguoiDung);

    })

    $('body').delegate('#btnSua', 'click', function () {
       
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDienThoai = $('#SoDienThoai').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai, loaiNguoiDung);

        nguoiDungService.suaNguoiDung(nguoiDung);
    })    
    $('body').delegate('#btnThem', 'click', function () {
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDienThoai = $('#SoDienThoai').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai, loaiNguoiDung);
        nguoiDungService.themNguoiDung(nguoiDung);
    })

    $('body').delegate('.btnXoa', 'click', function () {
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })

    $('#txtTimKiem').keyup(function () {
        var mangTimKiem = [];
        var timKiem = $('#txtTimKiem').val();
        mangTimKiem = nguoiDungService.timKiemNguoiDung(timKiem);
        taoBang(mangTimKiem);
    })

    function layDanhSachNguoiDung() {
        nguoiDungService.layDanhSachNguoiDung()
            .done(function (result) {
                taoBang(result);
                localStorage.setItem('danhSachNguoiDung', JSON.stringify(result));
            })
            .fail(function (err) {
                console.log(err);
            })
    };



    function taoBang(danhSachNguoiDung) {
        var tblBody = "";

        danhSachNguoiDung.map(function (item, index) {
            tblBody += `
            <tr>
                <td>${index+1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-success btnSua" data-taikhoan="${item.TaiKhoan}" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                </td>
                
            </tr>
            `
        });

        $('#tblDanhSachNguoiDung').html(tblBody);
    };


})