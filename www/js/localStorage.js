function LocalStorageObject() {
    this.name = getName();
    this.pass = getPass();
    this.autoLogin = getAutoLogin();
    this.setName = _setName;
    this.setPass = _setPass;
    this.setAutoLogin = _setAutoLogin;

    function getName(){
        var name = window.localStorage.getItem('name');
        return name;
    }
    function getPass(){
        var pass = window.localStorage.getItem('pass');
        return pass;
    }
    function getAutoLogin(){
        var autoLogin = window.localStorage.getItem('autoLogin') || false;
        return autoLogin;
    }
    function _setAutoLogin(autoLogin){
        window.localStorage.setItem('autoLogin', autoLogin);
    }
    function _setName(name){
        window.localStorage.setItem('name', name);
    }
    function _setPass(pass){
        window.localStorage.setItem('pass', pass);
    }

}