(function () {
  const hideUIElements = () => {
    const navBar = document.querySelector('nav');
    const homeButton = document.querySelector('a[href="/"]');
    const exploreButton = document.querySelector('a[href="/explore/"]');
    const reelsButton = document.querySelector('a[href="/reels/"]');
    const profileButton = document.querySelector('a[href="/direct/inbox/"]');

    if (navBar) {
      navBar.style.display = 'none';
    }
    if (homeButton) {
      homeButton.style.display = 'none';
    }
    if (exploreButton) {
      exploreButton.style.display = 'none';
    }
    if (reelsButton) {
      reelsButton.style.display = 'none';
    }
    if (profileButton) {
      profileButton.style.display = 'none';
    }
  };

  function hideBottomNav() {
    const firstSection = document.querySelector('section');

    if (firstSection) {
      const parentOfFirstDiv = firstSection.parentNode;

      if (parentOfFirstDiv) {
        const secondDiv = parentOfFirstDiv.nextElementSibling;

        if (secondDiv) {
          secondDiv.style.display = 'none';
          console.log("Second div hidden based on the first section (no class check).");
        } else {
          console.log("Could not find the next sibling after the first div's parent.");
        }
      } else {
        console.log("Could not find the parent div of the first section.");
      }
    } else {
      console.log("Could not find any section element on the page.");
    }
  }

  const hideInstagramLitePrompt = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn.innerText.trim() === 'Use Instagram Lite') {
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

  function removeStoryTray() {
    const storyTray = document.querySelector('div[data-pagelet="story_tray"]');
    if (storyTray) {
      let targetDiv = storyTray.parentElement?.nextElementSibling;
      if (targetDiv && targetDiv.nodeType === 1) {
        targetDiv.remove();
        console.log('Removed the div after the parent of story_tray');
      } else {
        console.log('Could not find the target div after story_tray.');
        let nextDiv = storyTray.nextElementSibling;
        while (nextDiv && nextDiv.nodeType !== 1) {
          nextDiv = nextDiv.nextElementSibling;
        }
        if (nextDiv) {
          nextDiv.remove();
          console.log('Removed the div using alternative method (nextElementSibling - unreliable in this case).');
        } else {
          console.log('Still could not find the target div after story_tray');
        }
      }
    } else {
      console.log('story_tray element not found');
    }
  }

  // Check the URL *before* calling removeStoryTray
  if (window.location.href === "https://www.instagram.com/") {
    removeStoryTray();
  }
  hideBottomNav();
  hideUIElements();
  hideInstagramLitePrompt();
})();
