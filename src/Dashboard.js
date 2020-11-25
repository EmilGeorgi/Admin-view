import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid} from '@material-ui/core';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ComposedChart, Legend, Bar, Line, PieChart, Pie, Cell, Sector } from 'recharts';

const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
    ]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, percent,
    } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{`${(percent * 100).toFixed(2)}%`}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 5}
          outerRadius={outerRadius+5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };



export default class CustomPieChart extends PureComponent {
    classes = makeStyles((theme) => ({
        legend: {
            width: '75px',
            maxHeight: '100%',
        }
    }));
    state = {
      activeIndex: 0,
    };
  
    onPieEnter = (data, index) => {
      this.setState({
        activeIndex: index,
      });
    };

	render () {
  	return (
    	<PieChart width={390} height={300}>
            <Legend layout="horizontal" align="right" wrapperStyle={{display: 'inlineBlock', textAlign: 'left'}}/>
            <Pie 
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape} 
                data={data} 
                cx={200} 
                cy={150} 
                innerRadius={60}
                outerRadius={80}
                dataKey="uv"
                fill="#8884d8"
                onMouseEnter={this.onPieEnter}
            >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
       </PieChart>
    );
  }
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
}));

export const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <Card>
                        <CustomPieChart />
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Card>
                        <ComposedChart width={550} height={300} data={data} margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="amt" barSize={20} fill="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <AreaChart width={980} height={250} data={data}
                            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}


{/* <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx={200}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="uv"
                            onMouseEnter={this.onPieEnter}
        />
                        </PieChart> */}