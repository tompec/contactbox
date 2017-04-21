(function() {

    this.ContactBox = function() {

        this.box = null;
        this.content = null;
        this.link = null;
        this.form = null;

        var defaults = {
            title: 'Send us a message',
            endpoint: 'submit.php',
            successMsg: 'Thanks, your message has been sent!'
        }

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

            var chevron = document.getElementsByClassName('chevron');

            if (chevron[0].innerHTML == "▲")
                chevron[0].innerHTML = "&#9660;";
            else
                chevron[0].innerHTML = "&#9650;";
            
            _.content.classList.toggle('active');
            _.box.classList.toggle('downsized');
        });

        this.form.addEventListener('submit', function(e) {
            e.preventDefault();

            var email = document.getElementsByName("email")[0],
            message = document.getElementsByName("message")[0];

            emptyFields('error-msg');

            if (_.validate(email, message) == false)
                return false;
            
            _.request(email, message);
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
                document.getElementsByClassName('success-msg')[0].innerHTML = _.options.successMsg;
            }
            else {
                alert('An error occured, please try again later');
            }
        };
        xhr.send(encodeURI('email=' + email + '&message=' + message));
    };

    ContactBox.prototype.validate = function (email, message)
    {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value == '')
        {
            email.nextSibling.innerHTML = 'Please enter your email';
            return false;
        }

        if (regex.test(email.value) == false)
        {
            email.nextSibling.innerHTML = 'Please enter a valid email';
            return false;
        }

        if (message.value == '')
        {
            message.nextSibling.innerHTML = 'Please enter a message';
            return false;
        }

        return true;
    };

    // Private Methods
    function extendDefaults(source, properties)
    {
        var property;
        for (property in properties)
        {
            if (properties.hasOwnProperty(property))
            {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function buildOut()
    {
        var contentHolder, docFrag;

        docFrag = document.createDocumentFragment();

        this.box = document.createElement("div");
        this.box.className = "contactbox downsized";

        var header = document.createElement("div");
        header.className = "contactbox__header";
        this.box.appendChild(header);

        this.link = document.createElement('a');
        this.link.title = this.options.title;
        this.link.href = "#";
        this.link.innerHTML = this.options.title + '<span class="chevron">&#9650;</span>';
        header.appendChild(this.link);

        this.content = document.createElement("div");
        this.content.className = "contactbox__content";
        this.box.appendChild(this.content);

        this.form = document.createElement("form");
        this.form.method = "post";
        this.form.action = this.options.endpoint;

        var email = document.createElement("input");
        email.type = "email";
        email.className = "form-input";
        email.placeholder = "Your email";
        email.name = "email";

        var message = document.createElement("textarea");
        message.className = "form-input";
        message.placeholder = "Your message";
        message.rows = "7";
        message.name = "message";

        var submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Send your message";

        var errorMsg1 = document.createElement("div");
        errorMsg1.className = "error-msg";

        var errorMsg2 = document.createElement("div");
        errorMsg2.className = "error-msg";

        var successMsg = document.createElement("div");
        successMsg.className = "success-msg";

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