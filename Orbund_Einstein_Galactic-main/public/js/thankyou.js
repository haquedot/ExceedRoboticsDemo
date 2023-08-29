$(document).ready(function () {
    getThankyou()
});

function getThankyou() {
    $("div.spanner").addClass("show");
    $("div.overlay").addClass("show");
    const sessionId = localStorage.getItem("sessionId")
    if (!sessionId) {
        removeAllAndRedirect()
    }
    let thankyouData = sessionStorage.getItem("thankYouData")
    if (thankyouData) {
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        thankyouData = JSON.parse(thankyouData)
        sessionStorage.removeItem("thankYouData")
        displayResponse(thankyouData)
    } else {
        $.ajax({
            url: `${base_url}/cart/multiple/thankyou`,
            crossDomain: true,
            method: 'get',
            headers: {
                "clientId": clientId,
                "secretKey": secretKey,
                "Content-Type": "application/json",
                "sessionId": sessionId
            },
            success: function (result) {
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                displayResponse(result)
            },
            error: function (jqXHR, exception) {
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                if (jqXHR.responseJSON.error.code === 605 || jqXHR.responseJSON.error.code === 606) {
                    removeAllAndRedirect()
                } else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
                    alert(jqXHR.responseJSON.error.message)
                }
            }
        });
    }
}

function displayResponse(data) {
    const thankYouPageInfo = data.thankYouPageInfo
    let dueObj = null
    const dueObjString = sessionStorage.getItem("dueObj")
    if (dueObjString) {
        dueObj = JSON.parse(dueObjString)
    }

    // Table headers
    let tableHeaderString = ``
    const tableHeaders = thankYouPageInfo.columns
    $.each(tableHeaders, function (j, headerElement) {
        if(headerElement.name != 'comments' && headerElement.name != 'price') {
            tableHeaderString += "<th>" + headerElement.title + "</th>"
        }
    });
    $("#thankYouTable thead tr").append(tableHeaderString)

    // Table content
    $("#thankYouTable tbody tr").remove();
    const tableContent = thankYouPageInfo.thankYouPageClasses
    $.each(tableContent, function (j, contentElement) {
        $('#thankYouTable tbody').append("<tr>\
                            <td>"+ contentElement.name + "</td>\
                            <td>"+ contentElement.session + "</td>\
                            <td>"+ contentElement.course + "</td>\
                            <td>"+ contentElement.dates + "</td>\
                            <td>"+ contentElement.time + "</td>\
                            <td>"+ contentElement.tuition + "</td>\
                        </tr>");
    });

    if (data.thankYouPageInfo.thankYouPageSummaryInfo) {
        $('#thankYouTable tbody').append("<tr>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td><span style='float:right'>Sub-Total</span></td>\
                                <td>"+ data.thankYouPageInfo.thankYouPageSummaryInfo.subTotal + "</td>\
                            </tr>");
        $('#thankYouTable tbody').append("<tr>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td><span style='float:right'>HST</span></td>\
                            <td>"+ data.thankYouPageInfo.thankYouPageSummaryInfo.tutionTax + "</td>\
                        </tr>");
        if(data.thankYouPageInfo.thankYouPageSummaryInfo.discount > 0) {
            $('#thankYouTable tbody').append("<tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td><span style='float:right'>Discount</span></td>\
                                    <td>"+ data.thankYouPageInfo.thankYouPageSummaryInfo.discount + "</td>\
                                </tr>");
        }
        $('#thankYouTable tbody').append("<tr>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td><span style='float:right'>Total</span></td>\
                                <td>"+ data.thankYouPageInfo.thankYouPageSummaryInfo.total + "</td>\
                            </tr>");
    }
    if (dueObj) {
        $('#thankYouTable tbody').append("<tr>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td> <span style='float:right'>Paid Now</span></td>\
                                <td>"+ dueObj.dueNow + "</td>\
                            </tr>");

        if(dueObj.dueLater > 0) {
            $('#thankYouTable tbody').append("<tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td><span style='float:right'>Due Later</span></td>\
                                    <td>"+ dueObj.dueLater + "</td>\
                                </tr>");
        }
    }
}

function printThankYou() {
    var printContents = document.getElementById("tableDiv").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}