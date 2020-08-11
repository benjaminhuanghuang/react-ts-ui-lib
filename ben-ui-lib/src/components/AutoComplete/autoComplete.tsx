import React, { FC, useState, useEffect, ChangeEvent, KeyboardEvent, ReactElement } from "react";
import classNames from "classnames";
//
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";

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
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 500);

  //keyboard
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    if (debouncedValue) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: //enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38: // up
        highlight(highlightIndex - 1);
        break;
      case 40: // down
        highlight(highlightIndex + 1);
        break;
      case 27: // Esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames("suggesion-item", {
            "item-hightlighted": index === highlightIndex,
          });

          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
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
      <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
