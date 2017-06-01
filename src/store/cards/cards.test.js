import cards, { SELECT_CARD } from './cards';

describe('cards reducer', () => {
  let state = [
    {
      id: "1",
      text: "test",
      selected: false,
      selectedChoice: null
    },
    {
      id: "2",
      text: "test",
      selected: false,
      selectedChoice: null
    },
    {
      id: "3",
      text: "test",
      selected: true,
      selectedChoice: null
    }
  ];
  it('should mark a card as selected', () => {
    expect(cards(state, {
      type: SELECT_CARD,
      id: "2"
    })[1].selected).toEqual(true);
    expect(cards(state, {
      type: SELECT_CARD,
      id: "3"
    })[2].selected).toEqual(false);
  });
});
