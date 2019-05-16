import React from "react";
import { endpoint1, endpoint2 } from "../api/endpoints";

class App extends React.Component {
  sate = { output: [], lower: null, upper: null, responseFailed: false };

  // We make our API request inside this function
  componentDidMount() {
    // We need to wait for both responses before we can generate our output
    Promise.all([endpoint1.get(), endpoint2.get()])
      .then(([boundsResponse, detailsResponse]) => {
        // Check that the request was fulfilled
        if (
          boundsResponse.request.status !== 200 ||
          detailsResponse.request.status !== 200
        ) {
          this.setState({ responseFailed: true });
          return;
        }
        // If requests are OK we proceed to build our list of outputs
        const { lower, upper } = boundsResponse.data;
        const details = detailsResponse.data.outputDetails;

        let rtn = []; // Will hold all the strings associated with each number between our lower and upper bounds
        for (let i = lower; i <= upper; i++) {
          let numString = "";
          for (const { divisor, output } of details) {
            if (i % divisor === 0) numString += output;
          }
          rtn.push(numString);
        }
        this.setState(() => ({
          output: rtn,
          lower: lower,
          upper: upper,
          responseFailed: false
        }));
      })
      .catch(e => {
        console.log(e);
        this.setState({ responseFailed: true });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <h1>Reckon Programming Exercise</h1>
        <h2>Xavier O'Rourke</h2>
        {/* For each element in our output array, we create a corresponding list item */}
        {this.state ? (
          this.state.responseFailed ? (
            <div>Sorry! An API call didn't work(</div>
          ) : (
            <ol start={this.state.lower}>
              {this.state.output.map((numString, index) => (
                <li key={index}>{numString}</li>
              ))}
            </ol>
          )
        ) : (
          "Waiting for API response..."
        )}
      </div>
    );
  }
}

export default App;
