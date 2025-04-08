import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  Space,
  Tooltip,
} from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { menuItem } from "../config";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../routes/routes";
import {
  InfoCircleOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ShowToast from "../components/show-toast/ShowToast";
import LoginPage from "../pages/login";
import ButtonCustom from "../components/button/button";
import RegisterPage from "../pages/register";
import { getDetailAcc } from "../services/AuthenServices";
type HeaderLayoutProps = {
  setLoading?: (va: boolean) => void;
};
const HeaderLayout: React.FC<HeaderLayoutProps> = ({ setLoading }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>();
  const [user, setUser] = useState<any>();
  // Hàm lấy dữ liệu tài khoản
  const getData = async () => {
    await getDetailAcc()
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((error: any) => {
        // ShowToast(
        //   "error",
        //   "Thông báo",
        //   "Không thể lấy thông tin tài khoản. Vui lòng thử lại sau",
        //   3
        // );
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const checkAuth = localStorage.getItem("auth");
    if (checkAuth) {
      setAuth(checkAuth);
    }
  }, []);
  //xác thực
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoginModalVisibleReg, setIsLoginModalVisibleReg] = useState(false);

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleChangeMenu: MenuProps["onClick"] = (item: any) => {
    if (item.key === "trang-chu") {
      navigate(routesConfig.trangChu);
    }
    if (item.key === "cua-hang") {
      navigate(routesConfig.cuaHang);
    }
    if (item.key === "gio-hang") {
      const auth = localStorage.getItem("auth");
      if (!auth) {
        showLoginModal();
      } else {
        navigate(routesConfig.gioHang);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    ShowToast("success", "Đăng xuất thành công", "Hẹn gặp lại bạn sau!");
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      label: <>Thông tin tài khoản</>,
      key: "0",
      onClick: () => {
        navigate("/thong-tin-tai-khoan");
      },
    },
    {
      label: <>Đơn hàng</>,
      key: "1",
      onClick: () => {
        navigate(routesConfig.theoDoiDonHang);
      },
    },
    {
      key: "dang-xuat",
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="header-layout">
      {/* Top bar */}
      <div
        style={{
          backgroundColor: "var(--color-primary-6)",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          className="small-text"
        >
          GIÀY THỂ THAO & PHỤ KIỆN CHÍNH HÃNG TỪ 2004
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
            className="small-text"
          >
            <InfoCircleOutlined style={{ marginRight: "5px" }} />
            Ưu đãi đặc biệt hôm nay
          </span>
          <span
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "14px",
            }}
            className="small-text"
            onClick={() => navigate(routesConfig.theoDoiDonHang)}
          >
            <ShoppingCartOutlined style={{ marginRight: "5px" }} />
            Tra cứu đơn hàng
          </span>
        </div>
      </div>

      {/* Main header */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "var(--color-primary-1)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <img
          src="/images/logo_removeBg.png"
          alt="Shoes Logo"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={() => navigate(routesConfig.trangChu)}
        />

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          style={{
            flex: 1,
            marginLeft: "20px",
            backgroundColor: "transparent",
            borderBottom: "none",
          }}
          items={menuItem}
          onClick={handleChangeMenu}
        />

        {/* User actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Tooltip title="Giỏ hàng">
            <Avatar
              icon={<ShoppingCartOutlined />}
              style={{
                backgroundColor: "var(--color-primary-7)",
                cursor: "pointer",
              }}
              onClick={() => {
                const auth = localStorage.getItem("auth");
                if (!auth) {
                  showLoginModal();
                } else {
                  navigate(routesConfig.gioHang);
                }
              }}
            />
          </Tooltip>
          {auth ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "var(--color-primary-9)" }}>
                  <Avatar icon={<UserOutlined />} />
                  {user ? user.ten : "Tài khoản"}
                </Space>
              </a>
            </Dropdown>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <ButtonCustom
                text="Đăng nhập"
                style={{
                  backgroundColor: "var(--color-primary-9)",
                  color: "white",
                }}
                onClick={() => setIsLoginModalVisible(true)}
              />
              <Button
                style={{
                  borderColor: "var(--color-primary-9)",
                  color: "var(--color-primary-9)",
                }}
                onClick={() => setIsLoginModalVisibleReg(true)}
              >
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </Header>

      {/* Login and Register Modals */}
      <LoginPage
        isOpen={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        handleCloseModal={setIsLoginModalVisible}
        setLoading={setLoading}
      />
      <RegisterPage
        isOpen={isLoginModalVisibleReg}
        onClose={() => setIsLoginModalVisibleReg(false)}
        setLoading={setLoading}
      />
    </div>
  );
};

export default HeaderLayout;
