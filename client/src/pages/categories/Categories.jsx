import React, { useEffect, useState, useContext } from 'react';

function Categories(props) {
    
    const {title} = props;
    console.log(title);
    return (
        <h1 className="text-3xl font-bold text-center">{title}</h1>
    );
}

export default Categories;