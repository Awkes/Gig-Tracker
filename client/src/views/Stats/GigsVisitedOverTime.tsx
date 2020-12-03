/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import Box from '../../components/Box';

type Props = {
  labels: string[],
  data: number[],
}

const GigsVisitedOverTime = ({ labels, data }: Props) => {
  const { theme: { colors: c }} = useThemeUI();

  const datasets = useMemo(() => [{
    label: 'Gigs / month',
    fill: true,
    lineTension: 0,
    backgroundColor: c?.primaryTrans,
    borderColor: c?.primary,
    pointBorderColor: c?.text,
    pointBackgroundColor: c?.dark,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: c?.secondary,
    pointHoverBorderColor: c?.border,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data
  }], [c, data]);

  return (
    <div sx={{ gridColumn: [ null, '1 / 3']}}>
      <Box>
        <div sx={{ display: 'grid', gap: 3, 'canvas': { maxWidth: '100%' } }}>
          <h3 sx={{ margin: 0 }}>Gigs visited over time</h3>
          <Line 
            data={{ labels, datasets }}
            options={{
              legend: { labels: { fontColor: c?.text } },
              scales: {
                xAxes: [{ ticks: { fontColor: c?.text }}],
                yAxes: [{ ticks: { fontColor: c?.text }}],
              },
            }} 
          />
        </div>
      </Box>
    </div>
  );
}

export default GigsVisitedOverTime;