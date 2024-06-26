const progressValues = {
    gifteeName: 0,
    gender: 9,
    age: 19,
    relationship: 30,
    priceRange: 38,
    occasion: 46,
    giftType: 54,
    interests: 63,
    activity: 72,
    personality: 81,
    nature: 90,
    generate: 100,
  };

  const promptMessages = {
    gifteeName:
      "Beefore we get started, I'm curious, what is your giftee's name?",
    gender: "What is their gender?",
    age: "How old are they?",
    relationship: "What is your relationship with them?",
    priceRange: "What is your price range?",
    occasion: "What's the occasion?",
    giftType: "What gifts would they be interested in?",
    interests: "What are their interests?",
    activity: "What is their activity level?",
    personality: "What is their personality type?",
    nature: "Do they prefer being inside or outside?",
    generate: "",
  };

    // Define the mapping of previous states here
    const previousStateMap = {
    gender: "gifteeName",
    age: "gender",
    relationship: "age",
    priceRange: "relationship",
    occasion: "priceRange",
    giftType: "occasion",
    interests: "giftType",
    activity: "interests",
    personality: "activity",
    nature: "personality",
    generate: "nature",
    };

    // Define the mapping of next states here
    const nextStateMap = {
        gifteeName: "gender",
        gender: "age",
        age: "relationship",
        relationship: "priceRange",
        priceRange: "occasion",
        occasion: "giftType",
        giftType: "interests",
        interests: "activity",
        activity: "personality",
        personality: "nature",
        nature: "generate",
        };
  
  export { progressValues, promptMessages, previousStateMap, nextStateMap };