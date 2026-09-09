import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { get, includes } from "lodash";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import Keyboard from "react-simple-keyboard";
import {
  Captcha,
  MuiButton,
  MuiTextField,
  MuiLink,
  DebitCardComponent,
  MuiSnackbars,
  TextFormatter,
  MuiDialog,
  StringToJSX,
} from "../../../components";
import Carousel from "../../../components/Carosal";
import QrImg1 from "../../../assets/images/QR/image1.png";
import QrImg2 from "../../../assets/images/QR/image2.png";
import QrImg3 from "../../../assets/images/QR/image3.png";

import {
  isValidPassword,
  removeSpaceAll,
  removeSpaceandPlus,
  setAtmPinNumber,
  stringLength,
} from "../../../utils/validation";
import {
  clearCaptchaData,
  clearLastLoginDetails,
  clearLoginData,
  clearGetQRData,
  getCaptchaData,
  getQRCodeData,
  loginRequest,
  onLogOut,
  updateForgotLoginHeader,
  updateForgotPassword,
  updateRedirectPageName,
  updateResetPassword,
  updateUserId,
  validateQRCodeData,
  clearValidateQRData,
} from "../actions";
import OtpVerification from "../../Accounts/components/OtpVerification";
import VirtualKeyIcon from "../../../assets/images/virtualKeyIcon.svg";
import * as controller from "./LoginController";
import "react-simple-keyboard/build/css/index.css";
import { cardPinBlk } from "../../../utils/encryption";
import mapStateToProps from "../selectors";
import "./styles.scss";
import { Config } from "../../../assets/config/Config";
import { setSideMenuActiveKey } from "../../../layouts/actions";
import {
  clearBannerInfos,
  clearJourneyError,
  journeyUpdate,
  loadComponent,
} from "../../../pages/actions";
import FailedIcon from "../../../assets/images/failedIcon.svg";
import SessionDeparted from "../../../components/SessionExpired";
import {
  configVals,
  CustomNavigation,
  getStringUpdate,
} from "../../../utils/common";
import { OTP_CONSTANTS } from "../../../components/Otp/constants";
import BannerPopup from "../components/BannerPopup";
import { enterKey, passwordFormat } from "../../../utils/constants";
import { eventConstants, eventTypes } from "../../../utils/eventConstants";
import GetEventAttributes from "../../../components/GetEventAttributes";
import { captchaErrorCodes } from "../constants";
import useConfig from "../../../components/UseConfig";
import { sendOtpRequest } from "../../../components/Otp/actions";
import { closeOtpPopupErrors } from "../../../errorCode/helper/helper";
import LocationRequiredPopup from "../../../components/MuiDialog/components/LocationRequiredPopup";


// Login form component
function LoginForm(props) {
  const {
    label1,
    label2,
    virtualKey,
    link1,
    link2,
    handleLinkClick,
    loginRegistrationData,
    errorData,
    active,
    activeKey,
    journey,
    deepLinkURL,
    otpData,
    countryCode,
    isQrCode,
  } = props;

  const intl = useIntl();
  const [isAllowedLocation, setIsAllowedLocation] = useState(false);
  const [iskeyboardvisibile, setIskeyboardvisibile] = useState(false);
  const [layout, setLayout] = useState("default");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [atmPin, setAtmPin] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const keyboard = useRef();

  const [inputCaptcha, setInputCaptcha] = useState(null);

  const [focusUserfield, setfocusUserfield] = useState(false);
  const [focusPasswordfield, setfocusPasswordfield] = useState(false);
  const [loaclCapchaError, setloaclCapchaError] = useState(false);
  const [captchaImage, setCaptchaImage] = useState("");

  const [timer, setTimer] = useState(0);
  const [isQrExpired, setIsQrExpired] = useState(false);
  const intervalRef = useRef(null);

  const { data: qrResponse, failure: qrFailure } = get(loginRegistrationData, "getQRCodeData", {});
  const { expireAt, qrText, refNum, sessionId } = get(qrResponse, "data", {});
  const isQrLoading = !qrText && !qrFailure && !isQrExpired;

  const showLocationPopup =
    (String(useConfig("ENABLE_LOCATION")) || Config.enableLocation) === "Y";

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsAllowedLocation(!position?.coords?.latitude);
        },
        // eslint-disable-next-line no-unused-vars
        (error) => {
          setIsAllowedLocation(!isAllowedLocation);
          // Error: ${error.message}`);
        },
      );
    } else {
      // Geolocation is not supported by this browser.
      setIsAllowedLocation(!isAllowedLocation);
    }
  };

  const maxPasswordLength = parseInt(useConfig("PasswordMaxLength"), 10);

  const showCarousel = get(
    loginRegistrationData,
    "loginData.response.otpDetails.preference",
    "",
  );

  const inputElement = useRef(null);
  const userIdElement = useRef(null);
  const journeyEnable = get(window.env, "activeJourny", []);
  const [triggerEventTagging] = GetEventAttributes();
  const {
    loginData,
    lastLoginDetails = {},
    forgotLoginHeader = "",
    redirectPageName = "",
    isSessionExpired = false,
  } = loginRegistrationData;
  const { lastLoginDaysCount } = lastLoginDetails;
  const encryptionKey = String(useConfig("CARD_VAL"));
  const cardpinkey = configVals(encryptionKey)?.toUpperCase();
  const gAppContext = {
    cardpinkey,
  };
  const firstLevelInactivity =
    parseInt(useConfig("FirstLevelInactivity"), 10) ||
    Config.firstLevelInactivity;
  const secondLevelInactivity =
    parseInt(useConfig("SecondLevelInactivity"), 10) ||
    Config.secondLevelInactivity;
  const thirdLevelInactivity =
    parseInt(useConfig("ThirdLevelInactivity"), 10) ||
    Config.thirdLevelInactivity;

  const haventSeenOverDays = getStringUpdate(
    intl.formatMessage({ id: "wehaventseenoverNumdays" }),
    {
      numdays: String(thirdLevelInactivity),
    },
  );

  const quickReAttemptError = get(errorData, "response.data.errorCode", "");

  const otpDialogOpen =
    get(loginData, "response.otpDetails", false) ||
    (lastLoginDaysCount > firstLevelInactivity &&
      lastLoginDaysCount < secondLevelInactivity + 1 &&
      get(otpData, "sendOtp.response.success", false));

  const CHALLENGE = "CHALLENGE";

  const isFrmChallenge = get(loginData, "response.frmStatus", "") === CHALLENGE;
  const getBannerInfos = get(journey, "bannerInfos", "");
  const getCsrfSuccess = get(journey, "getCsrfToken.data", false);
  const loginFailure = get(loginData, "response.code", "");
  const getErrorCode = get(journey, "journeyError.response.data.errorCode", "");
  const getErrorMessage =
    get(journey, "journeyError.response.data.error", "") ||
    "Incorrect Captcha" ||
    "";

  const handleInputCaptcha = useCallback((data) => {
    if (data) {
      setCaptchaError(!data.length);
    }
    setInputCaptcha(data);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = loginRegistrationData;
  const { navigatePage } = CustomNavigation(redirectPageName);

  if (lastLoginDaysCount > thirdLevelInactivity && !forgotLoginHeader) {
    dispatch(updateForgotLoginHeader("90DaysAbove"));
  } else if (
    lastLoginDaysCount < thirdLevelInactivity + 1 &&
    lastLoginDaysCount > secondLevelInactivity &&
    !forgotLoginHeader
  ) {
    dispatch(updateForgotPassword(true));
    dispatch(updateForgotLoginHeader("45DaysAbove"));
    dispatch(journeyUpdate("Login"));
    dispatch(loadComponent("forgot-password-authentication"));
  }

  const detectAutofill = (element) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          window
            .getComputedStyle(element, null)
            .getPropertyValue("appearance") === "menulist-button",
        );
      }, 10);
    });

  const next = () => {
    navigatePage();
  };

  const { success: validateSuccess } = loginData;
  // const { success: validateSuccess, failure: validateFailure = true } = loginData;

  const clearQRdatas = () => {
    dispatch(clearGetQRData());
    dispatch(clearValidateQRData());
  }

  const loadQRCode = () => {
    clearQRdatas();
    dispatch(getQRCodeData());
  };

  const validateQRCode = () => {
    dispatch(clearValidateQRData());
    dispatch(validateQRCodeData({
      refNum: refNum || "",
      sessionId: sessionId || ""
    }));
  };

  useEffect(() => {
    // LOAD QR CODE
    if (active === "qrcode") {
      clearQRdatas();
      loadQRCode();
    }
    return () => {
      setIsQrExpired(false);
      clearQRdatas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);


  useEffect(() => {
    // HANDLE QR FETCH FAILURE
    if (active === "qrcode" && qrFailure) {
      setIsQrExpired(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrFailure])

  useEffect(() => {
    // QR EXPIRY TIMER
    let interval;
    if (active === "qrcode" && expireAt) {
      const updateTimer = () => {
        const remaining = expireAt - Date.now();
        if (remaining <= 0) {
          setTimer(0);
          setIsQrExpired(true);
          clearInterval(interval);
        } else {
          setTimer(Math.floor(remaining / 1000));
        }
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expireAt]);

  useEffect(() => {
    // VALIDATE QR POLLING
    let isCancelled = false;
    const pollQRCode = () => {
      if (isCancelled || active !== "qrcode" || isQrExpired || !expireAt || !qrText) {
        return;
      }
      validateQRCode();

      if (!isCancelled && !isQrExpired) {
        intervalRef.current = setTimeout(pollQRCode, 2000);
      }
    };

    pollQRCode();

    return () => {
      isCancelled = true;
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isQrExpired, expireAt, qrText]);

  useEffect(() => {
    if (active === "qrcode" && validateSuccess) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateSuccess]);

  const handleQrRefresh = () => {
    clearQRdatas();
    setIsQrExpired(false);
    loadQRCode();
  };

  useEffect(() => {
    if (!focusUserfield && !focusPasswordfield) {
      (async () => {
        const autofill = await detectAutofill(inputElement.current);
        setfocusPasswordfield(autofill);
        if (!userId) setfocusUserfield(false);
        else setfocusUserfield(autofill);
      })();
    }
  }, [userIdElement, inputElement, focusPasswordfield, focusUserfield, userId]);

  useEffect(() => {
    if (!userId) setfocusUserfield(false);
    if (!password) setfocusPasswordfield(false);
  }, [userId, password]);

  useEffect(() => {
    if (users && users.accessToken && users.refreshToken) {
      const customerId = get(users, "customerId", "");
      const email = get(users, "email", "");
      const fullName = get(
        users,
        "loginData.response.customerDetails.fullName",
        "",
      );
      triggerEventTagging({
        action: eventTypes.identify,
        name: customerId,
      });
      triggerEventTagging({
        action: eventTypes.contact,
        name: 660,
        payload: {
          "pk^cust_id": customerId,
          email,
          FNAME: fullName,
        },
      });
      if (virtualKey && getCsrfSuccess) {
        navigatePage();
      }
    } else if (users && users.error) {
      dispatch({ type: "DEFAULT" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    users,
    dispatch,
    navigate,
    navigatePage,
    getCsrfSuccess,
    virtualKey,
    redirectPageName,
  ]);

  const onUseridChange = (event) => {
    if (virtualKey) {
      if (/^[a-zA-Z0-9]*$/.test(event)) setUserId(event);
    } else {
      setDebitCardNumber(event.trim());
    }
  };

  const directPage = (page) => {
    dispatch(updateRedirectPageName(redirectPageName === page ? !page : page));
  };

  const handleOTPClose = () => {
    navigate("/login");
    dispatch(onLogOut());
  };

  const onPasswordChange = (event) => {
    setShowPassword(false);
    if (virtualKey && (isValidPassword(event) || !event)) {
      setPassword(event);
      keyboard.current.setInput(event);
    } else {
      setAtmPin(setAtmPinNumber(event));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === enterKey) {
      // Trigger login when Enter key is pressed
      submitLogin(event);
    }
  };

  const keyboardHandleClick = () => {
    setIskeyboardvisibile((prevState) => !prevState);
  };

  const keyboardHandleChange = (password) => {
    if (password.length > 32) {
      password = stringLength(password, 0, 32);
    }
    if (!password) {
      setfocusPasswordfield(false);
    } else {
      setfocusPasswordfield(true);
    }
    // setPassword(password);
    onPasswordChange(password);
  };

  const keyboardHandleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const keyboardHandlePress = (button) => {
    if (button === "{shift}" || button === "{lock}") keyboardHandleShift();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const resetErrorData = () => {
    setShowSnackBar(false);
    setSnackBarMessage("");
  };

  const clickLoginAction = () => {
    setTimeout(() => {
      userIdElement.current.focus();
    }, 100);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(clearJourneyError());
    dispatch(updateResetPassword(false));
    let errorStatus = true;
    if (virtualKey && (!userId || !password)) {
      setShowSnackBar(true);
      setSnackBarMessage("enterUserIdPassword");
      setloaclCapchaError(true);
      errorStatus = false;
    } else if (!virtualKey && (!atmPin || !debitCardNumber)) {
      setShowSnackBar(true);
      setSnackBarMessage("enterDebitcardPin");
      setloaclCapchaError(true);
      errorStatus = false;
    } else if (!inputCaptcha) {
      setShowSnackBar(true);
      setSnackBarMessage("enterTheCaptcha");
      errorStatus = false;
    } else if (inputCaptcha && inputCaptcha.length < 5) {
      setCaptchaError(true);
      setloaclCapchaError(true);
      errorStatus = false;
    } else if (virtualKey && controller.userIdValidation(userId)?.helperText) {
      setShowSnackBar(true);
      setSnackBarMessage("invalidUserPassword");
      setloaclCapchaError(true);
      errorStatus = false;
    } else if (!virtualKey && removeSpaceAll(debitCardNumber).length < 16) {
      setloaclCapchaError(true);
      setShowSnackBar(true);
      setSnackBarMessage("inValidDebitAtmpin");
      errorStatus = false;
    } else if (
      !virtualKey &&
      (controller.atmPinValidation(atmPin)?.helperText ||
        controller.debitCardValidation(removeSpaceAll(debitCardNumber))
          ?.helperText)
    ) {
      setloaclCapchaError(true);
      setShowSnackBar(true);
      setSnackBarMessage("inValidDebitAtmpin");
      errorStatus = false;
    }

    if (!errorStatus) {
      return errorStatus;
    }

    let debitCard = "";
    let encryptedData = {};
    if (debitCardNumber && atmPin) {
      debitCard = removeSpaceAll(debitCardNumber);
      encryptedData = cardPinBlk(4, atmPin, debitCard, gAppContext);
    }
    setCaptchaError(false);
    return !userId && virtualKey
      ? onUseridChange(userId)
      : !password && virtualKey
        ? onPasswordChange(password)
        : !debitCardNumber && !virtualKey
          ? onUseridChange(debitCardNumber)
          : !atmPin && !virtualKey
            ? onPasswordChange(atmPin)
            : userId && password && virtualKey
              ? dispatch(
                loginRequest({
                  userName: userId,
                  password,
                  captcha: inputCaptcha,
                  countryCode,
                }),
              )
              : debitCardNumber && atmPin && !virtualKey
                ? dispatch(
                  loginRequest({
                    debitCard,
                    atmPin: encryptedData?.pin || "",
                    captcha: inputCaptcha,
                    countryCode,
                  }),
                )
                : "";
  };

  // Text according to Localization ID
  const journeys = [
    {
      url: "accounts",
      value: "accounts",
      id: 2,
      text: <TextFormatter id="accounts" />,
      eventName: eventConstants.deeplink_accounts_screen,
    },
    {
      url: "deposits",
      value: "deposits",
      id: 5,
      text: <TextFormatter id="deposits" />,
      eventName: eventConstants.deeplink_deposit,
    },
    {
      url: "cards",
      value: "cards",
      id: 4,
      text: <TextFormatter id="cards" />,
      eventName: eventConstants.deeplink_cards,
    },
    {
      url: "pay",
      value: "payments",
      id: 3,
      text: <TextFormatter id="payments" />,
      eventName: eventConstants.deeplink_payments,
    },
    {
      url: "loans",
      value: "loans",
      id: 7,
      text: <TextFormatter id="loans" />,
      eventName: eventConstants.deeplink_loans,
    },
    {
      url: "invest",
      value: "investments",
      id: 6,
      text: <TextFormatter id="investments" />,
      eventName: eventConstants.deeplink_invest,
    },
    {
      url: "profile",
      value: "myProfile",
      id: 1,
      text: <TextFormatter id="myProfile" />,
      eventName: eventConstants.deeplink_my_profile,
    },
    {
      url: "rewardsoffers",
      value: "rewards",
      id: 11,
      text: <TextFormatter id="rewards" />,
      eventName: eventConstants.deeplink_rewards,
    },
    {
      url: "requests",
      value: "requests",
      id: 9,
      text: <TextFormatter id="requests" />,
      eventName: eventConstants.deeplink_requests,
    },
    {
      url: "tax",
      value: "tax",
      id: 10,
      text: <TextFormatter id="tax" />,
      eventName: eventConstants.deeplink_tax,
    },
  ];

  const getCaptchaImageSuccess = get(
    loginRegistrationData,
    "getCaptchaData.data.success",
    false,
  );

  const onClickJourneyButton = (journeyList) => {
    dispatch(
      setSideMenuActiveKey(activeKey === journeyList.id ? 6 : journeyList.id),
    );
    directPage(journeyList.url);
    const getEventName = get(journeyList, "eventName", "");
    if (getEventName) {
      triggerEventTagging({
        type: eventTypes.screen,
        name: getEventName,
        payload: {
          screen_name: getEventName,
        },
      });
    }
  };

  const onClose = () => {
    dispatch(onLogOut());
  };

  const loadCaptcha = () => {
    setInputCaptcha("");
    dispatch(clearCaptchaData());
    dispatch(getCaptchaData());
  };

  useEffect(() => {
    if (active !== "qrcode") {
      getLocation();
      loadCaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getCaptchaImageSuccess) {
      const getCapchaImage = get(
        loginRegistrationData,
        "getCaptchaData.data.data.captcha",
        "",
      );
      setCaptchaImage(getCapchaImage);
    }
  }, [getCaptchaImageSuccess, loginRegistrationData]);

  useEffect(() => {
    const deepLinkJourney = journeys?.filter(
      (item) => item.url === deepLinkURL,
    );
    const isValidDeepLink =
      deepLinkJourney.length > 0 && Object.keys(deepLinkJourney[0]).length > 0;
    if (isValidDeepLink) onClickJourneyButton(deepLinkJourney[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginFailure) {
      if (getErrorCode === "LOG_VE_031") dispatch(updateUserId(userId));
      dispatch(clearLoginData());
      if (active !== "qrcode") {
        loadCaptcha();
        if (captchaErrorCodes.includes(getErrorCode)) {
          setCaptchaError(true);
          setloaclCapchaError(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFailure, getErrorCode]);

  useEffect(() => {
    if (
      lastLoginDaysCount > firstLevelInactivity &&
      lastLoginDaysCount < secondLevelInactivity + 1
    ) {
      const payload = {
        type: OTP_CONSTANTS.Login,
        email: "",
        mobileNumber: `${removeSpaceandPlus(lastLoginDetails?.mobileNumber)}`,
        customerId: lastLoginDetails?.customerId,
        resendOtp: true,
      };
      dispatch(sendOtpRequest(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLoginDaysCount, loginData]);

  useEffect(() => {
    if (quickReAttemptError === closeOtpPopupErrors[0]) {
      dispatch(clearLastLoginDetails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickReAttemptError]);

  const captchaErrorMessage = captchaError ? getErrorMessage : "";

  const onCloseBanner = () => {
    dispatch(clearBannerInfos());
  };

  return (
    <>
      {showLocationPopup && isAllowedLocation && (
        <LocationRequiredPopup journey={journey} />
      )}
      {isSessionExpired && <SessionDeparted clickAction={clickLoginAction} />}
      {getBannerInfos && getBannerInfos.length ? (
        <BannerPopup bannerInfo={getBannerInfos} onClosePopup={onCloseBanner} />
      ) : (
        ""
      )}
      {isQrCode ? (() => {
        const qrBanners = [
          { title: "Step 1: Open the Equitas Mobile Banking app", imageUrl: QrImg1 },
          { title: "Step 2: Enter your mPIN", imageUrl: QrImg2 },
          { title: "Step 3: Tap on 1-Tap Token", imageUrl: QrImg3 },
          { title: "Step 4: Scan the QR code", imageUrl: QrImg1 },
        ];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeSlide, setActiveSlide] = React.useState(0);
        return (
        <Box className="qr-hdfc-container">
          <Grid
            container
            columns={8}
            spacing={0}
            className="qr-hdfc-body"
            alignItems="flex-start"
          >
            {/* LEFT — QR Code */}
            <Grid item xs={8} sm={4} className="qr-hdfc-left">
              <Box className="qr-side-panel">
                {/* Media area */}
                <Box className="qr-media-area">
                  <Box className="qr-hdfc-qr-box">
                    <span className="qr-corner qr-corner--top-left" />
                    <span className="qr-corner qr-corner--top-right" />
                    <span className="qr-corner qr-corner--bottom-left" />
                    <span className="qr-corner qr-corner--bottom-right" />

                    <div className={`qr-wrapper ${(isQrExpired || isQrLoading) ? "expired" : ""}`}>
                      <QRCodeSVG value={qrText || ""} size={200} />
                    </div>

                    {isQrExpired && (
                      <IconButton
                        className="qr-refresh-center"
                        onClick={handleQrRefresh}
                        aria-label="Refresh QR"
                      >
                        <RefreshIcon fontSize="large" />
                      </IconButton>
                    )}
                    {isQrLoading && (
                      <CircularProgress className="qr-refresh-loader" size={28} />
                    )}
                  </Box>
                </Box>

                {/* Caption + timer below */}
                <Box className="qr-caption">
                  <Box className={`qr-hdfc-timer ${(isQrExpired || isQrLoading) ? "v-hidden" : ""}`}>
                    <span className="qr-timer-icon">⏱ </span>
                    <TextFormatter id="refreshIn" /> <b>{timer}</b> <TextFormatter id="secs" />
                  </Box>
                </Box>
              </Box>
            </Grid>


            {/* RIGHT — Carousel + Step text */}
            <Grid item xs={8} sm={4} className="qr-hdfc-right">
              <Box className="qr-side-panel">
                {/* Media area — narrow image + vertical step list */}
                <Box className="qr-media-area">
                  <Box className="qr-right-inner">
                    {/* Narrow carousel on the left */}
                    <Box className="qr-carousel-wrap">
                      <Carousel
                        show={1}
                        autoslide
                        hidebutton
                        slidedelay={Config.bannerSliderDelay || 4000}
                        show1WithButton
                        onSlideChange={(idx) => {
                          setActiveSlide(idx);
                        }}
                      >
                        {qrBanners.map((b, i) => (
                          <div key={i} className="qr-slider-item">
                            <img
                              className="carousel-img"
                              src={b.imageUrl}
                              alt="Equitas Step"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Box>

                    {/* All steps vertically on the right, active highlighted */}
                    <Box className="qr-steps-vertical">
                      {qrBanners.map((b, i) => (
                        <Box
                          key={i}
                          className={`qr-vstep-item ${activeSlide === i ? "active" : ""}`}
                        >
                          <span className="qr-vstep-num">{i + 1}</span>
                          <span className="qr-vstep-text">{b.title.replace(/^Step \d+: /, "")}</span>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Empty caption spacer */}
                <Box className="qr-caption qr-caption--empty" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        );
      })()


        : (
          <>
            <Grid
              container
              columns={8}
              rowGap={1.5}
              className="login-page__tabpanel-container"
            >
              <MuiDialog
                className={"Login_Popup"}
                onDialogClose={onClose}
                open={forgotLoginHeader === "90DaysAbove"}
                type="message"
                message={
                  <>
                    <Box>
                      <FailedIcon
                        preserveAspectRatio={"none"}
                        viewBox="0 0 190 191.32"
                        className="failureVector-icon"
                      />
                    </Box>
                    <Box className="userIdNotFound-dialogBox__content">
                      <Typography className="welcome-title">
                        <TextFormatter id="welcomeBack" />
                      </Typography>
                      <Typography className="bodyContentMessage">
                        <StringToJSX jsxString={haventSeenOverDays} />
                      </Typography>
                      <Typography className="bodyContentMessage">
                        <TextFormatter id="pleasecontactcustomercare" />
                      </Typography>
                    </Box>
                  </>
                }
                actions={
                  <Box>
                    <MuiButton
                      size="large"
                      color="primary"
                      text={<TextFormatter id="close" />}
                      disabled={false}
                      onClick={onClose}
                    />
                  </Box>
                }
              />

              {showSnackBar && (
                <MuiSnackbars
                  isOpen
                  message={snackBarMessage}
                  severity={"error"}
                  autoHideDuration={5000}
                  vertical={"top"}
                  horizontal={"center"}
                  resetErrorData={resetErrorData}
                />
              )}
              <OtpVerification
                dialog
                dialogOpen={otpDialogOpen}
                onDialogClose={handleOTPClose}
                data={next}
                type={
                  active === "userid" ? OTP_CONSTANTS.Login : OTP_CONSTANTS.Debitcard
                }
                checkType={
                  isFrmChallenge && otpDialogOpen
                    ? OTP_CONSTANTS.OARM
                    : OTP_CONSTANTS.Login
                }
                otpJourney={OTP_CONSTANTS.Login}
                showCarousel={showCarousel}
              />

              {virtualKey ? (
                <MuiTextField
                  autoFocus
                  id="login_userId_new"
                  name="login_userId_new"
                  inputRef={userIdElement}
                  label={label1}
                  value={userId}
                  maxLength={Config.userIdLength}
                  type="text"
                  className="login-page__text-field__userField col-1"
                  variant="filled"
                  onChange={onUseridChange}
                  onClick={() => setfocusUserfield(true)}
                  onBlur={(e) => setfocusUserfield(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputLabelProps={{
                    shrink: userId?.length > 0,
                  }}
                />
              ) : (
                <DebitCardComponent
                  name="login_debitcard"
                  id="login_debitcard"
                  updateNumber={onUseridChange}
                  value={debitCardNumber}
                  className={"col-1"}
                  onKeyPress={handleKeyPress}
                  fromLogin
                />
              )}

              <MuiTextField
                id="login_password"
                name="login_password"
                inputRef={inputElement}
                label={label2}
                value={virtualKey ? password : atmPin}
                maxLength={
                  virtualKey
                    ? maxPasswordLength || Config.userPswdLength
                    : Config.atmPinLength
                }
                type={showPassword ? "text" : "password"}
                className="login-page__text-field__passwordField col-2"
                variant="filled"
                onChange={onPasswordChange}
                onClick={() => setfocusPasswordfield(true)}
                onBlur={(e) => setfocusPasswordfield(e.target.value)}
                onKeyPress={handleKeyPress}
                InputLabelProps={{ shrink: focusPasswordfield }}
                InputProps={{
                  readOnly: iskeyboardvisibile,
                  endAdornment:
                    password && Config.showEyeIcon ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          className="password_eye_icon"
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon className="equitas-blue" />
                          ) : (
                            <VisibilityOffOutlinedIcon className="equitas-blue" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                }}
              />
              {virtualKey && (
                <button
                  tabIndex="-1"
                  type="button"
                  onClick={keyboardHandleClick}
                  className="login-page__keyboard-button"
                >
                  <VirtualKeyIcon
                    preserveAspectRatio={"none"}
                    viewBox="0 0 28 19.6"
                  />
                  <span className="keyboard-action">
                    {iskeyboardvisibile ? (
                      <TextFormatter id="hide" />
                    ) : (
                      <TextFormatter id="show" />
                    )}
                  </span>
                </button>
              )}
              <Box
                sx={{
                  display: iskeyboardvisibile ? "block" : "none",
                }}
                className="login-page__keyboard-container"
              >
                <Keyboard
                  keyboardRef={(r) => {
                    keyboard.current = r;
                  }}
                  onChange={keyboardHandleChange}
                  layoutName={layout}
                  onKeyPress={keyboardHandlePress}
                  inputPattern={passwordFormat}
                />
              </Box>
            </Grid>
            {link1 !== undefined && (
              <Box className="login-page__link-container">
                <MuiLink
                  className="login-page__forgot-link"
                  component="button"
                  tabindex="-1"
                  onClick={() => handleLinkClick({ link: link1 })}
                >
                  <TextFormatter id={link1} />
                </MuiLink>
                <p className="login-page__option-link">|</p>
                <MuiLink
                  className="login-page__forgot-link"
                  tabindex="-1"
                  onClick={() => handleLinkClick({ link: link2 })}
                  component="button"
                >
                  <TextFormatter id={link2} />
                </MuiLink>
              </Box>
            )}
            <Captcha
              onInputCaptcha={handleInputCaptcha}
              errorRefresh={errorData}
              loaclCapchaError={loaclCapchaError}
              onresetError={setloaclCapchaError}
              captchaErr={captchaErrorMessage}
              onKeyPress={handleKeyPress}
              captchaImage={captchaImage}
              reloadCaptcha={loadCaptcha}
            />
          </>)
      }

      < Typography color={"neutral"} className="login-page__select-paragraph">
        <TextFormatter id="selectYourJourney" />
      </Typography >
      <Box className={`login-page__journeys-list ${isQrCode && "qr-mb"}`}>
        {journeys.map(
          (journey, index) =>
            (includes(journeyEnable, journey.value) ||
              includes(journeyEnable, journey.url)) && (
              <MuiButton
                tabIndex="-1"
                key={index}
                size="small"
                color={
                  redirectPageName === journey.url ? "secondary" : "neutral"
                }
                className={
                  redirectPageName === journey.url ? "selected-journey" : ""
                }
                onClick={() => onClickJourneyButton(journey)}
                disabled={
                  !(
                    includes(journeyEnable, journey.value) ||
                    includes(journeyEnable, journey.url)
                  )
                }
                text={journey.text}
              />
            ),
        )}
      </Box>

      {
        !isQrCode && <MuiButton
          size="small"
          color="secondary"
          onClick={submitLogin}
          disabled={false}
          text={<TextFormatter id="login" />}
          className="login-page__login-button"
        />
      }
    </>
  );
}

export default connect(mapStateToProps)(LoginForm);

LoginForm.propTypes = {
  label1: PropTypes.any,
  label2: PropTypes.any,
  virtualKey: PropTypes.bool,
  link1: PropTypes.string,
  link2: PropTypes.string,
  handleLinkClick: PropTypes.func,
  loginRegistrationData: PropTypes.object,
  errorData: PropTypes.any,
  active: PropTypes.string,
  activeKey: PropTypes.number,
  journey: PropTypes.any,
  deepLinkURL: PropTypes.any,
  otpData: PropTypes.any,
  countryCode: PropTypes.any,
  isQrCode: PropTypes.any,

};
=================================


.qr-hdfc-container {
  width: 100%;
  margin-top: --vih(8);
  padding: --vih(10) 0;
}

.qr-hdfc-header {
  margin-bottom: --vih(24);
  padding-bottom: --vih(12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.qr-hdfc-title {
  font-family: $poppins600;
  font-weight: $fontWeight600;
  font-size: --vih(22);
  color: $primary1EquitasBlue;
  margin-bottom: --vih(4);
}

.qr-hdfc-subtitle {
  font-family: $poppinsRegular;
  font-size: --vih(14);
  color: #666666;
}

.qr-hdfc-body {
  width: 100%;
  align-items: stretch !important;
}

/* Both left and right columns share the same card-like fixed panel */
.qr-hdfc-left,
.qr-hdfc-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.qr-hdfc-left {
  padding-right: --viw(8);
}

.qr-hdfc-right {
  padding-left: --viw(8);
}

/* Inner panel — same fixed size for both sides */
.qr-side-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* Top bar — fixed height row for timer and right-side spacer */
.qr-top-bar {
  width: 100%;
  height: --vih(40);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: --vih(10);
}

.qr-top-bar--spacer {
  /* invisible spacer, same height as timer row */
  visibility: hidden;
}

/* Image/QR area — identical fixed height on both sides */
.qr-media-area {
  width: 100%;
  height: --vih(300);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-shrink: 0;
  padding-top: --vih(8);
}

/* Caption row — pinned right below the media area */
.qr-caption {
  width: 100%;
  min-height: --vih(44);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: --vih(8);
  padding-top: --vih(12);

  p, span {
    font-family: $poppins600 !important;
    font-size: --vih(15);
    font-weight: $fontWeight600 !important;
    color: $primary1EquitasBlue;
    text-align: center;
    margin: 0;
  }

  /* Timer inside caption — smaller than the caption text */
  .qr-hdfc-timer {
    font-size: --vih(12);
  }
}

.qr-right-content-flex {
  display: flex;
  align-items: center;
  gap: --viw(20);
  width: 100%;
}

.qr-phone-mockup-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-phone-mockup-img {
  width: --viw(180);
  max-width: 195px;
  height: --viw(270);
  object-fit: contain;
  filter: drop-shadow(0 --vih(6) --vih(12) rgba(0, 0, 0, 0.1));
  transition: all 0.4s ease;
}

.qr-steps-container {
  display: flex;
  flex-direction: column;
  gap: --vih(6);
  flex: 1;
}

.qr-steps-title {
  font-family: $poppins600;
  font-weight: $fontWeight600;
  font-size: --vih(16);
  color: #1b438b;
  margin-bottom: --vih(4);
}

.qr-steps-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: --vih(6);
}

.qr-step-item {
  display: flex;
  align-items: center;
  gap: --viw(10);
  padding: --vih(6) --viw(10);
  border-radius: --viw(8);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  &:last-child {
    border-bottom: none;
  }

  &.active {
    background: rgba(27, 67, 139, 0.08);

    .qr-step-badge {
      background: #1b438b;
      color: #ffffff;
      box-shadow: 0 --vih(2) --vih(6) rgba(27, 67, 139, 0.25);
    }

    .qr-step-text {
      font-weight: $fontWeight600;
      color: #1b438b;
    }
  }
}

.qr-step-badge {
  width: --viw(28);
  height: --viw(28);
  border-radius: 50%;
  background: #dbe4f7;
  color: #1b438b;
  font-family: $poppins600;
  font-weight: $fontWeight600;
  font-size: --vih(13);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.qr-step-text {
  font-family: $poppinsRegular;
  font-size: --vih(13);
  color: #333333;
  line-height: 1.3;
  transition: all 0.3s ease;
}

.qr-security-note {
  display: flex;
  align-items: center;
  gap: --viw(8);
  background: #f2f6fc;
  border-radius: --viw(10);
  padding: --vih(8) --viw(12);
  margin-top: --vih(4);
  border: 1px solid rgba(27, 67, 139, 0.08);
}

.qr-security-icon-box {
  font-size: --vih(16);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1b438b;
}

.qr-security-text {
  font-family: $poppinsRegular;
  font-size: --vih(11);
  color: #4a638b;
  line-height: 1.35;
}


.qr-hdfc-leftsub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.qr-hdfc-slider-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Override carousel header — text sits in .qr-step-label instead */
  .carousel-header {
    display: none !important;
  }

  .carousel-img {
    width: 100%;
    max-width: 100%;
    height: --vih(250);
    object-fit: contain;
    margin: 0 auto;
    display: block;
  }

  /* Carousel inner wrapper */
  > div {
    width: 100%;
  }
}

/* Right side: narrow image + step text to the right */
.qr-right-inner {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: --viw(16);
  width: 100%;
  height: 100%;
}

/* Narrower carousel wrap — phone image only, arrows hidden */
.qr-carousel-wrap {
  flex-shrink: 0;
  width: --viw(200);

  .carousel-img {
    width: --viw(200);
    height: --vih(290);
    object-fit: contain;
    display: block;
    margin: 0 auto;
  }
}

/* Vertical step list on the right of the carousel image */
.qr-steps-vertical {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: --vih(14);
  padding-left: --viw(8);
  padding-top: --vih(20);
  padding-bottom: --vih(20);
  height: --vih(290);
}

.qr-vstep-item {
  display: flex;
  align-items: center;
  gap: --viw(10);
  padding: --vih(6) --viw(10);
  border-radius: --viw(8);
  transition: all 0.35s ease;
  opacity: 0.45;

  &.active {
    opacity: 1;
    background: rgba(27, 67, 139, 0.07);

    .qr-vstep-num {
      background: #1b438b;
      color: #ffffff;
      box-shadow: 0 --vih(2) --vih(8) rgba(27, 67, 139, 0.3);
    }

    .qr-vstep-text {
      color: #1b438b;
      font-family: $poppins600 !important;
      font-weight: $fontWeight600 !important;
    }
  }
}

.qr-vstep-num {
  width: --viw(26);
  height: --viw(26);
  min-width: --viw(26);
  border-radius: 50%;
  background: #dbe4f7;
  color: #1b438b;
  font-family: $poppins600;
  font-weight: $fontWeight600;
  font-size: --vih(13);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.35s ease;
}

.qr-vstep-text {
  font-family: $poppinsRegular;
  font-size: --vih(13);
  color: #555555;
  line-height: 1.3;
  transition: all 0.35s ease;
}

/* Empty caption spacer to keep vertical alignment with left side */
.qr-caption--empty {
  pointer-events: none;
  visibility: hidden;
}

.qr-hdfc-timer {
  font-family: $poppinsRegular;
  font-weight: $fontWeight500;
  font-size: --vih(13);
  color: $primary1EquitasBlue;
  background: rgba(27, 67, 139, 0.07);
  padding: --vih(4) --viw(14);
  border-radius: --viw(16);
  white-space: nowrap;
}

.qr-hdfc-timer.v-hidden {
  visibility: hidden;
}

.qr-hdfc-qr-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: --viw(14);
  background: #ffffff;
  border-radius: --viw(16);
  border: 1.5px dashed rgba(27, 67, 139, 0.25);
  width: fit-content;
  margin: 0 auto;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 --vih(4) --vih(16) rgba(27, 67, 139, 0.12);
  }
}

.qr-corner {
  position: absolute;
  width: --viw(14);
  height: --vih(14);
  border-color: $primary1EquitasBlue;
  border-style: solid;
  pointer-events: none;

  &--top-left {
    top: --vih(8);
    left: --viw(8);
    border-width: 2.5px 0 0 2.5px;
    border-top-left-radius: 4px;
  }
  &--top-right {
    top: --vih(8);
    right: --viw(8);
    border-width: 2.5px 2.5px 0 0;
    border-top-right-radius: 4px;
  }
  &--bottom-left {
    bottom: --vih(8);
    left: --viw(8);
    border-width: 0 0 2.5px 2.5px;
    border-bottom-left-radius: 4px;
  }
  &--bottom-right {
    bottom: --vih(8);
    right: --viw(8);
    border-width: 0 2.5px 2.5px 0;
    border-bottom-right-radius: 4px;
  }
}

.qr-wrapper {
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-wrapper.expired {
  opacity: 0.2;
}

.qr-refresh-center {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  background-color: #ffffff;
  color: $primary1EquitasBlue;
  box-shadow: 0 --vih(2) --vih(8) rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: $nonEliteBackground;
  }
}

.qr-refresh-loader {
  position: absolute;
  color: $primary1EquitasBlue;
}

.qr-hdfc-help-link {
  margin-top: --vih(20);
  font-family: $poppins600;
  font-weight: $fontWeight600;
  font-size: --vih(14);
  color: $primary1EquitasBlue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: $ipadpro-maxwidth) {
  .qr-hdfc-left {
    border-right: none;
    border-bottom: 1.5px dashed rgba(27, 67, 139, 0.2);
    padding-right: 0;
    padding-bottom: --vih(20);
    margin-bottom: --vih(20);
  }

  .qr-hdfc-right {
    padding-left: 0;
  }
}

.qr-steps-list {
  padding-left: --vih(30);
  margin-top: --vih(12);

  li {
    margin-bottom: --vih(10);
    font-family: $poppinsRegular;
    font-size: --vih(14);
    line-height: 1.6;
  }
}

.qr-mb {
  margin-bottom: --vih(60);
}

@media (max-width: $ipadpro-maxwidth) {
  .qr-login__slider-box {
    max-width: 100%;
  }

  .qr-login__qr-box {
    margin: 0 auto;
  }

  .qr-login__left {
    margin-bottom: --vih(10);
  }

  .qr-login__right {
    align-items: center;
    margin: 0;
    padding: 0;
  }
}

==================

      {isQrCode ? (() => {
        const qrBanners = [
          { title: "Step 1: Open the Equitas Mobile Banking app", imageUrl: QrImg1 },
          { title: "Step 2: Enter your mPIN", imageUrl: QrImg2 },
          { title: "Step 3: Tap on 1-Tap Token", imageUrl: QrImg3 },
          { title: "Step 4: Scan the QR code", imageUrl: QrImg1 },
        ];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeSlide, setActiveSlide] = React.useState(0);
        return (
        <Box className="qr-hdfc-container">
          <Grid
            container
            columns={8}
            spacing={0}
            className="qr-hdfc-body"
            alignItems="flex-start"
          >
            {/* LEFT — QR Code */}
            <Grid item xs={8} sm={4} className="qr-hdfc-left">
              <Box className="qr-side-panel">
                {/* Media area */}
                <Box className="qr-media-area">
                  <Box className="qr-hdfc-qr-box">
                    <span className="qr-corner qr-corner--top-left" />
                    <span className="qr-corner qr-corner--top-right" />
                    <span className="qr-corner qr-corner--bottom-left" />
                    <span className="qr-corner qr-corner--bottom-right" />

                    <div className={`qr-wrapper ${(isQrExpired || isQrLoading) ? "expired" : ""}`}>
                      <QRCodeSVG value={qrText || ""} size={200} />
                    </div>

                    {isQrExpired && (
                      <IconButton
                        className="qr-refresh-center"
                        onClick={handleQrRefresh}
                        aria-label="Refresh QR"
                      >
                        <RefreshIcon fontSize="large" />
                      </IconButton>
                    )}
                    {isQrLoading && (
                      <CircularProgress className="qr-refresh-loader" size={28} />
                    )}
                  </Box>
                </Box>

                {/* Caption + timer below */}
                <Box className="qr-caption">
                  <Box className={`qr-hdfc-timer ${(isQrExpired || isQrLoading) ? "v-hidden" : ""}`}>
                    <span className="qr-timer-icon">⏱ </span>
                    <TextFormatter id="refreshIn" /> <b>{timer}</b> <TextFormatter id="secs" />
                  </Box>
                </Box>
              </Box>
            </Grid>


            {/* RIGHT — Carousel + Step text */}
            <Grid item xs={8} sm={4} className="qr-hdfc-right">
              <Box className="qr-side-panel">
                {/* Media area — narrow image + vertical step list */}
                <Box className="qr-media-area">
                  <Box className="qr-right-inner">
                    {/* Narrow carousel on the left */}
                    <Box className="qr-carousel-wrap">
                      <Carousel
                        show={1}
                        autoslide
                        hidebutton
                        slidedelay={Config.bannerSliderDelay || 4000}
                        show1WithButton
                        onSlideChange={(idx) => {
                          setActiveSlide(idx);
                        }}
                      >
                        {qrBanners.map((b, i) => (
                          <div key={i} className="qr-slider-item">
                            <img
                              className="carousel-img"
                              src={b.imageUrl}
                              alt="Equitas Step"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Box>

                    {/* All steps vertically on the right, active highlighted */}
                    <Box className="qr-steps-vertical">
                      {qrBanners.map((b, i) => (
                        <Box
                          key={i}
                          className={`qr-vstep-item ${activeSlide === i ? "active" : ""}`}
                        >
                          <span className="qr-vstep-num">{i + 1}</span>
                          <span className="qr-vstep-text">{b.title.replace(/^Step \d+: /, "")}</span>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Empty caption spacer */}
                <Box className="qr-caption qr-caption--empty" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        );
      })()
      import Carousel from "../../../components/Carosal";
import QrImg1 from "../../../assets/images/QR/image1.png";
import QrImg2 from "../../../assets/images/QR/image2.png";
import QrImg3 from "../../../assets/images/QR/image3.png";


=======================
corosla.js
 useEffect(() => {
    if (typeof onSlideChange === "function") {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);
