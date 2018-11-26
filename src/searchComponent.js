import React, { Component } from 'react';
import './App.css';
import { data } from './searchData';
import SearchItem from './searchItem';

class SearchComponent extends Component {
    constructor() {
        super();

        this.state = {
            searchValues: '',
            data: { ...data },
        }
    };

    handleSearch = () => {
    };

    handleChange = (val) => {
        this.setState({
            searchValues: val.target.value
        })
    }

    itemsList = () =>
        this.state.data.groups.reduce((groups, currentValue, currentIndex) => {
            currentValue.items.map(item => {
                if (item.displayName.includes(this.state.searchValues)
                || currentValue.displayName.includes(this.state.searchValues)) {
                    groups[currentIndex] = 
                    groups[currentIndex] ? 
                    groups[currentIndex] :
                    { items: [] };

                    groups[currentIndex].displayName = currentValue.displayName;
                    groups[currentIndex].items.push(item)
                }
            })
            return groups
        }, []);

    render() {
        let dataToDisplay =
            this.state.searchValues === '' || this.state.searchValues === null ?
                this.state.data.groups : this.itemsList()
        return (
            <React.Fragment>
                <input type="text" name="filter" placeholder="search term" value={this.state.searchValues} onChange={this.handleChange} />
                <button type="button" name="goSearch" onClick={this.handleSearch}>></button>
                {
                    dataToDisplay.map(group => {
                        return (
                            <React.Fragment>
                                <hr />
                                <h1>Group is: {group.displayName}</h1>
                                {
                                    group.items.map(item =>
                                        <SearchItem props={{ group, item }} />)
                                }
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
};

export default SearchComponent;