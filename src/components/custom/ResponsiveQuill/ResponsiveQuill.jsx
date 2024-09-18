import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import snow theme styles
import 'react-quill/dist/quill.bubble.css'; // Import bubble theme styles

const ResponsiveQuill = ({ value, onChange, placeholder, className, style }) => {
    const [theme, setTheme] = useState(() => window.matchMedia("(min-width: 768px)").matches ? 'snow' : 'bubble');
    const quillRef = React.useRef(null);

    useEffect(() => {
        const checkTheme = () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                setTheme('snow');
            } else {
                setTheme('bubble');
            }
        };

        window.addEventListener('resize', checkTheme);

        // Clean up the event listener
        return () => window.removeEventListener('resize', checkTheme);
    }, []);

    return (
        <ReactQuill
            ref={quillRef}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`editor-container ${theme}-theme ${className}`}
            placeholder={placeholder}
            style={style}
            theme={theme}
        />
    );
};

export default ResponsiveQuill;
