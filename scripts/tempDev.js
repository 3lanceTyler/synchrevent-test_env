function fixedInfo () {
    let $tag = "Pre-Alpha";
    let $ver = "0.1.6";    
    document.getElementById('tempStateTag').textContent = $tag;
    document.getElementById('tempStateVer').textContent = "V" + $ver;
}

fixedInfo();