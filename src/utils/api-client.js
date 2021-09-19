export const apiURL =
  "https://api.github.com/repos/thinkingmachines/coding-style";

async function client(endpoint) {
  return window.fetch(`${apiURL}/${endpoint}`).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
