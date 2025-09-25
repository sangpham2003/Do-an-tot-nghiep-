import React, { useEffect, useState } from "react";
import { getAllBrands } from "../../../services/brandService"; // Import API call function

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]); // State to store brand data
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch brands from the API when the component mounts
    const fetchBrands = async () => {
      try {
        const response = await getAllBrands(); // Call the API to get brand data
        setBrands(response.content); // Assuming response.content contains the brand data
      } catch (error) {
        console.error("Error fetching brands", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  return (
    <div className="brands-section">
      <ul className="d-flex">
        {brands.map((brand: any) => (
          <li key={brand.brandId}>
            <a href="#/">
              {" "}
              {/* Assuming there is no specific link for brands */}
              <img
                src={brand.image} // Use the image field from the brand data
                alt={brand.brandName}
                style={{ width: "100px", height: "auto" }} // Add appropriate styling for the images
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Brands;
