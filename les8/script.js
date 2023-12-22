function homeURL() {
    history.pushState({modal: "close"}, "ModalOut", "index.html");
}

window.onload = function (event) {
    let state = event.currentTarget.history.state;
    if(state && state.modal === "open") {
        homeURL();
    }

    document.getElementById("form").addEventListener("submit", function (submitEvent) {
        submitEvent.preventDefault();
        let slap = new Slapform();
        let information = document.getElementById("information");
        slap.submit({
            form: 'qJp4N7SKz',
            data: {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phoneNumber: document.getElementById("phoneNumber").value,
                organization: document.getElementById("organization").value,
                comment: document.getElementById("comment").value,
                privacyPolicy: document.getElementById("privacyPolicy").value
            }
        }).then(function () {
            information.style.color = "green";
            information.innerHTML = "Отправлено";
            let s = "input:not([type=\"checkbox\"]), #comment";
            let inps = document.querySelectorAll(s);
            for (let i = 0; i < inps.length; ++i) {
                localStorage.removeItem(inps[i].id);
                inps[i].value = "";
            }
            document.getElementById("privacyPolicy").checked = false;
        }).catch(function () {
            information.style.color = "red";
            information.innerHTML = "Не отправлено";
        });
    });

    document.querySelector(".cls").addEventListener("click", function () {
        history.pushState({modal: "open"}, "ModalIn", "?form=open");
    });

    document.getElementById("exform").addEventListener("click", function (e) {
        if (e.target === document.getElementById("exform")) {
            homeURL();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            homeURL();
        }
    });

    document.querySelector(".close").addEventListener("click", function () {
        homeURL();
    });

    let s = "input:not([type=\"checkbox\"]), textarea";
    $(s).on("change", function () {
        localStorage.setItem(this.id, this.value);
    });

    $(s).on("input", function () {
        localStorage.setItem(this.id, this.value);
    });

    $("input[type=\"checkbox\"]").on("click", function () {
        localStorage.setItem(this.id, this.checked);
    });

    let inps = document.querySelectorAll(s);
    for (let i = 0; i < inps.length; ++i) {
        let val = localStorage.getItem(inps[i].id);
        if (val != null) {
            inps[i].value = val;
        }
    }
    let privacyPolicy = localStorage.getItem("privacyPolicy") === 'true';
    document.getElementById("privacyPolicy").checked = privacyPolicy;
}

window.onpopstate = function (event) {
    if (event.state && event.state.modal === "open") {
        document.querySelector(".main_but").click();
    } else {
        document.querySelector(".close").click();
        homeURL();
    }
};