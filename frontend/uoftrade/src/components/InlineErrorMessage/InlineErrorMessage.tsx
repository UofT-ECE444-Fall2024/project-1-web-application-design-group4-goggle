import React from "react";

const InlineErrorMessage = ({message}:{message?:string}) => {
    return (
        <span className="mt-2 text-center text-base font-small text-dark-red">{`⚠ ${message || 'This field is required'}`}</span>
    )
}

export default InlineErrorMessage;