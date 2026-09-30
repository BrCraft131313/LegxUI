// تحديث الساعة تلقائياً
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('time-widget').innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// التحرك يميناً ويساراً بين التطبيقات
function scrollApps(direction) {
    const container = document.getElementById('apps-list');
    const scrollAmount = 100;
    if (direction === 'left') {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}

// فتح التطبيق داخل المساحة البيضاء
function openApp(appId) {
    const viewport = document.getElementById('app-frame');
    console.log(`جارٍ فتح التطبيق: ${appId}`);
    
    // توجيه إطار الـ iframe لمسار التطبيق المطلوبة
    viewport.src = `/Apps/System-Apps/${appId}/index.html`;
}

// دالة جلب وتحديث الطقس
async function updateWeather() {
    try {
        // يمكنك ربطه بـ API حقيقي مستقبلاً أو بجسر النظام
        // مثال لطلب API طقس مبسط:
        /*
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=24.71&longitude=46.67&current_weather=true');
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        document.querySelector('.weather-widget').innerText = `⛅ ${temp}°C`;
        */

        // محاكاة للتحديث الحالم للطقس
        console.log("تم تحديث بيانات الطقس في DixiOS");
    } catch (error) {
        console.error("تعذر جلب بيانات الطقس:", error);
    }
}

// تحديث الطقس أول ما يشتغل اللانشر، ثم كل 30 دقيقة (1,800,000 ملي ثانية)
updateWeather();
setInterval(updateWeather, 1800000);

