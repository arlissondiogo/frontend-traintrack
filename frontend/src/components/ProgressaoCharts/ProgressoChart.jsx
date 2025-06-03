import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ProgressoChart = ({ progresso, volume }) => {
  const lineData = {
    labels: progresso.map((d) => `Semana ${d._id.week}`),
    datasets: [
      {
        label: "Carga Média (kg)",
        data: progresso.map((d) => d.cargaMedia),
        borderColor: "green",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: volume.map((d) => `${d._id.day}/${d._id.month}`),
    datasets: [
      {
        label: "Volume (kg)",
        data: volume.map((d) => d.volumeTotal),
        backgroundColor: "#27ae60",
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
      <h3>Progresso de Carga</h3>
      <Line data={lineData} />

      <h3 style={{ marginTop: "40px" }}>Volume Total por Dia</h3>
      <Bar data={barData} />
    </div>
  );
};

export default ProgressoChart;
