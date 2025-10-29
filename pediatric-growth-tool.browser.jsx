const {useState, useMemo, useEffect} = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ComposedChart } = Recharts;

const PediatricGrowthMonitoringTool = () => {
  const [childData, setChildData] = useState({
    age: '',
    ageUnit: 'years',
    gender: 'male',
    weight: '',
    height: '',
    headCircumference: ''
  });

  const [results, setResults] = useState(null);
  const [activeChart, setActiveChart] = useState('weight-age');
  const [showMenu, setShowMenu] = useState(false);

  // WHO Weight-for-Age Data (0-5 years, months)
  const whoWeightBoys = {
    0: { p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
    1: { p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
    2: { p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
    3: { p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
    6: { p3: 6.4, p15: 7.3, p50: 7.9, p85: 8.8, p97: 9.8 },
    9: { p3: 7.1, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0 },
    12: { p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
    18: { p3: 8.8, p15: 9.8, p50: 11.0, p85: 12.4, p97: 13.7 },
    24: { p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3 },
    30: { p3: 10.5, p15: 11.8, p50: 13.3, p85: 15.0, p97: 17.0 },
    36: { p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3 },
    42: { p3: 12.0, p15: 13.6, p50: 15.3, p85: 17.4, p97: 19.8 },
    48: { p3: 12.7, p15: 14.3, p50: 16.3, p85: 18.3, p97: 21.2 },
    54: { p3: 13.4, p15: 15.2, p50: 17.3, p85: 19.7, p97: 22.7 },
    60: { p3: 14.1, p15: 15.9, p50: 18.3, p85: 20.7, p97: 24.0 }
  };

  const whoWeightGirls = {
    0: { p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
    1: { p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
    2: { p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
    3: { p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
    6: { p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
    9: { p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5 },
    12: { p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5 },
    18: { p3: 8.1, p15: 9.2, p50: 10.2, p85: 11.6, p97: 13.2 },
    24: { p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.0, p97: 14.8 },
    30: { p3: 9.9, p15: 11.2, p50: 12.7, p85: 14.4, p97: 16.5 },
    36: { p3: 10.8, p15: 12.2, p50: 13.9, p85: 15.8, p97: 18.1 },
    42: { p3: 11.6, p15: 13.1, p50: 15.0, p85: 17.2, p97: 19.9 },
    48: { p3: 12.3, p15: 13.9, p50: 15.8, p85: 18.2, p97: 21.0 },
    54: { p3: 13.0, p15: 14.8, p50: 16.8, p85: 19.5, p97: 22.6 },
    60: { p3: 13.7, p15: 15.6, p50: 17.7, p85: 20.4, p97: 24.0 }
  };

  const whoHeightBoys = {
    0: { p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
    1: { p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6 },
    2: { p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4 },
    3: { p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
    6: { p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
    9: { p3: 67.7, p15: 70.1, p50: 72.3, p85: 74.5, p97: 76.5 },
    12: { p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
    18: { p3: 76.5, p15: 79.2, p50: 82.3, p85: 85.4, p97: 88.4 },
    24: { p3: 81.7, p15: 84.5, p50: 87.1, p85: 89.8, p97: 92.9 },
    30: { p3: 85.3, p15: 88.3, p50: 91.4, p85: 94.4, p97: 97.5 },
    36: { p3: 88.7, p15: 91.9, p50: 95.1, p85: 98.3, p97: 101.5 },
    42: { p3: 91.9, p15: 95.3, p50: 98.7, p85: 102.1, p97: 105.6 },
    48: { p3: 94.9, p15: 98.4, p50: 102.0, p85: 105.6, p97: 109.2 },
    54: { p3: 97.8, p15: 101.5, p50: 105.3, p85: 109.1, p97: 113.0 },
    60: { p3: 100.7, p15: 104.4, p50: 108.5, p85: 112.6, p97: 116.7 }
  };

  const whoHeightGirls = {
    0: { p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
    1: { p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6 },
    2: { p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1 },
    3: { p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0 },
    6: { p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
    9: { p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0 },
    12: { p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
    18: { p3: 74.6, p15: 77.5, p50: 80.7, p85: 83.9, p97: 87.1 },
    24: { p3: 80.0, p15: 82.9, p50: 85.7, p85: 88.5, p97: 91.9 },
    30: { p3: 83.8, p15: 86.9, p50: 90.0, p85: 93.1, p97: 96.6 },
    36: { p3: 87.4, p15: 90.8, p50: 94.1, p85: 97.4, p97: 100.7 },
    42: { p3: 90.7, p15: 94.4, p50: 98.1, p85: 101.8, p97: 105.5 },
    48: { p3: 94.1, p15: 97.9, p50: 101.6, p85: 105.3, p97: 109.0 },
    54: { p3: 97.1, p15: 101.1, p50: 105.0, p85: 108.9, p97: 112.7 },
    60: { p3: 99.9, p15: 104.0, p50: 108.4, p85: 112.7, p97: 117.0 }
  };

  const whoWeightForHeightBoys = {
    65: { p3: 6.0, p15: 6.6, p50: 7.3, p85: 8.0, p97: 8.8 },
    70: { p3: 7.0, p15: 7.6, p50: 8.4, p85: 9.2, p97: 10.2 },
    75: { p3: 8.0, p15: 8.7, p50: 9.5, p85: 10.4, p97: 11.5 },
    80: { p3: 9.0, p15: 9.7, p50: 10.6, p85: 11.6, p97: 12.7 },
    85: { p3: 10.0, p15: 10.7, p50: 11.7, p85: 12.8, p97: 14.1 },
    90: { p3: 11.0, p15: 11.8, p50: 12.8, p85: 14.0, p97: 15.5 },
    95: { p3: 12.0, p15: 12.8, p50: 14.0, p85: 15.3, p97: 17.0 },
    100: { p3: 13.1, p15: 14.0, p50: 15.2, p85: 16.6, p97: 18.3 },
    105: { p3: 14.2, p15: 15.2, p50: 16.4, p85: 17.9, p97: 19.8 },
    110: { p3: 15.4, p15: 16.4, p50: 17.6, p85: 19.2, p97: 21.2 },
    115: { p3: 16.7, p15: 17.7, p50: 18.9, p85: 20.6, p97: 22.8 },
    120: { p3: 18.0, p15: 19.0, p50: 20.3, p85: 22.0, p97: 24.3 }
  };

  const whoWeightForHeightGirls = {
    65: { p3: 5.8, p15: 6.4, p50: 7.0, p85: 7.7, p97: 8.5 },
    70: { p3: 6.7, p15: 7.4, p50: 8.1, p85: 8.9, p97: 9.8 },
    75: { p3: 7.7, p15: 8.4, p50: 9.2, p85: 10.1, p97: 11.1 },
    80: { p3: 8.6, p15: 9.4, p50: 10.2, p85: 11.2, p97: 12.4 },
    85: { p3: 9.6, p15: 10.4, p50: 11.3, p85: 12.4, p97: 13.7 },
    90: { p3: 10.6, p15: 11.4, p50: 12.4, p85: 13.5, p97: 15.0 },
    95: { p3: 11.6, p15: 12.4, p50: 13.5, p85: 14.7, p97: 16.3 },
    100: { p3: 12.6, p15: 13.5, p50: 14.6, p85: 15.9, p97: 17.7 },
    105: { p3: 13.7, p15: 14.6, p50: 15.7, p85: 17.1, p97: 19.0 },
    110: { p3: 14.8, p15: 15.7, p50: 16.9, p85: 18.4, p97: 20.5 },
    115: { p3: 16.0, p15: 16.9, p50: 18.1, p85: 19.7, p97: 21.9 },
    120: { p3: 17.2, p15: 18.2, p50: 19.4, p85: 21.1, p97: 23.5 }
  };

  const whoBMIBoys = {
    0: { p3: 10.2, p15: 11.1, p50: 13.0, p85: 14.8, p97: 16.3 },
    6: { p3: 14.0, p15: 15.0, p50: 17.2, p85: 19.0, p97: 20.5 },
    12: { p3: 14.3, p15: 15.3, p50: 17.3, p85: 19.0, p97: 20.4 },
    24: { p3: 14.0, p15: 14.8, p50: 16.5, p85: 18.0, p97: 19.4 },
    36: { p3: 13.7, p15: 14.5, p50: 16.0, p85: 17.5, p97: 18.8 },
    48: { p3: 13.5, p15: 14.2, p50: 15.5, p85: 17.0, p97: 18.3 },
    60: { p3: 13.4, p15: 14.1, p50: 15.3, p85: 16.8, p97: 18.2 }
  };

  const whoBMIGirls = {
    0: { p3: 9.9, p15: 10.8, p50: 12.9, p85: 14.7, p97: 16.1 },
    6: { p3: 13.5, p15: 14.5, p50: 16.5, p85: 18.3, p97: 19.8 },
    12: { p3: 13.8, p15: 14.8, p50: 16.8, p85: 18.5, p97: 20.0 },
    24: { p3: 13.5, p15: 14.4, p50: 16.0, p85: 17.6, p97: 19.0 },
    36: { p3: 13.3, p15: 14.1, p50: 15.5, p85: 17.0, p97: 18.4 },
    48: { p3: 13.1, p15: 13.9, p50: 15.2, p85: 16.6, p97: 18.0 },
    60: { p3: 13.0, p15: 13.8, p50: 15.0, p85: 16.5, p97: 17.9 }
  };

  const whoHCBoys = {
    0: { p3: 31.9, p15: 33.2, p50: 34.5, p85: 35.7, p97: 37.0 },
    1: { p3: 35.1, p15: 36.3, p50: 37.6, p85: 38.9, p97: 40.1 },
    3: { p3: 38.3, p15: 39.5, p50: 40.5, p85: 41.6, p97: 42.6 },
    6: { p3: 41.5, p15: 42.6, p50: 43.3, p85: 44.0, p97: 44.8 },
    12: { p3: 44.4, p15: 45.4, p50: 46.1, p85: 46.8, p97: 47.6 },
    24: { p3: 46.9, p15: 47.8, p50: 48.4, p85: 49.0, p97: 49.6 }
  };

  const whoHCGirls = {
    0: { p3: 31.5, p15: 32.7, p50: 33.9, p85: 35.1, p97: 36.2 },
    1: { p3: 34.7, p15: 35.8, p50: 36.9, p85: 38.1, p97: 39.2 },
    3: { p3: 37.7, p15: 38.7, p50: 39.5, p85: 40.4, p97: 41.3 },
    6: { p3: 40.7, p15: 41.7, p50: 42.2, p85: 42.8, p97: 43.5 },
    12: { p3: 43.5, p15: 44.4, p50: 45.0, p85: 45.6, p97: 46.3 },
    24: { p3: 46.2, p15: 47.0, p50: 47.5, p85: 48.0, p97: 48.6 }
  };

  const iapWeightBoys = {
    5: { p3: 14.5, p15: 16.2, p50: 18.7, p85: 21.7, p97: 25.0 },
    6: { p3: 16.0, p15: 17.9, p50: 20.7, p85: 24.0, p97: 28.0 },
    7: { p3: 17.5, p15: 19.8, p50: 23.0, p85: 26.8, p97: 31.5 },
    8: { p3: 19.3, p15: 22.0, p50: 25.6, p85: 30.0, p97: 35.6 },
    9: { p3: 21.3, p15: 24.5, p50: 28.6, p85: 33.8, p97: 40.3 },
    10: { p3: 23.6, p15: 27.3, p50: 32.0, p85: 38.2, p97: 46.0 },
    11: { p3: 26.2, p15: 30.5, p50: 36.0, p85: 43.4, p97: 52.5 },
    12: { p3: 29.4, p15: 34.4, p50: 40.5, p85: 49.0, p97: 59.5 },
    13: { p3: 33.3, p15: 39.0, p50: 45.8, p85: 54.8, p97: 66.0 },
    14: { p3: 37.9, p15: 44.2, p50: 51.5, p85: 60.0, p97: 71.5 },
    15: { p3: 42.9, p15: 49.4, p50: 56.7, p85: 64.4, p97: 75.5 },
    16: { p3: 47.5, p15: 53.8, p50: 61.0, p85: 67.8, p97: 78.5 },
    17: { p3: 51.2, p15: 57.2, p50: 64.2, p85: 70.5, p97: 80.5 },
    18: { p3: 53.8, p15: 59.5, p50: 66.5, p85: 72.5, p97: 82.0 }
  };

  const iapWeightGirls = {
    5: { p3: 14.0, p15: 15.8, p50: 18.2, p85: 21.2, p97: 24.8 },
    6: { p3: 15.5, p15: 17.5, p50: 20.2, p85: 23.7, p97: 27.8 },
    7: { p3: 17.2, p15: 19.5, p50: 22.6, p85: 26.7, p97: 31.5 },
    8: { p3: 19.2, p15: 21.9, p50: 25.5, p85: 30.3, p97: 36.0 },
    9: { p3: 21.6, p15: 24.8, p50: 29.0, p85: 34.7, p97: 41.5 },
    10: { p3: 24.5, p15: 28.2, p50: 33.2, p85: 40.0, p97: 48.2 },
    11: { p3: 27.8, p15: 32.2, p50: 37.9, p85: 45.8, p97: 55.0 },
    12: { p3: 31.6, p15: 36.8, p50: 43.0, p85: 51.5, p97: 61.0 },
    13: { p3: 35.7, p15: 41.5, p50: 47.5, p85: 55.8, p97: 65.5 },
    14: { p3: 39.5, p15: 45.2, p50: 50.8, p85: 58.5, p97: 68.0 },
    15: { p3: 42.2, p15: 47.8, p50: 53.0, p85: 60.0, p97: 69.5 },
    16: { p3: 44.0, p15: 49.5, p50: 54.5, p85: 61.0, p97: 70.5 },
    17: { p3: 45.2, p15: 50.5, p50: 55.5, p85: 61.8, p97: 71.2 },
    18: { p3: 46.0, p15: 51.2, p50: 56.2, p85: 62.5, p97: 72.0 }
  };

  const iapHeightBoys = {
    5: { p3: 100.5, p15: 104.0, p50: 109.2, p85: 114.4, p97: 118.0 },
    6: { p3: 106.0, p15: 109.8, p50: 115.5, p85: 121.2, p97: 125.0 },
    7: { p3: 111.2, p15: 115.3, p50: 121.7, p85: 128.1, p97: 132.3 },
    8: { p3: 116.5, p15: 120.8, p50: 128.0, p85: 135.2, p97: 139.8 },
    9: { p3: 121.8, p15: 126.5, p50: 134.3, p85: 142.1, p97: 147.2 },
    10: { p3: 127.3, p15: 132.4, p50: 140.3, p85: 148.2, p97: 153.8 },
    11: { p3: 132.8, p15: 138.4, p50: 146.5, p85: 154.6, p97: 160.6 },
    12: { p3: 138.4, p15: 144.8, p50: 153.0, p85: 161.2, p97: 167.7 },
    13: { p3: 144.5, p15: 151.8, p50: 159.8, p85: 167.8, p97: 174.5 },
    14: { p3: 151.2, p15: 159.0, p50: 166.4, p85: 173.8, p97: 180.3 },
    15: { p3: 157.8, p15: 165.3, p50: 171.8, p85: 178.3, p97: 184.5 },
    16: { p3: 162.8, p15: 169.8, p50: 175.8, p85: 181.8, p97: 187.5 },
    17: { p3: 165.8, p15: 172.5, p50: 178.5, p85: 184.5, p97: 189.8 },
    18: { p3: 167.5, p15: 174.2, p50: 180.2, p85: 186.2, p97: 191.5 }
  };

  const iapHeightGirls = {
    5: { p3: 99.8, p15: 103.5, p50: 108.4, p85: 113.3, p97: 117.0 },
    6: { p3: 105.2, p15: 109.2, p50: 114.6, p85: 120.0, p97: 123.8 },
    7: { p3: 110.5, p15: 114.8, p50: 120.8, p85: 126.8, p97: 130.8 },
    8: { p3: 116.0, p15: 120.6, p50: 127.3, p85: 134.0, p97: 138.5 },
    9: { p3: 121.8, p15: 126.8, p50: 134.0, p85: 141.2, p97: 146.2 },
    10: { p3: 127.8, p15: 133.4, p50: 140.8, p85: 148.2, p97: 153.8 },
    11: { p3: 134.0, p15: 140.2, p50: 147.8, p85: 155.4, p97: 161.2 },
    12: { p3: 140.5, p15: 147.2, p50: 154.4, p85: 161.6, p97: 167.2 },
    13: { p3: 146.8, p15: 153.2, p50: 159.8, p85: 166.4, p97: 171.5 },
    14: { p3: 151.5, p15: 157.2, p50: 163.2, p85: 169.2, p97: 174.0 },
    15: { p3: 154.2, p15: 159.5, p50: 165.2, p85: 170.9, p97: 175.5 },
    16: { p3: 155.8, p15: 160.8, p50: 166.5, p85: 172.2, p97: 176.5 },
    17: { p3: 156.5, p15: 161.5, p50: 167.2, p85: 172.9, p97: 177.2 },
    18: { p3: 157.0, p15: 162.0, p50: 167.8, p85: 173.6, p97: 177.8 }
  };

  const getPercentile = (value, percentileData) => {
    if (!percentileData) return 'N/A';
    if (value <= percentileData.p3) return '<3rd';
    if (value <= percentileData.p15) return '3rd-15th';
    if (value <= percentileData.p50) return '15th-50th';
    if (value <= percentileData.p85) return '50th-85th';
    if (value <= percentileData.p97) return '85th-97th';
    return '>97th';
  };

  const getZScore = (value, percentileData) => {
    if (!percentileData) return 'N/A';
    const p50 = percentileData.p50;
    const sd = (percentileData.p85 - percentileData.p15) / 2;
    const zScore = (value - p50) / sd;
    return zScore.toFixed(2);
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getBMICategory = (bmi, ageYears, standard) => {
    if (!bmi) return { category: 'N/A', color: 'text-gray-600', recommendation: '' };
    
    if (standard === 'WHO' && ageYears < 5) {
      if (bmi < 14.0) return { category: 'Severe Thinness', color: 'text-red-600', recommendation: 'Urgent medical evaluation needed' };
      if (bmi < 16.5) return { category: 'Thinness', color: 'text-orange-600', recommendation: 'Nutritional assessment recommended' };
      if (bmi < 17.5) return { category: 'Normal', color: 'text-green-600', recommendation: 'Monitor growth regularly' };
      if (bmi < 18.5) return { category: 'Normal', color: 'text-green-600', recommendation: 'Maintain healthy diet' };
      if (bmi < 20.0) return { category: 'At Risk', color: 'text-yellow-600', recommendation: 'Monitor weight' };
      return { category: 'Overweight', color: 'text-red-600', recommendation: 'Dietary counseling needed' };
    } else if (standard === 'IAP' && ageYears >= 5) {
      if (bmi < 14.0) return { category: 'Severe Thinness', color: 'text-red-600', recommendation: 'Medical evaluation needed' };
      if (bmi < 17.0) return { category: 'Thinness', color: 'text-orange-600', recommendation: 'Nutritional assessment' };
      if (bmi < 23.0) return { category: 'Normal', color: 'text-green-600', recommendation: 'Healthy lifestyle' };
      if (bmi < 27.0) return { category: 'Overweight', color: 'text-yellow-600', recommendation: 'Diet & exercise' };
      return { category: 'Obese', color: 'text-red-600', recommendation: 'Weight management needed' };
    }
    return { category: 'Unknown', color: 'text-gray-600', recommendation: '' };
  };

  useEffect(() => {
    if (childData.age && childData.weight && childData.height) {
      handleCalculate();
    }
  }, [childData.age, childData.ageUnit, childData.gender, childData.weight, childData.height, childData.headCircumference]);

  const handleCalculate = () => {
    const ageInMonths = childData.ageUnit === 'years' 
      ? parseFloat(childData.age) * 12 
      : parseFloat(childData.age);
    const ageYears = ageInMonths / 12;
    const weight = parseFloat(childData.weight);
    const height = parseFloat(childData.height);

    if (!childData.age || !weight || !height) {
      return;
    }

    const standard = ageYears < 5 ? 'WHO' : 'IAP';
    const isMale = childData.gender === 'male';

    let weightData, heightData, wfhData, bmiData, hcData;
    if (standard === 'WHO') {
      weightData = isMale ? whoWeightBoys : whoWeightGirls;
      heightData = isMale ? whoHeightBoys : whoHeightGirls;
      wfhData = isMale ? whoWeightForHeightBoys : whoWeightForHeightGirls;
      bmiData = isMale ? whoBMIBoys : whoBMIGirls;
      hcData = isMale ? whoHCBoys : whoHCGirls;
    } else {
      weightData = isMale ? iapWeightBoys : iapWeightGirls;
      heightData = isMale ? iapHeightBoys : iapHeightGirls;
    }

    const ages = Object.keys(weightData).map(Number);
    const closestAge = ages.reduce((prev, curr) => 
      Math.abs(curr - (standard === 'WHO' ? ageInMonths : ageYears)) < 
      Math.abs(prev - (standard === 'WHO' ? ageInMonths : ageYears)) ? curr : prev
    );

    let wfhPercentile = 'N/A';
    let wfhZScore = 'N/A';
    if (wfhData && height >= 65 && height <= 120) {
      const heightKey = Math.round(height / 5) * 5;
      if (wfhData[heightKey]) {
        wfhPercentile = getPercentile(weight, wfhData[heightKey]);
        wfhZScore = getZScore(weight, wfhData[heightKey]);
      }
    }

    const weightPercentile = getPercentile(weight, weightData[closestAge]);
    const heightPercentile = getPercentile(height, heightData[closestAge]);
    const weightZScore = getZScore(weight, weightData[closestAge]);
    const heightZScore = getZScore(height, heightData[closestAge]);

    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(parseFloat(bmi), ageYears, standard);

    let bmiPercentile = 'N/A';
    let bmiZScore = 'N/A';
    if (bmiData && bmi && bmiData[closestAge]) {
      bmiPercentile = getPercentile(parseFloat(bmi), bmiData[closestAge]);
      bmiZScore = getZScore(parseFloat(bmi), bmiData[closestAge]);
    }

    let hcPercentile = 'N/A';
    let hcZScore = 'N/A';
    if (childData.headCircumference && hcData && ageInMonths <= 24) {
      const hc = parseFloat(childData.headCircumference);
      if (hcData[closestAge]) {
        hcPercentile = getPercentile(hc, hcData[closestAge]);
        hcZScore = getZScore(hc, hcData[closestAge]);
      }
    }

    setResults({
      standard,
      ageYears: ageYears.toFixed(1),
      ageMonths: ageInMonths.toFixed(0),
      weightPercentile,
      heightPercentile,
      weightZScore,
      heightZScore,
      wfhPercentile,
      wfhZScore,
      bmi,
      bmiCategory,
      bmiPercentile,
      bmiZScore,
      hcPercentile,
      hcZScore,
      normalRanges: {
        weight: weightData[closestAge] ? `${weightData[closestAge].p3.toFixed(1)} - ${weightData[closestAge].p97.toFixed(1)} kg` : 'N/A',
        height: heightData[closestAge] ? `${heightData[closestAge].p3.toFixed(1)} - ${heightData[closestAge].p97.toFixed(1)} cm` : 'N/A',
        bmi: standard === 'IAP' ? '17.0 - 23.0' : '14.0 - 18.5'
      }
    });
  };

  const getChartData = (chartType) => {
    const isMale = childData.gender === 'male';
    const data = [];
    const ageInMonths = childData.ageUnit === 'years' ? parseFloat(childData.age || 0) * 12 : parseFloat(childData.age || 0);
    const ageYears = ageInMonths / 12;
    const weight = parseFloat(childData.weight || 0);
    const height = parseFloat(childData.height || 0);
    const hc = parseFloat(childData.headCircumference || 0);

    if (chartType === 'weight-age') {
      const whoWeight = isMale ? whoWeightBoys : whoWeightGirls;
      Object.keys(whoWeight).forEach(age => {
        data.push({
          age: parseFloat(age) / 12,
          p3: whoWeight[age].p3,
          p15: whoWeight[age].p15,
          p50: whoWeight[age].p50,
          p85: whoWeight[age].p85,
          p97: whoWeight[age].p97
        });
      });
      
      const iapWeight = isMale ? iapWeightBoys : iapWeightGirls;
      Object.keys(iapWeight).forEach(age => {
        data.push({
          age: parseFloat(age),
          p3: iapWeight[age].p3,
          p15: iapWeight[age].p15,
          p50: iapWeight[age].p50,
          p85: iapWeight[age].p85,
          p97: iapWeight[age].p97
        });
      });

      if (weight && ageYears) {
        data.push({ age: ageYears, childPoint: weight });
      }
    } else if (chartType === 'height-age') {
      const whoHeight = isMale ? whoHeightBoys : whoHeightGirls;
      Object.keys(whoHeight).forEach(age => {
        data.push({
          age: parseFloat(age) / 12,
          p3: whoHeight[age].p3,
          p15: whoHeight[age].p15,
          p50: whoHeight[age].p50,
          p85: whoHeight[age].p85,
          p97: whoHeight[age].p97
        });
      });
      
      const iapHeight = isMale ? iapHeightBoys : iapHeightGirls;
      Object.keys(iapHeight).forEach(age => {
        data.push({
          age: parseFloat(age),
          p3: iapHeight[age].p3,
          p15: iapHeight[age].p15,
          p50: iapHeight[age].p50,
          p85: iapHeight[age].p85,
          p97: iapHeight[age].p97
        });
      });

      if (height && ageYears) {
        data.push({ age: ageYears, childPoint: height });
      }
    } else if (chartType === 'weight-height') {
      const wfh = isMale ? whoWeightForHeightBoys : whoWeightForHeightGirls;
      Object.keys(wfh).forEach(h => {
        data.push({
          height: parseFloat(h),
          p3: wfh[h].p3,
          p15: wfh[h].p15,
          p50: wfh[h].p50,
          p85: wfh[h].p85,
          p97: wfh[h].p97
        });
      });

      if (weight && height && height >= 65 && height <= 120) {
        data.push({ height: height, childPoint: weight });
      }
    } else if (chartType === 'bmi-age') {
      const bmiData = isMale ? whoBMIBoys : whoBMIGirls;
      Object.keys(bmiData).forEach(age => {
        data.push({
          age: parseFloat(age) / 12,
          p3: bmiData[age].p3,
          p15: bmiData[age].p15,
          p50: bmiData[age].p50,
          p85: bmiData[age].p85,
          p97: bmiData[age].p97
        });
      });

      const bmi = calculateBMI(weight, height);
      if (bmi && ageYears) {
        data.push({ age: ageYears, childPoint: parseFloat(bmi) });
      }
    } else if (chartType === 'hc-age') {
      const hcData = isMale ? whoHCBoys : whoHCGirls;
      Object.keys(hcData).forEach(age => {
        data.push({
          age: parseFloat(age) / 12,
          p3: hcData[age].p3,
          p15: hcData[age].p15,
          p50: hcData[age].p50,
          p85: hcData[age].p85,
          p97: hcData[age].p97
        });
      });

      if (hc && ageInMonths <= 24) {
        data.push({ age: ageYears, childPoint: hc });
      }
    }
    
    return data.sort((a, b) => (a.age || a.height) - (b.age || b.height));
  };

  const chartData = useMemo(() => getChartData(activeChart), [activeChart, childData]);

  const renderChart = () => {
    const xAxisKey = activeChart === 'weight-height' ? 'height' : 'age';
    const xAxisLabel = activeChart === 'weight-height' ? 'Height (cm)' : 'Age (years)';
    let yAxisLabel = '';
    
    switch(activeChart) {
      case 'weight-age': yAxisLabel = 'Weight (kg)'; break;
      case 'height-age': yAxisLabel = 'Height (cm)'; break;
      case 'weight-height': yAxisLabel = 'Weight (kg)'; break;
      case 'bmi-age': yAxisLabel = 'BMI'; break;
      case 'hc-age': yAxisLabel = 'HC (cm)'; break;
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey={xAxisKey} 
            label={{ value: xAxisLabel, position: 'insideBottom', offset: -5, style: { fontSize: '12px' } }}
            type="number"
            domain={['dataMin', 'dataMax']}
            style={{ fontSize: '11px' }}
          />
          <YAxis 
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            style={{ fontSize: '11px' }}
          />
          <Tooltip contentStyle={{ fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          
          <Line 
            type="monotone" 
            dataKey="p97" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="97th" 
            dot={false}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="p85" 
            stroke="#f59e0b" 
            strokeWidth={1}
            strokeDasharray="5 5"
            name="85th" 
            dot={false}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="p50" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            name="50th" 
            dot={false}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="p15" 
            stroke="#f59e0b" 
            strokeWidth={1}
            strokeDasharray="5 5"
            name="15th" 
            dot={false}
            connectNulls
          />
          <Line 
            type="monotone" 
            dataKey="p3" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="3rd" 
            dot={false}
            connectNulls
          />
          
          <Scatter 
            dataKey="childPoint" 
            fill="#10b981" 
            shape="circle"
            name="Child"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-1">
              Pediatric Growth Monitoring Tool
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">IAP (5-18y) & WHO (0-5y) Standards</p>
            <p className="text-xs text-indigo-600 font-semibold">Developed by PediaLink</p>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Age *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={childData.age}
                  onChange={(e) => setChildData({...childData, age: e.target.value})}
                  className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Age"
                  step="0.1"
                />
                <select
                  value={childData.ageUnit}
                  onChange={(e) => setChildData({...childData, ageUnit: e.target.value})}
                  className="px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="years">Yrs</option>
                  <option value="months">Mos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Gender *
              </label>
              <select
                value={childData.gender}
                onChange={(e) => setChildData({...childData, gender: e.target.value})}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Weight (kg) *
              </label>
              <input
                type="number"
                value={childData.weight}
                onChange={(e) => setChildData({...childData, weight: e.target.value})}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Weight"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Height (cm) *
              </label>
              <input
                type="number"
                value={childData.height}
                onChange={(e) => setChildData({...childData, height: e.target.value})}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Height"
                step="0.1"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Head Circ (cm) <span className="text-xs text-gray-500">(0-2y)</span>
              </label>
              <input
                type="number"
                value={childData.headCircumference}
                onChange={(e) => setChildData({...childData, headCircumference: e.target.value})}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Optional"
                step="0.1"
              />
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className="space-y-3 mt-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-lg shadow-lg">
                  <h3 className="text-xs font-semibold mb-1 opacity-90">Age & Standard</h3>
                  <p className="text-lg sm:text-xl font-bold">{results.ageYears}y</p>
                  <p className="text-xs opacity-90">{results.standard}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-lg shadow-lg">
                  <h3 className="text-xs font-semibold mb-1 opacity-90">BMI</h3>
                  <p className="text-lg sm:text-xl font-bold">{results.bmi}</p>
                  <p className="text-xs truncate">{results.bmiCategory.category}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-lg shadow-lg">
                  <h3 className="text-xs font-semibold mb-1 opacity-90">Weight</h3>
                  <p className="text-xs">{results.weightPercentile}</p>
                  <p className="text-xs mt-1">Z: {results.weightZScore}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3 rounded-lg shadow-lg">
                  <h3 className="text-xs font-semibold mb-1 opacity-90">Height</h3>
                  <p className="text-xs">{results.heightPercentile}</p>
                  <p className="text-xs mt-1">Z: {results.heightZScore}</p>
                </div>
              </div>

              {/* Detailed Measurements - Expandable on mobile */}
              <div className="bg-gray-50 p-3 rounded-xl">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-full flex justify-between items-center font-bold text-gray-800 mb-2 lg:cursor-default"
                >
                  <span className="text-sm">📊 Detailed Measurements</span>
                  <span className="lg:hidden text-xl">{showMenu ? '−' : '+'}</span>
                </button>
                
                <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs ${showMenu ? 'block' : 'hidden lg:grid'}`}>
                  <div className="bg-white p-2 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-700 mb-1">Weight-for-Age</h4>
                    <p className="text-gray-600">%ile: <span className="font-bold text-indigo-600">{results.weightPercentile}</span></p>
                    <p className="text-gray-600">Z: <span className="font-bold text-indigo-600">{results.weightZScore}</span></p>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-700 mb-1">Height-for-Age</h4>
                    <p className="text-gray-600">%ile: <span className="font-bold text-indigo-600">{results.heightPercentile}</span></p>
                    <p className="text-gray-600">Z: <span className="font-bold text-indigo-600">{results.heightZScore}</span></p>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-700 mb-1">Weight-for-Height</h4>
                    <p className="text-gray-600">%ile: <span className="font-bold text-indigo-600">{results.wfhPercentile}</span></p>
                    <p className="text-gray-600">Z: <span className="font-bold text-indigo-600">{results.wfhZScore}</span></p>
                  </div>

                  <div className="bg-white p-2 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-700 mb-1">BMI-for-Age</h4>
                    <p className="text-gray-600">BMI: <span className="font-bold text-indigo-600">{results.bmi}</span></p>
                    <p className="text-gray-600">%ile: <span className="font-bold text-indigo-600">{results.bmiPercentile}</span></p>
                  </div>

                  {results.hcPercentile !== 'N/A' && (
                    <div className="bg-white p-2 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-700 mb-1">Head Circumference</h4>
                      <p className="text-gray-600">%ile: <span className="font-bold text-indigo-600">{results.hcPercentile}</span></p>
                      <p className="text-gray-600">Z: <span className="font-bold text-indigo-600">{results.hcZScore}</span></p>
                    </div>
                  )}

                  <div className="bg-white p-2 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-700 mb-1">Status</h4>
                    <p className={`font-bold text-sm ${results.bmiCategory.color}`}>{results.bmiCategory.category}</p>
                    <p className="text-xs text-gray-600 mt-1">{results.bmiCategory.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-xl shadow-xl p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">📈 Growth Charts</h2>
          <p className="text-xs text-gray-600 mb-3">Charts update live. <span className="text-green-600 font-bold">● Green dot</span> = your child</p>
          
          {/* Chart Selector - Horizontal scroll on mobile */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            {[
              { id: 'weight-age', label: 'Wt-Age' },
              { id: 'height-age', label: 'Ht-Age' },
              { id: 'weight-height', label: 'Wt-Ht' },
              { id: 'bmi-age', label: 'BMI' },
              { id: 'hc-age', label: 'HC' }
            ].map(chart => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  activeChart === chart.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {chart.label}
              </button>
            ))}
          </div>

          {/* Chart Display */}
          <div className="bg-gray-50 p-2 rounded-xl">
            {renderChart()}
          </div>

          {/* Chart Info */}
          <div className="mt-3 bg-blue-50 p-3 rounded-lg text-xs">
            <h3 className="font-bold text-gray-800 mb-1">Chart Info:</h3>
            <div className="text-gray-700">
              {activeChart === 'weight-age' && <p><strong>Weight-for-Age:</strong> Compares weight to age norms (WHO 0-5y, IAP 5-18y)</p>}
              {activeChart === 'height-age' && <p><strong>Height-for-Age:</strong> Tracks growth & identifies stunting</p>}
              {activeChart === 'weight-height' && <p><strong>Weight-for-Height:</strong> Acute malnutrition indicator (WHO, 65-120cm)</p>}
              {activeChart === 'bmi-age' && <p><strong>BMI-for-Age:</strong> Screens for overweight/obesity (WHO 0-5y)</p>}
              {activeChart === 'hc-age' && <p><strong>Head Circumference:</strong> Brain growth monitor (WHO 0-2y)</p>}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 grid sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 p-2 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-1">Lines:</h4>
              <ul className="space-y-1 text-gray-600">
                <li><span className="inline-block w-3 h-0.5 bg-red-500 mr-1"></span>3rd & 97th</li>
                <li><span className="inline-block w-3 h-0.5 bg-blue-500 mr-1" style={{height: '2px'}}></span>50th (median)</li>
                <li><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>Your child</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-1">Ranges:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>&lt;3rd: Needs eval</li>
                <li>15th-85th: Normal</li>
                <li>&gt;97th: Monitor</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-gray-500">
            <p>📚 WHO 2006 & IAP 2015 Standards</p>
            <p className="mt-1">⚠️ Educational tool - Consult pediatrician</p>
            <p className="mt-2 font-semibold text-indigo-600">Developed by PediaLink</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// export default removed for browser build
window.PediatricGrowthMonitoringTool = PediatricGrowthMonitoringTool;
