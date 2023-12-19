function closeNoti (noti) {
    document.getElementById(noti.parentNode.id).remove();
}

function generateNotice (type, eid) {
    document.getElementById(eid.id).classList.add(type);
}