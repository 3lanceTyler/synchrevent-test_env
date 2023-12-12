function fixedInfo () {
    let $tag = "TEST BUILD";
    let $ver = "0.1.6";    
    document.getElementById('tempStateTag').textContent = $tag;
    document.getElementById('tempStateVer').textContent = "V" + $ver;
}

fixedInfo();
