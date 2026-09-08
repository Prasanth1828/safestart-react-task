# 📑 Exact Code Changes Document (Page-by-Page & Code Snippets)

**Repository**: Equitas IB_UAT React Frontend  
**Module**: Accounts Module (`src/models/Accounts`)  

---

## 1. Page: Accounts Transaction Tab (`Transaction.js`)
* **File Path**: [Transaction.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/Transaction/Transaction.js#L21-L55)
* **Purpose**: Fix button click handler to pass constant key instead of inspecting translated DOM element text.

### 🔴 BEFORE (Old Code):
```javascript
  const handleTransactionType = (event) => {
    const transactionType = event.currentTarget.value;
    if (transactionType === "recentTransactions") {
      dispatch(loadComponent("recent-transaction"));
      dispatch(setPageFrom(""));
    } else {
      dispatch(setSearchTransactionData({}));
      dispatch(rowPayData({}));
      dispatch(getAllBenificiary());
      dispatch(loadComponent("transaction-search"));
    }
  };

  // Render:
  <MuiButton
    onClick={handleTransactionType}
    text={<TextFormatter id={transaction.text} />}
  />
```

### 🟢 AFTER (New Code):
```javascript
  const handleTransactionType = (transactionKey) => {
    if (transactionKey === "recentTransactions") {
      dispatch(loadComponent("recent-transaction"));
      dispatch(setPageFrom(""));
    } else {
      dispatch(setSearchTransactionData({}));
      dispatch(rowPayData({}));
      dispatch(getAllBenificiary());
      dispatch(loadComponent("transaction-search"));
    }
  };

  // Render:
  <MuiButton
    onClick={() => handleTransactionType(transaction.text)}
    text={<TextFormatter id={transaction.text} />}
  />
```

---

## 2. Page: Account Statement Tab (`AccountStatement.js`)
* **File Path**: [AccountStatement.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/AccountStatement/AccountStatement.js#L67-L98)
* **Purpose**: Pass explicit `statementKey` to ensure language change doesn't break statement generation routing.

### 🔴 BEFORE (Old Code):
```javascript
  const handleAccountStatement = (event) => {
    const accountStatement = event.currentTarget.value;
    if (accountStatement === "generateStatement") {
      dispatch(setTabValue("statement-summary", 0));
      dispatch(loadComponent("statement-summary"));
      dispatch(setPageFrom(""));
    } else if (accountStatement === "interestCertificate") {
      ...
    } else setBalanceCertificate(true);
  };

  // Render:
  <MuiButton
    onClick={handleAccountStatement}
    text={<TextFormatter id={account.text} />}
  />
```

### 🟢 AFTER (New Code):
```javascript
  const handleAccountStatement = (statementKey) => {
    if (statementKey === "generateStatement") {
      dispatch(setTabValue("statement-summary", 0));
      dispatch(loadComponent("statement-summary"));
      dispatch(setPageFrom(""));
    } else if (statementKey === "interestCertificate") {
      ...
    } else setBalanceCertificate(true);
  };

  // Render:
  <MuiButton
    onClick={() => handleAccountStatement(account.text)}
    text={<TextFormatter id={account.text} />}
  />
```

---

## 3. Page: Cheque Services Tab (`ChequeServices.js`)
* **File Path**: [ChequeServices.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/ChequeServices/ChequeServices.js#L65-L108)
* **Purpose**: Pass explicit `chequeServiceKey` across both normal and Service Request sub-menu renders.

### 🔴 BEFORE (Old Code):
```javascript
  const handleChequeServices = (event) => {
    const chequeServices = event.currentTarget.value;
    if (chequeServices === "chequebookrequest") {
      dispatch(loadComponent("cheque-book-request"));
    } else if (chequeServices === "chequestatusenquiry") {
      setChequeStatusOpen(true);
    } ...
  };

  // Render:
  <MuiButton
    onClick={handleChequeServices}
    text={<TextFormatter id={chequeServices.text} isIntl />}
  />
```

### 🟢 AFTER (New Code):
```javascript
  const handleChequeServices = (chequeServiceKey) => {
    if (chequeServiceKey === "chequebookrequest") {
      dispatch(loadComponent("cheque-book-request"));
    } else if (chequeServiceKey === "chequestatusenquiry") {
      setChequeStatusOpen(true);
    } ...
  };

  // Render:
  <MuiButton
    onClick={() => handleChequeServices(chequeServices.text)}
    text={<TextFormatter id={chequeServices.text} isIntl />}
  />
```

---

## 4. Page: Recent Transaction Table (`RecentTransactionTable/index.js`)
* **File Path**: [index.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/components/RecentTransactionTable/index.js#L37-L43)
* **Purpose**: Wrap plain English table headers in dynamic `<TextFormatter />` components.

### 🔴 BEFORE (Old Code):
```jsx
  <TableRow className="recent-transaction__headertitle">
    <TableCell> Payment Mode</TableCell>
    <TableCell> Narration</TableCell>
    <TableCell sx={{ width: "14px" }}> Credit/Debit</TableCell>
    <TableCell className="th__mui-balance"> Balance</TableCell>
    <TableCell> Time</TableCell>
  </TableRow>
```

### 🟢 AFTER (New Code):
```jsx
  <TableRow className="recent-transaction__headertitle">
    <TableCell><TextFormatter id="paymentMode" /></TableCell>
    <TableCell><TextFormatter id="narration" /></TableCell>
    <TableCell sx={{ width: "14px" }}><TextFormatter id="creditDebit" /></TableCell>
    <TableCell className="th__mui-balance"><TextFormatter id="balance" /></TableCell>
    <TableCell><TextFormatter id="time" /></TableCell>
  </TableRow>
```

---

## 5. Page: Statement Summary (`StatementSummary.js`)
* **File Path**: [StatementSummary.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/AccountStatement/StatementSummary.js#L132-L144)
* **Purpose**: Support explicit `actionKey` parameter with safe fallback for row actions.

### 🔴 BEFORE (Old Code):
```javascript
  const actionClick = (e, data) => {
    const eventName = get(e, "target.innerHTML", "");
    const object = rowDataToObject(data);
    dispatch(
      setRaiseRequest(
        (cardTypes.includes(object?.paymentMode) &&
          object?.Indicator === "D") ||
          allATMWithdrawlList.includes(object?.transactionCode)
          ? eventName
          : "Report Fraud",
      ),
    );
```

### 🟢 AFTER (New Code):
```javascript
  const actionClick = (e, data, actionKey = "") => {
    const eventName = actionKey || get(e, "target.innerHTML", "") || "Report Fraud";
    const object = rowDataToObject(data);
    dispatch(
      setRaiseRequest(
        (cardTypes.includes(object?.paymentMode) &&
          object?.Indicator === "D") ||
          allATMWithdrawlList.includes(object?.transactionCode)
          ? eventName
          : "Report Fraud",
      ),
    );
```

---

## 6, 7 & 8. Child Statement Components (`YearlyStatement.js`, `MonthlyStatement.js`, `DateRangeStatement.js`)
* **File Paths**:
  - [YearlyStatement.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/AccountStatement/YearlyStatement.js#L295-L299)
  - [MonthlyStatement.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/AccountStatement/MonthlyStatement.js#L334-L338)
  - [DateRangeStatement.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/AccountStatement/DateRangeStatement.js#L367-L371)
* **Purpose**: Pass explicit key strings `"Raise Dispute"` and `"Report Fraud"` to parent `actionClick`.

### 🔴 BEFORE (Old Code):
```javascript
  action={{
    raiseDispute: (e, data) => actionClick(e, data),
    reportFraud: (e, data) => actionClick(e, data),
    downloadPDF: (e, data) => downloadDetails(e, data),
  }}
```

### 🟢 AFTER (New Code):
```javascript
  action={{
    raiseDispute: (e, data) => actionClick(e, data, "Raise Dispute"),
    reportFraud: (e, data) => actionClick(e, data, "Report Fraud"),
    downloadPDF: (e, data) => downloadDetails(e, data),
  }}
```

---

## 9. Page: Transaction Search Result (`TransactionSearchResult.js`)
* **File Path**: [TransactionSearchResult.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/Transaction/TransactionSearchResult.js#L176-L322)
* **Purpose**: Pass explicit action keys from `MuiTable` to `actionClick`.

### 🔴 BEFORE (Old Code):
```javascript
  const actionClick = (e, data) => {
    const eventName = get(e, "target.innerHTML", "");
    dispatch(setRaiseRequest(eventName));
  };

  // Render:
  action={{
    raiseDispute: (e, data) => actionClick(e, data),
    reportFraud: (e, data) => actionClick(e, data),
  }}
```

### 🟢 AFTER (New Code):
```javascript
  const actionClick = (actionType, data) => {
    const eventName = actionType || "Report Fraud";
    dispatch(setRaiseRequest(eventName));
  };

  // Render:
  action={{
    raiseDispute: (e, data) => actionClick("Raise Dispute", data),
    reportFraud: (e, data) => actionClick("Report Fraud", data),
  }}
```

---

## 10. Page: Transaction Details (`TransactionDetails.js`)
* **File Path**: [TransactionDetails.js](file:///Users/prasanth/Desktop/Equitas%20React/IB_UAT/src/models/Accounts/Transaction/TransactionDetails.js#L192-L199)
* **Purpose**: Safe option checking in `handleDownloadOptionChange`.

### 🔴 BEFORE (Old Code):
```javascript
  const handleDownloadOptionChange = (event) => {
    setDownloadOption(event.target.value);
    if (event.target.value === "Report Fraud") {
      onClickfraudRequest();
    } else {
      onClickdisputeRequest();
    }
  };
```

### 🟢 AFTER (New Code):
```javascript
  const handleDownloadOptionChange = (event) => {
    const val = event?.target?.value || "";
    setDownloadOption(val);
    if (val === "Report Fraud" || val.includes("Report Fraud")) {
      onClickfraudRequest();
    } else {
      onClickdisputeRequest();
    }
  };
```
