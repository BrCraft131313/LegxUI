/**
 * DixiOS System Bridge (UI Side)
 * الجسر البرمجي من جهة واجهة المستخدم
 */

const DixiOSBridge = {
    // إرسال أمر تنفيذي إلى خلفية النظام (Java Bridge)
    sendCommand: async function(action, payload = {}) {
        const requestData = JSON.stringify({ action, payload });
        console.log(`[DixiOS Bridge Out]: ${requestData}`);

        // 1. إذا كان الواصل عبر Javascript Interface المباشر في الـ WebView
        if (window.DixiJavaBridge && typeof window.DixiJavaBridge.postMessage === 'function') {
            window.DixiJavaBridge.postMessage(requestData);
        } else {
            // 2. إذا كان يعمل عبر سيرفر الـ HTTP المحلية (DixiBridge.java - Port 8080)
            try {
                const response = await fetch('http://localhost:8080/api/command', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: action
                });
                const result = await response.text();
                console.log(`[DixiOS Bridge HTTP Response]: ${result}`);
            } catch (error) {
                console.warn(`[DixiOS Simulation]: تعذر الاتصال بـ HTTP Bridge، تشغيل نمط المحاكاة للأمر (${action}).`);
            }
        }
    },

    // تشغيل تطبيق حسب معرّفه (ID)
    launchApp: function(appId, appType) {
        this.sendCommand('LAUNCH_APP', { id: appId, type: appType });
    },

    // إيقاف التشغيل
    powerOff: function() {
        this.sendCommand('POWER_OFF');
    },

    // إعادة التشغيل
    reboot: function() {
        this.sendCommand('REBOOT');
    },

    // التحديث الحي
    liveUpdate: function() {
        this.sendCommand('LIVE_UPDATE');
    },

    // فتح الإعدادات
    openSettings: function() {
        this.sendCommand('OPEN_SETTINGS');
    }
};

// ربط الدوال البرمجية بالواجهة العامة
function systemCommand(action) {
    switch (action) {
        case 'shutdown':
            DixiOSBridge.powerOff();
            break;
        case 'reboot':
            DixiOSBridge.reboot();
            break;
        case 'live-update':
            DixiOSBridge.liveUpdate();
            break;
        case 'settings':
            DixiOSBridge.openSettings();
            break;
        default:
            DixiOSBridge.sendCommand(action);
            break;
    }
}
    
