import React, {useState, useEffect} from "react";
import gStyles from '../../style.js'
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
const SearchComponent = (props) => {
    const {title, bgColor, textColor, borderColor, width, height, paddingX, paddingY, borderRadius} = props;
    const searchStyle = {
        backgroundColor: bgColor?bgColor : '#FFFFFF',
        color: textColor?textColor : gStyles.inputBorderGrey,
        border: `1px solid ${borderColor? borderColor:gStyles.inputBorderGrey}`,
        width: width,
        height: height,
        padding: `0 ${paddingX }`,
        // paddingY: `${paddingY? paddingY:0}`,
        borderRadius: '6px',
        paddingRight: '6em',
        display: "flex",
        justifyContent: 'center',
        alignItems: "center", 

    }
    const textInputStyle ={
        outline: "none", // Remove default focus outline
        border: "none", // Remove default border
        width: "100%", // Fill the available space
        fontStyle: "italic", // Remove,
        marginLeft: '4px',
        fontSize: '1em',
    }
    
    return (
        <div className="" style={searchStyle}>
        <MagnifyingGlassIcon className="w-6 h-6"/>
        <input 
        placeholder={title} 
        style={textInputStyle}

        />
        </div>
    )
}

export default SearchComponent;