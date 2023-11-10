# THƯ VIỆN DÙNG CHO BACKEND

- npm i express mongoose nodemon jsonwebtoken bcryptjs dotenv cookie-parser cors

# CHỨC NĂNG ĐĂNG KÍ

- B1: Check user có tồn tại hay không
- B2: Tạo salt dùng genSaltSync của bcryptjs
- B3: Hash password dùng hashSync của bcryptjs
- B4: Lưu user vào mongodb
- B5: Đăng kí token dùng jwt.sign() - (bao gồm userId và JWT SECRET trong file env + thời gian hết hạn token expiresIn: "30d")
- B6: Extract password ra khỏi thông tin user
- B7: Trả res về với status 201, lưu access_token vào cookie
