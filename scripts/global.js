const maintenance = false;

function maintenanceMode (modeToggle) {
    if (modeToggle) {

        let mTitle = "Site Under Development";
        let mSubtitle = "Because of this, our site will change between being available.. then not..";
        let mLittletitle = "Check back soon for updates and hopefully we're available!";

        document.getElementById('maintenanceTitle').textContent = mTitle;
        document.getElementById('maintenanceSubtitle').textContent = mSubtitle;
        document.getElementById('maintenanceLittletittle').textContent = mLittletitle;
        document.getElementById('maintenanceModeContainer').style.display = "flex";
        document.getElementById('bodyContent').remove();
    }
}

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


maintenanceMode(maintenance);

keyInfo();