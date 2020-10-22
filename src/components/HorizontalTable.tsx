/** @jsx jsx */
import { jsx } from 'theme-ui';

type Props = {
  values: any[][]
}

const HorizontalTable = ({ values }: Props) => (
  <table sx={{
    textAlign: 'left',
    borderCollapse: 'collapse',
    '& td': { paddingLeft: 3 },
  }}>
    <tbody>
      {values.map(row => (
        <tr>
          {row.map((col, i) => i === 0
            ? <th>{col}</th>
            : <td>{col}</td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default HorizontalTable;