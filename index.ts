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
const heading: HTMLHeadingElement = document.querySelector('h1');
const mainBtn: HTMLButtonElement = document.querySelector('#main-btn');

// Filter Section
const filterForm: HTMLFormElement = document.querySelector('#filter-form');

const typeSelect: HTMLSelectElement = document.querySelector('#type');

const resetFilterBtn: HTMLButtonElement =
  document.querySelector('#reset-filter-btn');

// Main Functions
const handleError = (error: Error): void => {
  console.log(error);
  heading.innerHTML = 'Something went wrong...';
  mainBtn.innerHTML = 'Try again';
};

const applyFilter = () => {
  const filter: Filter = {
    type: typeSelect.value,
    // add key when it's implemented
  };
  return filter;
};

const fetchRandomActivity = async (): Promise<Activity> => {
  try {
    const response: Response = await fetch(
      'http://www.boredapi.com/api/activity/'
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

const runFetch = async (): Promise<void> => {
  heading.innerHTML = 'Hmm. How about...';
  const activity = await fetchRandomActivity();
  heading.innerHTML = activity.activity;
};

const runFilteredFetch = async (e: Event): Promise<void> => {
  e.preventDefault();
  heading.innerHTML = 'Hmm. How about...';
  const filter: Filter = applyFilter();
  const baseUrl = 'http://www.boredapi.com/api/activity/';
  let queryUrl: string = '';

  if (filter.type) {
    queryUrl = `${baseUrl}?type=${filter.type}`;
  }

  console.log(queryUrl);

  const response: Response = await fetch(queryUrl);
  const data = await response.json();
  const activity: Activity = {
    activity: data.activity,
    type: data.type,
    link: data.link,
    key: data.key,
  };

  heading.innerHTML = activity.activity;
};

mainBtn.addEventListener('click', runFetch);
filterForm.addEventListener('submit', runFilteredFetch);
