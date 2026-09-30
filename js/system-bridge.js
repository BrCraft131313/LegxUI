/**
 * DixiOS System Bridge (UI Side)
 * الجسر البرمجي من جهة واجهة المستخدم
 */

const DixiOSBridge = {
    // إرسال أمر تنفيذي إلى خلفية النظام (Java Bridge)
    sendCommand: function(action, payload = {}) {
        const requestData = JSON.stringify({ action, payload });
        console.log(`[DixiOS Bridge Out]: ${requestData}`);

        // إذا كان واصل ببيئة Java الحقيقية للنظام
        if (window.DixiJavaBridge && typeof window.DixiJavaBridge.postMessage === 'function') {
            window.DixiJavaBridge.postMessage(requestData);
        } else {
            // نمط التجرية على المتصفح العادي (Fallback)
            console.warn(`[DixiOS Simulation]: تم إرسال الأمر (${action}) بنجاح للمحاكاة.`);
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
        case 'settings':
            DixiOSBridge.openSettings();
            break;
        default:
            DixiOSBridge.sendCommand(action);
            break;
    }
}
