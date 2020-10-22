/** @jsx jsx */
import { ReactNodeArray } from 'react';
import { jsx } from 'theme-ui';

type Props = {
  values: ReactNodeArray
}

const OrderedList = ({ values }: Props) => (
  <ol sx={{ margin: 0 }}>
    {values.map((value, i) => (
      <li key={`list-item-${i}`}>
        {value}
      </li>
    ))}
  </ol>
);

export default OrderedList;