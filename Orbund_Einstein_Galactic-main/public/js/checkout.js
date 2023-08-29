$(document).ready(function () {
    const cartCount = getCartCount()
    console.log("cartCount:::", cartCount)
    $("#coursesCount").html(cartCount)

    // get selected courses
    saveGroupEnrollment()
});

function openTermsAndCondition() {
    $('#termAndConditionModal').modal('show');
}

function saveGroupEnrollment() {
    $("div.spanner").addClass("show");
    $("div.overlay").addClass("show");
    const sessionId = localStorage.getItem("sessionId")
    if (!sessionId) {
        removeAllAndRedirect()
    }
    const age = localStorage.getItem("age")
    if (age == "") {
        alert("Age is not selected on class list");
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        return false;
    }

    const data = JSON.stringify({
        "levelId": -1,
        // "programId": parseInt(age),
        "programId": -1,
        "programLevelId": -1,
    })
    $.ajax({
        url: `${base_url}/cart/registration/multiple/contact/save-group-enrollment`,
        method: 'post',
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        data,
        success: function (result) {
            // collect payment data
            collectPayment()

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

function collectPayment() {
    const sessionId = localStorage.getItem("sessionId")
    if (!sessionId) {
        removeAllAndRedirect()
    }

    $.ajax({
        url: `${base_url}/cart/payment/multiple/collect-payment-info?regType=2`,
        method: 'get',
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        success: function (result) {
            const dueObj = {
                dueNow: result.todayPayment,
                dueLater: 0
            }
            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");
            if (!result.datatableColumns || !result.classes.length > 0) {
                window.location = './thankyou.php'
            } else {
                let tableHeaderString = ``
                const tableHeaders = result.datatableColumns
                $.each(tableHeaders, function (j, headerElement) {
                    tableHeaderString += "<th>" + headerElement.title + "</th>"
                });

                const classesArr = result.classes

                $.each(classesArr, function (i, element) {
                    let paymentPlans = element.paymentPlans
                    let tableString = `<div class="col-md-12" style="border:solid 1px; margin-top:10px">
                        <table class="table">
                        <thead>
                            <tr>
                                ${tableHeaderString}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${element.studentName}</td>
                                <td>${element.session}</td>
                                <td>${element.dates}</td>
                                <td>${element.time}</td>
                                <td>${element.tuition}</td>
                            </tr>
                        </tbody>
                    </table>`

                    let paymentString = `
                        <div class="panel-group" role="tablist" aria-multiselectable="true" style="padding-top: 10px;">`
                    let paymentLoopString = ``
                    let paymentScheduleString = ``
                    $.each(element.paymentSchedule, function (k, scheduleElement) {
                        if(element.paymentPlanId !== 0) {
                            if(k !== 0) {
                                dueObj.dueLater = dueObj.dueLater + scheduleElement.installment
                            }
                        }
                        paymentScheduleString += `<tr>
                                <td>${scheduleElement.dueDate}</td>
                                <td>${scheduleElement.installment}</td>
                            </tr>`
                    });

                    $.each(paymentPlans, function (j, ele) {
                        const checked = (element.paymentPlanId === ele.paymentPlanId) ? "checked='checked'" : ""
                        const className = (element.paymentPlanId === ele.paymentPlanId) ? "in" : ""

                        paymentLoopString = paymentLoopString + `<div class="panel panel-default">
                                    <div class="panel-heading" role="tab">
                                        <h4 class="panel-title">
                                            <input type="radio" onclick="paymentSelect(this, ${element.studentId}, ${ele.paymentPlanId}, ${element.classId})" name="radio-${element.studentId}" id="radio-${element.studentId}-${ele.paymentPlanId}" value="option-${element.studentId}-${ele.paymentPlanId}" ${checked}> <label for="radio-${element.studentId}-${ele.paymentPlanId}"> <b>${ele.planName}</b></label>
                                        </h4>
                                    </div>
                                    <div id="collapse-${element.studentId}-${ele.paymentPlanId}" class="panel-collapse collapse collapse-${element.studentId} ${className}" role="tabpanel" aria-labelledby="headingOne">
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <table id="paymentTable-${element.studentId}-${ele.paymentPlanId}" class="table table-striped" style="width:100%" id="">
                                                        <thead>
                                                            <tr>
                                                                <th>Due Date</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${paymentScheduleString}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                    });

                    let lastDivString = `</div>
                    </div>`

                    const finalString = tableString + paymentString + paymentLoopString + lastDivString

                    $('#checkoutListTable').append(finalString);
                });

                sessionStorage.setItem("dueObj", JSON.stringify(dueObj))
                
                $("#subTotal").html(result.subTotal)
                $("#hst").html(result.totalTax)
                if(result.discount > 0) {
                    $("#discountDivRow").css("display", "block")
                    $("#discount").html(result.discount)
                }
                $("#total").html(result.total)
                $("#todayPayment").html(result.todayPayment)

                const paymentObj = {
                    subTotal: result.subTotal,
                    totalTax: result.totalTax,
                    discount: result.discount,
                    total: result.total,
                    todayPayment: result.todayPayment,
                }
                sessionStorage.setItem("paymentObj", JSON.stringify(paymentObj))
            }

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

function paymentSelect(event, studentId, paymentPlanId, classId) {
    $(".collapse-" + studentId).collapse('hide');

    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        removeAllAndRedirect()
    }
    const data = JSON.stringify({
        "classId": classId,
        "paymentPlanId": paymentPlanId,
        "studentId": studentId
    })

    $.ajax({
        url: `${base_url}/cart/payment/multiple/class-invoice-installments`,
        method: 'post',
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        data,
        success: function (result) {
            const dueObjString = sessionStorage.getItem("dueObj")
            const dueObj = JSON.parse(dueObjString)
            dueObj.dueNow = result.todayTotalPayableAmount
            dueObj.dueLater = result.totalPayableAmount - result.todayTotalPayableAmount
            sessionStorage.setItem("dueObj", JSON.stringify(dueObj))

            let paymentScheduleString = ``
            $.each(result.paymentSchedule, function (k, element) {
                paymentScheduleString += `<tr>
                        <td>${element.dueDate}</td>
                        <td>${element.installment}</td>
                    </tr>`
            });
            $("#paymentTable-" + studentId + "-" + paymentPlanId + " tbody").empty();
            $("#paymentTable-" + studentId + "-" + paymentPlanId + " tbody").append(paymentScheduleString);

            // Today's Payment
            const todayPayment = result.todayTotalPayableAmount
            $("#todayPayment").html(todayPayment)

            $("#collapse-" + studentId + "-" + paymentPlanId).collapse('show');

            let paymentObj = JSON.parse(sessionStorage.getItem("paymentObj"))
            paymentObj.total = result.totalPayableAmount
            paymentObj.todayPayment = result.todayTotalPayableAmount
            sessionStorage.setItem("paymentObj", JSON.stringify(paymentObj))
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

function openTermsAndCondition() {
    $("#termsAndConditionsModal").modal("show")
}

function submitCheckout() {
    if($(".termsAndConditionChkbox").prop('checked') == true){
        window.location = "./billing.php";
    } else{
        alert("Please confirm the declaration of payment by clicking checkbox")
    }
}