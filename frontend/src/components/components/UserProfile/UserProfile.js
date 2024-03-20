import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { getUser } from "../../../services/userServices";
import { Link } from "react-router-dom";
import NonAuthenticated from "../NonAuthenticated/NonAuthenticated";
import { loadStripe } from "@stripe/stripe-js";
import { createPayment, updatePaymentAfterStripeRes } from "../../../services/paymentService";

function UserProfile() {
  const { userId } = useAuth();
  const [user, setUser] = useState({});

  async function makePayment() {
    //TODO to add try catch here
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const payload = {
      name: "Gold subscription",
      amount: 200,
      status: "PENDING",
      apliedAt: new Date(),
      userId: userId,
    };
    const response = await createPayment(payload);

    const result = stripe.redirectToCheckout({
      sessionId: response.id,
    });

    console.log(result);
    // if (result) {
    //   const updatedPayload = {
    //     amount: 200,
    //     name: "Gold subscription",
    //     userId: userId,
    //     status: "COMPLETED",
    //   };
    //   const response = await updatePaymentAfterStripeRes(updatedPayload);
    // }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(userId);
        const currentUser = userData?.user;
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }

    // Cleanup function (optional)
    return () => {};
  }, [userId]);

  if (!userId) {
    return <NonAuthenticated />;
  }

  if (!user) {
    return <div>Something went wrong with this user</div>;
  }
  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Age: {user.age}</p>
      <p>Company: {user.company}</p>
      <p>Phone: {user.phone}</p>
      <p>Level: {user.level}</p>
      <p>Photo: {user.photoUrl}</p>
      <p>
        <img src={user.photoUrl} alt="profile picture" width="300" height="300" />
      </p>
      <Link to={`/users/${user.id}`}>Edit</Link>
      <Link to={`/`}>Back To Home</Link>
      <button onClick={makePayment}>Pay</button>
    </div>
  );
}

export default UserProfile;
