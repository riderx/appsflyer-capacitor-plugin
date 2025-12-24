import './ExploreContainer.css';
import { IonButton, isPlatform } from '@ionic/react';
import { AFEvent, AFPurchaseDetailsV2, AFPurchaseType, AppsFlyer } from "appsflyer-capacitor-plugin";
import React from "react";

interface ContainerProps {
}

function logEventClicked() {
    const data: AFEvent = {
        eventName: 'test',
        eventValue: {
            af_revenue: 956,
            af_receipt_id: 'id536',
            af_currency: 'USD'
        }
    };
    AppsFlyer.logEvent(data)
        .then(r => alert('logEvent ~~>' + r.res))
        .catch(err => alert('logEvent err ~~>' + err));
}


function brandedDomains() {
    AppsFlyer.setOneLinkCustomDomain({ domains: ['paz', 'lavi', 'aaa'] });
    myLogger('brandedDomains');

}

function resolveDeepLinksUrls() {
    AppsFlyer.setResolveDeepLinkURLs({ urls: ['af', 'apps', 'appsflyer'] });
    myLogger('ResolveDeepLinksUrls');

}

function getSDKVersion() {
    AppsFlyer.getSdkVersion()
        .then(v => alert('SDK Version: ' + v.res));
}

function myLogger(msg: string) {
    console.log('Paz_logger: ' + msg);
}

function getAppsFlyerID() {
    AppsFlyer.getAppsFlyerUID()
        .then(res => alert('AppsFlyer ID:' + res.uid));
}

function generateInviteLink() {
    AppsFlyer.generateInviteLink({
        addParameters: { code: '1256abc', page: '152' },
        campaign: 'appsflyer_plugin',
        channel: 'sms',
    })
        .then(r => alert('user invite link: ' + r.link))
        .catch(e => alert('user invite error: ' + e));
}

function validateAndLogInAppPurchaseV2() {
    const purchaseData: AFPurchaseDetailsV2 = {
        purchaseDetails: {
            purchaseType: AFPurchaseType.oneTimePurchase,
            purchaseToken: isPlatform('android') ? 'android_purchase_token_example' : 'ios_transaction_id_example',
            productId: 'com.example.product.premium'
        },
        additionalParameters: {
            'test_param': 'test_value',
            'custom_data': 'example_data'
        }
    };

    AppsFlyer.validateAndLogInAppPurchaseV2(purchaseData)
        .then(result => {
            alert('validateAndLogInAppPurchaseV2 success: ' + JSON.stringify(result));
        })
        .catch(error => {
            alert('validateAndLogInAppPurchaseV2 error: ' + JSON.stringify(error));
        });
}

function validateAndLogInAppPurchaseV2Subscription() {
    const purchaseData: AFPurchaseDetailsV2 = {
        purchaseDetails: {
            purchaseType: AFPurchaseType.subscription,
            purchaseToken: isPlatform('android') ? 'android_subscription_token_example' : 'ios_subscription_transaction_id_example',
            productId: 'com.example.subscription.monthly'
        },
        additionalParameters: {
            'subscription_period': 'monthly',
            'test_subscription': 'true'
        }
    };

    AppsFlyer.validateAndLogInAppPurchaseV2(purchaseData)
        .then(result => {

            alert('validateAndLogInAppPurchaseV2 (Subscription) success: ' + JSON.stringify(result));
        })
        .catch(error => {
            alert('validateAndLogInAppPurchaseV2 (Subscription) error: ' + JSON.stringify(error));
        });
}

function setSharingFilterForAllPartners() {
    AppsFlyer.setSharingFilterForAllPartners();
}

function setSharingFilter() {
    AppsFlyer.setSharingFilter({ filters: ['google_int'] });
}

function anonymizeUser() {
    AppsFlyer.anonymizeUser({ anonymizeUser: true });
}

function stop() {
    AppsFlyer.stop()
        .then(res => { //return current state
            AppsFlyer.stop({ stop: !res.isStopped }) //change state
                .then(r => alert('isStopped: ' + r.isStopped)); //show state after change
        });
}

// function logAdRevenueExample() {
//     const myAdditionalParams = {
//         spong: 'bob',
//         doctor: 'who'
//     };
//     const data: AFAdRevenueData = {
//         monetizationNetwork: "MoneyMoneyMoney",
//         mediationNetwork: MediationNetwork.APPLOVIN_MAX,
//         currencyIso4217Code: "USD",
//         revenue: 200.0,
//         additionalParameters: myAdditionalParams
//     };

//     AppsFlyer.logAdRevenue(data)
//         .then(r => alert('logAdRevenue triggered'))
//         .catch(e => alert('logAdRevenue returned error: ' + e));
// }

// function sendPushNotificationData() {
//     AppsFlyer.sendPushNotificationData({
//         pushPayload: { af: '{"pid":"media_int","is_retargeting":"true", "c":"test_campaign"}' } //replace with push payload
//     });
// }

function sendConsentTest() {
    AppsFlyer.disableAppSetId()
    const consentOptions = {
        isUserSubjectToGDPR: true,
        hasConsentForDataUsage: true,
        hasConsentForAdsPersonalization: false,
        hasConsentForAdStorage: null
        };
    
      AppsFlyer.setConsentDataV2(consentOptions)
      .then(r => alert('setConsentDataV2 triggered'))
      .catch(e => alert('setConsentDataV2 returned error: ' + e));
}

function startSDK() {
    AppsFlyer.startSDK()
    .then(r => alert('startSDK triggered: ' + r.res))
    .catch(e => alert('startSDK returned error: ' + e));
}

function checkSdkState() {
    Promise.all([AppsFlyer.isSDKStarted(), AppsFlyer.isSDKStopped()])
        .then(([startedRes, stoppedRes]) => {
            alert(`SDK state => isStarted: ${startedRes.isStarted} | isStopped: ${stoppedRes.isStopped}`);
        })
        .catch(err => alert('SDK state error: ' + err));
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    return (
        <div className="container">

            <IonButton color="primary" expand="block" onClick={() => logEventClicked()}>Log Event</IonButton>
            <IonButton color="primary" expand="block" onClick={() => brandedDomains()}>set branded domains</IonButton>
            <IonButton color="primary" expand="block" onClick={() => resolveDeepLinksUrls()}>set Resolve
                DeepLink</IonButton>
            <IonButton color="primary" expand="block" onClick={() => getSDKVersion()}>get sdk version</IonButton>
            <IonButton color="primary" expand="block" onClick={() => getAppsFlyerID()}>get AppsFlyer ID</IonButton>
            <IonButton color="primary" expand="block" onClick={() => anonymizeUser()}>Set Anonymize User</IonButton>
            <IonButton color="primary" expand="block" onClick={() => stop()}>Stop SDK</IonButton>
            <IonButton color="primary" expand="block" onClick={() => generateInviteLink()}>generate Invite
                Link</IonButton>
            <IonButton color="primary" expand="block" onClick={() => validateAndLogInAppPurchaseV2()}>Validate IAP
                (One-time Purchase)</IonButton>
            <IonButton color="primary" expand="block" onClick={() => validateAndLogInAppPurchaseV2Subscription()}>Validate IAP
                (Subscription)</IonButton>
            <IonButton color="primary" expand="block" onClick={() => setSharingFilter()}>set Sharing Filter</IonButton>

            <IonButton color="primary" expand="block" onClick={() => setSharingFilterForAllPartners()}>set Sharing
                Filter For
                All
                Partners</IonButton>
            <IonButton color="primary" expand="block" onClick={() => sendConsentTest()}>set consentOptions</IonButton>
            <IonButton color="primary" expand="block" onClick={() => startSDK()}>StartSDK</IonButton>
            <IonButton color="primary" expand="block" onClick={() => checkSdkState()}>Check SDK State</IonButton>
        </div>
    );
};

export default ExploreContainer;
