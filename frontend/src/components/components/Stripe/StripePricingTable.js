import React, { useEffect } from "react";

function StripePricingTable() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <stripe-pricing-table
        pricing-table-id="prctbl_1Nmf3zG90N0GgzzzBuH9Pq57"
        publishable-key={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      ></stripe-pricing-table>
    </div>
  );
}

export default StripePricingTable;
