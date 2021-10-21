type ActivityType =
  | 'education'
  | 'recreational'
  | 'social'
  | 'diy'
  | 'charity'
  | 'cooking'
  | 'relaxation'
  | 'music'
  | 'busywork';

interface Activity {
  activity: string;
  type: ActivityType;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

interface Filter {
  accessibility: number;
  type: ActivityType;
  participants: number;
  price: number;
  key: number;
}

const heading: HTMLHeadingElement = document.querySelector('h1');
const mainBtn: HTMLButtonElement = document.querySelector('#main-btn');

const fetchRandomActivity = async (): Promise<Activity> => {
  const response = await fetch('http://www.boredapi.com/api/activity/');
  const data = await response.json();
  const activity: Activity = {
    activity: data.activity,
    type: data.type,
    participants: data.participants,
    price: data.price,
    link: data.link,
    key: data.key,
    accessibility: data.accessibility,
  };

  return activity;
};

const runFetch = async (): Promise<void> => {
  heading.innerHTML = 'Hmm. How about...';
  const activity = await fetchRandomActivity();
  heading.innerHTML = activity.activity;
};

mainBtn.addEventListener('click', runFetch);
