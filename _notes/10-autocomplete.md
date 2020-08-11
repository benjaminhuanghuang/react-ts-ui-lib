1. Basic properties


2. Render template


3. Datasoure Type


4. Async
```
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;

  const results = fetchSuggestions(value);
  if (results instanceof Promise) {
    results.then((data) => setSuggestions(data));
  } else {
    setSuggestions(results);
  }
```

5. Loading Icon

6. 函数防抖 debounce

7. keyboard

8. 区别input change的来源
 bug: input 和 select item都会触发search

 Use useRef

9. close dropdown
