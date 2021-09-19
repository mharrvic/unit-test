import { rest } from "msw";
import { setupServer } from "msw/node";
import { apiURL } from "../utils/api-client";

const handlers = [
  rest.get(`${apiURL}/stats/contributors`, async (_, res, ctx) => {
    return res(
      ctx.json([
        {
          total: 59,
          author: {
            login: "bong",
            id: 1234,
            avatar_url: "https://avatars2.githubusercontent.com/u/1234?v=4",
          },
        },
        {
          total: 122,
          author: {
            login: "aj",
            id: 4567,
            avatar_url: "https://avatars2.githubusercontent.com/u/4567?v=4",
          },
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);

export * from "msw";
export { server };
