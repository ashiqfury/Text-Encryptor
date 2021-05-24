const errorBtn = document.querySelector(".error");

const encText = document.getElementById("enc-text");
const encPass = document.getElementById("enc-pass");
const encBtn = document.getElementById("enc-btn");

const decText = document.getElementById("dec-text");
const decPass = document.getElementById("dec-pass");
const decBtn = document.getElementById("dec-btn");

const developer = "Fury Phoenix";

// Both password values are globally collected.
var encPassValue = "";
var decPassValue = "";

// changed from oninput to onfocus.
encText.onfocus = () => {
    errorBtn.innerHTML = developer;

    allWarningRemover();
    
    decText.value = "";
    decPass.value = "";
}
encPass.onfocus = () => {
    errorBtn.innerHTML = developer;

    allWarningRemover();

    decText.value = "";
    decPass.value = "";
}
decText.onfocus = () => {
    errorBtn.innerHTML = developer;

    allWarningRemover();

    encText.value = "";
    encPass.value = "";
}
decPass.onfocus = () => {
    errorBtn.innerHTML = developer;

    allWarningRemover();

    encText.value = "";
    encPass.value = "";
}

function allWarningRemover() {
    
    encText.classList.remove("warning");
    encPass.classList.remove("warning");
    
    decText.classList.remove("warning");
    decPass.classList.remove("warning");
    
    errorBtn.classList.remove("warning");
    errorBtn.classList.remove("success");

}

encBtn.onclick = () => {
    
    errorBtn.innerHTML = developer;

    removeWarningFromInput(decText, decPass);

    // Getting message and encryption password.
    var message = encText.value;
    encPassValue = encPass.value;
    encPassValue = encPassValue.trim();

    if (inputEncryptValidator(message, encPassValue)) {
            
        // Calling function to encrypt message and password.
        var encMessage = encryptText(message);
        var encPassword = encryptPassword(encPassValue);
        
        // Sending message and password to generate Encrypt code.
        var encryptedLink = realEncryptor(encMessage, encPassword);
        decText.value = encryptedLink;
        encText.value = "";
        encPass.value = "";
        decPass.value = "";
        encDone();
    }
}

// If you click the encryption button, it removes the warning class from error message and input fields.
function removeWarningFromInput(text, pass) {
    text.classList.remove("warning");
    pass.classList.remove("warning");
    errorBtn.classList.remove("warning");
    errorBtn.classList.remove("success");
}

// If encryption is done successful, it changes the text in error message and add the success class to looks green.
function encDone() {
    errorBtn.innerHTML = "Encryption Successful";
    errorBtn.classList.add("success");
}

// Generating final encryption code. Combining the encrypted text and encrypted password.
function realEncryptor(text, pass) {
    text = text.trim().split(" ").join("-");
    pass = pass.trim().split(" ").join("-");
    return text +  "~" +  pass;
}

// Encrypting message from encText.
function encryptText(message) {
    var str = "";
    // Separate the input and append with whitespaces.
    for (let i=0; i<message.length; i++) {
        str = str.concat(message.charCodeAt(i));
        str = str.concat(" ");
    }
    return str;
}

// Encrypting password from encPass.
function encryptPassword(password) {
    var str = "";
    // Separate the password and append with the whitespaces.
    for (let i=0; i<password.length; i++) {
        str = str.concat(password.charCodeAt(i));
        str = str.concat(" ");
    }
    return str;
}

function inputEncryptValidator(message, password) {
    
    if ((message == "") && (password == "")) {
        errorBtn.innerHTML = "Input fields cannot be empty";
        encText.classList.add("warning");
        encPass.classList.add("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else if ((message == "") && (password != "")) {
        errorBtn.innerHTML = "Please enter the text field";
        encText.classList.add("warning");
        encPass.classList.remove("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else if ((password == "") && message != "") {
        errorBtn.innerHTML = "Please enter the password field";
        encText.classList.remove("warning");
        encPass.classList.add("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else {
        errorBtn.innerHTML = developer;
        encText.classList.remove("warning");
        encPass.classList.remove("warning");
        errorBtn.classList.remove("warning");
        return true;
    }
}

decBtn.onclick = () => {
    
    errorBtn.innerHTML = developer;

    removeWarningFromInput(encText, encPass);

    var message = decText.value;
    decPassValue = decPass.value;
    decPassValue = decPassValue.trim();

    // Checking the giving inputs are valid.
    if (inputDecryptValidater(message,decPassValue)) {
    
        let array = message.split("~");
        var text = encToText(array[0]);
        var password = encToText(array[1]);

        var decryptedLink = text; // Not needed.
        
        if (password === decPassValue) {
            encText.value = text;
            decText.value = "";
            decPass.value = "";
            encPass.value = "";
            errorBtn.innerHTML = developer;
            decDone();
        }
        else {
            errorBtn.innerHTML = "Invalid Password";
            decText.classList.remove("warning");
            decPass.classList.add("warning");
            errorBtn.classList.add("warning");
            encText.value = "";
        }
    }
}

function decDone() {
    errorBtn.innerHTML = "Decryption Successful";
    errorBtn.classList.add("success");
}

function inputDecryptValidater(message, password) {

    if ((message == "") && (password == "")) {
        errorBtn.innerHTML = "Input fields cannot be empty";
        decText.classList.add("warning");
        decPass.classList.add("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else if ((message == "") && (password != "")) {
        errorBtn.innerHTML = "Please enter the text field";
        decText.classList.add("warning");
        decPass.classList.remove("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else if ((password == "") && message != "") {
        errorBtn.innerHTML = "Please enter the password field";
        decText.classList.remove("warning");
        decPass.classList.add("warning");
        errorBtn.classList.add("warning");
        return false;
    }
    else {

        // We can use this regex to validate the encryption code.
        // let regex = /[0-9]+/g; if ((message.includes("+")) && (regex.test(message))) {}

        // But for simplicity, we are using this regex. It is more efficient than that regex method.
        if (regExValidator(message)) {
            errorBtn.innerHTML = developer;
            decText.classList.remove("warning");
            decPass.classList.remove("warning");
            errorBtn.classList.remove("warning");
            return true;
        }
        else {
            errorBtn.innerHTML = "Invalid Encryption Code";
            decText.classList.add("warning");
            decPass.classList.remove("warning");
            errorBtn.classList.add("warning");
            return false;
        }
    }
    
}

function regExValidator(message) {
    let reg = /[\d][~][\d]/g;
    if (reg.test(message)) {
        return true;
    }
    else return false;
}

function encToText(array) {
    array = array.split("-");

    let str = "";
    for (let i = 0; i < array.length; i++) {
        str += String.fromCharCode(array[i]);
    }
    return str;
}


// const copyIcon = document.querySelector(".fa-files-o");
// const trashIcon = document.querySelector(".fa-trash");
// const eyeOpenIcon = document.querySelector(".fa-eye-slash");

const encCopy = document.getElementById("enc-copy");
const encTrash = document.getElementById("enc-trash");
const encEye = document.getElementById("enc-eye");

const decCopy = document.getElementById("dec-copy");
const decTrash = document.getElementById("dec-trash");
const decEye = document.getElementById("dec-eye");

// Functionality of copy icon of text field.
encCopy.onclick = () => {

    encText.select();
    encText.setSelectionRange(0, 99999);
    document.execCommand("copy");

}
decCopy.onclick = () => {

    decText.select();
    decText.setSelectionRange(0, 99999);
    document.execCommand("copy");

}

// Functionality of trash icon of text field.
encTrash.onclick = () => {
    encText.value = "";
}
decTrash.onclick = () => {
    decText.value = "";
}

// Functionality of eye icon of password field.
encEye.onclick = () => {

    encEye.classList.toggle("fa-eye");
    encEye.classList.toggle("fa-eye-slash");
    
    if (encEye.classList.contains("fa-eye-slash")) {
        encPass.setAttribute("type","text");
    }
    else if (encEye.classList.contains("fa-eye")) {
        encPass.setAttribute("type","password");
    }
}
decEye.onclick = () => {

    decEye.classList.toggle("fa-eye");
    decEye.classList.toggle("fa-eye-slash");
    
    if (decEye.classList.contains("fa-eye-slash")) {
        decPass.setAttribute("type","text");
    }
    else if (decEye.classList.contains("fa-eye")) {
        decPass.setAttribute("type","password");
    }
}

// Changing the content of the warning board when hover.
// Warning will never change when it shows some warning.
errorBtn.addEventListener("mouseover", function() {
    if ((!errorBtn.classList.contains("warning")) && (!errorBtn.classList.contains("success")))
    errorBtn.innerHTML = "Encryptor / Decryptor";
});
errorBtn.addEventListener("mouseout", function() {
    if ((!errorBtn.classList.contains("warning")) && (!errorBtn.classList.contains("success")))
        errorBtn.innerHTML = "Fury Phoenix";
});

errorBtn.onclick = () => {
    let greet = "Thank You For Giving Your Valuable Time \n By Ashiq Fury";
    alert(greet);
}


// Secret forgot password section.
const secretPwd = document.querySelector(".secret-pwd");

// Fucntion calls when double clicking the button.
secretPwd.ondblclick = () => {
    if (confirm("Are you forgot your password?")) {
        
        var string = prompt("Enter the encrypted code");

        if (string === "") {
            alert("Empty string found");
        }
        else {
            let array = string.split("~");
            string = "Your password is : ";
            array[1].split("-").forEach((value) => {
                string += String.fromCharCode(value);
            })
            alert(string);
        }
    }
}




/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ! Extra messages :
    if want to change the split symbol of password like "+", "~". You need to change the symbol at 4 lines.
        * line 109
        * line 179
        * line 256
        * line 366

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
