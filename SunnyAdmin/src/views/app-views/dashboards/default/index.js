import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Table, DatePicker, Tag, message } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";

import {
  getDailyRevenue,
  getRevunueSumary,
  getTopProducts,
  getMonthlyRevenue,
} from "services/revenueService.js";
import { withRouter } from "react-router-dom";
import { formatCurrency } from "utils/formatCurrency";
import User from "assets/img/teamwork.png";
import Order from "assets/img/shopping-bag.png";
import Product from "assets/img/best-seller.png";
import COD from "assets/img/cash-on-delivery.png";
import moment from "moment";
import OrderDetailModal from "views/app-views/apps/order/OrderDetailModal";
import { getAllOrders } from "services/orderService";

const { MonthPicker } = DatePicker;

// Payment Method
const generatePaymentMethod = (method) => {
  switch (method) {
    case "COD":
      return <img src={COD} alt="COD" width={40} style={{ borderRadius: "8px" }} />;
    case "VNPay":
      return (
        <img
          src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
          alt="VNPay"
          width={40}
          style={{ borderRadius: "8px" }}
        />
      );
    case "Paypal":
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
          alt="Paypal"
          width={40}
          style={{ borderRadius: "8px" }}
        />
      );
    default:
      return <span>{method}</span>;
  }
};

// Status Badge
const generateStatus = (status) => {
  let color = "default";
  switch (status) {
    case "Chờ xác nhận":
      color = "orange";
      break;
    case "Đã xác nhận":
      color = "blue";
      break;
    case "Đã đóng gói":
      color = "purple";
      break;
    case "Đang vận chuyển":
      color = "green";
      break;
    case "Đã hủy":
      color = "red";
      break;
    case "Đã giao hàng":
      color = "cyan";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{status}</Tag>;
};

export const DefaultDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const limit = 5;
  const [revenue, setRevenue] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [topProducts, setTopProducts] = useState({ bestSelling: [], worstSelling: [] });
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);

  // Daily Revenue filter
  const [startDate, setStartDate] = useState(moment().subtract(1, "months").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().add(1, "days").format("YYYY-MM-DD"));

  // Monthly Revenue filter
  const [monthlyStart, setMonthlyStart] = useState(moment().startOf("year"));
  const [monthlyEnd, setMonthlyEnd] = useState(moment());

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(1, limit);
      setOrders(data.content);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueData = await getRevunueSumary();
        setRevenue(revenueData);

        await handleFetchRevenue();

        const topData = await getTopProducts(10);
        setTopProducts(topData);

        await handleFetchMonthlyRevenue();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOrders();
    fetchData();
  }, []);

  const handleFetchRevenue = async () => {
    try {
      const dailyRevenueData = await getDailyRevenue(startDate, endDate);
      setDailyData(dailyRevenueData);
    } catch (error) {
      console.error("Error fetching daily revenue:", error);
    }
  };

  const handleFetchMonthlyRevenue = async () => {
    try {
      if (!monthlyStart || !monthlyEnd) {
        message.warning("Vui lòng chọn khoảng thời gian hợp lệ!");
        return;
      }

      const diffMonths =
        (monthlyEnd.year() - monthlyStart.year()) * 12 +
        (monthlyEnd.month() - monthlyStart.month()) + 1;

      if (diffMonths > 12) {
        message.error("Chỉ được chọn tối đa 12 tháng!");
        return;
      }

      const start = monthlyStart.format("MM/YYYY");
      const end = monthlyEnd.format("MM/YYYY");
      const data = await getMonthlyRevenue(start, end);
      setMonthlyRevenue(data);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // Orders Columns
  const orderColumns = [
    { title: "Mã Đơn Hàng", dataIndex: "code", key: "code" },
    { title: "Người Mua", dataIndex: ["user", "fullName"], key: "user" },
    { title: "SĐT", dataIndex: ["user", "phoneNumber"], key: "phoneNumber" },
    { title: "Email", dataIndex: ["user", "email"], key: "email" },
    {
      title: "Ngày Đặt",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    { title: "Thanh Toán", dataIndex: "paymentMethod", key: "paymentMethod", align: "center", render: generatePaymentMethod },
    { title: "Tổng Giá", dataIndex: "totalPrice", key: "totalPrice", render: (text) => formatCurrency(text) },
    { title: "Trạng Thái", dataIndex: "status", key: "status", render: generateStatus },
    {
      title: "Hành Động",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Button size="small" type="primary" onClick={() => handleViewDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // Products Columns
  const productColumns = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => <strong>{index + 1}</strong>,
      width: 50,
    },
    { title: "Tên sản phẩm", dataIndex: "productName", key: "productName" },
    {
      title: "Số lượng bán",
      dataIndex: "totalSold",
      key: "totalSold",
      render: (val) => <Tag color="blue">{val}</Tag>,
      align: "center",
    },
  ];

  return (
    <>
      {/* Widgets */}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <StatisticWidget title="Tổng số sản phẩm" value={`${revenue?.totalProducts} sản phẩm`} imgSrc={Product} />
            </Col>
            <Col xs={24} md={8}>
              <StatisticWidget title="Tổng số đơn hàng" value={`${revenue?.totalOrders} đơn hàng`} imgSrc={Order} />
            </Col>
            <Col xs={24} md={8}>
              <StatisticWidget title="Tổng số người dùng" value={`${revenue?.totalUsers} người dùng`} imgSrc={User} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "16px" }}>
            <Col xs={24} md={8}>
              <StatisticWidget
                title="Doanh thu hôm nay"
                value={formatCurrency(revenue?.todayRevenue)}
                status={revenue?.todayIncreasePercentage}
                subtitle={`So với hôm qua (${formatCurrency(revenue?.yesterdayRevenue)})`}
              />
            </Col>
            <Col xs={24} md={8}>
              <StatisticWidget
                title="Doanh thu tháng này"
                value={formatCurrency(revenue?.monthlyRevenue)}
                status={revenue?.monthlyIncreasePercentage}
                subtitle={`So với tháng trước (${formatCurrency(revenue?.lastMonthRevenue)})`}
              />
            </Col>
            <Col xs={24} md={8}>
              <StatisticWidget
                title="Doanh thu năm"
                value={formatCurrency(revenue?.yearlyRevenue)}
                status={revenue?.yearlyIncreasePercentage}
                subtitle={`So với năm ngoái (${formatCurrency(revenue?.lastYearRevenue)})`}
              />
            </Col>
          </Row>

          {/* Daily Revenue Filter */}
          <Row gutter={16} style={{ margin: "20px 0" }}>
            <Col xs={24} sm={12} md={8}>
              <DatePicker
                onChange={(date, dateString) => setStartDate(dateString)}
                value={moment(startDate)}
                format="YYYY-MM-DD"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DatePicker
                onChange={(date, dateString) => setEndDate(dateString)}
                value={moment(endDate)}
                format="YYYY-MM-DD"
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Button type="primary" onClick={handleFetchRevenue}>
                Xem doanh thu ngày
              </Button>
            </Col>
          </Row>

          {/* Daily Revenue Chart */}
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Doanh thu theo ngày"
                series={dailyData?.series}
                xAxis={dailyData?.categories}
                height={400}
              />
            </Col>
          </Row>

          {/* Monthly Revenue Filter + Chart */}
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col xs={24} md={10}>
              <MonthPicker
                value={monthlyStart}
                format="MM/YYYY"
                onChange={(date) => setMonthlyStart(date)}
              />
              <span style={{ margin: "0 10px" }}>→</span>
              <MonthPicker
                value={monthlyEnd}
                format="MM/YYYY"
                onChange={(date) => setMonthlyEnd(date)}
              />
            </Col>
            <Col xs={24} md={4}>
              <Button type="primary" onClick={handleFetchMonthlyRevenue}>
                Xem doanh thu tháng
              </Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <ChartWidget
                title="Doanh thu theo tháng"
                series={[{ name: "Doanh thu", data: monthlyRevenue?.map((m) => m.revenue) }]}
                xAxis={monthlyRevenue?.map((m) => m.month)}
                height={400}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Top Products */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24} md={12}>
          <Card title="Top 10 sản phẩm bán chạy" bordered={false}>
            <Table
              columns={productColumns}
              dataSource={topProducts.bestSelling}
              pagination={false}
              rowKey={(record) => record.productId}
              size="middle"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Top 10 sản phẩm bán chậm" bordered={false}>
            <Table
              columns={productColumns}
              dataSource={topProducts.worstSelling}
              pagination={false}
              rowKey={(record) => record.productId}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      {/* Latest Orders */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24}>
          <Card title="Đơn hàng gần nhất">
            <Table columns={orderColumns} dataSource={orders} pagination={false} rowKey={(r) => r.orderId} />
          </Card>
        </Col>
      </Row>

      {selectedOrder && (
        <OrderDetailModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          selectedOrder={selectedOrder}
          fetchOrdersData={fetchOrders}
        />
      )}
    </>
  );
};

export default withRouter(DefaultDashboard);
