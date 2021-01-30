import React, { Component, PureComponent } from "react";
import "./livetikcer.scss";

import { connect } from "react-redux";
import { beingTransaction } from "../action"


class LiveTicker extends PureComponent {

    componentDidMount() {
        this.client = this.props.beingTransaction();
    }

    componentWillUnmount() {
        this.client && this.client.close();
    }

    render() {
        return (<div>Live Ticker</div>)
    }
}

const mapToProps = (state) => {
    return {
        showLoader: state.showLoader,
        connectionStatus: state.connectionStatus
    }
}

const mapDispatchToProps = dispatch => ({
    beingTransaction: () => dispatch(beingTransaction())
})

export default connect(mapToProps, mapDispatchToProps)(LiveTicker);