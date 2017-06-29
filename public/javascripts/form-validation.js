/*
    === THERE WILL ALWAYS BE ONE FORM ON THE DOCUMENT ===
    1. identify if there is a form.
    2. Hold the submit button in a variable.
    3. Hold an array of the input fields.
    4. DISABLE the submit button.
    5. Run 2 types of validation "On Key Up" of each input element
    6. Validate this field, and if its 'valid' move to number <<7>> else show message 
    7. Validate all the other inputs 'and if all are valid' move to <<8>>
    8. Reactivate the submit button. 
 */
(function(){
    
    //1. identify if there is a form.
    var form = document.getElementsByTagName('form')[0];
    if (!form || form.getElementsByTagName('textarea')) {
        return;
    }

    var fields = form.getElementsByTagName('input');
    var submitButton;
    var inputs = [];


    for(var i = 0; i < fields.length; i++) {
        if(fields[i].name == 'submit') {
            // 2. Hold the submit button in a variable.
            submitButton = fields[i];
        } 
        else {
            // 3. Hold an array of the input fields.
            if(fields[i].name !== 'mainimage') {
                inputs.push(fields[i]);
            }
            
        }
    }
    // 4. DISABLE the submit button.
    submitButton.setAttribute('disabled', true);

    // 5. Run 2 types of validation "on blur" of each input element
    for(i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        input.addEventListener('keyup', function() {
            
            var value = this.value;

            // 6. Validate this field, and if its 'valid'.
            if(!validateInput(this, value)) {
                // show message
                this.style.border ='1px solid red';
            } 
            else {
                this.style.border ='1px solid #4CAF50';

                var count = inputs.length -1;

                /// 7. Validate all the other inputs 'and if all are valid' move to <<8>>
                for(i = 0; i < inputs.length; i++) {
                    if(inputs[i] !== this) {
                        let value = inputs[i].value; 
                        if(validateInput(inputs[i], value)) {
                            count--;
                        }
                    }
                }
                if (count == 0) {

                    // 8. Reactivate the submit button. 
                    submitButton.removeAttribute('disabled');
                }
            }   
        })
    }
})()

/*
    === VALIDATE INPUT FIELD ACCORDING TO IT'S NAME
    1. 'name' should be grater than 2 char, and doesn't start with white space.
    2. 'email' should be an email format using REGEX.
    3. 'username' should be grater than 4 char, and doesn't start with white space.
    4. 'password' should be at least 4 char, and doesn't contain white space.
    5. 'password2' should match the password field.
    6. 'title' should contain at least 4 chars, and doesn't start with white space.
    7. 'body' should be greater than 20 chars.
 */


var validateInput = function(input, value) {

    if(input.name == 'name') {
        if(value.length < 3 || value[0] == ' ' ) {
            return false;
        }
        return true;
    }
    else if(input.name == 'email') {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(value)) {
            return false;
        }
        return true;
    }
    else if(input.name == 'username') {
        if(value.length < 4 || value[0] == ' ') {
            return false;
        }
        return true;
    }
    else if(input.name == 'password') {
        if(value.length <= 3 || value.includes(' ')) {
            return false;
        }
        return true;
    }
    else if(input.name == 'password2') {

        var passwordField = document.querySelector("form input[name='password']") //only with new browsers
        
        if(value !== passwordField.value) {
            return false;
        }
        return true;
    }
    else if(input.name == 'title') {
        if(value.length < 4 || value[0] == ' ') {
            return false;
        }
        return true;
    }
    else if(input.name == 'body') {
        if(value.length < 20) {
            return false;
        }
        return true;
    }
    return true
           
}