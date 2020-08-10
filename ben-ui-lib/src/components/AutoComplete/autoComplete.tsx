import React, { FC, useState, ChangeEvent, ReactElement } from "react";
//
import Input, { InputProps } from "../Input/input";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

// Omit the onSelect property on InputProps
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      if (results instanceof Promise) {
        results.then((data) => setSuggestions(data));
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]); // hide dropdown
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
