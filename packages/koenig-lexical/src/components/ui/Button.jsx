import React from 'react';
import PropTypes from 'prop-types';

const containerStyles = variants({
    variants: {
        color: {
            light: 'bg-white text-black'
        },
        value: {
            true: 'opacity-100',
            false: 'opacity-50'
        },
        width: {
            regular: 'regular',
            full: 'w-full'
        }
    },
    defaultVariants: {
        width: 'full',
    },
});

const textStyles = variants({
    variants: {
        size: {
            small: 'h-10 text-md leading-[4rem]',
            medium: 'h-11 text-[1.6rem] leading-[4.4rem]',
            large: 'h-12 text-lg leading-[4.8rem]'
        }},
    defaultVariants: {
        size: 'large',
    },
});

export function Button(props) {
    const {value, valuePlaceholder} = props;
    return (
        <button
            className={`text-lg leading-[4.8rem] ${variants(containerStyles, props)}`}
            value={value}
            placeholder={valuePlaceholder}
        >
            <span className={`block px-5 ${variants(textStyles, props)}`}>{value || valuePlaceholder}</span>
        </button>
    );
}

Button.propTypes = {
    color: PropTypes.oneOf(['light', 'accent']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    width: PropTypes.oneOf(['regular', 'full']),
    value: PropTypes.string,
    valuePlaceholder: PropTypes.string
};

Button.defaultProps = {
    color: 'accent',
    size: 'small',
    width: 'regular',
    value: '',
    valuePlaceholder: 'Add button text'
};

function variants() {

    return '';
}
