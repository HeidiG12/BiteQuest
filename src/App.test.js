//import { render, screen } from '@testing-library/react';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

import {displaySelected, myDisplay, getData, checkingTagsSelected, tagSearch, mixingSort, sortingResults} from './tags.js';
test('Does it return correct restaurants by frequency of tags', async() => {
  let actual = await tagSearch(['Spicy', 'Sweet']);
  let expected = ['16TH AVENUE DINER', 'APPLEBEE\'S', 'ASIAN WOK & GRILL'];
  expect(actual).toEqual(expected);
})
test('Does sstem output nothing when there are no restaurants that fit tag preference', async() => {
  let actual = await tagSearch(['Spicy', 'Sour']);
  let expected = [];
  expect(actual).toEqual(expected);
})
test('Edge Case: No tags are entered', async() => {
  let actual = await tagSearch([]);
  let expected = [];
  expect(actual).toEqual(expected);
})


