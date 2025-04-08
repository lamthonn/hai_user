import React, { useEffect, useState } from "react";
import { Layout, Menu, Carousel, Card, Row, Col, Button, Spin, Typography, Collapse } from "antd";
import { BASE_URL } from "../../config/configApi";
import { GetAllDanhMucSanPham, GetAllSanPham } from "../../services/SanPham";
import "./index.scss";
import {
    CarOutlined,
  CheckCircleOutlined,
  GiftOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Meta } = Card;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;


const TrangChu: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [totalProducts, setTotalProducts] = useState(0);
    
    const getSanPham = async (pageNumber: number, danhMucId: string) => {
        setLoading(true);
        try {
            const res = await GetAllSanPham(pageNumber, 10, danhMucId);
            setTotalProducts(res.data.total);
            if (pageNumber === 1) {
                setProducts(res.data.items);
            } else {
                setProducts(prev => [...prev, ...res.data.items]);
            }
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm", err);
        }
        setLoading(false);
    };

    const getDanhMucSanPham = async () => {
        try {
            const res = await GetAllDanhMucSanPham(1, 10);
            setCategories(res.data.items);
        } catch (err) {
            console.error("Lỗi khi lấy danh mục sản phẩm", err);
        }
    };

    useEffect(() => {
        getDanhMucSanPham();
        getSanPham(1, "");
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        getSanPham(nextPage, selectedCategory);
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setPage(1);
        getSanPham(1, categoryId);
    };


    const faqData = [
        {
          question: 'Thời gian giao hàng của cửa hàng là bao lâu?',
          answer: 'Chúng tôi giao hàng trong vòng 2-5 ngày làm việc trên toàn quốc. Đối với khu vực nội thành, thời gian giao hàng là 1-2 ngày.',
        },
        {
          question: 'Chính sách bảo hành sản phẩm như thế nào?',
          answer: 'Tất cả sản phẩm gia dụng đều được bảo hành từ 6 tháng đến 2 năm, tùy theo loại sản phẩm. Vui lòng giữ hóa đơn để được hỗ trợ bảo hành.',
        },
        {
          question: 'Tôi có thể đổi trả sản phẩm không?',
          answer: 'Có, bạn có thể đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm bị lỗi do nhà sản xuất. Vui lòng liên hệ hotline để được hỗ trợ.',
        },
      ];
      
      const paymentMethods = [
        'Thanh toán khi nhận hàng (COD)',
        'Chuyển khoản ngân hàng',
        'Thanh toán qua ví điện tử (Momo, ZaloPay)',
        'Thẻ tín dụng/thẻ ghi nợ',
      ];
      const newsData = [
        {
          title: "Review bộ sưu tập mới A.P.C. x Asics Gel-Kayano 14",
          image: "/images/anh_3.png",
        },
        {
          title: "Rolex 2025: Hé lộ Land-Dweller, GMT-Master II và nhiều siêu phẩm",
          image: "/images/anh_4.png",
        },
        {
          title: 'Review chi tiết mẫu giày Fenty x Puma Avanti LS “Team Royal”',
          image: "/images/anh_5.png",
        },
      ];
      const navigate = useNavigate();
    return (
        <Content style={{ background: "#f0f2f5" }}>
            {/* Banner */}
            <Carousel autoplay className="anh_bia">
                <div><img src="/images/logo2.png" alt="Banner 1" style={{ width: "100%", height: "500px" }} /></div>
                <div><img src="/images/logo2.png" alt="Banner 2" style={{ width: "100%", height: "500px" }} /></div>
            </Carousel>

            
    <section className="benefit-section" style={{ padding: "80px 0" }}>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={6}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <CarOutlined className="icon-kaka" style={{ fontSize: 32, color: "#F5A623" }} />
            <div>
              <Title level={5}>Miễn phí vận chuyển</Title>
              <Paragraph style={{ margin: 0 }}>Đơn hàng từ 800k</Paragraph>
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div style={{ display: "flex", alignItems: "center", gap: 12,  justifyContent: "center" }}>
            <GiftOutlined className="icon-kaka" style={{ fontSize: 32, color: "#F5A623" }} />
            <div>
              <Title level={5}>Ưu đãi hấp dẫn</Title>
              <Paragraph style={{ margin: 0 }}>Nhiều khuyến mãi</Paragraph>
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div style={{ display: "flex", alignItems: "center", gap: 12,  justifyContent: "center" }}>
            <CheckCircleOutlined className="icon-kaka" style={{ fontSize: 32, color: "#F5A623" }} />
            <div>
              <Title level={5}>100% chính hãng</Title>
              <Paragraph style={{ margin: 0 }}>Bảo đảm chất lượng</Paragraph>
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div style={{ display: "flex", alignItems: "center", gap: 12,  justifyContent: "center" }}>
            <PhoneOutlined className="icon-kaka" style={{ fontSize: 32, color: "#F5A623" }} />
            <div>
              <Title level={5}>Hotline: 0906 773 723</Title>
              <Paragraph style={{ margin: 0 }}>Gọi ngay để mua hàng nhanh hơn</Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </section>

                <div style={{ textAlign: "center", margin: "40px 0" }}>
            <Title level={1}>Chào mừng bạn đến với cửa hàng giày thời trang của chúng tôi!</Title>
            <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                Khám phá những mẫu giày mới nhất với thiết kế hiện đại, chất liệu cao cấp và giá cả hợp lý. Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời cùng dịch vụ chăm sóc khách hàng tận tâm.
            </Paragraph>
            </div>


            
            <section className="product-intro-section">
                <Row gutter={[32, 32]} align="middle">
                    {/* Phần văn bản bên trái */}
                    <Col xs={24} md={12}>
                    <div className="product-text">
                        <Paragraph className="section-label text-white">GIÀY THỜI TRANG</Paragraph>
                        <Title level={2} className="text-white">
                        BƯỚC ĐI PHONG CÁCH – TỰ TIN MỖI NGÀY
                        </Title>
                        <Paragraph className="text-white">
                        Tự tin khẳng định cá tính với những mẫu giày thời trang mới nhất, thiết kế trẻ trung, ôm chân êm ái. Phù hợp mọi hoạt động từ đi học, đi làm đến dạo phố. Nhiều kiểu dáng, đủ size, đa dạng màu sắc để bạn thoải mái lựa chọn. Mua ngay để nhận ưu đãi đặc biệt hôm nay!
                        </Paragraph>
                        <Button
                        className="text-white"
                        type="primary"
                        shape="round"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        >
                        Mua ngay
                        </Button>
                    </div>
                    </Col>

                    {/* Phần hình ảnh bên phải */}
                    <Col xs={24} md={12}>
                    <div className="product-image">
                        <img
                        style={{ width: "100%" }}
                        src="/images/anh_2.png"
                        alt="Giày thời trang nổi bật"
                        />
                    </div>
                    </Col>
                </Row>
                </section>


            <section className="px-8 py-10">
            <div style={{ padding: "40px 60px" }}>
                <Title level={4}>Tin Tức - Sự Kiện</Title>
                <Paragraph style={{ marginBottom: 24 }}>Tin tức phổ biến</Paragraph>

                <Row gutter={[24, 24]}>
                    {newsData.map((item, index) => (
                    <Col xs={24} md={8} key={index}>
                        <Card
                        hoverable
                        cover={
                            <img
                            alt={item.title}
                            src={item.image}
                            style={{ height: 400, objectFit: "cover" }}
                            />
                        }
                        bodyStyle={{ padding: "24px 10px" }}
                        >
                        <Paragraph strong style={{ margin: 0 }}>
                            {item.title}
                        </Paragraph>
                        </Card>
                    </Col>
                    ))}
                </Row>
                </div>
            </section>

            <section style={{margin: "0 60px"}}>
                
                {/* Danh mục sản phẩm */}
                <h2>Danh mục sản phẩm</h2>
                <Row gutter={[16, 16]}>
                    {categories.map(category => (
                        <Col span={6} key={category.id}>
                            <Button 
                                block 
                                onClick={() => handleCategoryClick(category.id)} 
                                type={selectedCategory === category.id ? "primary" : "default"}
                                style={{ transition: "0.3s", fontWeight: "bold", padding: "40px" }}
                            >
                                {category.ten_danh_muc}
                            </Button>
                        </Col>
                    ))}
                </Row>

                {/* Sản phẩm nổi bật */}
                <h2 style={{ marginTop: "20px" }}>Sản phẩm nổi bật</h2>
                {loading && page === 1 ? <Spin size="large" style={{ display: "block", margin: "20px auto" }} /> : (
                    <>
                        <Row gutter={[16, 16]}>
                            {products.map(product => (
                                <Col span={6} key={product.id}>
                                    <a href={`/chi-tiet-san-pham/${product.ma_san_pham}`} style={{ textDecoration: "none" }}>
                                        <Card 
                                            cover={<img alt={product.ten_san_pham} src={`${BASE_URL}/${product.duongDanAnh}`} style={{ transition: "0.3s", cursor: "pointer" }} />}
                                            hoverable
                                            actions={[<Button onClick={() => navigate(`/chi-tiet-san-pham/${product.ma_san_pham}`)} type="primary">Mua ngay</Button>]}
                                        >
                                            <Meta title={product.ten_san_pham} description={`Giá: ${product.gia}đ`} />
                                        </Card>
                                    </a>
                                </Col>
                            ))}
                        </Row>
                        {/* Ẩn nút nếu số sản phẩm hiện tại không chia hết cho 10 */}
                        {products.length % 10 === 0 && products.length < totalProducts && (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Button type="primary" onClick={handleLoadMore} loading={loading}>Xem thêm</Button>
                            </div>
                        )}
                    </>
                )}
            </section>
            <div style={{ textAlign: "center", margin: "40px 0" }}>
                <Title level={1}>Chào mừng bạn đến với cửa hàng đồ gia dụng của chúng tôi!</Title>
                <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                    Chúng tôi cung cấp các sản phẩm chất lượng cao với mức giá hợp lý, giúp bạn nâng cấp không gian sống một cách tiện nghi và hiện đại. Trải nghiệm mua sắm ngay hôm nay để tận hưởng dịch vụ tận tâm từ chúng tôi!
                </Paragraph>
            </div>
            <div className="anh_bia">
                <img src="/images/anh_1.png" alt="" />
            </div>

            <section className="faq-section">
                <Row gutter={[32, 32]}>
                    {/* Cột trái: FAQ */}
                    <Col xs={24} md={12}>
                    <Title level={2}>FAQ</Title>
                    <Paragraph>
                        Các câu hỏi thường gặp sẽ giúp bạn giải đáp nhanh những thắc mắc phổ biến về sản phẩm/dịch vụ của chúng tôi.
                    </Paragraph>
                    <Collapse accordion>
                        {faqData.map((faq, index) => (
                        <Panel header={faq.question} key={index}>
                            <p>{faq.answer}</p>
                        </Panel>
                        ))}
                    </Collapse>
                    <Button type="primary" shape="round" className="hotline-button">
                        Hotline CSKH
                    </Button>
                    </Col>
                    {/* Cột phải: Phương thức thanh toán */}
                    <Col xs={24} md={12}>
                    <Title level={3}>Các hình thức thanh toán</Title>
                    <Collapse accordion>
                        {paymentMethods.map((method, index) => (
                        <Panel header={method} key={index}>
                            <p>Chúng tôi hỗ trợ {method} để bạn dễ dàng thanh toán. Vui lòng liên hệ nếu cần hỗ trợ thêm.</p>
                        </Panel>
                        ))}
                    </Collapse>
                    </Col>
                </Row>
                </section>
        </Content>
    );
}
export default TrangChu;