import { useEffect, useState } from "react";
import { getAllProducts } from "./Api";
import { List, Card, Image, Typography, Button, message, Skeleton } from "antd";
import { addToCard, getProductsByCategory } from "./Api";
import { useParams } from "react-router-dom";
function Products() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const param = useParams();
  useEffect(() => {
    setLoading(true);
    getProductsByCategory(param.category).then((res) => {
      setLoading(false);
      console.log("this is product", res.products);
      setItems(res.products);
    });
  }, [param.category]);
  const addProductToCart = (item) => {
    addToCard(item.id).then((res) => {
      message.success(`${item.title} has been added successfully`);
    });
  };
  console.log("this is loading ", items);
  return (
    <div>
      <Skeleton active loading={loading}>
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
                actions={[
                  <Button
                    type="link"
                    onClick={() => {
                      addProductToCart(product);
                    }}
                  >
                    Add To Cart
                  </Button>,
                ]}
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
