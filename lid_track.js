(async () => {
    if (document.cookie.includes("ulp_token")) {
        const rawResponse = await fetch('https://www.aeroflot.ru/personal/services/internal/v.0.0.1/json/get_member_info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cookie': unescape(encodeURIComponent(document.cookie))
            },
            body: '{}'
        });

        const content = await rawResponse.json();

        if (content && content.data && content.data.loyalty_id) {
            dataLayerSU.push({
                "event": "AeroinformEvent_78_2",
                "eventCategory": "loyaltyId",
                "eventAction": content.data.loyalty_id,
                "eventLabel": null,
                "priority_event": "B"
            });
        }
    }
})();
