(function ()
{
  const hideUIElements = () =>
  {
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

  function hideBottomNav()
  {
    // Find the first section element on the page
    const firstSection = document.querySelector('section');

    if (firstSection)
    {
      // Get the parent div of the section
      const parentOfFirstDiv = firstSection.parentNode;

      if (parentOfFirstDiv)
      {
        // Get the next sibling of the parent div (which we assume is the second div)
        const secondDiv = parentOfFirstDiv.nextElementSibling;

        if (secondDiv)
        {
          secondDiv.style.display = 'none';
          console.log("Second div hidden based on the first section (no class check).");
        } else
        {
          console.log("Could not find the next sibling after the first div's parent.");
        }
      } else
      {
        console.log("Could not find the parent div of the first section.");
      }
    } else
    {
      console.log("Could not find any section element on the page.");
    }
  }

  const hideInstagramLitePrompt = () =>
  {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) =>
    {
      if (btn.innerText.trim() === 'Use Instagram Lite')
      {
        // Traverse up to a reasonable container to hide (up 3 levels)
        let parent = btn;
        for (let i = 0; i < 3; i++)
        {
          if (parent.parentElement)
          {
            parent = parent.parentElement;
          }
        }
        parent.style.display = 'none';
      }
    });
  };


  const observer = new MutationObserver(() =>
  {
    hideBottomNav();
    hideUIElements();
    hideInstagramLitePrompt();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  hideBottomNav();
  hideUIElements();
  hideInstagramLitePrompt();
})();
