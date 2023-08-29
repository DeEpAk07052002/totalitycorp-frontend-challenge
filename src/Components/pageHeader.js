import "../App.css";
import { Menu } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
}
export default AppHeader;
