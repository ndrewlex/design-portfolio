document.addEventListener("DOMContentLoaded", function () {
  //animation for notification sliding
  var notif = document.getElementById("notif");
  var gotIt = document.getElementById("got-it");
  var banner = document.getElementById("banner");

  gotIt.addEventListener("click", function () {
    notif.classList.toggle("toggle-notif");
    banner.classList.toggle("toggle-banner");
  });

  //animation for newsletter sliding
  var newsletter = document.getElementById("newsletter");
  var closeNewsLetter = document.getElementById("close-newsletter");
  const newsSessionKey = "news-status";

  closeNewsLetter.addEventListener("click", function () {
    newsletter.classList.remove("toggle-newsletter");
    sessionStorage.setItem(newsSessionKey, "close");
    countdown();
  });

  var timer;
  function countdown() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      const newsSessionKey = "news-status";
      sessionStorage.setItem(newsSessionKey, "open");
      newsletter.classList.add("toggle-newsletter");
      //10 minutes to reopen
    }, 10 * 1000 * 6000);
  }

  function doSomething(pos) {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const offsetTop = Math.round(pos + document.body.clientHeight);

    //1. Check if offsetTop is equal to scrollHeight
    if (offsetTop > scrollHeight - 100 && offsetTop <= scrollHeight) {
      newsLetterChecker();
    } else {
      newsLetterChecker();
    }

    const newsLetterChecker = () => {
      const newsSession = sessionStorage.getItem(newsSessionKey);
      if (newsSession === "close") {
        newsletter.classList.remove("toggle-newsletter");
      } else if (newsSession === "open") {
        newsletter.classList.add("toggle-newsletter");
      }
    };
  }

  let last_known_scroll_position = 0;
  let ticking = false;
  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        setTimeout(() => {
          doSomething(last_known_scroll_position);
        }, 100);

        ticking = false;
      });

      ticking = true;
    }
  });
});
