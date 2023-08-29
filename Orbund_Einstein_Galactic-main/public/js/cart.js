$(document).ready(function () {
    getCartCount()
    const couponCode = sessionStorage.getItem("couponCode")
    getCartData(couponCode)
    let minimumAgeDate = sessionStorage.getItem("minimunAgeDate")
    if(minimumAgeDate) {
        $(".dateOfBirth").attr("max", minimumAgeDate)
    }
});

function addClassRedirection() {
    window.location = './registration-detail.php'
}

function findOcc(arr, key) {
    let arr2 = [];

    let tution = 0
    arr.forEach((x) => {
        if (arr2.some((val) => { return val[key] == x[key] })) {
            arr2.forEach((k) => {
                if (k[key] === x[key]) {
                    k["occurrence"]++
                    k["tution"] += x.tuition
                }
            })

        } else {
            let a = {}
            a[key] = x[key]
            a["occurrence"] = 1
            a["session"] = x.session
            a["dates"] = x.dates
            a["time"] = x.time
            tution += x.tuition
            a["tution"] = tution
            arr2.push(a);
        }
    })
    return arr2
}


function getCartData(couponCode = "") {
    $("#invalidCouponErr").css("display", "none")
    let cartStudentArr = []
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudentArr = JSON.parse(cartStudents);
    }
    if (cartStudentArr.length > 0) {
        $("#emtyDiv").css("display", "none")
        $("#cartTableDiv").css("display", "block")
        let sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
            removeAllAndRedirect()
        }
        const data = JSON.stringify({
            "displayCartStudents": cartStudentArr,
            "couponCode": couponCode
        })

        $.ajax({
            url: `${base_url}/cart/multiple/display-cart`,
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
                $("#cartTable tbody tr").remove();
                const classArr = result.classes
                const enrolledClassArr = result.enrolledClasses
                const classes = [...classArr, ...enrolledClassArr]
                const key = "classId"
                const classesArr = await findOcc(classes, key)
                console.log("classesArr:::", classesArr)
                $.each(classesArr, function (i, element) {
                    $('#cartTable tbody').append("<tr>\
                        <td>"+ element.session + "</td>\
                        <td><span style='cursor: pointer' onclick='displayStudentsByClassId(" + element.classId + ")'>" + element.occurrence + "</td>\
                        <td>"+ element.dates + "</td>\
                        <td>"+ element.time + "</td>\
                        <td>"+ element.tution + "</td>\
                        <td><button type='button' class='btn' onclick='openStudentModal("+ element.classId + ")'>Add Student</button> <button type='button' class='btn' onclick='removeFromCartByClassId(" + element.classId + ")'>Remove</button></td>\
                    </tr>");
                });

                if(result.cartSummary) {
                    const { cartSummary } = result
                    sessionStorage.setItem("couponCode", result.cartSummary.couponCode);

                    if(result.cartSummary.subTotal) {
                        $('#cartTable tbody').append("<tr>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td><span style='float:right'>Sub-Total</span></td>\
                                                <td>"+ result.cartSummary.subTotal + "</td>\
                                                <td></td>\
                                            </tr>");
                    }
                    if(result.cartSummary.tuitionTax) {
                        $('#cartTable tbody').append("<tr>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td><span style='float:right'>HST</span></td>\
                                                <td>"+ result.cartSummary.tuitionTax + "</td>\
                                                <td></td>\
                                            </tr>");
                    }
                    if(result.cartSummary.discount) {
                        $("#couponCodeDiv").css("display", "none")
                        $('#cartTable tbody').append("<tr>\
                                                <td></td>\
                                                <td></td>\
                                                <td>\
                                                <td><span style='float:right'>Discount</span></td>\
                                                <td>"+ result.cartSummary.discount +"</td></td>\
                                                <td><button type='button' class='btn' onclick='couponCodeRemove()' >Remove</button></td>\
                                            </tr>");
                    } else {
                        $("#couponCode").val("")
                        $("#couponCodeDiv").css("display", "block")
                    }
                    if(result.cartSummary.total) {
                        $('#cartTable tbody').append("<tr>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td><span style='float:right'>Total</span></td>\
                                                <td>"+ result.cartSummary.total + "</td>\
                                                <td></td>\
                                            </tr>");
                    }
                }
            },
            error: function (jqXHR, exception) {
                if (jqXHR.responseJSON.error.code === 605) {
                    removeAllAndRedirect()
                } else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
                    if(jqXHR.responseJSON.error.code === 103 && jqXHR.responseJSON.error.fieldName == "couponCode") {
                        $("#invalidCouponErr").css("display", "block").html(jqXHR.responseJSON.error.message)
                    } else {
                        alert(jqXHR.responseJSON.error.message)
                    }
                }
            }
        });
    } else {
        $("#cartTableDiv").css("display", "none")
        $("#emtyDiv").css("display", "block")
    }
}

function openStudentModal(classId) {
    console.log("classId::", typeof classId)
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudents = JSON.parse(cartStudents);
        if (cartStudents.length > 0) {
            const filteredArr = cartStudents.filter(x => x.classIds[0] === classId.toString())
            console.log("filteredArr:::", filteredArr)
            $("#alreadyAddedStudentDiv").css("display", "block")
            $('#alreadyAddedStudentTable tbody').empty()
            $.each(filteredArr, function (i, element) {
                $('#alreadyAddedStudentTable tbody').append("<tr id=" + element.uniqueId + ">\
                    <td>"+ element.firstName + "</td>\
                    <td>"+ element.lastName + "</td>\
                    <td>"+ element.dateOfBirth + "</td>\
                    <td><button type='button' class='btn' onclick='removeFromCart("+ element.uniqueId + ")'>Remove</button></td>\
                </tr>");
            });
        }
    }
    $('#studentForm').trigger("reset");
    $("#hidClassId").val(classId)
    $("#studentModal").find(".clone-div").remove();
    $('#studentModal').modal('show');
}

function addStudentForm() {
    let newFormBlock = $(".form-block-sample").clone();
    $(newFormBlock).attr('class', 'form-block clone-div');
    $(newFormBlock).css('display', 'block');
    $(".form-main").append(newFormBlock);
}

function DeleteStudentRow(event) {
    let div = $(event).closest('.form-block');
    $(div).remove();
}

$('#studentForm').on('submit', function (e) {
    e.preventDefault();
    submitForm()
});

function submitForm() {
    let cartStudentArr = []
    let firstNames = $(".form-main input[name='firstname[]']").map(function () { return $(this).val(); }).get();
    let lastNames = $(".form-main input[name='lastname[]']").map(function () { return $(this).val(); }).get();
    let dobs = $(".form-main input[name='dob[]']").map(function () { return $(this).val(); }).get();
    let classId = $("#hidClassId").val()

    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudentArr = JSON.parse(cartStudents);
    }
    if (!firstNames.length > 0) {
        return false
    }
    for (let i = 0; i < firstNames.length; i++) {
        const studentObj = {
            uniqueId: new Date().getTime(),
            firstName: firstNames[i],
            lastName: lastNames[i],
            dateOfBirth: dobs[i],
            classIds: [classId]
        }
        cartStudentArr.push(studentObj)
    }
    sessionStorage.setItem("cartStudents", JSON.stringify(cartStudentArr));
    $('#studentModal').modal('hide');
    getCartCount()
    location.reload();
}

function removeFromCart(uniqueId) {
    let cartStudentArr = []
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudentArr = JSON.parse(cartStudents);
        cartStudentArr = removeObjectById(cartStudentArr, uniqueId)

        // remove from html list
        $("#" + uniqueId).remove()
    }
    if (cartStudentArr.length > 0) {
        sessionStorage.setItem("cartStudents", JSON.stringify(cartStudentArr));
    } else {
        sessionStorage.removeItem("cartStudents")
    }
    getCartData()
    getCartCount()

    const tbody = $("#alreadyAddedShowStudentTable tbody");
    const alreadyAddedTbody = $("#alreadyAddedStudentTable tbody");

    if (tbody.children().length == 0) {
        $('#showStudentModal').modal('hide');
    }
    if (alreadyAddedTbody && alreadyAddedTbody.children().length == 0) {
        $("#alreadyAddedStudentDiv").css("display", "none")
    }
}

function removeObjectById(arr, uniqueId) {
    const objWithIdIndex = arr.findIndex((obj) => obj.uniqueId === uniqueId);

    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }

    return arr;
}

function removeFromCartByClassId(classId) {
    let cartStudentArr = []
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudentArr = JSON.parse(cartStudents);

        const cartStudentFiltered = cartStudentArr.filter(x => x.classIds[0] === classId.toString())

        console.log("cartStudentFiltered:::", cartStudentFiltered)
        if (cartStudentFiltered) {
            if (cartStudentFiltered.length === 1) {
                // direct delete
                removeFromCart(cartStudentFiltered[0].uniqueId)
            } else {
                // open popup to delete student from cart
                openShowStudentModal(classId)
            }
        }
    }
}

function openShowStudentModal(classId) {
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudents = JSON.parse(cartStudents);
        if (cartStudents.length > 0) {
            const filteredArr = cartStudents.filter(x => x.classIds[0] === classId.toString())
            $('#alreadyAddedShowStudentTable tbody').empty()
            $.each(filteredArr, function (i, element) {
                $('#alreadyAddedShowStudentTable tbody').append("<tr id=" + element.uniqueId + ">\
                    <td>"+ element.firstName + "</td>\
                    <td>"+ element.lastName + "</td>\
                    <td>"+ element.dateOfBirth + "</td>\
                    <td><button type='button' class='btn' onclick='removeFromCart("+ element.uniqueId + ")'>Remove</button></td>\
                </tr>");
            });
        }
    }
    $('#showStudentModal').modal('show');
}

function displayStudentsByClassId(classId) {
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudents = JSON.parse(cartStudents);
        if (cartStudents.length > 0) {
            const filteredArr = cartStudents.filter(x => x.classIds[0] === classId.toString())
            $('#displayStudentTable tbody').empty()
            $.each(filteredArr, function (i, element) {
                $('#displayStudentTable tbody').append("<tr id=" + element.uniqueId + ">\
                    <td>"+ element.firstName + "</td>\
                    <td>"+ element.lastName + "</td>\
                    <td>"+ element.dateOfBirth + "</td>\
                </tr>");
            });
        }
    }
    $('#displayStudentModal').modal('show');
}

function submitCart() {
    window.location = './login.php'
}

function redirectToregistration() {
    window.location = './registration-detail.php'
}

function couponCodeAdd() {
    const couponCode = $("#couponCode").val().trim()
    if(couponCode != "") {
        getCartData(couponCode)
    }
}

function couponCodeRemove() {
    getCartData()
}