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
