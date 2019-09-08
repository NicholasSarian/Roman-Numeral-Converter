var msg = document.getElementsByClassName("msgTR");
var num = document.getElementById("number");
var switchBtn = document.getElementById("switch");
var result = document.getElementById("result");
var convertBtn = document.getElementById("convertBtn");
var ctrl = false;
var mode = "Number";

document.addEventListener("keydown", function (e) {
	if (e.key == "Enter") {
		switch (mode) {
			case "Number":
				convertNumber();
				break;
			case "Roman Numeral":
				convertRoman();
				break;
		}
	}
});

number.addEventListener("paste", function (e) {
	var regEx;
	
	if (mode == "Number") {
		regEx = /\d+|Backspace|Delete|ArrowLeft|ArrowRight/;
	} else {
		regEx = /M|D|C|L|X|V|I|Backspace|Delete|ArrowLeft|ArrowRight/;
	}
	
	if (regEx.test(e.clipboardData.getData("Text"))) {
        return;
    } else {
        e.preventDefault();
    }
});


function numOnly(e) {
	var regEx;
	
	if (mode == "Number") {
		regEx = /\d+|Backspace|Delete|ArrowLeft|ArrowRight/;
	} else {
		regEx = /M|D|C|L|X|V|I|Backspace|Delete|ArrowLeft|ArrowRight/i;
	}
	
	// =============================================
	// This section is to allow Ctrl+A to be pressed to select all text within the input field so you can delete that text. I also allow Ctrl+R so you can refresh the page while in the input box.
	if (e.key == "Control") {
		ctrl = true;
		return;
	}
	
	if (ctrl && (e.key == "a" || e.key == "r" || e.key == "v")) {
		ctrl = false;
		return;
	} else if (ctrl == false && e.key == "a") {
		e.preventDefault();
		return;
	}
	
	// =============================================
	
	if (num.value == "" && e.key == "0") {
		e.preventDefault();
	}
	
	if (regEx.test(e.key)) {
		return;
	} else {
		e.preventDefault();
	}
}

function convertNumber() {
	var num2Convert, i,
		resultNum = "";
	var numLen = num.value.length;
	var val = num.value;
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	}
	
	if (parseInt(num.value) <= 3999) {
		msg[0].style.display = "none";
		
		// I think I do this by doing a FOR LOOP but the question is how???
		
		for (i in roman) {
			var repeatNum = Math.floor(val / roman[i]);
			val -= repeatNum * roman[i];
			resultNum += i.repeat(repeatNum);
		}
		
		result.innerHTML = resultNum;
	} else {
		msg[0].removeAttribute("style");
	}
}

function convertRoman() {
	var validate = validateRomanNum(num.value);
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};
	var romanInNumber = 0;
	var val = num.value;
	
	if (validate && num.value !== "") {
		msg[1].style.display = "none";
		
		for (i in roman) {
			var reg = new RegExp("^" + i, "gi");
			var letter = "";
			var x, counter = 0;
			var multiplier = 1;
			var valLen = val.length;
			
			if (val.match(reg) !== null) {
				for (x = 0; x < valLen; x++) {
					if (val[0] !== val[1]) {
						romanInNumber += (multiplier * roman[i]);
						
						val = val.substr(i.length);
						
						break;
					} else {
						multiplier += 1;
						
						val = val.substr(i.length);
					}
				}
			}
		}
		
		result.innerHTML = romanInNumber.toLocaleString();
	} else {
		msg[1].removeAttribute("style");
	}
}

function validateRomanNum(str) {
	var romanIsValid = /^(?=[MDCLXVI])M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i;
	
	return romanIsValid.test(str) ? true : false;
}

function switchFunc() {
	var title = document.getElementById("title");
	var bigTitle = document.getElementById("bigTitle");
	var i;
	
	for (i = 0; i < msg.length; i++) {
		msg[i].style.display = "none";
	}
	
	if (title.innerHTML == "Enter Number:") {
		mode = "Roman Numeral";
		
		convertBtn.setAttribute("onclick", "convertRoman()");
		title.innerHTML = "Enter Roman Numeral:";
		bigTitle.innerHTML = "Convert Roman Numeral to Number";
		
		num.value = "";
		num.setAttribute("style", "width: 230px; text-transform: uppercase");
		num.setAttribute("maxlength", "15");
	} else {
		mode = "Number";
		
		convertBtn.setAttribute("onclick", "convertNumber()");
		title.innerHTML = "Enter Number:";
		bigTitle.innerHTML = "Convert Number to Roman Numeral";
		
		num.value = "";
		num.setAttribute("style", "width: 75px");
		num.setAttribute("maxlength", "4");
	}
	
	result.innerHTML = "---";
}