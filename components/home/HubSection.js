import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  processColor
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { LineChart } from "react-native-charts-wrapper";

class HubSection extends Component {
  state = {
    modalVisible: false,
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
  };

  componentDidMount() {
    let data = {
      dataSets: [
        {
          values: [],
          label: "Temperatura",
          config: {
            mode: "CUBIC_BEZIER",
            drawValues: false,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor("#b72819"),
            drawCircleHole: false,
            circleRadius: 5,
            highlightColor: processColor("transparent"),
            color: processColor("#e74c3c"),
            drawFilled: true,
            fillGradient: {
              colors: [processColor("#e57569"), processColor("#e74c3c")],
              positions: [0, 0.5],
              angle: 90,
              orientation: "TOP_BOTTOM"
            },
            fillAlpha: 1000,
            valueTextSize: 20
          }
        },
        {
          values: [],
          label: "Umidade",
          config: {
            mode: "CUBIC_BEZIER",
            drawValues: false,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor("#1470ad"),
            drawCircleHole: false,
            circleRadius: 5,
            highlightColor: processColor("transparent"),
            color: processColor("#1780c6"),
            drawFilled: true,
            fillGradient: {
              colors: [processColor("#84caf9"), processColor("#1780c6")],
              positions: [0, 0.5],
              angle: 90,
              orientation: "TOP_BOTTOM"
            },
            fillAlpha: 1000,
            valueTextSize: 20
          }
        }
      ]
    };

    let readings = this.props.readings;

    readings.map(reading => {
      let value = {};
      value.x = readings.indexOf(reading);
      value.y = reading.airTemp;

      data.dataSets[0].values.push(value);
    });

    readings.map(reading => {
      let value = {};
      value.x = readings.indexOf(reading);
      value.y = reading.airHum;

      data.dataSets[1].values.push(value);
    });

    console.log(data);

    this.setState({ data: data });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#27AE60",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
                borderColor={processColor("#E67E22")}
                borderWidth={2}
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
            <TouchableOpacity
              style={styles.mdlBtn}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={styles.mdlBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={styles.title}>{this.props.hubName}</Text>
        <View style={styles.contentContainer}>
          <View style={styles.readContainer}>
            <Text style={styles.text}>
              Temperatura: {this.props.airTemp}
              <MaterialIcon
                name="temperature-celsius"
                size={24}
                color="white"
              />
            </Text>
            <Text style={[styles.text, { marginTop: 46 }]}>
              Umidade: {this.props.airHum}%
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcon name="weather-partlycloudy" size={76} color="white" />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <SimpleLineIcon name="graph" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.text, { fontSize: 16 }]}>
          {this.props.updateTime}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E67E22",
    width: "100%"
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  readContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 15
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    margin: 5
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 45,
    backgroundColor: "#27AE60",
    borderRadius: 10,
    marginTop: 50,
    elevation: 2
  },
  chartContainer: {
    flex: 1,
    backgroundColor: "#4F7F9F",
    width: 400,
    margin: 10
  },
  chart: {
    flex: 1
  },
  mdlBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 100,
    backgroundColor: "#E67E22",
    borderRadius: 10,
    elevation: 2,
    margin: 5,
    marginBottom: 10
  },
  mdlBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  }
});

export default HubSection;
