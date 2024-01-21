import { useContext, useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { YearMonthContext } from "./YearMonthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoryContext } from "./CategoryContext";

export default function PieChartGarph() {
  const [graphData, setGraphData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [width, setWidth] = useState(window.innerWidth - 80);
  const [height, setHeight] = useState(window.innerHeight - 200);
  const { yearMonthSelected } = useContext(YearMonthContext);
  const { category } = useContext(CategoryContext);

  const notify = (message) => {
    toast(message);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
      setWidth(window.innerWidth - 80);
      setHeight(window.innerHeight - 200);
    });
  }, []);

  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  useEffect(() => {
    const getDataForGraph = async () => {
      const year = yearMonthSelected.split("-")[0];
      const month = yearMonthSelected.split("-")[1];
      try {
        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalAmountForEachCategory/abhi/y/${year}/m/${month}/c/${category}`
        );

        console.log(`response - ${JSON.stringify(response.data)}`);
        setGraphData(response.data);
      } catch (error) {
        console.error(error);
        setGraphData([]);
        notify(error.response.data.message);
      }
    };

    getDataForGraph();
  }, [yearMonthSelected, category]);

  const renderGraph = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {graphData?.length > 0 ? (
              <PieChart
                series={[
                  {
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    data: graphData
                      .map((data, index) => {
                        const value = Number(data.value);
                        if (isNaN(value)) {
                          console.error(
                            `Invalid value for data.value: ${data.value}`
                          );
                          return null;
                        }
                        return {
                          id: data.id,
                          label: data.label,
                          value: value,
                          color: colors[index % colors.length],
                        };
                      })
                      .filter(Boolean),
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "black",
                    fontSize: 14,
                  },
                }}
                width={width}
                height={height}
                slotProps={{
                  legend: {
                    direction: isMobile ? "row" : "column",
                    position: { vertical: "top", horizontal: "left" },
                    padding: 0,
                    labelStyle: {
                      fontSize: 16,
                      fill: "black",
                    },
                  },
                }}
              />
            ) : (
              <h3 className="text-center my-3 fw-bolder">
                No Data to show graph
              </h3>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderGraph();
}
