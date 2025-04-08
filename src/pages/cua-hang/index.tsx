import {
  Avatar,
  Card,
  Col,
  Image,
  Pagination,
  PaginationProps,
  Row,
  Slider,
  Spin,
  Splitter,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { axiosConfig, BASE_URL } from "../../config/configApi";
import ShowToast from "../../components/show-toast/ShowToast";
import "./index.scss";
import {
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  FilterOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import FormItemInput from "../../components/form-input/FormInput";
import FormSelect from "../../components/form-select/FormSelect";
import { SliderSingleProps } from "antd/lib";
import { SliderRangeProps } from "antd/es/slider";
import ButtonCustom from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import GroupLabel from "../../components/group-label";

const CuaHang: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>([20, 80]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);
  const [total, setTotal] = useState<number>(1);
  const [ProductsData, setProductsData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [khoang_tien, set_khoang_tien] = useState<number[]>([20000, 10000000]);
  const [danh_muc, set_danh_muc] = useState<string | null>(null);
  const [tu_khoa, set_tu_khoa] = useState<string | string[] | undefined>();
  const navigate = useNavigate();

  //phân trang
  const onChange: PaginationProps["onChange"] = (page) => {
    setPageIndex(page);
  };
  //get tất cả sản phẩm lần đầu
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get(`api/DanhSachSanPham/get-all`, {
        params: {
          pageSize: pageSize,
          pageNumber: pageIndex,
        },
      })
      .then((res: any) => {
        setProductsData(res.data.items);
        setTotal(res.data.totalRecord);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageIndex]);

  const handleSearch = () => {
    setLoading(true);
    axiosConfig
      .get(`api/DanhSachSanPham/get-all`, {
        params: {
          pageSize: pageSize,
          pageNumber: 1,
          danh_muc_id: danh_muc,
          keySearch: tu_khoa,
          khoang_gia_tu: khoang_tien[0],
          khoang_gia_den: khoang_tien[1],
        },
      })
      .then((res: any) => {
        // console.log(res.data.items);
        setProductsData(res.data.items);
        setTotal(res.data.totalRecord);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickProduct = (item:any) => {
    navigate(`/chi-tiet-san-pham/${item.ma_san_pham}`)
  }

  const formatter: NonNullable<SliderRangeProps["tooltip"]>["formatter"] = (
    value
  ) =>
    `${value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`;
    const [hienBoLoc, setHienBoLoc] = useState(true);

  return (
    <div className="ds-san-pham">
      <Spin spinning={loading}>
        {/* Thanh trên cùng chứa nút bật/tắt bộ lọc */}
        <div
          style={{
            background: "#fff",
            padding: "12px 16px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Danh sách sản phẩm
          </Typography.Title>
          <ButtonCustom
            icon={hienBoLoc ? <CloseOutlined /> : <FilterOutlined />}
            onClick={() => setHienBoLoc(!hienBoLoc)}
            text={hienBoLoc ? "Đóng bộ lọc" : "Mở bộ lọc"}

          />
        </div>

        {/* Bộ lọc (có thể ẩn/hiện) */}
        {hienBoLoc && (
          <div
            style={{
              padding: "16px",
              background: "#fafafa",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <FormItemInput
                  label="Tìm kiếm"
                  placeholder="Nhập từ khóa"
                  value={tu_khoa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    set_tu_khoa(e.target.value)
                  }
                />
              </Col>
              <Col span={8}>
                <FormSelect
                  selectType="selectApi"
                  label={"Danh mục"}
                  src="api/DanhMucSanPham/get-all"
                  valueField={"id"}
                  labelField="ten_danh_muc"
                  allOptionLabel="Tất cả"
                  value={danh_muc}
                  onChange={set_danh_muc}
                />
              </Col>
              <Col span={8}>
                <Typography.Text>Khoảng giá</Typography.Text>
                <Slider
                  range
                  min={20000}
                  max={10000000}
                  step={10000}
                  value={khoang_tien}
                  tooltip={{ formatter }}
                  onChange={set_khoang_tien}
                />
              </Col>
              <Col span={24}>
                <ButtonCustom text="Tìm kiếm" onClick={handleSearch} />
              </Col>
            </Row>
          </div>
        )}

        {/* DANH SÁCH SẢN PHẨM */}
        <div style={{ padding: "16px" }}>
          <Typography.Title level={4}>
            <GroupLabel label="Kết quả tìm kiếm" />
          </Typography.Title>

          <div className="product-grid">
            {ProductsData.map((item: any) => (
              <Card
                key={item.id}
                hoverable
                onClick={() => handleClickProduct(item)}
                className="product-card"
                cover={
                  <Image
                    preview={false}
                    alt="Ảnh sản phẩm"
                    src={`${BASE_URL}/${item.duongDanAnh}`}
                    className="product-image"
                  />
                }
                actions={[<ShoppingCartOutlined key="cart" className="cart-icon" />]}
              >
                <div className="product-info">
                  <Typography.Text className="ten-san-pham">
                    {item.ten_san_pham}
                  </Typography.Text>
                  <Typography.Text type="secondary" className="ten-danh-muc">
                    {item.ten_danh_muc}
                  </Typography.Text>
                  <div>
                    {item.khuyen_mai ? (
                      <>
                        <Typography.Text delete className="gia-san-pham">
                          {item.gia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography.Text>
                        <Typography.Text className="khuyen-mai">
                          {item.khuyen_mai.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography.Text>
                      </>
                    ) : (
                      <Typography.Text className="gia-san-pham">
                        {item.gia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography.Text>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination
            size="default"
            total={total}
            current={pageIndex}
            pageSize={pageSize}
            onChange={onChange}
            className="pagination-custom"
            style={{ marginTop: "24px", textAlign: "right" }}
          />
        </div>
      </Spin>
    </div>
  );
    
};
export default CuaHang;
