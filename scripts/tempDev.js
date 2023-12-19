function fixedInfo () {
    let $tag = "Pre-Alpha";
    let $ver = "0.2.1";    
    document.getElementById('tempStateTag').textContent = $tag;
    document.getElementById('tempStateVer').textContent = "V" + $ver;
}

fixedInfo();