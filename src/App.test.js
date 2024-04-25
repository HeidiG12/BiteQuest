import App from './App';
import {displaySelected, myDisplay, getData, checkingTagsSelected, tagSearch, mixingSort, sortingResults} from './tags.js';

// Define a test case to check if the correct restaurants are returned based on tag frequency.
test('Does it return correct restaurants by frequency of tags', async() => {
  let actual = await tagSearch(['Spicy', 'Sweet']);
  let expected = ['16TH AVENUE DINER', 'APPLEBEE\'S', 'ASIAN WOK & GRILL'];
  expect(actual).toEqual(expected);
})

// Define a test case to check if no restaurants are returned when no tags match.
test('Does sstem output nothing when there are no restaurants that fit tag preference', async() => {
  let actual = await tagSearch(['Spicy', 'Sour']);
  let expected = [];
  expect(actual).toEqual(expected);
})

// Define a test case to handle the edge case when no tags are entered.
test('Edge Case: No tags are entered', async() => {
  let actual = await tagSearch([]);
  let expected = [];
  expect(actual).toEqual(expected);
})


