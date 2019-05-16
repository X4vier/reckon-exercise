import React from "react";
import { endpoint1, endpoint2 } from "../api/endpoints";

class App extends React.Component {
  sate = { output: [], lower: null, upper: null };

  componentDidMount() {
    Promise.all([endpoint1.get(), endpoint2.get()]).then(
      ([boundsResponse, detailsResponse]) => {
        const { lower, upper } = boundsResponse.data;
        const details = detailsResponse.data.outputDetails;

        let rtn = [];
        for (let i = lower; i <= upper; i++) {
          let numString = "";
          for (const { divisor, output } of details) {
            if (i % divisor === 0) numString += output;
          }
          rtn.push(numString);
        }
        this.setState(() => ({ output: rtn, lower: lower, upper: upper }));
      }
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <h1>Reckon Programming Exercise</h1>
        <h2>Xavier O'Rourke</h2>
        {this.state ? (
          <ol start={this.state.lower}>
            {this.state.output.map((numString, index) => (
              <li key={index}>{numString}</li>
            ))}
          </ol>
        ) : (
          "Waiting for API response..."
        )}
      </div>
    );
  }
}

export default App;
