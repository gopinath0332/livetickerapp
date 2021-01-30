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
        return (<div className="container">
            <div className="header">
                order book <span className="sub-header">btc/usd</span>
            </div>
            <div className="table-container">
                <div className="books-container">
                    <div className="table">
                        <div className="head-row">
                            <div className="head-cell">Count </div>
                            <div className="head-cell">Amount </div>
                            <div className="head-cell">Total </div>
                            <div className="head-cell">Price</div>
                        </div>
                        {
                            (this.props.showLoader && this.props.books.length === 0) &&
                            <div className="loader">
                                <div className="spinner" />
                            Loading...
                            </div>
                        }
                        {
                            this.props.books.map(item => (
                                <div className="row" key={item.id}>
                                    <div className="cell">{item.count}</div>
                                    <div className="cell">{item.amount}</div>
                                    <div className="cell">{item.total}</div>
                                    <div className="cell">{item.price}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="sell-books-container">
                    <div className="table">
                        <div className="head-row">
                            <div className="head-cell">Price</div>
                            <div className="head-cell">Total </div>
                            <div className="head-cell">Amount </div>
                            <div className="head-cell">Count </div>
                        </div>
                        {
                            (this.props.showLoader && this.props.sellBooks.length === 0) &&
                            <div className="loader">
                                <div className="spinner" />
                            Loading...
                            </div>
                        }
                        {
                            this.props.sellBooks.map(item => (
                                <div className="row" key={item.id}>
                                    <div className="cell">{item.price}</div>
                                    <div className="cell">{item.total}</div>
                                    <div className="cell">{item.amount}</div>
                                    <div className="cell">{item.count}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>)
    }
}

const mapToProps = (state) => {
    return {
        showLoader: state.showLoader,
        connectionStatus: state.connectionStatus,
        books: state.books,
        sellBooks: state.sellBooks
    }
}

const mapDispatchToProps = dispatch => ({
    beingTransaction: () => dispatch(beingTransaction())
})

export default connect(mapToProps, mapDispatchToProps)(LiveTicker);