export type Character = {
  id: number;
  mood: string;
  image: string;
};

export const characters: Character[] = [
  {
    id: 1,
    mood: "화남",
    image: "/images/화남.png",
  },
  {
    id: 2,
    mood: "슬픔",
    image: "/images/슬픔.png",
  },
  {
    id: 3,
    mood: "기쁨",
    image: "/images/기쁨.png",
  },
];

export type Ingredient = {
  id: number;
  name: string;
};

export const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "양파",
  },
  {
    id: 2,
    name: "당근",
  },
  {
    id: 3,
    name: "감자",
  },
  {
    id: 4,
    name: "고구마",
  },
  {
    id: 5,
    name: "대파",
  },
  {
    id: 6,
    name: "마늘",
  },
  {
    id: 7,
    name: "파프리카",
  },
  {
    id: 8,
    name: "양배추",
  },
  {
    id: 9,
    name: "시금치",
  },
  {
    id: 10,
    name: "브로콜리",
  },
  {
    id: 11,
    name: "콩나물",
  },
  {
    id: 12,
    name: "두부",
  },
  {
    id: 13,
    name: "계란",
  },
  {
    id: 14,
    name: "닭고기",
  },
  {
    id: 15,
    name: "돼지고기",
  },
  {
    id: 16,
    name: "쇠고기",
  },
  {
    id: 17,
    name: "오징어",
  },
  {
    id: 18,
    name: "새우",
  },
  {
    id: 19,
    name: "고등어",
  },
  {
    id: 20,
    name: "연어",
  },
  {
    id: 21,
    name: "밥",
  },
  {
    id: 22,
    name: "라면",
  },
  {
    id: 23,
    name: "우동",
  },
  {
    id: 24,
    name: "떡",
  },
  {
    id: 25,
    name: "면",
  },
  {
    id: 26,
    name: "빵",
  },
  {
    id: 27,
    name: "치즈",
  },
  {
    id: 28,
    name: "우유",
  },
  {
    id: 29,
    name: "요구르트",
  },
  {
    id: 30,
    name: "버터",
  },
];

export type Recipe = {
  id: number;
  name: string;
  ingredients: {
    main: {
      id: number;
      name: string;
      quantity: string;
    }[];
    sub: {
      name: string;
      data: {
        id: number;
        name: string;
        quantity: string;
      }[];
    }[];
  };
  mainPhoto: string;
  manuals: {
    step: number;
    photo: string;
    description: string;
  }[];
  tip: string;
  time: number;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  salt: number;
  created_at?: string;
  updated_at?: string;
};

export type Recommendation = {
  reason: string;
  keywords: string[];
  recipes: Recipe[];
};

export const recipeRecommendation: Recommendation = {
  reason: "추우니까 따듯한 국물 드세요.",
  keywords: ["쌀", "돼지고기", "화남"],
  recipes: [
    {
      id: 1,
      name: "돼지고기 김치찌개",
      ingredients: {
        main: [
          {
            id: 1,
            name: "쌀",
            quantity: "30g",
          },
          {
            id: 2,
            name: "김치",
            quantity: "1/2 포기",
          },
        ],
        sub: [
          {
            name: "양념장",
            data: [
              {
                id: 1,
                name: "간장",
                quantity: "30g",
              },

              {
                id: 1,
                name: "소금",
                quantity: "30g",
              },
            ],
          },
        ],
      },
      mainPhoto: `https://placehold.co/400x400?text=${1}`,
      manuals: [
        {
          step: 1,
          photo: "url",
          description: "1. ~~하세요.",
        },
      ],
      tip: "조리 시간을 단축하려면 이렇게 해보세요!",
      time: 20,
      calories: 128,
      carbohydrates: 123,
      protein: 12,
      fat: 33,
      salt: 33,
    },
    {
      id: 2,
      name: "돼지갈비 찜",
      ingredients: {
        main: [
          {
            id: 1,
            name: "돼지갈비",
            quantity: "30g",
          },
          {
            id: 2,
            name: "당근",
            quantity: "1/2 개",
          },
        ],
        sub: [
          {
            name: "양념장",
            data: [
              {
                id: 1,
                name: "간장",
                quantity: "30g",
              },
              {
                id: 1,
                name: "소금",
                quantity: "30g",
              },
            ],
          },
        ],
      },
      mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
      manuals: [
        {
          step: 1,
          photo: "url",
          description: "1. ~~하세요.",
        },
      ],
      tip: "조리 시간을 단축하려면 이렇게 해보세요!",
      time: 20,
      calories: 250,
      carbohydrates: 213,
      protein: 12,
      fat: 33,
      salt: 33,
    },
    {
      id: 3,
      name: "돼지갈비 찜",
      ingredients: {
        main: [
          {
            id: 1,
            name: "돼지갈비",
            quantity: "30g",
          },
          {
            id: 2,
            name: "당근",
            quantity: "1/2 개",
          },
        ],
        sub: [
          {
            name: "양념장",
            data: [
              {
                id: 1,
                name: "간장",
                quantity: "30g",
              },
              {
                id: 1,
                name: "소금",
                quantity: "30g",
              },
            ],
          },
        ],
      },
      mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
      manuals: [
        {
          step: 1,
          photo: "url",
          description: "1. ~~하세요.",
        },
      ],
      tip: "조리 시간을 단축하려면 이렇게 해보세요!",
      time: 20,
      calories: 250,
      carbohydrates: 213,
      protein: 12,
      fat: 33,
      salt: 33,
    },
    {
      id: 4,
      name: "돼지갈비 찜",
      ingredients: {
        main: [
          {
            id: 1,
            name: "돼지갈비",
            quantity: "30g",
          },
          {
            id: 2,
            name: "당근",
            quantity: "1/2 개",
          },
        ],
        sub: [
          {
            name: "양념장",
            data: [
              {
                id: 1,
                name: "간장",
                quantity: "30g",
              },
              {
                id: 1,
                name: "소금",
                quantity: "30g",
              },
            ],
          },
        ],
      },
      mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
      manuals: [
        {
          step: 1,
          photo: "url",
          description: "1. ~~하세요.",
        },
      ],
      tip: "조리 시간을 단축하려면 이렇게 해보세요!",
      time: 20,
      calories: 250,
      carbohydrates: 213,
      protein: 12,
      fat: 33,
      salt: 33,
    },
    {
      id: 5,
      name: "돼지갈비 찜",
      ingredients: {
        main: [
          {
            id: 1,
            name: "돼지갈비",
            quantity: "30g",
          },
          {
            id: 2,
            name: "당근",
            quantity: "1/2 개",
          },
        ],
        sub: [
          {
            name: "양념장",
            data: [
              {
                id: 1,
                name: "간장",
                quantity: "30g",
              },
              {
                id: 1,
                name: "소금",
                quantity: "30g",
              },
            ],
          },
        ],
      },
      mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
      manuals: [
        {
          step: 1,
          photo: "url",
          description: "1. ~~하세요.",
        },
      ],
      tip: "조리 시간을 단축하려면 이렇게 해보세요!",
      time: 20,
      calories: 250,
      carbohydrates: 213,
      protein: 12,
      fat: 33,
      salt: 33,
    },
  ],
};

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "돼지고기 김치찌개",
    ingredients: {
      main: [
        {
          id: 1,
          name: "쌀",
          quantity: "30g",
        },
        {
          id: 2,
          name: "김치",
          quantity: "1/2 포기",
        },
      ],
      sub: [
        {
          name: "양념장",
          data: [
            {
              id: 1,
              name: "간장",
              quantity: "30g",
            },
            {
              id: 1,
              name: "소금",
              quantity: "30g",
            },
          ],
        },
      ],
    },
    mainPhoto: "https://placehold.co/400x400?text=recipe",
    manuals: [
      {
        step: 1,
        photo: "url",
        description: "1. ~~하세요.",
      },
    ],
    tip: "조리 시간을 단축하려면 이렇게 해보세요!",
    time: 20,
    calories: 128,
    carbohydrates: 123,
    protein: 12,
    fat: 33,
    salt: 33,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "돼지갈비 찜",
    ingredients: {
      main: [
        {
          id: 1,
          name: "돼지갈비",
          quantity: "30g",
        },
        {
          id: 2,
          name: "당근",
          quantity: "1/2 개",
        },
      ],
      sub: [
        {
          name: "양념장",
          data: [
            {
              id: 1,
              name: "간장",
              quantity: "30g",
            },
            {
              id: 1,
              name: "소금",
              quantity: "30g",
            },
          ],
        },
      ],
    },
    mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
    manuals: [
      {
        step: 1,
        photo: "url",
        description: "1. ~~하세요.",
      },
    ],
    tip: "조리 시간을 단축하려면 이렇게 해보세요!",
    time: 20,
    calories: 250,
    carbohydrates: 213,
    protein: 12,
    fat: 33,
    salt: 33,
  },
  {
    id: 3,
    name: "돼지갈비 찜",
    ingredients: {
      main: [
        {
          id: 1,
          name: "돼지갈비",
          quantity: "30g",
        },
        {
          id: 2,
          name: "당근",
          quantity: "1/2 개",
        },
      ],
      sub: [
        {
          name: "양념장",
          data: [
            {
              id: 1,
              name: "간장",
              quantity: "30g",
            },
            {
              id: 1,
              name: "소금",
              quantity: "30g",
            },
          ],
        },
      ],
    },
    mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
    manuals: [
      {
        step: 1,
        photo: "url",
        description: "1. ~~하세요.",
      },
    ],
    tip: "조리 시간을 단축하려면 이렇게 해보세요!",
    time: 20,
    calories: 250,
    carbohydrates: 213,
    protein: 12,
    fat: 33,
    salt: 33,
  },
  {
    id: 4,
    name: "돼지갈비 찜",
    ingredients: {
      main: [
        {
          id: 1,
          name: "돼지갈비",
          quantity: "30g",
        },
        {
          id: 2,
          name: "당근",
          quantity: "1/2 개",
        },
      ],
      sub: [
        {
          name: "양념장",
          data: [
            {
              id: 1,
              name: "간장",
              quantity: "30g",
            },
            {
              id: 1,
              name: "소금",
              quantity: "30g",
            },
          ],
        },
      ],
    },
    mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
    manuals: [
      {
        step: 1,
        photo: "url",
        description: "1. ~~하세요.",
      },
    ],
    tip: "조리 시간을 단축하려면 이렇게 해보세요!",
    time: 20,
    calories: 250,
    carbohydrates: 213,
    protein: 12,
    fat: 33,
    salt: 33,
  },
  {
    id: 5,
    name: "돼지갈비 찜",
    ingredients: {
      main: [
        {
          id: 1,
          name: "돼지갈비",
          quantity: "30g",
        },
        {
          id: 2,
          name: "당근",
          quantity: "1/2 개",
        },
      ],
      sub: [
        {
          name: "양념장",
          data: [
            {
              id: 1,
              name: "간장",
              quantity: "30g",
            },
            {
              id: 1,
              name: "소금",
              quantity: "30g",
            },
          ],
        },
      ],
    },
    mainPhoto: `https://placehold.co/400x400?text=${"2"}`,
    manuals: [
      {
        step: 1,
        photo: "url",
        description: "1. ~~하세요.",
      },
    ],
    tip: "조리 시간을 단축하려면 이렇게 해보세요!",
    time: 20,
    calories: 250,
    carbohydrates: 213,
    protein: 12,
    fat: 33,
    salt: 33,
  },
];
