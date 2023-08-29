$(document).ready(function () {
	getCartCount()
	getLoginFields()
	getRegistrationFields()
});

$(function () {
	$('#login-form-link').click(function (e) {
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function (e) {
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
});

$('#login-form').on('submit', function (e) {
	e.preventDefault();
	submitLoginForm()
});

$('#register-form').on('submit', function (e) {
	e.preventDefault();
	submitRegistrationForm()
});

// function updateEmail(event) {
// 	const email = $(event).val()

// 	$("#login-form input[name=username]").val(email)
// 	$("#register-form input[name=username]").val(email)
// 	$("#register-form input[name=email]").val(email)
// }

function getLoginFields() {
	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		removeAllAndRedirect()
	}
	$.ajax({
		url: `${base_url}/cart/registration/multiple/contact/login/fields`,
		crossDomain: true,
		headers: {
			"clientId": clientId,
            "secretKey": secretKey,
			"Content-Type": "application/json",
			"sessionId": sessionId
		},
		success: function (result) {
			console.log("result::", result)
			let fields = result
			$.each(fields, function (i, element) {
				let required = (element.required) ? "required" : ""
				let string = ''
				let value = ''
				let readOnly = ''
				if (element.fieldName == "username") {
					value = localStorage.getItem("parentEmail")
					// readOnly = "readonly"
				}
				string += `<div class="form-group">\
							<label for="field-${i}">${element.fieldTitle}</label>\
							<input type="${element.fieldType}" name="${element.fieldName}" value="${value}" id="field-${i}" tabindex="1" class="form-control" placeholder="${element.fieldTitle}" ${required} ${readOnly}>\
						</div>`;
				$('#login-form-fields').append(string);
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

function getRegistrationFields() {
	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		removeAllAndRedirect()
	}
	$.ajax({
		url: `${base_url}/cart/registration/multiple/contact/fields`,
		crossDomain: true,
		headers: {
			"clientId": clientId,
            "secretKey": secretKey,
			"Content-Type": "application/json",
			"sessionId": sessionId
		},
		success: function (result) {
			console.log("result::", result)
			let fields = result[0].fields
			$.each(fields, function (i, element) {
				let required = (element.required) ? "required" : ""
				let string = ''
				let value = ''
				let readOnly = ''
				let hide = ""
				const removedItems = ["middleName", "homePhone"]
				if (!removedItems.includes(element.fieldName)) {
					if (element.fieldName == "username" || element.fieldName == "email") {
						value = localStorage.getItem("parentEmail")
						// readOnly = "readonly"
					}
					// if (element.fieldType === "EMAIL") {
					// 	element.fieldType = "hidden"
					// 	hide = "hide"
					// }
					if (element.fieldType == "DROPDOWN") {
						let dropDownString = `<option value="">--SELECT--</option>`;
						$.each(element.options, function (j, value) {
							dropDownString += `<option value="${value.value}">${value.title}</option>`
						})

						string += `<div class="form-group">\
								<label>${element.fieldTitle}</label>\
								<select class="form-control" name="${element.fieldName}" tabindex="1" ${required}>\	
									${dropDownString}
								</select>
							</div>`;
					} else {
						string += `<div class="form-group">\
								<label for="field-${i}" class="${hide}">${element.fieldTitle}</label>\
								<input type="${element.fieldType}" name="${element.fieldName}" value="${value}" id="field-${i}" tabindex="1" class="form-control" placeholder="${element.fieldTitle}" ${required} ${readOnly}>\
							</div>`;
					}
					$('#register-form-fields').append(string);
				}
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

function submitLoginForm() {
	$("#login-submit").button("loading")
	$("#loginErr").addClass("hide");
	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		removeAllAndRedirect()
	}
	let userName = $("#login-form-fields input[name=username]").val();
	let password = $("#login-form-fields input[name=password]").val();

	const data = JSON.stringify({
		"username": userName,
		"password": password
	})

	$.ajax({
		url: `${base_url}/cart/registration/multiple/contact/login`,
		crossDomain: true,
		method: 'post',
		headers: {
			"clientId": clientId,
            "secretKey": secretKey,
			"Content-Type": "application/json",
			"sessionId": sessionId
		},
		data,
		success: function (result) {
			console.log("result::", result)
			$("#login-submit").button("reset")
			// sessionStorage.removeItem("cartStudents")
			window.location = "./checkout.php";
		},
		error: function (jqXHR, exception) {
			$("#login-submit").button("reset")
			let err = JSON.parse(jqXHR.responseText);
			$("#loginErr").text(err.error.message).removeClass("hide");

			if (jqXHR.responseJSON.error.code === 605) {
				removeAllAndRedirect()
			} else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
				alert(jqXHR.responseJSON.error.message)
			}
		}
	});
}

function submitRegistrationForm() {
	$("#register-submit").button("loading")
	$("#registrationErr").addClass("hide");
	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		removeAllAndRedirect()
	}
	let userName = $("#register-form-fields input[name=username]").val();
	let password = $("#register-form-fields input[name=password]").val();
	let imthe = $("#register-form-fields select[name=XP4005834]").val();
	let firstName = $("#register-form-fields input[name=firstName]").val();
	// let middleName = $("#register-form-fields input[name=middleName]").val();
	let lastName = $("#register-form-fields input[name=lastName]").val();
	let email = $("#register-form-fields input[name=email]").val();
	let cellPhone = $("#register-form-fields input[name=cellPhone]").val();
	// let homePhone = $("#register-form-fields input[name=homePhone]").val();

	const data = JSON.stringify({
		"username": userName,
		"password": password,
		"firstName": firstName,
		// "middleName": middleName,
		"lastName": lastName,
		"email": email,
		"cellPhone": cellPhone,
		// "homePhone": homePhone,
		"profileFieldValues": {
			"XP4005834": imthe
		}
	})

	$.ajax({
		url: `${base_url}/cart/registration/multiple/contact/register`,
		crossDomain: true,
		method: 'post',
		headers: {
			"clientId": clientId,
            "secretKey": secretKey,
			"Content-Type": "application/json",
			"sessionId": sessionId
		},
		data,
		success: function (result) {
			console.log("result::", result)
			$("#register-submit").button("reset")
			location.reload();
		},
		error: function (jqXHR, exception) {
			$("#register-submit").button("reset")
			let err = JSON.parse(jqXHR.responseText);
			$("#registrationErr").text(err.error.message).removeClass("hide");

			if (jqXHR.responseJSON.error.code === 605) {
				removeAllAndRedirect()
			} else if (jqXHR.responseJSON.error.code === 103 || jqXHR.responseJSON.error.code === 104) {
				alert(jqXHR.responseJSON.error.message)
			}
		}
	});
}