import React, { Component } from "react";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";

export default class CreateSelect extends Component {
    state = {
        isLoading: false,
    };

    handleCreate = (inputValue) => {
        //    Condicionar
        this.setState({ isLoading: true });
        console.log(inputValue);
        // const { inputValue } = this.props;
        // showForm(true);
        // return inputValue;
    };

    render() {
        const { isLoading } = this.state;
        const {
            loadOptions,
            input,
            disabled,
            inputValue,
            ValorProyecto,
        } = this.props;
        console.log("desde createSelect", this.props);
        return (
            <React.Fragment>
                <div className="d-flex flex-column w-50">
                    {this.props.children}
                </div>
                <AsyncCreatableSelect
                    isClearable
                    // isMulti
                    cacheOptions
                    defaultOptions
                    //isDisabled={isLoading}
                    isDisabled={disabled}
                    isLoading={isLoading}
                    loadOptions={loadOptions}
                    onChange={(e) => {
                        input.onChange(e ? e : null);
                    }}
                    // onCreateOption={this.handleCreate}
                    value={input.value}
                />
            </React.Fragment>
        );
    }
}
