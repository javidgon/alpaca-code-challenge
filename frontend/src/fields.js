import DateTimePicker from "react-widgets/lib/DateTimePicker";
import React from "react";

export let renderDateTimeField = ({input: {onChange, value}, showTime}) => {
    return (
        <div className="form-group">
            <DateTimePicker
                onChange={onChange}
                format="YYYY-MM-DD"
                time={showTime}
                value={!value ? null : new Date(value)}
            />
        </div>
    )
};

export let renderField = (field) => {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    return (
        <div className={className}>
            <input id={field.label} className='form-control' placeholder={field.label}
                   type={field.type} {...field.input}/>
            <div className='text-help'>
                {field.meta.touched ? field.meta.error : ''}
            </div>
        </div>
    )
};