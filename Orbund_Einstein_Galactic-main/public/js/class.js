$(document).ready(function () {
    // sessionStorage.removeItem("cartStudents");
    // getSessionId()
    getCartCount()
    getClassList()
});

function openStudentModal(classId, minimumAge) {
    $('#studentForm').trigger("reset");
    $("#hidClassId").val(classId)
    $("#hidMinimumAge").val(minimumAge)

    $(".dateOfBirth").removeAttr("max")
    if (minimumAge > 0) {
        let date = subtractYears(minimumAge)
        sessionStorage.setItem("minimunAgeDate", date)
        $(".dateOfBirth").attr("max", date)
        $("#minimumAgeLabel").html(" (min age " + minimumAge + ")")
    }

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

function subtractYears(year) {
    let date = moment().subtract(year, 'years').format('YYYY-MM-DD');
    return date
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
    console.log("cartStudentArr::", cartStudentArr)
    // return false
    // if (cartStudentArr.length > 0) {
    //     if (cartStudents && cartStudents.length > 0) {
    //         var ids = new Set(cartStudentArr.map(d => d.classId));
    //         cartStudentArr = [...cartStudentArr, ...cartStudents.filter(d => !ids.has(d.classId))];
    //     }
    //     console.log("cartStudentArr::", cartStudentArr);
    // }
    sessionStorage.setItem("cartStudents", JSON.stringify(cartStudentArr));
    $('#studentModal').modal('hide');
    getCartCount()
    window.location = "./cart.php";
}

function getClassList() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        removeAllAndRedirect()
    }
    let registration = localStorage.getItem("registration_detail");
    if (!registration) {
        window.location = './registration-detail.php'
    }

    let registrationDetail = JSON.parse(registration)
    let age = registrationDetail.age
    let location = registrationDetail.location
    let parentEmail = registrationDetail.parentEmail
    let semester = registrationDetail.semester

    localStorage.setItem("age", age)
    localStorage.setItem("parentEmail", parentEmail)

    $.ajax({
        url: `${base_url}/cart/multiple/program-list-with-courses`,
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        data: {
            "campusType": location,
            "levelId": 4000265,
            "programId": age,
            "programLevelId": -1,
            "semesterId": semester
            // "semesterId": 4000979,
        },
        success: function (result) {
            console.log("result::", result)
            $("#nav").remove()

            $("#classListTable tbody tr").remove();
            const { programs } = result
            const { courses } = programs[0]
            // const { classes } = courses[0]
            $.each(courses, function (courseInd, courseElement) {
                const { classes } = courseElement

                $.each(classes, function (i, element) {
                    let statusMessage = element.statusMessage.replace("<br/>", '');
                    statusMessage = "<span style='color:red'>"+statusMessage+"</span>"
                    let actionString = ''
                    if (element.allowToSelectClass) {
                        actionString = `<button type='button' class='btn' onclick='openStudentModal("${element.classId}", "${element.minimumAge}")'>Add to cart</button>`
                    } else {
                        actionString = `${statusMessage}`
                    }
                    $('#classListTable tbody').append("<tr>\
                            <td>"+ element.session + "</td>\
                            <td>"+ element.dates + "</td>\
                            <td>"+ element.time + "</td>\
                            <td>"+ element.minimumAge + "</td>\
                            <td>"+ element.tuition + "</td>\
                            <td>"+ actionString + "</td>\
                        </tr>");
                });
            });

            $('#classListTable').DataTable({
                paging: false,
                searching: false,
                lengthChange: false,
                info: false,
            });
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