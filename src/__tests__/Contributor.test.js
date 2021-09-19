import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Contributors from "../Contributors";

beforeAll(() => jest.spyOn(window, "fetch"));

test("should render with mock fetch", async () => {
  render(<Contributors />);

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => {
      return [
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
      ];
    },
  });

  const fetchButton = screen.getByText("Fetch contributors");
  fireEvent.click(fetchButton);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  await waitFor(() => screen.getAllByTestId("contributor"));
  expect(fetch).toHaveBeenCalledTimes(1);

  const contributors = screen.getAllByTestId("contributor");
  expect(contributors).toHaveLength(2);

  expect(contributors[0]).toHaveTextContent("bong");
  expect(contributors[0]).toHaveTextContent("59");

  expect(contributors[1]).toHaveTextContent("aj");
  expect(contributors[1]).toHaveTextContent("122");
});
