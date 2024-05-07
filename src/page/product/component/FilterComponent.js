import React, { useEffect } from 'react';
import "../component/FilterComponent.css";

const FilterComponent = (props) => {
    useEffect(() => {
        const display = document.getElementById(props.forid);
        const slider = document.getElementById(`slider-${props.forid}`);
        console.log({ props });
        if (props.inputFrom > props.inputTo) {
            display.innerHTML = `${props.inputTo.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}-${props.inputFrom.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
            slider.style.right = `${100 - (props.inputFrom - props.min) / (props.max - props.min) * 100}%`;
            slider.style.left = `${(props.inputTo - props.min) / (props.max - props.min) * 100}%`;
        } else {
            display.innerHTML = `${props.inputFrom.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}-${props.inputTo.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
            slider.style.right = `${100 - (props.inputTo - props.min) / (props.max - props.min) * 100}%`;
            slider.style.left = `${(props.inputFrom - props.min) / (props.max - props.min) * 100}%`;
        }
    }, [props]);

    return (
        <div className={`${props.class}`}>
            <div className="range-slider">
                <span className="range-selected" id={`slider-${props.forid}`}></span>
            </div>
            <div className="range-input">
                <input type="range"
                    onChange={(e) => props.onInputFromChange(parseFloat(e.target.value))}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    defaultValue={props.min} />
                <input type="range"
                    onChange={(e) => props.onInputToChange(parseFloat(e.target.value))}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    defaultValue={props.max} />
            </div>
        </div>
    );
};

export default FilterComponent;
