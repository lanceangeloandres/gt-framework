function successNotification(title, message) {
    iziToast.show({
        class: 'success-toast',
        icon: 'sl sl-icon-check',
        title: title,
        message: message,
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: "#fff",
        backgroundColor: '#00b289',
        progressBarColor: '#444F60',
        position: 'bottomRight',
        transitionIn: 'fadeInDown',
        close: false,
        timeout: 6000,
        zindex: 99999,
    });
        
};

function warningNotification(title, message) {
    iziToast.show({
        class: 'warning-toast',
        icon: 'sl sl-icon-lock',
        title: title,
        message: message,
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: "#fff",
        backgroundColor: '#eda514',
        progressBarColor: '#444F60',
        position: 'bottomRight',
        transitionIn: 'fadeInDown',
        close: false,
        timeout: 6000,
        zindex: 99999,
    });
}

function errorNotification(title, message) {
    iziToast.show({
        class: 'danger-toast',
        icon: 'sl sl-icon-close',
        title: title,
        message: message,
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: "#fff",
        backgroundColor: '#e92841',
        progressBarColor: '#444F60',
        position: 'bottomRight',
        transitionIn: 'fadeInDown',
        timeout: 8000,
        close: false,
        zindex: 99999,
    });
}