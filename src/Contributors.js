import React from "react";
import { client } from "./utils/api-client";

function ContributorProfile({ total, avatar, username }) {
  return (
    <div data-testid="contributor" className="contributor">
      <div className="profile">
        <img src={avatar} width="60px" alt={username} />
        <p>{username}</p>
      </div>
      <div className="total">
        <p className="number">{total}</p>
        commits
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div aria-label="loading">
      <p>loading</p>
    </div>
  );
}

export default function FetchContributors() {
  const [contributors, setContributors] = React.useState({});
  const [status, setStatus] = React.useState("idle");

  const fetchContributors = async () => {
    setStatus("loading");
    client("stats/contributors")
      .then((data) =>
        data.map(({ total, author }) => ({
          total: total,
          username: author.login,
          avatar: author.avatar_url,
          id: author.id,
        }))
      )
      .then((contributorList) => {
        setContributors({ contributorList });
        setStatus("success");
      });
  };

  return (
    <div>
      <button onClick={fetchContributors}>Fetch contributors</button>
      <>
        {status === "loading" && <Loading />}
        {status === "success" && (
          <div data-testid="contributors" className="contributors">
            {contributors.contributorList.map((contributor) => {
              return (
                <ContributorProfile key={contributor.id} {...contributor} />
              );
            })}
          </div>
        )}
      </>
    </div>
  );
}
