import { Badge, Button, Drawer, InputNumber, Table } from "antd";
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
            data_cart.includes(product.id.toString())
          );
        });

        const productsFromCategories = await Promise.all(promises);

        const allProductsRes = await getAllProducts();
        const allProducts = allProductsRes.products?.filter((product) =>
          data_cart.includes(product.id.toString())
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
    data_to_change.push({ ...data, quantity: 1, total: data.price });
  });

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
          window.location.reload();
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
              render: (value) => {
                return <InputNumber defaultValue={1} />;
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
        />
      </Drawer>
    </div>
  );
}
export default AppCart;
