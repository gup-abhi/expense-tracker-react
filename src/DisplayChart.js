import SelectDate from "./SelectDate";
import PieChartGraph from "./PieChartGarph";
import SelectCategory from "./SelectCategory";
import SelectPaymentMethods from "./SelectPaymentMethods";
import SelectTransactionTypes from "./SelectTransactionTypes";

const DisplayChart = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <SelectTransactionTypes />
        <SelectPaymentMethods />
        <SelectCategory />
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
