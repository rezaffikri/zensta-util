// ==UserScript==
// @name        Instagram Script
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Nyaa
// @author       rezaffikri
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @updateURL    https://raw.githubusercontent.com/rezaffikri/zensta-util/refs/heads/main/instagram.js
// @downloadURL  https://raw.githubusercontent.com/rezaffikri/zensta-util/refs/heads/main/instagram.js
// @grant        none
// ==/UserScript==

(function () {
  // Store references to elements that are queried multiple times.
  let reelsButton = null;
  let instagramLitePromptButtons = [];
  let exploreNavElement = null;
  let targetLinkElement = null;
  let feedsRemoved = false;
  let isExplorePage = window.location.href === 'https://www.instagram.com/explore/';

  const modifyUIElements = () => {
    try {
      if (!reelsButton) {
        reelsButton = document.querySelector('a[href="/reels/"]');
      }
      if (reelsButton) {
        reelsButton.style.display = 'none';
      } else {
        console.warn('Reels button not found.');
      }
    } catch (error) {
      console.error('Error in modifyUIElements:', error);
    }
  };

  const hideInstagramLitePrompt = () => {
    try {
      if (instagramLitePromptButtons.length === 0) {
        instagramLitePromptButtons = document.querySelectorAll('button');
      }
      instagramLitePromptButtons.forEach((button) => {
        if (button.innerText.trim() === 'Use Instagram Lite') {
          let parent = button;
          for (let i = 0; i < 3; i++) {
            parent = parent.parentElement;
            if (!parent) break;
          }
          if (parent) {
            parent.style.display = 'none';
          } else {
            console.warn('Instagram Lite prompt container not found.');
          }
        }
      });
    } catch (error) {
      console.error('Error in hideInstagramLitePrompt:', error);
    }
  };

  const hideExploreSection = () => {
    if (isExplorePage) {
      try {
        if (!exploreNavElement) {
          exploreNavElement = document.querySelector('nav');
        }
        if (exploreNavElement) {
          const nextSibling = exploreNavElement.nextElementSibling;
          if (nextSibling && nextSibling.nodeName === 'DIV') {
            const targetDiv = nextSibling.querySelector('div > div > div');
            if (targetDiv) {
              targetDiv.style.display = 'none';
            } else {
              console.warn('Could not find the target nested div on Explore page.');
            }
          } else if (nextSibling) {
            console.warn('Found nav, but the next sibling is not a div on Explore page.');
          } else {
            console.warn('Found nav, but there is no next sibling on Explore page.');
          }
        } else {
          console.warn('Could not find any nav element on the Explore page.');
        }
      } catch (error) {
        console.error('Error in hideExploreSection:', error);
      }
    }
  };

  const checkAndRedirect = () => {
    const redirectMappings = {
      'https://www.instagram.com/reels/': 'https://www.instagram.com/',
    };
    for (const [matchUrl, targetUrl] of Object.entries(redirectMappings)) {
      if (window.location.href.startsWith(matchUrl)) {
        window.location.href = targetUrl;
        return;
      }
    }
  };

  function removeSponsored() {
    try {
      if (window.location.href === 'https://www.instagram.com/') {
        const articles = document.querySelectorAll('article');

        articles.forEach((article) => {
          const spans = article.querySelectorAll('span');
          let isSponsored = false;

          spans.forEach((span) => {
            if (span.textContent.toLowerCase().includes('sponsored')) {
              isSponsored = true;
            }
          });

          if (isSponsored) {
            article.remove();
          }
        });
      }
    } catch (error) {
      console.error('Error in removeSponsored', error);
    }
  }

  let lastScrollTop = 0;
  let scrollLocked = false;
  let targetLinkPosition = 0;

  function observeScrollStopLink() {
    try {
      if (!targetLinkElement) {
        targetLinkElement = document.querySelector('a[href*="?variant=past_posts"]');
      }

      if (!targetLinkElement) {
        setTimeout(observeScrollStopLink, 1000);
        return;
      }

      targetLinkPosition = targetLinkElement.getBoundingClientRect().top + window.scrollY;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollLocked = true;
            observer.disconnect();
          }
        });
      });

      observer.observe(targetLinkElement);
    } catch (error) {
      console.error('Error in observeScrollStopLink:', error);
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollLocked) {
        if (scrollTop > lastScrollTop) {
          if (scrollTop >= targetLinkPosition) {
            window.scrollTo(0, targetLinkPosition);
          }
        } else {
          lastScrollTop = scrollTop;
        }
      } else {
        lastScrollTop = scrollTop;
      }
    },
    { passive: false }
  );

  const observer = new MutationObserver(() => {
    // Check if the body has been replaced, and re-initialize if necessary
    if (document.body) {
      reinitialize(); // Call reinitialize instead of calling functions individually
    }
  });

  function reinitialize() {
    //Re-initialize
    reelsButton = null;
    instagramLitePromptButtons = [];
    exploreNavElement = null;
    targetLinkElement = null;
    feedsRemoved = false;
    isExplorePage = window.location.href === 'https://www.instagram.com/explore/';

    modifyUIElements();
    hideInstagramLitePrompt();
    checkAndRedirect();
    hideExploreSection();
    removeSponsored();
    observeScrollStopLink();
  }

  // Initializations and running outside the observer, to run once on page load
  reinitialize();

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
