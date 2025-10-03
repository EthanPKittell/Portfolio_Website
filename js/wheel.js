//https://www.youtube.com/watch?v=ETFdNsBP04c&list=LL&index=1&t=1272s
// ^^ I followed along with a good amount of this tutorial to make a similar spinner wheel

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object storing the values of min and max angle for a fun fact!
const rotationValues = [
    {minDegree:0, maxDegree:30, value: "Nissan 240z!"},
    {minDegree:31, maxDegree:90, value: "Chicken Teriyaki!"},
    {minDegree:91, maxDegree:150, value: "I minored in Math!"},
    {minDegree:151, maxDegree:210, value: "Maine coon cat!"},
    {minDegree:211, maxDegree:270, value: "Beverly, MA!"},
    {minDegree:271, maxDegree:330, value: "Python/GDScript!"},
    {minDegree:331, maxDegree:360, value: "Nissan 240z!"},
];

//size of each of the pieces on the wheel
const data = [16,16,16,16,16,16]
//color for each piece
var pieColors = [
    "#fffb00ff",
    "#01c732ff",
    "#fffb00ff",
    "#01c732ff",
    "#fffb00ff",
    "#01c732ff",

];



let myChart = new Chart(wheel, {
//Plugin for displaying text on the pie chart
  plugins: [ChartDataLabels],
  //cjart type
  type: "pie", 
  data: {
    labels:["Favorite\nfood","Favorite\ncar","Favorite\ncoding lang","Home\ntown","Favorite\ncat","College\nminor"],
    datasets:[{
      backgroundColor: pieColors,
      data: data,
    }],
  },
  options: { 
    responsive: true,
    animation: { duration: 0 },
    plugins: {
        //hide legend
      tooltip: false, 
        legend: { display: false },
      datalabels: {
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        
        font: { size: 20 },
        textAlign: "center"
      },
    },
  },
});

//display vals based on random angle

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        //if the angle value is between max and min display it then
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>Answer: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

//spinner count
let count = 0;
//100 rotations for animation and last rotation for results
let resultValue = 101;

//start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //empty final val
    finalValue.innerHTML = '<p>What will it be hehehehe!</p>';
    //generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //interval for rotation anim
    let rotationInterval = window.setInterval(()=>{
        //set up rotation for piechart

        myChart.options.rotation = myChart.options.rotation +resultValue;

        //update chart with these new vals
        myChart.update();

        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});