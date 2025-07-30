interface CardProps {
  title: string;
  value: number | string;
  unit?: string;
}

const Card = ({ title, value, unit = "件" }: CardProps) => {
  return (
    <div className="border border-green-main bg-light-green flex-col-center gap-3 py-10 rounded-10">
      <div className="medium-title-no-bold">{title}</div>
      <div className="text-5xl 2xl:text-7xl font-medium text-green-main">
        {value}
        <span className="text-xl font-bold">{unit}</span>
      </div>
    </div>
  );
};

const StatsCard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="完了" value="3" />
      <Card title="進行中" value="3" />
      <Card title="売上" value="100,000" unit="円" />
    </div>
  );
};

export default StatsCard;
