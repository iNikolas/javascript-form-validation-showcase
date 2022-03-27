# About

Form validation is a pretty common task for almost all existing web projects on the web. As a starter, I used to utilize the possibilities of the special libraries to solve such tasks (like React-Final-Form).

But as time went on I became more confident, that there is no need for additional libraries if we are trying to solve regular validation tasks. And I want to share with you my experience.

# Short description

Standard JavaScript validation already posses most of the common needs like:

* pattern validation against RegExp;
* required field validation;
* min/max field length validation.

Furthermore, you can check each input validity during input event by special DOM attribute `validity` which we can use against almost every possible condition:

* tooLong / tooShort;
* patternMismatch.

And that is all that we need for proper form validation.

# Requirements against example task

According to showcase application were realized next requirements:

1. All form fields are mandatory.
2. Email field accepts only valid emails.
3. Password length minimum 12 characters.
4. “Password confirm” field value must match the Password field value.
5. Name field can contain precisely 2 words, each of them automatically starts from a capital letter.
6. If any of the values of the field are invalid you are getting immediately notified.
7. Any violations of the restrictions interlock the Register button.