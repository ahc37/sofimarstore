function validateEmail(form) {
	if (isBlank(form.e.value) || !isEmailValid(form.e.value) ) {
		alert("Please enter a valid Email Address.\nThe email you have typed in does not appear to be valid.");
		form.e.focus();
		return false;
	}
	return true;
}

function isBlank(fieldValue) {
	var blankSpaces = / /g;
	fieldValue = fieldValue.replace(blankSpaces, "");
	return (fieldValue == "") ? true : false;
}

function isEmailValid(fieldValue) {
	var emailFilter = /^.+@.+\..{2,4}$/;
	var atSignFound = 0;
	for (var i = 0; i <= fieldValue.length; i++)
		if ( fieldValue.charAt(i) == "@" )
			atSignFound++;
	if ( atSignFound > 1 )
		return false;
	else
		return ( emailFilter.test(fieldValue) && !doesEmailHaveInvalidChar(fieldValue) ) ? true : false;
}

function doesEmailHaveInvalidChar(fieldValue) {
	var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\] ]/;
	return ( illegalChars.test(fieldValue) ) ? true : false; //"
}