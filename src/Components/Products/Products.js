import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Product from "./Product";

const Products = () => {
    const data = useLoaderData();
    const productsData = data.data.products;
    // console.log(productsData);

    const { category } = useParams(); // Get the category parameter from the URL

  // Filter products based on the selected category
  const categoryProducts = category
    ? productsData.filter(product => product.category === category)
    : productsData;

    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [priceRange, setPriceRange] = useState("");
    const handlePriceFilter = (selectedRange) => {
        // const productsToFilter = starRange ? filteredProducts : productsData;
        if (selectedRange === priceRange) {
            // If the same range is selected again, clear the filter
            setPriceRange("");

            // Reapply star filter if starRange is not empty
            // if (starRange) {
            //     const starFilteredProducts = productsData.filter(
            //         product => parseFloat(product.rating) >= parseFloat(starRange)
            //     );
            //     setFilteredProducts(starFilteredProducts);
            // } else {
            //     setFilteredProducts(productsData); // Reset the filtered products to show all products
            // }
        }
        else {
            console.log(selectedRange);
            console.log(priceRange);
            const [minPrice, maxPrice] = selectedRange.split(" - ");
            const priceFilteredProducts = productsData.filter(
                product => {
                    const productPrice = parseFloat(product.price);
                    return productPrice >= parseFloat(minPrice.replace(/,/g, ""), 10) && productPrice <= parseFloat(maxPrice.replace(/,/g, ""), 10);
                }
            );
            setPriceRange(selectedRange);
            setFilteredProducts(priceFilteredProducts);
        };
    };

    const [sortOrder, setSortOrder] = useState("default"); // "default", "lowToHigh", "highToLow"
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        const applySorting = () => {
            if (sortOrder === "lowToHigh") {
                const sortedProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
                setSortedProducts(sortedProducts);
            } else if (sortOrder === "highToLow") {
                const sortedProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
                setSortedProducts(sortedProducts);
            } 
            // else if (sortOrder === "avgReview") {
            //     const sortedProducts = filteredProducts.slice().sort((a, b) => b.rating - a.rating);
            //     setSortedProducts(sortedProducts);
            // }
             else {
                setSortedProducts([]); // Reset sortedProducts to empty array

                // Check if any filters are applied, and if not, show all products
                  if (!priceRange) {
                    setFilteredProducts(productsData);
                  }
            }
        };
        applySorting();
    }, [sortOrder, filteredProducts, priceRange, productsData])

    const handleSortingChange = (e) => {
        const selectedSortOrder = e.target.value;
        setSortOrder(selectedSortOrder);
    };

    return (
        <div className='w-full relative my-6 flex flex-row bg-white'>
            <div className='w-[18%]  bg-white border-r-2 '>

                <div className='xs:px-1 mdl:px-5 py-[10px]'>
                    <p className='text-xl underline font-bold mb-1'>Price</p>
                    <p className={`sm:text-xs mdl:text-sm lgl:text-lg font-medium mb-[1px] cursor-pointer ${priceRange === "0 - 10" ? "text-blue-500" : ""}`}
                        onClick={() => handlePriceFilter("0 - 10")}
                    > Under ₹10
                    </p>
                    <p className={`sm:text-xs mdl:text-sm lgl:text-lg font-medium mb-[1px] cursor-pointer ${priceRange === "10 - 100" ? "text-blue-500" : ""}`}
                        onClick={() => handlePriceFilter("10 - 100")}
                    >₹10 - ₹100
                    </p>
                    <p className={`sm:text-xs mdl:text-sm lgl:text-lg font-medium mb-[1px] cursor-pointer ${priceRange === "100 - 500" ? "text-blue-500" : ""}`}
                        onClick={() => handlePriceFilter("100 - 500")}
                    >₹100 - ₹500
                    </p>
                    <p className={`sm:text-xs mdl:text-sm lgl:text-lg font-medium mb-[1px] cursor-pointer ${priceRange === "500 - 1,000" ? "text-blue-500" : ""}`}
                        onClick={() => handlePriceFilter("500 - 1,000")}
                    >₹500 - ₹1,000
                    </p>
                    <p className={`sm:text-xs mdl:text-sm lgl:text-lg font-medium mb-[1px] cursor-pointer ${priceRange === "1,000 - 100,000,000" ? "text-blue-500" : ""}`}
                        onClick={() => handlePriceFilter("1,000 - 100,000,000")}>
                        Over ₹1,000
                    </p>
                </div>
            </div>
            <div className='w-[82%] bg-white'>
                <div className=' flex items-center justify-between mx-7 mt-2 text-[18px] font-bold'>
                    <h1>Results </h1>
                    <select onChange={handleSortingChange} value={sortOrder}>
                        <option value="default">Default Sorting</option>
                        <option value="lowToHigh">Price : Low to High</option>
                        <option value="highToLow">Price : High to Low</option>
                        <option value="avgReview">Avg. Customer Review</option>
                    </select>
                    <h1>Total : {categoryProducts.length}</h1>
                </div>

                <div className='w-full flex flex-wrap justify-evenly '>

                    {/* <Product productsData={sortedProducts.length > 0 ? sortedProducts : filteredProducts} /> */}
                    <Product productsData={categoryProducts} />

                </div>
            </div>
        </div>
    )
}

export default Products
