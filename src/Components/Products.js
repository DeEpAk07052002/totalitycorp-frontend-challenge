import { useEffect, useState } from "react";
import { getAllProducts } from "./Api";
import {
  List,
  Card,
  Image,
  Typography,
  Button,
  message,
  Skeleton,
  Rate,
  Dropdown,
  Menu,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { addToCard, getProductsByCategory } from "./Api";
import { useParams } from "react-router-dom";
function Products() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [Cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const param = useParams();
  const sortDropdown = [
    {
      key: "prizehl",
      label: "Prize High to Low",
    },
    {
      key: "prizelh",
      label: "Prize Low to High",
    },
    {
      key: "ratinghl",
      label: "Rating High to Low",
    },
    {
      key: "ratinglh",
      label: "Rating Low to High",
    },
  ];
  const RangeDropdown = [
    {
      key: "0-10",
      label: "$0-$10",
    },
    {
      key: "10-30",
      label: "$10-$30",
    },
    {
      key: "30-100",
      label: "$30-$100",
    },
    {
      key: "100",
      label: "$100 +",
    },
  ];

  useEffect(() => {
    console.log("i am here");
    setLoading(true);
    getProductsByCategory(param.category).then((res) => {
      console.log("this is product", res, param.category);
      setItems(res.products);
      setLoading(false);
    });
    setCart(localStorage.getItem("cart")?.split(","));
  }, [param.category, param]);
  const addProductToCart = (item) => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", item.id);
    } else {
      let cart = localStorage.getItem("cart");
      let splitting = cart?.split(",");

      splitting.push(item.id.toString());

      let seted = splitting?.join(",");
      console.log("splitting", cart, splitting, seted);
      setCart(splitting);
      localStorage.setItem("cart", seted);
    }
    message.success(`${item.title} has been added successfully`);
    window.location.reload();
  };
  const handleSelect = (e) => {
    console.log("thi si s", e.key);
    setItems((prevItems) => {
      let data = [...prevItems]; // Create a new array to avoid mutating the state directly

      if (e.key === "prizelh") {
        data.sort((a, b) => a.price - b.price);
      } else if (e.key === "prizehl") {
        data.sort((a, b) => b.price - a.price);
      } else if (e.key === "ratinglh") {
        data.sort((a, b) => a.rating - b.rating);
      } else if (e.key === "ratinghl") {
        data.sort((a, b) => b.rating - a.rating);
      }

      return data; // Return the updated data to update the state
    });
  };
  const handleSelectRange = async (e) => {
    console.log("thi si s", e.key);
    let data = await getProductsByCategory(param.category);
    data = data.products;
    console.log("this is api data", data);
    let f_data;
    if (e.key === "0-10") {
      console.log("i am here");
      f_data = data.filter(
        (product) => product.price >= 0 && product.price <= 10
      );
    } else if (e.key === "10-30") {
      f_data = data.filter(
        (product) => product.price >= 10 && product.price <= 30
      );
    } else if (e.key === "30-100") {
      f_data = data.filter(
        (product) => product.price >= 30 && product.price <= 100
      );
    } else if (e.key === "100") {
      f_data = data.filter((product) => product.price >= 100);
    }
    setItems(f_data);

    // Return the updated data to update the state
  };
  console.log("this is loading ", items, param.category);
  return (
    <div>
      <Dropdown
        overlay={
          <Menu onClick={handleSelect}>
            {sortDropdown.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
        arrow
      >
        <Button type="primary">
          <Space>
            Sort
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown
        overlay={
          <Menu onClick={handleSelectRange}>
            {RangeDropdown.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
        arrow
      >
        <Button type="primary" style={{ marginLeft: "2%" }}>
          <Space>
            Range
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Skeleton
        active
        paragraph={{ rows: 20 }}
        loading={loading === true || loading2 === true}
      >
        <List
          grid={{ column: 3 }}
          dataSource={items}
          renderItem={(product, index) => {
            return (
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={
                  localStorage.getItem("screenSize") < 600
                    ? [
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="link"
                            onClick={() => {
                              addProductToCart(product);
                            }}
                            disabled={Cart?.includes(product.id.toString())}
                          >
                            Add To Cart
                          </Button>
                          <Rate allowHalf disabled value={product.rating} />
                        </div>,
                      ]
                    : [
                        <Button
                          type="link"
                          onClick={() => {
                            addProductToCart(product);
                          }}
                          disabled={Cart?.includes(product.id.toString())}
                        >
                          Add To Cart
                        </Button>,
                        <Rate allowHalf disabled value={product.rating} />,
                      ]
                }
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price:${product.price}{" "}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            );
          }}
        ></List>
      </Skeleton>
    </div>
  );
}
export default Products;
