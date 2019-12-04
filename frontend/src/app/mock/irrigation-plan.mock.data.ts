import {Data} from '../data/models/data.model';

export const fakeData = (): Data[] => {
  return [
    {
      date: new Date(),
      message: 'Test'
    },
    {
      date: new Date(),
      message: 'New Message'
    }
  ];
};
