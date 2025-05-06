(function() {
   const hideUIElements = () => {
    const navBar = document.querySelector('nav');
    const homeButton = document.querySelector('a[href="/"]');
    const exploreButton = document.querySelector('a[href="/explore/"]');
    const reelsButton = document.querySelector('a[href="/reels/"]');
    const profileButton = document.querySelector('a[href="/direct/inbox/"]');

    if (navBar) navBar.style.display = 'none';
    if (homeButton) homeButton.style.display = 'none';
    if (exploreButton) exploreButton.style.display = 'none';
    if (reelsButton) reelsButton.style.display = 'none';
    if (profileButton) profileButton.style.display = 'none';
  };

  const removeSuggested = () => {
    document.querySelectorAll('div:has(h4):has(span):not(:has(article))')
      .forEach(el => el.remove());
  };

  const showFeedEndNotice = () => {
    const markers = Array.from(document.querySelectorAll('div'))
      .filter(el => el.innerText.includes("You're All Caught Up") || el.innerText.includes("No more posts"));

    markers.forEach(el => {
      el.innerHTML = '<div style="padding:16px;color:gray;text-align:center;font-size:16px;">📍 End of Feed<br>Only posts from people you follow are shown.</div>';
    });
  };

  const hideInstagramLitePrompt = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    if (btn.innerText.trim() === 'Use Instagram Lite') {
      // Traverse up to a reasonable container to hide (up 3 levels)
      let parent = btn;
      for (let i = 0; i < 3; i++) {
        if (parent.parentElement) {
          parent = parent.parentElement;
        }
      }
      parent.style.display = 'none';
    }
  });
};


  const observer = new MutationObserver(() => {
    hideUIElements();
    removeSuggested();
    showFeedEndNotice();
    hideInstagramLitePrompt();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  hideUIElements();
  removeSuggested();
  showFeedEndNotice();
  hideInstagramLitePrompt();
})();
