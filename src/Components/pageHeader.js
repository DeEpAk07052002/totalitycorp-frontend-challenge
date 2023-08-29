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
            key: "home",
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
                key: "women-shirts",
              },
              {
                label: "Women Shoes",
                key: "women-shoes",
              },
              {
                label: "Women Jwellery",
                key: "women-jwellery",
              },
              {
                label: "Women Bag",
                key: "women-bag ",
              },
            ],
          },
          {
            label: "Accessories",
            key: "accessories",
          },
        ]}
      ></Menu>
    </div>
  );
}
export default AppHeader;
