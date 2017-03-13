(function(){
  function submitPopup(tab) {
    var page = {
      select:    document.getElementById('up-sites'),
      cancelBtn: document.getElementById('popup-cancel'),
      submitBtn: document.getElementById('popup-submit'),
      closeLink: document.getElementById('popup-close')
    };

    var popupActions = {
      dismiss: function() { window.close(); },
      submit:  function(e) {
        var submissionUrl = 'https://' + page.select.value + '.uplabs.com/submit?url=' + tab.url;
        if (e.metaKey) {
          chrome.tabs.create({ url: submissionUrl });
        } else {
          chrome.tabs.update(tab.id, {url: submissionUrl});
        }
        popupActions.dismiss();
      }
    }

    page.closeLink.addEventListener('click', popupActions.dismiss);
    page.cancelBtn.addEventListener('click', popupActions.dismiss);
    page.submitBtn.addEventListener('click', popupActions.submit);
  }

  function getCurrentTab(callback) {
    var queryInfo = { active: true, currentWindow: true };
    chrome.tabs.query(queryInfo, function(tabs) {
      callback(tabs[0]);
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTab(submitPopup);
  });
})();
