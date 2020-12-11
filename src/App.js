import React from "react";
import "./App.css";

let canApplePay = false;

if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
  canApplePay = true;
}

const createApplePaySession = () => {
  const session = new window.ApplePaySession(3, {
    countryCode: "US",
    currencyCode: "USD",
    merchantCapabilities: ["supports3DS"],
    supportedNetworks: ["visa", "masterCard", "amex", "discover"],
    total: {
      label: "Demo (Card is not charged)",
      type: "final",
      amount: "1.99",
    },
  });
  session.begin();
};

function App() {
  if (canApplePay) {
    return (
      <div className="apple-div">
        <button className="apple-pay" onClick={createApplePaySession}>
          Buy now with Apple
        </button>
      </div>
    );
  }

  return <span>No Apple Pay available</span>;
}

export default App;
