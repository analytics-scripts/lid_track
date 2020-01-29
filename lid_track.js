(function() {
    /*
    if (Math.random() * 100 > 1) {
        return null;
    }
    */
    try {
        var constant_mock = window.fetch;
        var headers_to_get_id = null;

        window.fetch = function() {
            var args = arguments;

            try {
                if (args[0].includes("gw.aeroflot.io/api/pr/LKAB/UserLoyaltyProfile/v1/get")) {
                    headers_to_get_id = args[1].headers;

                    (async () => {
                        const rawResponse = await constant_mock.apply(this, args);
                        const content = await rawResponse.json();
                    
                        if (content.loyaltyInfo) {
                            dataLayerSU.push({
                                "event": "AeroinformEvent_78_2",
                                "eventCategory": "loyaltyId",
                                "eventAction": content.loyaltyInfo.loyaltyId,
                                "eventLabel": null,
                                "dimension5": "B"
                            });
                        }

                        return rawResponse;
                    })(); 
                }
            } catch (err) {
                console.warn(err);
            }
        
            return constant_mock.apply(this, args);
        }
    } catch (err) {
        console.warn(err);
    }
})();
