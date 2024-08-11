// Example product object with pricing details
const product = {
    price: {
        originalPrice: 5031.31,  // Original price of the product before discount
        discount: 30,            // Discount percentage to be applied
        gst_percent: 0,          // GST percentage
        is_gst_inclusive: false  // Indicates whether the price is GST inclusive (false means GST exclusive)
    }
};

// Function to calculate the final price, GST value, and discounted price for a product
function calculatePrice(is_gst_inclusive, product) {
    const { originalPrice, discount, gst_percent } = product.price;

    // Step 1: Apply the discount to the original price
    const discounted_price = originalPrice - (originalPrice * (discount / 100));

    let gst_value, product_total_price;

    if (is_gst_inclusive) {
        // GST Inclusive scenario:
        // The final price already includes GST, so we need to extract the base price and GST value
        product_total_price = discounted_price;  // The total price is the discounted price
        const product_price = product_total_price / (1 + (gst_percent / 100));  // Extract the base price (excluding GST)
        gst_value = product_total_price - product_price;  // Calculate the GST value
    } else {
        // GST Exclusive scenario:
        // The GST is added on top of the discounted price
        const product_price = discounted_price;  // The base price is the discounted price
        gst_value = product_price * (gst_percent / 100);  // Calculate the GST value
        product_total_price = product_price + gst_value;  // The final price includes the base price + GST
    }

    // Helper function to round numbers to 2 decimal places
    const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

    // Return the calculated values, rounded to 2 decimal places as numbers
    return {
        originalPrice: roundToTwoDecimals(originalPrice),           // Original price before discount
        discounted_price: roundToTwoDecimals(discounted_price),     // Price after discount
        gst_value: roundToTwoDecimals(gst_value),                   // GST value
        product_total_price: roundToTwoDecimals(product_total_price) // Final price after adding GST
    };
}

// Example usage of the calculatePrice function
const result = calculatePrice(false, product);  // Call the function with is_gst_inclusive = false
console.log(result);  // Output the calculation result
