topHeader/style.css
@import "../../mui/spacing.scss";

.top-header-bar {
  background-color: #100a2b;
  width: 100%;
  height: --vih(52);
  min-height: --vih(52);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1200;
  box-sizing: border-box;

  &__container {
    width: 100%;
    max-width: 100%;
    padding: 0 --viw(42);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 0 --viw(21);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    position: relative;
    gap: --viw(10);
  }

  &__action-text {
    color: #ffffff;
    font-size: --vih(17) !important;
    font-weight: 400 !important;
    font-family: inherit;
    cursor: pointer;
    line-height: 1 !important;
    opacity: 0.9;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      font-size: --vih(14) !important;
      white-space: nowrap;
    }
  }

  &__divider {
    color: rgba(255, 255, 255, 0.35);
    font-size: --vih(17);
    font-weight: 300;
    user-select: none;

    @media (max-width: 600px) {
      margin: 0 --viw(5);
    }
  }

  &__icon-btn {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: --vih(3) --viw(5);
    border-radius: --vih(5);
    opacity: 0.85;
    transition: all 0.15s ease;

    &:hover {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__a11y-icon {
    font-size: --vih(24) !important;
    color: #ffffff;
  }

  &__lang-selector {
    display: flex;
    align-items: center;
    gap: --viw(8);
    cursor: pointer;
    padding: --vih(4) --viw(10);
    border-radius: --vih(5);
    transition: background-color 0.15s ease;
    user-select: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__globe-icon {
    color: #ffffff;
    font-size: --vih(24) !important;
  }

  &__lang-name {
    color: #ffffff;
    font-size: --vih(17) !important;
    font-weight: 500 !important;
    font-family: inherit;
    line-height: 1 !important;
  }

  &__arrow-icon {
    color: #ffffff;
    font-size: --vih(25) !important;
  }
}

/* Language Dropdown Menu Styling */
.top-header-lang-dropdown {
  position: absolute;
  top: calc(100% + #{--vih(10)});
  right: 0;
  width: --viw(430);
  background-color: var(--palette-primary-neutralLightestprimary1Shade50, #ffffff);
  border-radius: --vih(15);
  box-shadow: 0 --vih(15) --vih(40) --vih(-5) rgba(0, 0, 0, 0.15), 0 --vih(5) --vih(15) --vih(-3) rgba(0, 0, 0, 0.08);
  border: --vih(1) solid var(--palette-primary-primary2Tint90primary1Shade60, rgba(0, 0, 0, 0.08));
  z-index: 9999;
  overflow: hidden;

  &__header {
    padding: --vih(20) --viw(26) --vih(15) --viw(26);
  }

  &__title {
    font-size: --vih(20) !important;
    font-weight: 600 !important;
    color: var(--palette-primary-neutralDarkNeutralLightest, #111827) !important;
    margin: 0 !important;
    line-height: 1.3 !important;
    font-family: inherit;
  }

  &__subtitle {
    font-size: --vih(16) !important;
    font-weight: 400 !important;
    color: var(--palette-primary-primary2Tint40primary2LightBlue, #6b7280) !important;
    margin-top: --vih(4) !important;
    line-height: 1.3 !important;
    font-family: inherit;
  }

  &__divider {
    height: --vih(1);
    background-color: var(--palette-primary-primary2Tint90primary1Shade60, #e5e7eb);
    width: 100%;
  }

  &__list {
    max-height: --vih(295);
    overflow-y: auto;
    padding: --vih(5) 0;

    /* Custom visible scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f8fafc;

    &::-webkit-scrollbar {
      width: --viw(8) !important;
      display: block !important;
    }
    &::-webkit-scrollbar-track {
      background: #f8fafc !important;
      border-radius: --vih(5) !important;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1 !important;
      border-radius: --vih(5) !important;

      &:hover {
        background: #94a3b8 !important;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: --vih(15) --viw(26);
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--palette-primary-primary2Tint90Shade40primary1Shade60, #f8fafc);
    }

    &.selected {
      background-color: var(--palette-primary-primary2Tint70, #f3e8ff);
    }
  }

  &__item-text {
    display: flex;
    flex-direction: column;
  }

  &__item-name {
    font-size: --vih(19) !important;
    font-weight: 600 !important;
    color: var(--palette-primary-neutralDarkNeutralLightest, #111827) !important;
    line-height: 1.3 !important;
    font-family: inherit;

    .selected & {
      color: var(--palette-primary-primary1EquitasBlueneutralLightest, #6d28d9) !important;
    }
  }

  &__item-subname {
    font-size: --vih(16) !important;
    font-weight: 400 !important;
    color: var(--palette-primary-primary2Tint40primary2LightBlue, #6b7280) !important;
    margin-top: --vih(3) !important;
    line-height: 1.3 !important;
    font-family: inherit;
  }

  &__check-icon {
    color: var(--palette-primary-primary1EquitasBlueneutralLightest, #6d28d9) !important;
    font-size: --vih(25) !important;
  }

  &__footer {
    padding: --vih(15) --viw(26);
    background-color: var(--palette-primary-neutralLightestprimary1Shade50, #fafafa);
  }

  &__footer-text {
    font-size: --vih(16) !important;
    font-weight: 400 !important;
    color: var(--palette-primary-primary2Tint40primary2LightBlue, #6b7280) !important;
    margin: 0 !important;
    font-family: inherit;
  }
}

/* UX4G Accessibility Widget Overrides */
#uw-widget-custom-trigger,
#accessibility-overlay { display: none !important; }

body #uw-main.uwaw {
  z-index: 99999 !important;
  flex-direction: column !important;
  width: --viw(585) !important;
  max-width: 92vw !important;
  height: fit-content !important;
  min-height: 0 !important;
  max-height: calc(100vh - #{--vih(74)}) !important;
  top: --vih(59) !important;
  bottom: unset !important;
  border-radius: --vih(15) !important;
  box-shadow: 0 --vih(12) --vih(37) rgba(0, 0, 0, 0.25) !important;
  overflow: hidden !important;

  &:not([style*="display: none"]):not([aria-hidden="true"]) {
    display: flex !important;
  }

  // Shared position reset for panels
  .second-panel,
  .reset-panel,
  .copyrights-accessibility {
    position: relative !important;
    inset: unset !important;
  }

  // Header bar — uses app theme primary color
  .second-panel {
    flex: 0 0 auto !important;
    padding: --vih(12) --viw(21) !important;
    background-color: var(--palette-primary-main, #1B438B) !important;

    h2 {
      font-size: --vih(19) !important;
      color: #ffffff !important;
    }

    .inner-short-key {
      font-size: --vih(14) !important;
      padding: --vih(3) --viw(8) !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
      color: #ffffff !important;
      border-radius: --vih(4) !important;
    }

    // Close button — themed
    .uwaw-close {
      color: #ffffff !important;
      background-color: transparent !important;
      opacity: 0.9 !important;

      &::before,
      &::after {
        background-color: #ffffff !important;
      }

      &:hover {
        opacity: 1 !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
      }
    }
  }

  // Hidden scrollbars
  .uwaw-body, .h-scroll {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    &::-webkit-scrollbar { display: none !important; width: 0 !important; }
  }

  .uwaw-body {
    position: relative !important;
    inset: unset !important;
    flex: 0 0 auto !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: calc(100vh - #{--vih(197)}) !important;
    padding: --vih(10) --viw(16) --vih(3) --viw(16) !important;
    overflow-y: auto !important;
  }

  .h-scroll { height: auto !important; min-height: 0 !important; overflow: visible !important; border: none !important; }

  // Feature grid
  .uwaw-features {
    gap: --vih(10) !important;
    &__item { padding: 0 !important; }

    &__item button.uwaw-features__item__i {
      padding: --vih(10) --viw(5) !important;
      min-height: --vih(74) !important;
      border-radius: --vih(10) !important;
      transition: background-color 0.15s ease, border-color 0.15s ease !important;

      // Active/selected feature item — themed border & background
      &.active,
      &[aria-pressed="true"] {
        background-color: rgba(27, 67, 139, 0.08) !important;
        border-color: var(--palette-primary-main, #1B438B) !important;
      }
    }

    &__item__icon { margin-bottom: --vih(4) !important; transform: scale(0.8) !important; }
    &__item__name { font-size: --vih(14) !important; line-height: 1.2 !important; margin-top: --vih(3) !important; }

    // Step indicators — themed active color
    .uwaw-features__step {
      &.active {
        background-color: var(--palette-primary-main, #1B438B) !important;
      }
    }

    // Tick/check mark on active features — themed
    .tick-active {
      &.visible,
      &[style*="display: block"],
      &[style*="display: flex"] {
        background-color: var(--palette-primary-main, #1B438B) !important;
      }
    }
  }

  // Footer: reset button + copyright
  .reset-panel {
    flex: 0 0 auto !important;
    padding: --vih(15) --viw(21) !important;
    margin: 0 !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
  }

  .copyrights-accessibility {
    width: 100% !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: --viw(16) !important;
  }

  // Reset All Settings button — themed
  button#reset-all, .btn-reset-all {
    width: auto !important;
    max-width: fit-content !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: --vih(7) --viw(18) !important;
    font-size: --vih(15) !important;
    margin: 0 !important;
    flex: 0 0 auto !important;
    background-color: var(--palette-primary-main, #1B438B) !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: --vih(6) !important;
    cursor: pointer !important;
    transition: opacity 0.15s ease !important;

    &:hover {
      opacity: 0.9 !important;
    }
  }

  .copyright-text {
    font-size: --vih(14) !important;
    color: #4b5563 !important;
    margin: 0 !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: --viw(8) !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    text-decoration: none !important;

    .ux4g-copy, .ux4g-copyright, .ux4g-logo {
      display: inline-block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .ux4g-copy, .ux4g-copyright { font-size: --vih(14) !important; color: #4b5563 !important; margin: 0 !important; }
    .ux4g-logo { width: --viw(85) !important; height: --vih(27) !important; min-width: --viw(85) !important; background: no-repeat center left / contain !important; vertical-align: middle !important; }
  }
}


==========================================================================================================

TopHeader.js

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CheckIcon from "@mui/icons-material/Check";
import { get } from "lodash";
import PropTypes from "prop-types";
import { updateLanguage } from "../../pages/actions";
import { languageRequest } from "../../models/LoginRegistration/actions";
import { updateLanguagePofile } from "../../models/Profile/actions";
import "./styles.scss";

const TOP_HEADER_HEIGHT = "42px";

const TopHeader = ({ isVisible: externalIsVisible, onClose }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const a11yBtnRef = useRef(null);
  const [internalIsVisible, setInternalIsVisible] = useState(true);
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const selectedLanguage =
    useSelector((state) => state.rootReducer?.pagejourney?.language) || "en";

  const reduxLanguages = useSelector((state) =>
    get(
      state,
      "rootReducer.loginregistration.registration.languageList.response.data.languages[0].supportLanguage",
      [],
    ),
  );

  const customerId = useSelector((state) =>
    get(
      state,
      "rootReducer.loginregistration.loginData.response.customerDetails.customerId",
      "",
    ),
  );

  // Fetch language list on mount
  useEffect(() => {
    setTimeout(() => dispatch(languageRequest()), 1);
  }, [dispatch]);

  // Update CSS custom property when visibility changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--top-header-height",
      isVisible ? TOP_HEADER_HEIGHT : "0px",
    );
    return () => {
      document.documentElement.style.setProperty("--top-header-height", "0px");
    };
  }, [isVisible]);

  // Memoize languages list to avoid re-mapping on every render
  const languagesList = useMemo(
    () =>
      reduxLanguages.map((item) => {
        const code = (item.code || item.lang || "en").toLowerCase();
        return {
          code,
          name:
            item.languageName ||
            item.name ||
            "English",
          subname:
            item.subname ||
            item.englishName ||
            (item.languageName && item.name ? item.name : null) ||
            "English",
        };
      }),
    [reduxLanguages],
  );

  // Memoize active language display name
  const activeLanguageName = useMemo(() => {
    const found = languagesList.find((l) => l.code === selectedLanguage);
    return found ? found.name : "English";
  }, [languagesList, selectedLanguage]);

  // Close dropdown and a11y menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }

      const uwMain = document.getElementById("uw-main");
      if (uwMain) {
        const style = window.getComputedStyle(uwMain);
        const isOpen =
          uwMain.style.display !== "none" &&
          uwMain.getAttribute("aria-hidden") !== "true" &&
          !uwMain.hasAttribute("hidden") &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          uwMain.offsetWidth > 0;

        if (
          isOpen &&
          !uwMain.contains(event.target) &&
          a11yBtnRef.current &&
          !a11yBtnRef.current.contains(event.target)
        ) {
          const closeBtn =
            uwMain.querySelector(".uwaw-close") ||
            uwMain.querySelector("button#uw-close") ||
            uwMain.querySelector(".close-panel") ||
            uwMain.querySelector("[aria-label*='Close']") ||
            uwMain.querySelector("[aria-label*='close']");

          if (closeBtn) {
            closeBtn.click();
          } else {
            const trigger =
              document.getElementById("uw-widget-custom-trigger") ||
              document.getElementById("open-the-accessibility-menu");
            if (trigger) trigger.click();
            else uwMain.style.display = "none";
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = useCallback(
    (langItem) => {
      if (customerId) {
        dispatch(
          updateLanguagePofile({
            code: langItem.code,
            name: langItem.subname || langItem.name || "English",
          }),
        );
      }
      dispatch(updateLanguage(langItem.code));
      setIsLangDropdownOpen(false);
    },
    [customerId, dispatch],
  );

  const handleSkipToMainContent = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsVisible(false);
    }
    const mainElement =
      document.getElementById("main-content") ||
      document.querySelector(".layout__wrapper") ||
      document.querySelector("main");
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: "smooth" });
      mainElement.focus();
    } else {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  }, [onClose]);

  const toggleUxgAccessibility = useCallback(() => {
    const trigger =
      document.getElementById("uw-widget-custom-trigger") ||
      document.getElementById("open-the-accessibility-menu");

    if (trigger) {
      trigger.click();
      return;
    }

    const observer = new MutationObserver(() => {
      const nextTrigger =
        document.getElementById("uw-widget-custom-trigger") ||
        document.getElementById("open-the-accessibility-menu");

      if (nextTrigger) {
        nextTrigger.click();
        observer.disconnect();
        clearTimeout(fallbackTimeout);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    let fallbackTimeout = setTimeout(() => {
      observer.disconnect();
      const accessibilityMenu = document.getElementById("uw-main");
      if (accessibilityMenu) {
        accessibilityMenu.style.display =
          accessibilityMenu.style.display === "none" ? "flex" : "none";
      }
    }, 3000);
  }, []);

  if (!isVisible) return null;

  return (
    <Box className="top-header-bar">
      <Box className="top-header-bar__container">
        <Box className="top-header-bar__right" ref={dropdownRef}>
          {/* Skip to Main Content */}
          <Typography
            className="top-header-bar__action-text"
            onClick={handleSkipToMainContent}
          >
            Skip to main content
          </Typography>

          <span className="top-header-bar__divider">|</span>

          {/* Accessibility Icon */}
          <Box
            ref={a11yBtnRef}
            className="top-header-bar__icon-btn"
            title="Accessibility Options"
            onClick={toggleUxgAccessibility}
          >
            <AccessibilityNewIcon className="top-header-bar__a11y-icon" />
          </Box>

          <span className="top-header-bar__divider">|</span>

          {/* Language Selector */}
          <Box
            className="top-header-bar__lang-selector"
            onClick={() => setIsLangDropdownOpen((prev) => !prev)}
          >
            <LanguageIcon className="top-header-bar__globe-icon" />
            <Typography className="top-header-bar__lang-name">
              {activeLanguageName}
            </Typography>
            {isLangDropdownOpen ? (
              <KeyboardArrowUpIcon className="top-header-bar__arrow-icon" />
            ) : (
              <KeyboardArrowDownIcon className="top-header-bar__arrow-icon" />
            )}
          </Box>

          {/* Language Dropdown */}
          {isLangDropdownOpen && (
            <Box className="top-header-lang-dropdown">
              <Box className="top-header-lang-dropdown__list">
                {languagesList.map((langItem) => {
                  const isSelected = selectedLanguage === langItem.code;
                  return (
                    <Box
                      key={langItem.code}
                      className={`top-header-lang-dropdown__item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectLanguage(langItem)}
                    >
                      <Box className="top-header-lang-dropdown__item-text">
                        <Typography className="top-header-lang-dropdown__item-name">
                          {langItem.name}
                        </Typography>
                        <Typography className="top-header-lang-dropdown__item-subname">
                          {langItem.subname}
                        </Typography>
                      </Box>
                      {isSelected && (
                        <CheckIcon className="top-header-lang-dropdown__check-icon" />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

TopHeader.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TopHeader;
===========================================================================================================
src/compomemt
export { default as TopHeader } from "./TopHeader";

=============================================================================================================
Header.js 

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { get, includes } from "lodash";
import {
  AppBar,
  Box,
  Typography,
  Divider,
  Drawer,
  IconButton,
  Badge,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { connect, useDispatch } from "react-redux";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import "./styles.scss";
import ProfileIcon from "../../assets/images/profileIcon.svg";
import NotifyIcon from "../../assets/images/notifyIcon.svg";
import {
  logoutRequest,
  onLogOut,
} from "../../models/LoginRegistration/actions";
import CancelConfirmation from "../DialogBoxes/CancelConfirmation";
import MappingSearch from "../MappingSearch";
import ComingSoon from "../DialogBoxes/ComingSoon";
import SearchIcon from "../../assets/images/searchIcon.svg";
import { loadComponent, setActiveComponentValue } from "../../pages/actions";
import { DEBITEASE_VERIFY_OTP } from "../../models/DebitCardEase/types";
import mapStateToProps from "./selectors";
import { updateJofJooDepositStatus } from "../../models/Deposits/types";
import TopHeader from "../TopHeader";

const Header = (props) => {
  const {
    userLogged = 0,
    settoggleMenuDrawer,
    open,
    fromDebitEase = false,
    checkJofJooDepositInitiateData,
  } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [toggleSearchDrawer, settoggleSearchDrawer] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [isTopHeaderVisible, setIsTopHeaderVisible] = useState(true);
  const cancelPopupButtons = ["cancel", "logout"];
  const intl = useIntl();

  const notificationsCount = get(
    checkJofJooDepositInitiateData,
    "data.data.jooAndJofDepositList",
    [],
  ).length;

  const closeComingSoonDialog = () => {
    setComingSoon(false);
  };

  const onNavigateProfile = () => {
    const isActive = includes(window.env.activeJourny, "myProfile");
    if (
      isActive ||
      window.env.activeJourny === undefined ||
      window.env.activeJourny.length === 0
    ) {
      dispatch(loadComponent("my-profile"));
      navigate("/profile");
      dispatch(setActiveComponentValue(""));
    } else {
      setComingSoon(true);
    }
  };

  const onClickNotify = () => {
    dispatch({ type: updateJofJooDepositStatus.CLEAR });
    dispatch(loadComponent("notifications"));
    dispatch(setActiveComponentValue(""));
  };

  const onClickLogOut = () => {
    setShowConfirmPopup(true);
  };

  // eslint-disable-next-line no-unused-vars
  const onChangeSearch = (value) => {
    setSearchValue(value);
  };

  const handleSubmit = (val) => {
    setShowConfirmPopup(false);
    if (val && val !== "cancel") {
      dispatch(logoutRequest());
      dispatch(onLogOut());
      if (!fromDebitEase) navigate("/login");
      else {
        dispatch({ type: DEBITEASE_VERIFY_OTP.CLEAR });
        navigate("/debitcards");
        dispatch(loadComponent("dcEase-login"));
      }
    }
  };

  const accessibilityButton = (
    <Box
      className="headerHelperIcons__profile"
      onClick={() => setIsTopHeaderVisible(true)}
      title="Show Accessibility & Top Bar"
    >
      <AccessibilityNewIcon />
      <Typography className="headerHelperIcons__profiletext">
        Accessibility
      </Typography>
    </Box>
  );

  return (
    <Box className="app-header-main-wrapper">
      <TopHeader
        isVisible={isTopHeaderVisible}
        onClose={() => setIsTopHeaderVisible(false)}
      />
      <AppBar
        className={`header-container ${fromDebitEase ? "header-container-debitEase" : ""}`}
        position="static"
        sx={{
          color: "primary.main",
          backgroundColor: theme.palette.primary.darkest,
        }}
      >
        <Box className="headerLeft">
        {userLogged === 1 && (
          <Box className="mobile-menu">
            <div
              className={`menu btn16 ${open ? "open" : ""}`}
              data-menu="16"
              onClick={() => settoggleMenuDrawer(true)}
              aria-hidden="true"
            >
              <div className="icon" />
            </div>
          </Box>
        )}
        <CancelConfirmation
          show={showConfirmPopup}
          handleSubmit={handleSubmit}
          title="confirmation"
          bodyContent="areYouSureLogout"
          actionButtons={cancelPopupButtons}
        />

        {!fromDebitEase && (
          <img
            src={theme.palette.secondary.logo}
            alt="Equitas-Logo"
            className="equitas-logo"
          />
        )}

        {fromDebitEase && (
          <IconButton
            onClick={() => {
              if (window.location.pathname !== "/debitcards") {
                navigate("/debitcards");
                dispatch(loadComponent("dbEase-dashboard"));
              }
            }}
          >
            <img
              src={theme.palette.secondary.logo}
              alt="Equitas-Logo"
              className="equitas-logo"
            />
          </IconButton>
        )}

        {!fromDebitEase && userLogged === 1 && (
          <>
            <Drawer
              className="mapping-search-expandright"
              open={toggleSearchDrawer}
              anchor="top"
              onClose={() => settoggleSearchDrawer(false)}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <MappingSearch
                className="mapping-search search-input search expandright"
                placeholder={intl.formatMessage({ id: "searchStatement" })}
                journey={"dashboard"}
                onSearchClose={() => settoggleSearchDrawer(false)}
              />
            </Drawer>

            <MappingSearch
              className="mapping-search desktop-searchbutton"
              placeholder={intl.formatMessage({ id: "searchStatement" })}
              journey={"dashboard"}
            />
          </>
        )}
      </Box>

      {!fromDebitEase && userLogged === 1 ? (
        <Box className="headerHelperIcons">
          {!isTopHeaderVisible && (
            <>
                {accessibilityButton}
              <Divider
                className="headerHelperIcons__divider"
                orientation="vertical"
                flexItem
              />
            </>
          )}
          <Box className="mobile-searchbutton ">
            <SearchIcon
              className="headerHelperIcons__profile"
              preserveAspectRatio={"none"}
              viewBox="0 0 30 30"
              onClick={() => settoggleSearchDrawer(true)}
              width="30"
              height="30"
            />
          </Box>
          <Box className="headerHelperIcons__notify" onClick={onClickNotify}>
            <Badge
              badgeContent={notificationsCount}
              color="error"
              max={10}
              invisible={notificationsCount === 0}
            >
              <NotifyIcon preserveAspectRatio="none" viewBox="0 0 28 28" />
            </Badge>
            <Typography className="headerHelperIcons__profiletext">
              <FormattedMessage id="notifications" />
            </Typography>
          </Box>
          <Divider
            className="headerHelperIcons__divider"
            orientation="vertical"
            flexItem
          />
          <Box
            className="headerHelperIcons__profile"
            onClick={onNavigateProfile}
          >
            <ProfileIcon preserveAspectRatio={"none"} viewBox="0 0 28 28" />
            <Typography className="headerHelperIcons__profiletext">
              <FormattedMessage id="profile" />
            </Typography>
          </Box>
          <Divider
            className="headerHelperIcons__divider"
            orientation="vertical"
            flexItem
          />
          <Box className="headerHelperIcons__logout" onClick={onClickLogOut}>
            <LogoutRoundedIcon />
            <Typography className="headerHelperIcons__logouttext">
              <FormattedMessage id="logout" />
            </Typography>
          </Box>
        </Box>
      ) : (
        !isTopHeaderVisible && (
          <Box className="headerHelperIcons">
            {accessibilityButton}
          </Box>
        )
      )}
      {fromDebitEase && userLogged === 1 && (
        <Box className="headerHelperIcons">
          <Box className="headerHelperIcons__logout" onClick={onClickLogOut}>
            <LogoutRoundedIcon />
            <Typography className="headerHelperIcons__logouttext">
              <FormattedMessage id="logout" />
            </Typography>
          </Box>
        </Box>
      )}
      {comingSoon && <ComingSoon onCancel={closeComingSoonDialog} />}
      </AppBar>
    </Box>
  );
};

Header.propTypes = {
  userLogged: PropTypes.any,
  settoggleMenuDrawer: PropTypes.any,
  open: PropTypes.any,
  fromDebitEase: PropTypes.bool,
  checkJofJooDepositInitiateData: PropTypes.any,
};
export default connect(mapStateToProps)(Header);


============================================================================================================

header.css 
.app-header-main-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1200;
}

.header-container {
  color: var(--palette-primary-main);
  background-color: var(--palette-primary-darkest);
  ---  Reamaing codes ---
  
============================================================================================================
mi continer.css
.mui-container {
  margin-top: calc(var(--vih) * 15);
  }

  ============================================================================================================

sideMenu.css
@import "../../mui/palette.scss";
@import "../../mui/spacing.scss";
@import "../../mui/typography.scss";
@import "../../styles.scss";

.account-layout {
  color: var(--palette-primary-primary2Tint20primary2LightBlue);
  padding: --vih(4) --viw(2) !important;
  font-family: $poppinsRegular;
  cursor: pointer;
  transform: scale(0.7);

  & p {
    font-family: $poppins400;
    font-weight: $fontWeight400;
    font-size: --vih(18);
    text-align: center;
    line-height: unset;
  }

  &.active p {
    font-family: $poppins600;
    font-weight: $fontWeight600;
  }

  svg {
    path {
      fill: var(--palette-primary-primary2Tint20primary2LightBlue);
    }
  }
}

.account-layout.active {
  pointer-events: none;
  color: var(--palette-primary-primary1EquitasBlueneutralLightest);

  svg {
    path {
      fill: var(--palette-primary-primary1EquitasBlueneutralLightest);
    }
  }
}

.account-menuItem {
  border-top: --vih(1) solid $primary2Tint60;
  padding-bottom: --vih(32);
}

.sideMenu {
  left: 0px;
  bottom: 0px;

  .MuiDrawer-paper {
    background-color: var(--palette-primary-neutralLightestprimary1Shade50);
    top: calc(var(--top-header-height, 0px) + --vih(64)) !important;
    height: calc(100vh - (var(--top-header-height, 0px) + --vih(64))) !important;
    width: 5.55% !important;
    min-width: 5.55% !important;
    overflow-y: auto !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  .account-layout {
    background-color: unset;
    background-image: unset;
  }
}

.side-menu-icon {
  color: var(--palette-primary-primary2Tint20primary2LightBlue);
  font-size: --vih(36);
}

.side-menu-icon-active {
  color: var(--palette-primary-primary1EquitasBlueneutralLightest);
  font-size: --vih(36);
  font-variation-settings: "FILL" 1;
}

============================================================================================================
dashboardLayout.js
  <Box className="desktop-menu">
                        <Drawer
                          className="sideMenu"

                          remove prperPros
                          sx:{
                          
                          }
                          -----
                          
============================================================================================================

layout.css
  &__wrapper {
     margin-top: calc(var(--top-header-height, 0px) + 64px) !important;
     }
