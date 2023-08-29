$(document).ready(function () {
    getBillingInfo()
});

function getBillingInfo() {
    $("div.spanner").addClass("show");
    $("div.overlay").addClass("show");
    const sessionId = localStorage.getItem("sessionId")
    if (!sessionId) {
        removeAllAndRedirect()
    }

    $.ajax({
        url: `${base_url}/cart/payment/multiple/billing-info`,
        method: 'get',
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        success: function (result) {
            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

            // Payment method dropdown
            const paymentMethod = result.paymentMethodFieldInfo
            if (paymentMethod) {
                const required = (paymentMethod.required) ? " *" : ""
                $("#paymentMethodLabel").html(paymentMethod.fieldTitle + required)

                let paymentMethodString = ""
                $.each(paymentMethod.options, function (j, value) {
                    const selected = (paymentMethod.fieldValue === value.value) ? "selected" : ""
                    paymentMethodString += `<option value="${value.value}" ${selected}>${value.title}</option>`
                })
                $('#paymentMethod').append(paymentMethodString);
            }

            // Billing Information
            const profileFields = result.profileFields
            if (profileFields) {
                $.each(profileFields, function (i, element) {
                    let required = (element.required) ? "required" : ""
                    let requiredText = (element.required) ? " *" : ""
                    let string = ''

                    if (element.fieldType == "DROPDOWN") {
                        let dropDownString = ""
                        $.each(element.options, function (j, value) {
                            const selected = (element.fieldValue === value.value) ? "selected" : ""
                            dropDownString += `<option value="${value.value}" ${selected}>${value.title}</option>`
                        })

                        // On change evnet
                        let countryOnChange = ``
                        if (element.fieldName === "country") {
                            countryOnChange = `onchange='changeCountry(this)'`
                        }

                        string += `<div class="form-group">\
                                    <label>${element.fieldTitle + requiredText}</label>\
                                    <select class="form-control" ${countryOnChange} name="${element.fieldName}" ${required}>\	
                                        ${dropDownString}
                                    </select>
                                </div>`;
                    } else {
                        string += `<div class="form-group">\
                                    <label for="field-${i}">${element.fieldTitle + requiredText}</label>\
                                    <input type="${element.fieldType}" name="${element.fieldName}" value="${element.fieldValue}" id="field-${i}" tabindex="1" class="form-control" placeholder="${element.fieldTitle}" ${required} >\
                                </div>`;
                    }
                    $('#billing-form-fields').append(string);
                });
            }

            // Payment Information
            const paymentFields = result.paymentFields
            if (paymentFields) {
                $.each(paymentFields, function (i, element) {
                    let required = (element.required) ? "required" : ""
                    let requiredText = (element.required) ? " *" : ""
                    let string = ''

                    if (element.fieldType == "DROPDOWN") {
                        let dropDownString = ""
                        $.each(element.options, function (j, value) {
                            const selected = (element.fieldValue === value.value) ? "selected" : ""
                            dropDownString += `<option value="${value.value}" ${selected}>${value.title}</option>`
                        })

                        string += `<div class="form-group">\
                                    <label>${element.fieldTitle + requiredText}</label>\
                                    <select class="form-control" name="${element.fieldName}" ${required}>\	
                                        ${dropDownString}
                                    </select>
                                </div>`;
                    } else {
                        string += `<div class="form-group">\
                                    <label for="field-${i}">${element.fieldTitle + requiredText}</label>\
                                    <input type="${element.fieldType}" name="${element.fieldName}" value="${element.fieldValue}" id="field-${i}" tabindex="1" class="form-control" placeholder="${element.fieldTitle}" ${required} >\
                                </div>`;
                    }
                    $('#payment-form-fields').append(string);
                });
            }

            const paymentObj = JSON.parse(sessionStorage.getItem("paymentObj"))
            $("#total").html(paymentObj.todayPayment)

        },
        error: function (jqXHR, exception) {
            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");
            if (jqXHR.responseJSON.error.code === 605) {
                removeAllAndRedirect()
            } else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
                alert(jqXHR.responseJSON.error.message)
            }
        }
    });
}

function changeCountry(event) {
    let countryCode = $(event).val()
    if (countryCode) {
        const sessionId = localStorage.getItem("sessionId")
        if (!sessionId) {
            removeAllAndRedirect()
        }

        $.ajax({
            url: `${base_url}/public/states?countryCode=` + countryCode,
            method: 'get',
            crossDomain: true,
            headers: {
                "clientId": clientId,
                "secretKey": secretKey,
                "Content-Type": "application/json",
                "sessionId": sessionId
            },
            success: async (result) => {
                console.log("result::", result)
                let dropDownString = ""
                $.each(result.options, function (j, value) {
                    dropDownString += `<option value="${value.value}">${value.title}</option>`
                })
                $("#billing-form #billing-form-fields select[name='state']").empty().append(dropDownString)
            },
            error: function (jqXHR, exception) {
                if (jqXHR.responseJSON.error.code === 605) {
                    removeAllAndRedirect()
                } else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
                    alert(jqXHR.responseJSON.error.message)
                }
            }
        });
    }
}

function payNow() {
    $("div.spanner").addClass("show");
    $("div.overlay").addClass("show");
    let billingForm = $("#billing-form")
    let paymentForm = $("#payment-form")

    if (!billingForm.valid() || !paymentForm.valid()) {
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        return false
    }

    let billingData = billingForm.serializeArray()
    let billingObj = {};
    $.each(billingData, function (_, kv) {
        billingObj[kv.name] = kv.value;
    });

    let paymentData = paymentForm.serializeArray()
    let paymentObj = {};
    $.each(paymentData, function (_, kv) {
        paymentObj[kv.name] = kv.value;
    });

    const paymentMethod = $("#paymentMethod").find(":selected").val();

    let finalObj = {
        paymentMethod,
        ...billingObj,
        ...paymentObj
    };

    if (finalObj) {
        const sessionId = localStorage.getItem("sessionId")
        if (!sessionId) {
            removeAllAndRedirect()
        }

        const data = JSON.stringify(finalObj)

        $.ajax({
            url: `${base_url}/cart/payment/multiple/process-payment`,
            method: 'post',
            crossDomain: true,
            headers: {
                "clientId": clientId,
                "secretKey": secretKey,
                "Content-Type": "application/json",
                "sessionId": sessionId
            },
            data,
            success: async (result) => {
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                const thankYouData = JSON.stringify(result)
                sessionStorage.setItem("thankYouData", thankYouData)
                window.location = "./thankyou.php";
            },
            error: function (jqXHR, exception) {
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                if (jqXHR.responseJSON.error.code === 605) {
                    removeAllAndRedirect()
                } else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
                    alert(jqXHR.responseJSON.error.message)
                }
            }
        });
    }
}