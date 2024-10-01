const axios = require("axios");
const { FINIX_URL } = require("../constants");
const { v4: uuidv4 } = require("uuid");

class FinixService {
  constructor() {
    this.credentials = `${process.env.FINIX_USERNAME}:${process.env.FINIX_PASSWORD}`;
    this.finixVersion = process.env.FINIX_VERSION;
    this.merchantId = process.env.FINIX_MERCHANT_ID;
    this.finixUrl = process.env.FINIX_URL;
  }

  createIdentity = async (identityData) => {
    const apiUrl = `${this.finixUrl}/identities`;
    const base64Credentials = Buffer.from(this.credentials).toString("base64");

    const newIdentityData = {
      ...identityData,
    };
    // remove region from identity data
    const region = identityData?.state?.split("_")[0];
    if (region) {
      delete newIdentityData.state;
      newIdentityData.region = region;
    }

    try {
      const response = await axios.post(
        apiUrl,
        { entity: newIdentityData },
        {
          headers: {
            "Content-Type": "application/json",
            "Finix-Version": this.finixVersion,
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(
        "Failed to create identity:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  createPaymentInstrument = async (token, identity) => {
    const apiUrl = `${this.finixUrl}/payment_instruments`;
    const base64Credentials = Buffer.from(this.credentials).toString("base64");

    const data = {
      token: token,
      type: "TOKEN",
      identity: identity,
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "Finix-Version": this.finixVersion,
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      return response;
    } catch (error) {
      console.error(
        "Error creating payment instrument:",
        error.response ? error.response.data?._embedded?.errors : error.message
      );
      throw error;
    }
  };

  createPaymentInstrumentForGooglePay = async (googlePayToken, identity) => {
    const apiUrl = `${this.finixUrl}/payment_instruments`;
    const base64Credentials = Buffer.from(this.credentials).toString("base64");
    const data = {
      third_party_token: googlePayToken,
      type: "GOOGLE_PAY",
      identity: identity,
      merchant_identity: this.merchantId,
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "Finix-Version": this.finixVersion,
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      return response;
    } catch (error) {
      console.error(
        "Error creating payment instrument:",
        error.response ? error.response.data?._embedded?.errors : error.message
      );
      throw error;
    }
  };

  createTransfer = async (currency, source, fraudSessionId, cartSummary) => {
    const apiUrl = `${this.finixUrl}/transfers`;
    const base64Credentials = Buffer.from(this.credentials).toString("base64");

    const data = {
      merchant: this.merchantId,
      currency: currency,
      amount: cartSummary?.total?.amount * 100, //parseInt(calculatedDraftOrder?.totalPriceSet?.shopMoney?.amount*100),
      source: source,
      fraud_session_id: fraudSessionId,
      idempotency_id: uuidv4(),
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "Finix-Version": this.finixVersion,
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      return response;
    } catch (error) {
      console.error(
        "Error creating transfer:",
        error.response ? error.response.data?._embedded : error.message
      );
      throw error;
    }
  };

  createRefund = async (transferId, amount) => {
    const apiUrl = `${this.finixUrl}/transfers/${transferId}/reversals`;
    const base64Credentials = Buffer.from(this.credentials).toString("base64");

    const data = {
      refund_amount: amount,
      tags: {
        test: "Refund",
      },
      idempotency_id: uuidv4(),
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          "Finix-Version": this.finixVersion,
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      return response;
    } catch (error) {
      console.error(
        "Error creating refund:",
        error?.response?.data?._embedded?.errors
      );
      throw error;
    }
  };
}

module.exports = new FinixService();
