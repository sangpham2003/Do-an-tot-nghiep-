import React, { useState } from "react";
import { ICartProps } from "../../types/types";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currencyFormatter"; // Hàm format tiền tệ
import { toast } from "react-toastify";
import {
  DeleteFromCart,
  IncreaseProductCount,
  DecreaseProductCount,
} from "../../redux/actions/cartActions";
import { MakeIsInCartFalse } from "../../redux/actions/productActions";
import { WishlistProductIsInCartFalse } from "../../redux/actions/wishlistActions";
import { CompareProductIsInCartFalse } from "../../redux/actions/compareActions";
import { useDispatch } from "react-redux";

const CartTable: React.FC<ICartProps> = (props) => {
  const { cart } = props;
  const [size] = useState<number>(1);
  const dispatch = useDispatch();

  return (
    <div className="cart-table">
      <table className="w-100">
        {/* ======= Tiêu đề bảng ======= */}
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Xóa</th>
          </tr>
        </thead>
        {/* ======= Nội dung bảng ======= */}
        <tbody>
          {cart.map((product: any) => {
            // Tính giá sau khi giảm giá
            const discountedPrice = product.selectedPrice
              ? product.selectedPrice * (1 - product.discount / 100)
              : product.price * (1 - product.discount / 100);

            return (
              <tr key={product.productId}>
                <td>
                  <div className="product-img-title d-flex align-items-center">
                    {/* ======= Ảnh sản phẩm ======= */}
                    <div className="product-img">
                      <Link to={`/product-details/${product.productId}`}>
                        <img
                          className="img-fluid"
                          src={product.images[0]?.imageUrl}
                          alt={product.productName}
                        />
                      </Link>
                    </div>
                    {/* ======= Tên sản phẩm ======= */}
                    <div className="product-title">
                      <h6>
                        <Link
                          style={{ color: "#d91f28" }}
                          to={`/product-details/${product.productId}`}
                        >
                          {product.productName}
                        </Link>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  {/* ======= Giá sản phẩm ======= */}
                  <div className="product-price">
                    {product.discount ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Giá gốc gạch ngang */}
                        <p
                          style={{
                            margin: "0",
                            color: "gray",
                            textDecoration: "line-through",
                            marginRight: "10px", // Tạo khoảng cách giữa giá gốc và giá đã giảm
                          }}
                        >
                          {formatCurrency(
                            product.selectedPrice || product.price,
                            "VND"
                          )}{" "}
                          đ
                        </p>
                        {/* Giá sau khi giảm */}
                        <p
                          style={{
                            margin: "0",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        >
                          {formatCurrency(discountedPrice, "VND")} đ
                        </p>
                      </div>
                    ) : (
                      <p style={{ margin: "0", fontWeight: "bold" }}>
                        {formatCurrency(product.selectedPrice || product.price)}
                      </p>
                    )}
                  </div>
                </td>

                <td>
                  {/* ======= Số lượng ======= */}
                  <div
                    className="quantity-wrapper"
                    style={{
                      display: "flex", // Đặt phần tử con theo hàng ngang
                      alignItems: "center", // Căn giữa theo chiều dọc
                      justifyContent: "center", // Căn giữa theo chiều ngang
                    }}
                  >
                    {/* Nút giảm số lượng */}
                    <button
                      type="button"
                      onClick={() => {
                        if (product.count > 1) {
                          dispatch(DecreaseProductCount(product.productId));
                        }
                      }}
                      disabled={product.count === 1} // Vô hiệu hóa nếu số lượng là 1
                      style={{
                        backgroundColor:
                          product.count === 1 ? "#ccc" : "#ffcc00",
                        color: "#000",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: product.count === 1 ? "not-allowed" : "pointer",
                        marginRight: "5px",
                        width: "40px", // Đặt kích thước cố định cho nút
                        height: "40px",
                      }}
                    >
                      -
                    </button>

                    {/* Hiển thị số lượng sản phẩm */}
                    <div className="quantity-area d-flex align-items-center">
                      <input
                        type="text"
                        size={size}
                        readOnly
                        value={product.count}
                      />
                    </div>

                    {/* Nút tăng số lượng */}
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(IncreaseProductCount(product.productId));
                      }}
                      style={{
                        backgroundColor: "#d91f28",
                        color: "#ffffff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        width: "40px", // Đặt kích thước cố định cho nút
                        height: "40px",
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  {/* ======= Tổng tiền ======= */}
                  <p className="total-price m-0">
                    {formatCurrency(discountedPrice * product.count)}
                  </p>
                </td>
                <td>
                  {/* ======= Nút xóa ======= */}
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      dispatch(DeleteFromCart(product.productId));
                      dispatch(MakeIsInCartFalse(product.productId));
                      dispatch(WishlistProductIsInCartFalse(product.productId));
                      dispatch(CompareProductIsInCartFalse(product.productId));
                      toast.error(
                        '"' +
                          product.productName +
                          '" đã được xoá khỏi giỏ hàng.'
                      );
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
