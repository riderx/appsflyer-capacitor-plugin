# In-App events

In-App Events provide insight on what is happening in your app. It is recommended to take the time and define the events you want to measure to allow you to measure ROI (Return on Investment) and LTV (Lifetime Value).

Recording in-app events is performed by calling sendEvent with event name and value parameters. See In-App Events documentation for more details.

Find more info about recording events [here](https://support.appsflyer.com/hc/en-us/articles/115005544169-Rich-in-app-events-guide#introduction).
- [Log Event](#LogEvent)
- [Purchase Validation (Recommended)](#InAppPurchaseValidationV2)
- [Legacy Purchase Validation(Deprecated)](#InAppPurchaseValidation)
	 - [Android](#validateAndLogInAppPurchaseAndroid)  
	 - [iOS](#validateAndLogInAppPurchaseIos)  
  

##  <a id="LogEvent"> Log Event

-   **Event name**: The unique event identifier. It is usually how marketers see the event in the dashboard.
-   **Event values**: An object that consists of key-value pairs called  **event parameters**. Event parameters provide additional context and information about the occurring event.
```typescript
  const data: AFEvent = {
      eventName: 'test',
      eventValue: { af_revenue: 956,
        af_receipt_id: 'id536',
        af_currency: 'USD'}
    };
    
    AppsFlyer.logEvent(data)
      .then(r => alert('logEvent ~~>' + r.res))
      .catch(err => alert('logEvent err ~~>' + err));
```

## <a id="InAppPurchaseValidationV2"> In-app purchase validation (Recommended)

AppsFlyer provides a unified API for server verification of in-app purchases across both Android and iOS. This API automatically logs an `af_purchase` event if the validation is successful.

```typescript
import { AFPurchaseType } from 'appsflyer-capacitor-plugin';

const purchaseDetails = {
    purchaseType: AFPurchaseType.oneTimePurchase,
    purchaseToken: "purchase_token_here",
    productId: "com.example.product"
};

const additionalParams = {
    "custom_param": "value"
};

AppsFlyer.validateAndLogInAppPurchaseV2({
    purchaseDetails: purchaseDetails,
    additionalParameters: additionalParams
})
    .then(result => {
        console.log('Validation successful:', result);
    })
    .catch(error => {
        console.error('Validation failed:', error);
    });
```

See the [API documentation](/docs/API.md#validateandloginapppurchasev2) for more details.

## <a id="InAppPurchaseValidation"> Legacy In-app purchase validation (Deprecated)

> [!WARNING]
> These APIs are deprecated since version 6.17.7. Please use [validateAndLogInAppPurchaseV2](#InAppPurchaseValidationV2) instead.

For legacy In-App Purchase Receipt Validation, follow the instructions according to your operating system.

**Notes**
Calling validateReceipt automatically generates an af_purchase in-app event, so you don't need to send this event yourself.

#### <a id="validateAndLogInAppPurchaseAndroid"> validateAndLogInAppPurchaseAndroid  
   * Android only 
```typescript  
validateAndLogInAppPurchaseAndroid(purchaseData: AFAndroidInAppPurchase) => Promise<void>  
```  
  
API for server verification of in-app purchases. An af_purchase event with the relevant values will be automatically logged if the validation is successful.  
  
| Param              | Type                                                                      |  
| ------------------ | ------------------------------------------------------------------------- |  
| **`purchaseData`** | <code>[AFAndroidInAppPurchase](/docs/API.md#afandroidinapppurchase)</code>      |  

  
**Returns:** <code>Promise<[AFRes](/docs/API.md#afres)></code>  
  ```typescript
	AppsFlyer.validateAndLogInAppPurchaseAndroid({
        additionalParameters: {aa: 'cc'},
        currency: 'usd',
        price: '20',
        signature: 'the_signature',
        publicKey: 'your_public_key',
        purchaseData: 'the_purchase_data'
      })
        .then(r => alert('validateAndLogInAppPurchase success: ' + r.res))
        .catch(e => alert('validateAndLogInAppPurchase error: ' + e));
```
--------------------  
  
  
#### <a id="validateAndLogInAppPurchaseIos"> validateAndLogInAppPurchaseIos  
   * iOS only 
```typescript  
validateAndLogInAppPurchaseIos(purchaseData: AFIosInAppPurchase) => Promise<void>  
```  
  
| Param              | Type                                                              |  
| ------------------ | ----------------------------------------------------------------- |  
| **`purchaseData`** | <code>[AFIosInAppPurchase](/docs/API.md#afiosinapppurchase)</code> |  
  
**Returns:** <code>Promise<[AFRes](/docs/API.md#afres)></code>  
  ```typescript
     AppsFlyer.validateAndLogInAppPurchaseIos({
        additionalParameters: {aa: 'cc'},
        currency: 'usd',
        price: '20',
        inAppPurchase: 'productIdentifier',
        transactionId: 'transactionId'
      })
        .then(r => alert('validateAndLogInAppPurchase success: ' + r.res))
        .catch(e => alert('validateAndLogInAppPurchase error: ' + JSON.stringify(e)));
```

--------------------  
