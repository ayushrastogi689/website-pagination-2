import React from "react";
import {useState, useEffect} from "react";
import './App.css';

function App() {

  // 6.
  // Now we have to keep all these products in some variable, so we will use a react hook useState 
  const [products, setProducts] = useState([]);
  // 13. 
  // useState for handling pagination
  const [page, setPage] = useState(1);



  // 1.
  // Here fetchProducts is an arrow function which is asynchronous in nature
  const fetchProducts = async() => {

    // 2.
    // We can use fetch() to get all the products from api.
       // After providing the URL in fetch() it becomes a asynchronous call, hence we need to provide await to resolve the promise 
    const response = await fetch("https://dummyjson.com/products?limit=100");
    
    // 3.
    // Converting the response into json format.
       // We put await to wait for the further operation  
    const data = await response.json();

    // 7. 
    // doing a check that data and data.products have values inside them then only setProducts
    if( data && data.products) {
      setProducts(data.products);
    }
    // 4. 
    console.log(data);
  };

  // 5. 
  useEffect(() => {
    fetchProducts()
  }, [])

// 13. 
const selectPageHandler = (selectedPage) => {
  // 14. 
  // there is no page such as 0, so we are going to add a check
  if(selectedPage >=1 && selectedPage <= products.length/10 && selectedPage !== page)
  setPage(selectedPage)
}


// 8. Did a check of products.length >0 
// 9. map() the product
// 10. return it in span
// 11. Inside first span we render image of products  
// 12. Inside another span we reder product title


  return (
    <div>
      {
        products.length> 0 && <div className="container" >
          {
            products.slice(page * 10 - 10, page*10).map((product) => {
            return (
              <div className="products" key={product.id}>
                <img src= {product.thumbnail} alt={product.title}/>
                 <span> {product.title}</span>
                
              </div>
              );
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className="pagination">
          <span className={page > 1 ?"":"pagination_disabled"} onClick={()=>selectPageHandler(page-1)}>
            <i class="fa-solid fa-square-caret-left"></i>
          </span>
          
          {
            [...Array(products.length/10)].map((_,index)=>{
              return (
                    <span className={page === index+1 ? "selected" : ""} 
                      onClick={()=>selectPageHandler(index+1)} key={index}>{index+1}
                    </span>
                  )
            })
          }

          <span className={page< products.length/10 ?"":"pagination_disabled"} onClick={()=>selectPageHandler(page+1)}>
            <i class="fa-solid fa-square-caret-right"></i>
          </span>
          
        </div>
      }
    </div>
  );
}

export default App;
