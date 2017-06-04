import selectedOptions, { ADD_TRIED_BACK, MARK_TRIED } from './selectedOptions';
// import optionsData from '../../data/options';

describe('selectedOptions reducer', () => {
  let initialState = {
      currentOption: null,
      options: [{
        id: "5",
        tried: true
      },
      {
        id: "3",
        tried: true
      }
    ]
  };
  it('should update the current option going from 0 untried items to 1 untried item from null to the option id', () => {
    expect(
      selectedOptions(initialState, {
        type: ADD_TRIED_BACK,
        id: "5"
      }).currentOption
    ).toEqual(
      "5"
    );
  });
  it('should change the option tried status from true to false', () => {
    expect(
      selectedOptions(initialState, {
        type: ADD_TRIED_BACK,
        id: "3"
      }).options[1].tried
    ).toEqual(
      false
    );
  });

  it('should get the right current option when a user marks an option as tried', () => {
    let state = {
        currentOption: "4",
        options: [{
          id: "4",
          tried: false
        },
        {
          id: "5",
          tried: false
        },
        {
          id: "3",
          tried: false
        }
      ]
    };
    expect(
      selectedOptions(state, {
        type: MARK_TRIED,
        id: "4"
      }).currentOption
    ).toEqual("5");

    let state2 = {
      ...state,
      currentOption: "3"
    };
    expect(
      selectedOptions(state2, {
        type: MARK_TRIED,
        id: "3"
      }).currentOption
    ).toEqual("5");
    expect(
      selectedOptions(state2, {
        type: MARK_TRIED,
        id: "4"
      }).currentOption
    ).toEqual("3");
  });

  // it('should generate the right options based on the selected cards in all cases', () => {
  //   let generateOptions = (cards) => {
  //     let state = {
  //         currentOption: null,
  //         options: []
  //     };
  //     let generatedOptions = selectedOptions(state, {
  //       type: GENERATE_OPTIONS,
  //       cards
  //     }).options.map((option) => optionsData[option.id].text);
  //     return generatedOptions;
  //   };
  //   let testOptions = (options, expectedOptions) => {
  //     for(let i = 0; i < options.length; i++) {
  //       expect(options[i]).toContain(expectedOptions[i]);
  //     }
  //   };
  //
  //   let generatedOptions = generateOptions([]);
  //   testOptions(generatedOptions, ["your landlord", "utility assistance", "emergency money", "personalized advice"]);
  //
  //   generatedOptions = generateOptions([
  //     { id: "1" },
  //     { id: "6" }
  //   ]);
  //   testOptions(generatedOptions, ["legal help", "unemployment", "government benefits", "emergency money", "personalized advice"]);
  //
  //   generatedOptions = generateOptions([
  //     { id: "5" },
  //     { id: "6" }
  //   ]);
  //   testOptions(generatedOptions, ["help immediately"]);
  //
  //   generatedOptions = generateOptions([
  //     { id: "1" },
  //     { id: "5" },
  //     { id: "4" }
  //   ]);
  //   testOptions(generatedOptions, ["personalized advice"]);
  //
  //   generatedOptions = generateOptions([
  //     { id: "1" },
  //     { id: "3" },
  //     { id: "4" }
  //   ]);
  //   testOptions(generatedOptions, ["unemployment", "emergency money", "government benefits", "personalized advice"]);
  // });
});
