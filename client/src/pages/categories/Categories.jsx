import React from "react";

function Categories(props) {
    const { title, data } = props;

    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
