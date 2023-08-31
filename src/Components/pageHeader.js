import "../App.css";
import { useState } from "react";
import { Badge, Menu, Typography, Dropdown, Button, Space } from "antd";
import {
  HomeTwoTone,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AppCart from "./AppCart";
function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeTwoTone />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Mens Shirts",
                key: "mens-shirts",
              },
              {
                label: "Mens Shoes",
                key: "mens-shoes",
              },
              {
                label: "Mens Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women Jwellery",
                key: "womens-jewellery",
              },
              {
                label: "Women Bag",
                key: "womens-bags",
              },
            ],
          },
        ]}
      ></Menu>

      <AppCart />
    </div>
  );
}
export default AppHeader;
