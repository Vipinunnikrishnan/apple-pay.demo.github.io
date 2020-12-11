import React from "react";
import "./App.css";

const createApplePaySession = () => {
  const session = new window.ApplePaySession(3, {
    countryCode: "CA",
    currencyCode: "CAD",
    merchantCapabilities: ["supports3DS", "supportsDebit", "supportsCredit"],
    supportedNetworks: ["visa", "masterCard", "amex"],
    requiredBillingContactFields: ["postalAddress", "name", "phoneticName"],
    lineItems: [
      {
        label: "Sub total (3 items)",
        amount: "15.00",
      },
      {
        label: "Walmart Shipping",
        amount: "5.00",
      },
      {
        label: "3P Shipping",
        amount: "5.00",
      },
      {
        label: "Order Handling Fee",
        amount: "5.00",
      },
      {
        label: "13% HST",
        amount: "5.00",
      },
      {
        label: "5% HST",
        amount: "2.00",
      },
    ],
    total: {
      label: "Walmart Canada",
      amount: "15.99",
      type: "final",
    },
  });
  session.begin();

  session.onvalidatemerchant = function (event) {
    alert(`Merchant -  ${JSON.stringify(event)}`);
    // completeMerchantValidation();
  };

  session.onpaymentmethodselected = function (event) {
    alert(`onpaymentmethodselected -  ${JSON.stringify(event)}`);
    // completePaymentMethodSelection ();
  };

  session.onpaymentauthorized = function (event) {
    alert(`onpaymentauthorized -  ${JSON.stringify(event)}`);

    // completePayment({ status: 0 });
  };
};

function App() {
  let canApplePay = false;

  const [canCheckout, showCheckout] = React.useState(false);

  if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
    canApplePay = true;

    var promise = window.ApplePaySession.canMakePaymentsWithActiveCard("test");
    promise.then(function (canMakePayments) {
      showCheckout(canMakePayments);
    });
  }

  if (canApplePay) {
    if (!canCheckout) {
      return (
        <div className="apple-div">
          <button className="apple-pay" onClick={createApplePaySession}>
            Set up Apple Pay
          </button>
        </div>
      );
    } else {
      return (
        <div className="apple-div">
          <button className="apple-pay" onClick={createApplePaySession}>
            Buy now with Apple
          </button>
        </div>
      );
    }
  }

  return <span>No Apple Pay available</span>;
}

export default App;
