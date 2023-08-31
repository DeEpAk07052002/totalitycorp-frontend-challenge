import {
  Badge,
  Button,
  Drawer,
  InputNumber,
  Table,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getProductsByCategory, getAllProducts } from "./Api";
function AppCart() {
  const [open, setOpen] = useState(false);
  const [dataCart, setDataCart] = useState([]);

  let storedData = localStorage.getItem("cart");
  let data = storedData ? (storedData === "" ? [] : storedData.split(",")) : [];
  console.log("localStorage.getItem", typeof data);

  let data_cart = data;

  let items_list = [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-shoes",
    "womens-jewellery",
    "womens-bags",
  ];
  const [cnt, setCnt] = useState(data.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = items_list.map(async (list) => {
          const res = await getProductsByCategory(list);
          return res.products?.filter((product) =>
            data_cart?.includes(product.id.toString())
          );
        });

        const productsFromCategories = await Promise.all(promises);

        const allProductsRes = await getAllProducts();
        const allProducts = allProductsRes.products?.filter((product) =>
          data_cart?.includes(product.id.toString())
        );

        setDataCart((prevData) => [
          ...prevData,
          ...productsFromCategories.flat(),
          ...allProducts,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const value = e.value ? e.value : 0;

    const updatedDataCart = dataCart.map((data) => {
      if (data.id === e.record.id) {
        return {
          ...data,
          quantity: value,
          total: value * data.price,
        };
      }
      return data;
    });
    console.log("this is  updated card", updatedDataCart);
    setDataCart(updatedDataCart);
  };
  console.log("dataCart", dataCart);
  const objectSet = new Set();

  dataCart.forEach((obj) => {
    // Serialize the object to a string for comparison
    const serialized = JSON.stringify(obj);
    objectSet.add(serialized);
  });

  // Convert the Set back to an array of objects
  const uniqueObjectsArray = Array.from(objectSet).map((serialized) =>
    JSON.parse(serialized)
  );
  let data_to_change = [];
  uniqueObjectsArray.map((data) => {
    if (!data.quantity && !data.total) {
      data_to_change.push({ ...data, quantity: 1, total: data.price });
    } else {
      data_to_change.push(data);
    }
  });
  console.log("data_to chnage", data_to_change);

  console.log("uniqueObjectsArray", uniqueObjectsArray);
  const handleClick = (e) => {
    let localStoragedata = localStorage.getItem("cart")?.split(",");
    const filteredlocalData = localStoragedata?.filter((item) => item != e);
    localStorage.setItem("cart", filteredlocalData?.join(","));

    const filteredData = dataCart.filter((item) => item.id != e);
    let cnti = cnt;
    setCnt(cnt - 1);
    setDataCart(filteredData);
    // window.location.reload();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Form values:", values);
    localStorage.clear();
    setDataCart([]);
    handleOk();
    setCnt(0);
    message.success("Order Placed");
  };

  return (
    <div>
      <Badge
        onClick={() => {
          setOpen(true);
        }}
        count={cnt}
        style={{ fontSize: "10px", marginRight: "40px", cursor: "pointer" }}
      >
        <ShoppingCartOutlined className="soppingCartIcon" />
      </Badge>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
          //   window.location.reload();
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: "500px" }}
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    onChange={(e) => {
                      console.log("this is target", e);
                      handleChange({ record: record, value: e });
                    }}
                    min={1}
                    defaultValue={1}
                  />
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Delete",
              render: (value, record) => {
                return (
                  <Button
                    onClick={() => {
                      handleClick(record.id);
                    }}
                  >
                    Delete
                  </Button>
                );
              },
            },
          ]}
          dataSource={data_to_change}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total:${total}</span>;
          }}
        />
        <Button type="primary" disabled={cnt == 0} onClick={showModal}>
          {" "}
          CheckOut Your Cart
        </Button>
      </Drawer>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default AppCart;
