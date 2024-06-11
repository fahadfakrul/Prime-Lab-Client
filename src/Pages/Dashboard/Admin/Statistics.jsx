import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BiInjection } from "react-icons/bi";
import { FaRegFaceGrin } from "react-icons/fa6";
import { FaBookReader, FaRegMoneyBillAlt } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid ,PieChart, Pie,  Legend } from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Statistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-stats`);
      return res.data;
    },
  });
  const  { data: bookedData = { testStats: [], reportStats: [] } } = useQuery({
    queryKey: ["booked-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-stats`);
      return res.data;
    },
  });
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChartData = bookedData.reportStats.map(data => {
    return {
      name: data.name,
      value: data.count
    }
})
  return (
    <div>
      <section className="p-6 my-6 dark:bg-gray-100 dark:text-[gray-800]">
        <div>
          <p className="text-4xl  font-medium text-[#2d3663] ">
            Welcome {user.displayName},
          </p>
        </div>
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-gradient-to-r from-[#4ec0c1] to-[#05a1d8]">
              <BiInjection className="text-white" size={40}></BiInjection>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {stats.testItems}
              </p>
              <p className="capitalize">Tests</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-gradient-to-r from-[#4ec0c1] to-[#05a1d8]">
              <FaRegFaceGrin className="text-white" size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {stats.users}
              </p>
              <p className="capitalize">Users</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-gradient-to-r from-[#4ec0c1] to-[#05a1d8]">
              <FaBookReader className="text-white" size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {stats.reservations}
              </p>
              <p className="capitalize">Reservations</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-gradient-to-r from-[#4ec0c1] to-[#05a1d8]">
              <FaRegMoneyBillAlt className="text-white" size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {stats.revenue}$
              </p>
              <p className="capitalize">Revenue</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={bookedData.testStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="count"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {bookedData.testStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
        
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        
          <Legend ></Legend>
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
