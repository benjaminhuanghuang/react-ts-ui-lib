import React, { FC, useState, ChangeEvent } from "react";
//
import Input, { InputProps } from "../Input/input";

// Omit the onSelect property on InputProps
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={()=>handleSelect(item)}>{item}</li>
        ))}
      </ul>
    );
  };

  const handleSelect=(item: string)=>{
    setInputValue(item)
    setSuggestions([])  // hide dropdown
    if(onSelect){
      onSelect(item)
    }
  } 

  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  );
};
