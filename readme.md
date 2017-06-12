# ContactBox
ContactBox is an easy to use contact form modal that stays in the corner of your screen.  
It allows your visitors to contact you easily from any page of your website.  
This plugin is in javascript (no need of jQuery) and needs you to handle the backend side.

## Demo
A live demo is available [here](https://www.dronejobs.co)

## How to use
`npm install contactbox`

Include the contactbox.min.css and contactbox.min.js files in your page.

Create an endpoint in your backend. The form is sent by a POST request with the parameters `email`, `message` and `current_page`.  
A token option is also available if your application needs to pass this parameter to the backend.

Add the following script:
```javascript
new ContactBox({
    endpoint: 'http://yourwebsite.com/post.php', // Define your endpoint for the POST request
    position: 'right', // optional, possible values are 'left' or 'right'
    email: 'email@example.com', // optional, populate the email field if you already know user's email
    token: { // optional
        name: '_token',
        value: 'token'
    },
    language: { // optional
        title: 'Send us a message',
        emailPlaceholder: 'Your email',
        messagePlaceholder: 'Your message',
        emptyEmail: 'Please enter your email',
        emptyMessage: 'Please enter your message',
        invalidEmail: 'Please enter a valid email',
        successMsg: 'Thanks, your message has been sent!',
        buttonText: 'Send your message'
    },
    color: '#2CBBBB' // optional, change the theme color. Possible values are HEX color "#000000" or color name "black"
    description: "Send us an email and we'll try to answer asap!" // optional, display a small description before the form
});
```

## Available Method
You can show or hide ContactBox with the `toggle` method
```javascript
var ContactBox = new ContactBox({
    endpoint: 'http://yourwebsite.com/post.php'
});

ContactBox.toggle();
``` 