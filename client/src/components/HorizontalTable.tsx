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
      {values?.map((row, i) => (
        <tr key={`row-${i}`}>
          {row?.map((col, i) => i === 0
            ? <th key={`col-${i}`}>{col}</th>
            : <td key={`col-${i}`}>{col}</td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default HorizontalTable;