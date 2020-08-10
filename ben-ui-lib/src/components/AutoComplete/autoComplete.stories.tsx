import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {AutoComplete} from './autoComplete'

const SimleComplete = ()=>{
  const lakers = ['aaa', 'bbbb', 'cccc', "abd", 'bc'];

  const handleFetch = (query:string) =>{
    return lakers.filter(name=>name.includes(query))
  }
  return (
    <AutoComplete fetchSuggestions={handleFetch} onSelect={action('seleted')}>
    </AutoComplete>
  )
}

storiesOf('AutoComplete component', module)
  .add('AutoComplete', SimleComplete)
