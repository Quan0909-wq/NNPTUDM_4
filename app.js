var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// 1. Cấu hình cơ bản
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. KHAI BÁO CÁC ROUTE (Phải đặt trước phần xử lý lỗi)
app.use('/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/products', require('./routes/products'));

// Đưa categoryRoutes lên đây để nó hoạt động
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/v1/categories', categoryRoutes);

// 3. XỬ LÝ LỖI 404
app.use(function(req, res, next) {
  next(createError(404));
});

// 4. ERROR HANDLER (Đã sửa để trả về JSON thay vì render trang lỗi)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  
  // Trả về JSON để không bị lỗi "Failed to lookup view"
  res.json({
    status: err.status || 500,
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;