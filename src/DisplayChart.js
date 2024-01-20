import SelectDate from "./SelectDate";
import PieChartGraph from "./PieChartGarph";

const DisplayChart = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <SelectDate />
      </div>
      <div className="row">
        <div className="col">
          <PieChartGraph />
        </div>
      </div>
    </div>
  );
};

export default DisplayChart;
