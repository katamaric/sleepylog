import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut

function AverageRatingPastMonth() {
  const [ratingsData, setRatingsData] = useState({});
  const [averageRating, setAverageRating] = useState(null);
  const [dataChart, setDataChart] = useState({}); // Declare dataChart as state

  useEffect(() => {
    fetch("/api/average_rating_past_month")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRatingsData(data.ratings_count);
        setAverageRating(data.average_rating);

        ChartJS.register(ArcElement, Tooltip, Legend);
        const dataChart = {
          labels: Object.keys(data.ratings_count),
          datasets: [
            {
              data: Object.values(data.ratings_count),
              label: "Average Rating",
              backgroundColor: [
                "#790119",
                "#CC6600",
                "#E3A92C",
                "#B3B319",
                "#4F8F00",
              ],
              borderColor: "#AFC1D6",
              borderWidth: 1,
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        };
        setDataChart(dataChart);
      })
      .catch((error) => {
        console.error("Error fetching ratings data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-heading text-sm">Ratings</h2>
      <div className="chart-wrapper">
        {Object.keys(dataChart).length > 0 ? (
          <Doughnut data={dataChart} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <br />
      <p> {averageRating !== null && <p>Average Rating: {averageRating}</p>}</p>
    </div>
  );
}

export default AverageRatingPastMonth;
