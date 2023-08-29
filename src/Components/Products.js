import { useEffect, useState } from "react";
import { getAllProducts } from "./Api";
import { List, Card, Image, Typography } from "antd";
function Products() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  });
  return (
    <div>
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
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price:${product.price}{" "}
                    <Typography.Text delete type="danger">
                      {parseFloat(
                        product.price +
                          (product.price * product.discountPercentage) / 100
                      )}
                    </Typography.Text>
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
    </div>
  );
}
export default Products;
