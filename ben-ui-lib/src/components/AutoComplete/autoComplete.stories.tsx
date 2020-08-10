import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { AutoComplete, DataSourceType } from "./autoComplete";

const SimleComplete = () => {
  const lakers = ["aaa", "bbbb", "cccc", "abd", "bc"];

  const lakersWithNumber = [
    {
      value: "aaa",
      nubmer: 0,
    },
    {
      value: "bbb",
      nubmer: 1,
    },
    {
      value: "ccc",
      nubmer: 2,
    },
  ];

  const handleFetch = (query: string) => {
    // return lakers.filter((name) => name.includes(query));
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
        <p>Number:{item.number}</p>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("seleted")}
      renderOption={renderOption}
    ></AutoComplete>
  );
};

const SimleCompleteGithub = () => {
  
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({items})=>{
        return items.slics(0,10).map( item => ({value: item.login, ...item}));
      })
  }

  const renderOption = (item: DataSourceType) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
        <p>Number:{item.number}</p>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("seleted")}
      renderOption={renderOption}
    ></AutoComplete>
  );
};
storiesOf("AutoComplete component", module).add("AutoComplete", SimleComplete);
