import React, { Component } from "react";
import { View, Text, StyleSheet, processColor } from "react-native";
import { LineChart } from "react-native-charts-wrapper";


class CropSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor("green"),
        markerColor: processColor("#F0C0FF8C"),
        textColor: processColor("white")
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1
      }
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {
    let data = {
      dataSets: [
        {
          values: [],
          label: "Umidade",
          config: {
            mode: "CUBIC_BEZIER",
            drawValues: false,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor("#2077b2"),
            drawCircleHole: false,
            circleRadius: 5,
            highlightColor: processColor("transparent"),
            color: processColor("#3498DB"),
            drawFilled: true,
            valueTextSize: 15
          }
        }
      ]
    };

    let readings = this.props.readings;
    
    readings.map(reading => {
      let value = {};
      value.x = readings.indexOf(reading);
      value.y = reading.soilHum * -1;

      data.dataSets[0].values.push(value);
    });

    this.setState({ data: data });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#27AE60",
            width: 400,
            height: 40,
            marginTop: 5
          }}
        >
          <Text
            style={{
              margin: 10,
              color: "white",
              fontSize: 22,
              fontWeight: "bold"
            }}
          >
            {this.props.name}
          </Text>
          <Text
            style={{
              margin: 10,
              color: "white",
              fontSize: 22,
              fontWeight: "bold"
            }}
          >
            Condição: {this.props.condition}
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: "" }}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor("teal")}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={false}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498DB",
    width: "100%"
  },
  chartContainer: {
    flex: 1,
    backgroundColor: "#4F7F9F",
    width: 400,
    margin: 10
  },
  chart: {
    flex: 1
  }
});

export default CropSection;
