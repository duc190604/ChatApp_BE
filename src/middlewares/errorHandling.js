
import { env } from "~/config/environments";

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandling = (err, req, res, next) => {
  // Nếu dev không cẩn thận thiếu status thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR

  if (!err.status) err.status = 500;

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    status: err.status,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  };
  // console.error(responseError)

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi. (Muốn hiểu rõ hơn hãy xem video 55 trong bộ MERN Stack trên kênh Youtube: https://www.youtube.com/@trungquandev)
  if (env.BUILD_MODE !== "dev") delete responseError.stack;

  // Trả responseError về phía Front-end
  res.status(responseError.status).json(responseError);
};
