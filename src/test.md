import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { get } from "lodash";
import OtpVerification from "../Accounts/components/OtpVerification";

import mapStateToProps from "../../components/Otp/selectors";
import {
  otpReset,
  savePlatformAuthRequest,
  sendOtpRequest,
  updateOtpMobileNumber,
} from "../../components/Otp/actions";
import { verifyOtpCard } from "../Cards/action";
import { VERIFY_OTP_CARD } from "../Cards/types";

const OtpAuthenticationHome = (props) => {
  const { savePlatformAuthData, verifyOtpCardDetails, otpData, otpContext } = props;

  const sendOtpResponse = get(otpData, "sendOtp.response", null);
  const sendOtpError = get(otpData, "sendOtp.error", null);
  const sendOtpSuccess = get(sendOtpResponse, "success", false);
  const otpAuthType = get(sendOtpResponse, "data.preference", "");
  const mobileNumber = get(sendOtpResponse, "data.mobileNumber", "");
  const { sourceApp, transactionId, customerId, journey, redirect } = otpContext || {};
  const savePlatformAuthDetails = get(savePlatformAuthData, "response", {});
  const savePlatformAuthApiError = get(savePlatformAuthData, "error", null);

  const savePlatformAuthSuccess = savePlatformAuthDetails?.responseMsg;
  const savePlatformAuthCheckVal = savePlatformAuthDetails?.checkVal;
  const dispatch = useDispatch();

  const [openOTP, setOpenOTP] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [authStatusRequested, setAuthStatusRequested] = useState(null);

  const verifyOtpSuccess = verifyOtpCardDetails?.data?.success;
  const verifyOtpCardFailed = verifyOtpCardDetails?.data?.success === false;

  const triggerSavePlatformAuth = useCallback(
    (status) => {
      if (authStatusRequested) return;
      setAuthStatusRequested(status);
      dispatch(
        savePlatformAuthRequest({
          sourceApp,
          authType: otpAuthType,
          customerId,
          status,
          journey,
          transactionId,
        }),
      );
    },
    [authStatusRequested, dispatch, sourceApp, otpAuthType, customerId, journey, transactionId],
  );

  // Handle Send OTP success or failure
  // NOTE: Initial Redux state error is {} (empty object) — must check non-empty to avoid false trigger
  useEffect(() => {
    if (sendOtpSuccess) {
      dispatch(updateOtpMobileNumber(mobileNumber));
      setOpenOTP(true);
    } else if (
      (sendOtpError && Object.keys(sendOtpError).length > 0) ||
      (sendOtpResponse && sendOtpResponse.success === false)
    ) {
      triggerSavePlatformAuth("fail");
    }
  }, [sendOtpSuccess, sendOtpError, sendOtpResponse, mobileNumber, dispatch, triggerSavePlatformAuth]);

  const handleVerifyOTP = () => {
    dispatch(verifyOtpCard());
  };

  // Resend OTP — same API as initial send (sendOtpRequest with Customer_Verify checkType)
  const handleResendOTP = () => {
    dispatch(
      sendOtpRequest({
        customerId,
        mobileNumber: "",
        email: "",
        checkType: "Customer_Verify",
        resendOtp: true,
      }),
    );
  };

  // Handle Verify OTP success
  useEffect(() => {
    if (verifyOtpSuccess) {
      setOpenOTP(false);
      dispatch({ type: VERIFY_OTP_CARD.CLEAR });
      dispatch(otpReset());
      triggerSavePlatformAuth("success");
    }
  }, [verifyOtpSuccess, dispatch, triggerSavePlatformAuth]);

  // Handle Verify OTP failure
  useEffect(() => {
    if (verifyOtpCardFailed) {
      setOpenOTP(false);
      dispatch({ type: VERIFY_OTP_CARD.CLEAR });
      dispatch(otpReset());
      triggerSavePlatformAuth("fail");
    }
  }, [verifyOtpCardFailed, dispatch, triggerSavePlatformAuth]);

  // After savePlatformAuthRequest API responds → notify parent window & close popup
  // Initial Redux state: error = {} (empty), response = {} (empty) — wait for actual data
  useEffect(() => {
    const hasActualSuccess = savePlatformAuthSuccess || savePlatformAuthCheckVal;
    // Distinguish real API error from initial empty {} state
    const hasActualError =
      savePlatformAuthApiError &&
      Object.keys(savePlatformAuthApiError).length > 0;

    if ((hasActualSuccess || hasActualError) && authStatusRequested && !isProcessed) {
      setIsProcessed(true);
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          {
            type: "OTP_RESULT",
            payload: {
              success: authStatusRequested === "success",
              checkVal: savePlatformAuthCheckVal || "",
            },
          },
          redirect,
        );
      }
      window.close();
    }
  }, [
    savePlatformAuthSuccess,
    savePlatformAuthCheckVal,
    savePlatformAuthApiError,
    authStatusRequested,
    isProcessed,
    redirect,
  ]);

  const handleCloseOTP = () => {
    setOpenOTP(false);
    dispatch(otpReset());
    triggerSavePlatformAuth("fail");
  };

  return (
    <Box className="platform-otp-container">
      {openOTP && (
        <OtpVerification
          dialogOpen={openOTP}
          onDialogClose={handleCloseOTP}
          data={handleVerifyOTP}
          checkType="OTP_GENERATE_REG"
          otpJourney="Cards"
          resend={handleResendOTP}
          resendToken={handleResendOTP}
          showCarousel={otpAuthType}
          hideSMSCarousel={true}
        />
      )}
    </Box>
  );
};

OtpAuthenticationHome.propTypes = {
  verifyOtpCardDetails: PropTypes.any,
  savePlatformAuthData: PropTypes.any,
  otpContext: PropTypes.any,
  otpData: PropTypes.object,
};

export default connect(mapStateToProps)(OtpAuthenticationHome);
