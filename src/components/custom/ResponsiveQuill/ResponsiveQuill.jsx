import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import PropTypes from 'prop-types';

const ResponsiveQuill = ({ value, onChange, placeholder, className, style }) => {
    const [theme, setTheme] = useState(() => window.matchMedia("(min-width: 768px)").matches ? 'snow' : 'bubble');

    useEffect(() => {
        const checkTheme = () => {
            setTheme(window.matchMedia("(min-width: 768px)").matches ? 'snow' : 'bubble');
        };

        window.addEventListener('resize', checkTheme);
        
        // Clean up the event listener
        return () => window.removeEventListener('resize', checkTheme);
    }, []);

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className={`editor-container ${theme}-theme ${className}`}
            placeholder={placeholder}
            style={style}
            theme={theme}
        />
    );
};

ResponsiveQuill.propTypes = {
    value: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    placeholder: PropTypes.string,        
    className: PropTypes.string,         
    style: PropTypes.object,             
};

export default ResponsiveQuill;

