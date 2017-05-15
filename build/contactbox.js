(function() {

    this.ContactBox = function() {

        this.box = null;
        this.button = null;
        this.link = null;
        this.content = null;
        this.header = null;
        this.cross = null;
        this.form = null;

        var defaults = {
            endpoint: 'submit.php',
            position: 'right',
            email: null,
            token: {
                name: null,
                value: null
            },
            language: {
                title: 'Send us a message',
                emailPlaceholder: 'Your email',
                messagePlaceholder: 'Your message',
                emptyEmail: 'Please enter your email',
                emptyMessage: 'Please enter your message',
                invalidEmail: 'Please enter a valid email',
                successMsg: 'Thanks, your message has been sent!',
                buttonText: 'Send your message'
            }
        };

        if (arguments[0] && typeof arguments[0] === "object")
            this.options = extendDefaults(defaults, arguments[0]);

        this.generate();
    }

    ContactBox.prototype.generate = function ()
    {
        var _ = this;
        buildOut.call(this);
        this.link.addEventListener('click', function(e) {

            e.preventDefault();

            _.content.classList.toggle('active');
            _.box.classList.toggle('downsized');
        });

        this.cross.addEventListener('click', function(e) {

            e.preventDefault();

            _.content.classList.toggle('active');
            _.box.classList.toggle('downsized');
        });

        this.form.addEventListener('submit', function(e) {
            e.preventDefault();

            var email = document.getElementById("contactbox__email"),
            message = document.getElementById("contactbox__message");

            emptyFields('contactbox__error-msg');

            if (_.validate(email, message) == false)
                return false;
            
            _.request(email.value, message.value);
        });
    }

    ContactBox.prototype.request = function (email, message)
    {
        var _ = this,
          xhr = new XMLHttpRequest();

        xhr.open('POST', this.options.endpoint);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                emptyFields('form-input');
                document.getElementById('contactbox__success-msg').innerHTML = _.options.language.successMsg;
            }
            else {
                alert('An error occured, please try again later');
            }
        };
        xhr.send(encodeURI('email=' + email + '&message=' + message + '&' + _.options.token.name + '=' + _.options.token.value + '&current_page=' + window.location.href));
    };

    ContactBox.prototype.validate = function (email, message)
    {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value == '')
        {
            email.nextSibling.innerHTML = this.options.language.emptyEmail;
            reconstructEmailField();
            return false;
        }

        if (regex.test(email.value) == false)
        {
            email.nextSibling.innerHTML = this.options.language.invalidEmail;
            reconstructEmailField();
            return false;
        }

        if (message.value == '')
        {
            message.nextSibling.innerHTML = this.options.language.emptyMessage;
            return false;
        }

        return true;
    };

    // Private Methods
    function reconstructEmailField()
    {
        var email = document.getElementById("contactbox__email");
        email.type = "email";
        email.className = "form-input";
    }

    function extendDefaults(defaults, properties)
    {
        for (var prop in defaults)
        {
            if (properties.hasOwnProperty(prop))
            {
                if (typeof defaults[prop] === 'object' && defaults[prop] !== null)
                {
                    for (subprop in defaults[prop])
                    {
                        if (properties[prop].hasOwnProperty(subprop))
                        {
                            defaults[prop][subprop] = properties[prop][subprop];
                        }
                    }
                }
                else
                {
                    defaults[prop] = properties[prop];
                }
            }
        }
        return defaults;
    }

    function buildOut()
    {
        var contentHolder, docFrag;

        docFrag = document.createDocumentFragment();

        this.box = document.createElement("div");
        this.box.className = "contactbox downsized " + this.options.position;

        this.button = document.createElement('div');
        this.button.className = "contactbox__button";
        this.box.appendChild(this.button);

        this.link = document.createElement('a');
        this.link.title = this.options.language.title;
        this.link.href = "#";
        this.link.id = "contactbox__button-link";
        this.button.appendChild(this.link);

        var linkTitle =  document.createElement('span');
        linkTitle.innerHTML = this.options.language.title;
        linkTitle.className = "contactbox__button-title";
        this.link.appendChild(linkTitle);

        var linkIcon =  document.createElement('span');
        linkIcon.innerHTML = '<i class="icon-comment"></i>';
        linkIcon.className = "contactbox__button-icon";
        this.link.appendChild(linkIcon);

        this.content = document.createElement("div");
        this.content.className = "contactbox__content";
        this.box.appendChild(this.content);

        this.header = document.createElement("div");
        this.header.className = "contactbox__header";
        this.content.appendChild(this.header);

        var headertext = document.createElement("div");
        headertext.className = "contactbox__header-title";
        headertext.innerHTML = this.options.language.title;
        this.header.appendChild(headertext);

        this.cross = document.createElement("a");
        this.cross.id = "contactbox__header-cross";
        this.cross.href = "#";
        this.cross.innerHTML = '<icon class="icon-cross"></i>';
        this.header.appendChild(this.cross);

        this.form = document.createElement("form");
        this.form.method = "post";
        this.form.action = this.options.endpoint;
        this.form.className = "contactbox__form";

        var email = document.createElement("input");
        email.className = "form-input";
        email.placeholder = this.options.language.emailPlaceholder;
        email.name = "email";
        email.id = "contactbox__email";

        if (this.options.email !== null)
        {
            email.type = "hidden";
            email.value = this.options.email;
        }
        else
        {
            email.type = "email";
        }

        var message = document.createElement("textarea");
        message.className = "form-input";
        message.placeholder = this.options.language.messagePlaceholder;
        message.rows = "7";
        message.name = "message";
        message.id = "contactbox__message";

        var submit = document.createElement("input");
        submit.type = "submit";
        submit.value = this.options.language.buttonText;

        var errorMsg1 = document.createElement("div");
        errorMsg1.className = "contactbox__error-msg";

        var errorMsg2 = document.createElement("div");
        errorMsg2.className = "contactbox__error-msg";

        var successMsg = document.createElement("div");
        successMsg.id = "contactbox__success-msg";

        this.form.appendChild(email);
        this.form.appendChild(errorMsg1);
        this.form.appendChild(message);
        this.form.appendChild(errorMsg2);
        this.form.appendChild(successMsg);
        this.form.appendChild(submit);
        
        this.content.appendChild(this.form);

        docFrag.appendChild(this.box);

        document.body.appendChild(docFrag);
    }


    function emptyFields(className)
    {
        var elements = document.getElementsByClassName(className);

        for (var i = 0; i < elements.length; i++)
        {
            if (elements[i].tagName == "DIV")
                elements[i].innerHTML = "";
            else
                elements[i].value = "";
        }
    }
    
}());