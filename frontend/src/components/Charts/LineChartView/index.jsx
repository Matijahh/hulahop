import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChartView({ chartData, label, labelSuffix }) {
  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="line-chart-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>{label || entry.value}</li>
        ))}
      </ul>
    );
  };

  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : `}
            <span className="bolded">
              {payload[0].value} {labelSuffix}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={350}
        data={chartData?.map(({ label, data }) => ({
          dates: label,
          Sales: data,
        }))}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="dates" />
        <YAxis />
        <Tooltip content={renderTooltip} />
        <Legend content={renderLegend} />
        <Line type="monotone" dataKey="Sales" stroke="#f1676d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
