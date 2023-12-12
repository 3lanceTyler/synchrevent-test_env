function keyInfo () {
    let $siteTitle = "Synchrevent";
    let $siteQuote = "Synchronising Your Events!";
    let $copyrightY = "2023";
    document.getElementById('siteTitle').textContent = $siteTitle;
    document.getElementById('siteQuote').textContent = $siteQuote;
    document.getElementById('CRsiteTitle').textContent = $siteTitle;
    document.getElementById('CRYear').textContent = $copyrightY;
}

function contactInfo () {
    let $contactEmail = "3lanceTyler@gmail.com";
    let $emailSubject = "Synchrevent Help";

    document.getElementById('adminContactAdd').textContent = $contactEmail;
    document.getElementById('emailSubjectLine').textContent = $emailSubject;
}

keyInfo();