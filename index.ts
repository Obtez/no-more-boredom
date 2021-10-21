interface Activity {
  activity: string;
  type: string;
  link: string;
  key: string;
}

interface Filter {
  type: string;
  key?: number;
}

// Main Section
const body: HTMLElement = document.querySelector('body');
const mainSection: HTMLElement = document.querySelector('main');
const heading1: HTMLHeadingElement = document.querySelector('h1');
const heading2: HTMLHeadingElement = document.querySelector('h2');
const mainBtn: HTMLButtonElement = document.querySelector('#main-btn');

// Activity Tiles
const tilesSection: HTMLElement = document.querySelector(
  '#activity-tiles-section'
);
const activityTiles: HTMLDivElement[] = Array.from(
  document.querySelectorAll('.activity-tile')
);

const tilesSectionBackgroundContainer: HTMLDivElement = document.querySelector(
  '#activity-section-bg'
);

// Activity Tiles Styling
const styleTiles = (): void => {
  activityTiles.forEach((tile: HTMLDivElement, index) => {
    const screenWidth = window.innerWidth;
    const width: string = (screenWidth * 0.9).toString() + 'px';
    const height: string = width;
    const zIndex: number = activityTiles.length - index;
    const positionTop: string = (index * -15).toString() + 'px';
    const opacity: number = zIndex / activityTiles.length;

    tile.style.width = width;
    tile.style.height = height;
    tile.style.zIndex = zIndex.toString();
    tile.style.top = positionTop;
    tile.style.opacity = opacity.toString();
  });
};

styleTiles();

// SWIPE EVENT DETECTION
let touchstartX: number = 0;
let touchstartY: number = 0;
let touchendX: number = 0;
let touchendY: number = 0;

const element: HTMLElement = document.getElementById('education');

const evaluateGesture = (): string => {
  if (touchendX < touchstartX) {
    return 'swiped-up';
  }
  if (touchendX > touchstartX) {
    return 'swiped-down';
  }
  if (touchendY == touchstartY) {
    return 'tap';
  }
};
// ____

const handleGesture = (): void => {
  const gesture: string = evaluateGesture();
  if (gesture === 'swiped-up') {
    const lastTile: HTMLDivElement = activityTiles.shift();
    activityTiles.push(lastTile);
    styleTiles();
  }
};

// Attach swipe event listener to cards
const attachSwipeEventListener = (): void => {
  activityTiles.forEach((tile: HTMLDivElement) => {
    tile.addEventListener(
      'touchstart',
      function (e) {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
      },
      false
    );

    tile.addEventListener(
      'touchend',
      function (e) {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
      },
      false
    );
  });
};

attachSwipeEventListener();

// Activity Tiles Event Listeners
const handleSwipe = (e: TouchEvent): void => {};

const activityTilesEventListeners = (): void => {
  activityTiles.forEach((tile: HTMLDivElement) => {
    tile.addEventListener('swiped-up', (e: Event) => {
      console.log(e);
    });
  });
};

activityTilesEventListeners();

// Main Functions
const handleError = (error: Error): void => {
  console.log(error);
  heading1.innerHTML = 'Something went wrong...';
  heading2.innerHTML = 'Want to try again?';
  mainBtn.innerHTML = 'Try again';
};

const fetchRandomActivity = async (): Promise<Activity> => {
  try {
    const response: Response = await fetch(
      'https://www.boredapi.com/api/activity/'
    );
    const data = await response.json();
    const activity: Activity = {
      activity: data.activity,
      type: data.type,
      link: data.link,
      key: data.key,
    };

    return activity;
  } catch (error) {
    handleError(error);
  }
};

// The website's style changes as soon as the response comes back
const switchStyling = (): void => {
  body.classList.remove('bored-bg');
  body.classList.add('happy-bg');

  mainSection.classList.remove('bored-bg-img');
  mainSection.classList.add('happy-bg-img');

  tilesSection.classList.remove('bored-tiles-bg');
  tilesSection.classList.add('happy-tiles-bg');

  tilesSectionBackgroundContainer.classList.remove('bored-activity-section-bg');
  tilesSectionBackgroundContainer.classList.add('happy-activity-section-bg');

  activityTiles.forEach((tile: HTMLDivElement) => {
    tile.classList.remove('bored-tiles-card');
    tile.classList.add('happy-tiles-card');
  });
};

const runFetch = async (): Promise<void> => {
  heading1.innerHTML = '';
  heading2.innerHTML = 'Hmm. How about...';
  const activity = await fetchRandomActivity();
  switchStyling();
  heading2.innerHTML = activity.activity;
};

const fetchSpecificActivity = async (typeOfActivity: string): Promise<void> => {
  window.scrollTo(0, 0);
  heading1.innerHTML = '';
  heading2.innerHTML = `Hmm. How about...`;

  try {
    const response: Response = await fetch(
      `https://www.boredapi.com/api/activity?type=${typeOfActivity}`
    );
    const data = await response.json();
    const activity: Activity = {
      activity: data.activity,
      type: data.type,
      link: data.link,
      key: data.key,
    };
    switchStyling();
    console.log(typeOfActivity);
    console.log(activity);
    heading2.innerHTML = activity.activity;
  } catch (error) {
    handleError(error);
  }
};

mainBtn.addEventListener('click', runFetch);

activityTiles.forEach((tile: HTMLDivElement) => {
  tile.addEventListener('click', (e: Event) => {
    const typeOfActivity = (<HTMLDivElement>e.target).id;
    fetchSpecificActivity(typeOfActivity);
  });
});
