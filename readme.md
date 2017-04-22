# ContactBox
ContactBox is an easy to use contact form modal that stays in the corner of your screen.
It allows your visitors to contact you easily from any page of your website.
This plugin is in javascript (no need of jQuery) and needs you to handle the backend side.

## How to use:
`npm install contactbox`

Include the contactbox.min.css and contactbox.min.js files in your page.

Create an endpoint in your backend. The form is sent by a POST request with the parameters `email` and `message`.

Add the following script:
```javascript
new ContactBox({
    endpoint: 'http://yourwebsite.com/post.php', // Define your endpoint for the POST request
    language: {
        title: 'Send us a message', // optional
        emailPlaceholder: 'Your email', // optional
        messagePlaceholder: 'Your message', // optional
        emptyEmail: 'Please enter your email', // optional
        emptyMessage: 'Please enter your message', // optional
        invalidEmail: 'Please enter a valid email', // optional
        successMsg: 'Thanks, your message has been sent!', // optional
        buttonText: 'Send your message' // optional
    }
});
```

## In development
- Option to change the position of the modal
- Different themes