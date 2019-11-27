import axios from "axios";

const data = {
  mo: [
    {
      bt: 240,
      et: 299
    },
    {
      bt: 300,
      et: 359
    },
    {
      bt: 360,
      et: 419
    }
  ],
  tu: [],
  we: [],
  th: [
    {
      bt: 240,
      et: 299
    },
    {
      bt: 1140,
      et: 1199
    },
    {
      bt: 1200,
      et: 1259
    },
    {
      bt: 1260,
      et: 1319
    }
  ],
  fr: [
    {
      bt: 660,
      et: 719
    },
    {
      bt: 720,
      et: 779
    },
    {
      bt: 780,
      et: 839
    },
    {
      bt: 840,
      et: 899
    },
    {
      bt: 900,
      et: 959
    },
    {
      bt: 960,
      et: 1019
    }
  ],
  sa: [
    {
      bt: 0,
      et: 119
    },
    {
      bt: 12,
      et: 60
    },
    {
      bt: 120,
      et: 179
    },
    {
      bt: 180,
      et: 239
    },
    {
      bt: 240,
      et: 299
    },
    {
      bt: 300,
      et: 359
    },
    {
      bt: 360,
      et: 419
    },
    {
      bt: 420,
      et: 479
    },
    {
      bt: 480,
      et: 539
    },
    {
      bt: 540,
      et: 599
    },
    {
      bt: 600,
      et: 659
    },
    {
      bt: 660,
      et: 719
    },
    {
      bt: 720,
      et: 779
    },
    {
      bt: 780,
      et: 839
    },
    {
      bt: 840,
      et: 899
    },
    {
      bt: 900,
      et: 959
    },
    {
      bt: 960,
      et: 1019
    },
    {
      bt: 1020,
      et: 1079
    },
    {
      bt: 1080,
      et: 1139
    },
    {
      bt: 1140,
      et: 1199
    },
    {
      bt: 1200,
      et: 1259
    },
    {
      bt: 1260,
      et: 1319
    },
    {
      bt: 1320,
      et: 1379
    },
    {
      bt: 1380,
      et: 1439
    }
  ],
  su: []
};

export const fetchScheduleData = () => {
  // return axios.get('https://test');
  return new Promise(res => {
    setTimeout(() => res(data), 1000);
  });
};
