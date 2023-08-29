function submitStudentData() {
    const sessionId = localStorage.getItem("sessionId")
    if (!sessionId) {
        removeAllAndRedirect()
    }
    const age = localStorage.getItem("age")
    if (age == "") {
        alert("Age is not selected on class list");
        return false;
    }

    const data = JSON.stringify({
        "levelId": 4000281,
        "programId": age,
        "programLevelId": -1,
    })
    console.log("data:::", data)
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
            console.log("result::", result)
            sessionStorage.removeItem("cartStudents")
            localStorage.removeItem("parentEmail")
            localStorage.removeItem("age")
            window.location = "./thankyou.php";
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