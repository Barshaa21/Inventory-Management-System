import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

interface IProduct {
  _id: string;
  ProductName: string;
  ProductID: string;
  ImageURL: string;
  Status: string;
  Quantity: number;
  Description: string;
}

export default function Item() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useSelector((c: any) => {
    // console.log(c.theme.theme);
    return c.theme.theme;
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/showProduct")
      .then((response) => {
        setProducts(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Helper function to group products into pairs
  const groupProductsIntoPairs = (products: IProduct[]) => {
    const pairs = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push(products.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <div className="flex justify-center flex-wrap gap-7 min-h-screen">
      {loading ? (
        <div className="min-h-full flex align-middle justify-center w-[75rem]">
          <img
            className="h-[7rem]"
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
          ></img>
        </div>
      ) : (
        <div>
          {groupProductsIntoPairs(products).map((pair, index) => (
            <div key={index} className="flex">
              {pair.map((product) => (
                <div
                  key={product._id}
                  className={`flex mr-4 ${
                    theme == "gray-200"
                      ? "hover:bg-gray-100"
                      : "hover:bg-[#c7e0f5]"
                  }  rounded-3xl shadow-1xl`}
                >
                  <div className="h-[15rem] w-[35rem] m-5 p-2 flex bg-white rounded-3xl shadow-2xl">
                    <img
                      className="h-[10rem] w-[10rem]"
                      src={product.ImageURL}
                      alt={product.ProductName}
                    />
                    <div>
                      <p
                        className="text-center text-[1.5rem]"
                        style={{ fontFamily: "fantasy" }}
                      >
                        Product Name: {product.ProductName}
                      </p>
                      <p className="pl-5">
                        <span
                          className="text-center text-[1.5rem]"
                          style={{ fontFamily: "fantasy" }}
                        >
                          Description:
                        </span>
                        <br />
                        {product.Description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
