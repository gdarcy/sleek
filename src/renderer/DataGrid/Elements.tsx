import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { ReactComponent as TomatoIconDuo } from '../../../assets/icons/tomato-duo.svg';
import DatePickerInline from './DatePickerInline';
import { TodoObject, Filters } from '../../../main/util';

interface Element {
  type: string | null;
  value: string;
}

interface ElementsProps {
  todoObject: TodoObject;
  filters: Filters;
  handleButtonClick: (key: string, value: string) => void;
}

const Elements: React.FC<ElementsProps> = ({ todoObject, filters, handleButtonClick }) => {

  const replacements: {
    [key: string]: (value: string, type: string) => React.ReactNode;
  } = {
    due: (value, type) => (
      <DatePickerInline
        type={type}
        todoObject={todoObject}
        date={todoObject.due}
        filters={filters}
      />
    ),
    t: (value, type) => (
      <DatePickerInline
        type={type}
        todoObject={todoObject}
        date={todoObject.t}
        filters={filters}
      />
    ),
    contexts: (value, type) => (
      <Button onClick={() => handleButtonClick(type, value)}>
        <Box>{value}</Box>
      </Button>
    ),
    projects: (value, type) => (
      <Button onClick={() => handleButtonClick(type, value)}>
        <Box>{value}</Box>
      </Button>
    ),
    rec: (value, type) => (
      <Button onClick={() => handleButtonClick(type, value)}>
        <Chip label="rec:" />
        <Box>{value}</Box>
      </Button>
    ),
    pm: (value, type) => (
      <Button className='pomodoro' onClick={() => handleButtonClick(type, value)}>
        <TomatoIconDuo />
        <Box>{value}</Box>
      </Button>
    ),
    hidden: () => null,
  };

  const matches = () => {
    const expressions = [
      { pattern: new RegExp(`t:${todoObject.tString?.replace(/\s/g, '\\s')}`, 'g'), type: 't', key: 't:' },
      { pattern: new RegExp(`due:${todoObject.dueString?.replace(/\s/g, '\\s')}`, 'g'), type: 'due', key: 'due:' },
      { pattern: /(@\S+)/, type: 'contexts', key: '@' },
      { pattern: /\+\S+/, type: 'projects', key: '+' },
      { pattern: /\bh:1\b/, type: 'hidden', key: 'h:1' },
      { pattern: /pm:\d+\b/, type: 'pm', key: 'pm:' },
      { pattern: /rec:([^ ]+)/, type: 'rec', key: 'rec:' },
    ];

    let body = todoObject.body;
    let substrings = [];
    let index = 0;

    if (body) {
      while (body.length > 0) {
        let matched = false;

        for (const expression of expressions) {
          const regex = new RegExp(`^(${expression.pattern.source})`);
          const match = body.match(regex);

          if (match) {
            matched = true;

            const value = match[0].substr(expression.key.length);

            substrings.push({ type: expression.type, value: value, key: expression.key, index: index });
            body = body.substring(match[0].length);
            break;
          }
        }

        if (!matched) {
          const nextSpaceIndex = body.indexOf(' ');
          const endOfWordIndex = nextSpaceIndex !== -1 ? nextSpaceIndex : body.length;

          substrings.push({ type: null, value: body.substring(0, endOfWordIndex), index: index });
          body = body.substring(endOfWordIndex + 1);
        }

        index++;
      }
    }
    return substrings;
  };

  const elements = matches().map((element, index) => {
    const selected = (filters[element.type] || []).some(
      (filter) => filter.value === element.value
    );

    return (
      <Box
        key={index}
        className={selected ? 'selected' : ''}
        data-todotxt-attribute={element.type}
      >
        {replacements[element.type]
          ? replacements[element.type](element.value, element.type)
          : element.value ? <span>{element.value}</span> : null}
      </Box>
    );
  });

  return <>{elements}</>;
};

export default Elements;
