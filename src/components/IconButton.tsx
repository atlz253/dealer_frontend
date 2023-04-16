import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from 'react';
import { Button } from "react-bootstrap";

interface IIconButtonProps {
    icon: IconDefinition,
    variant?: string | undefined,
    onClick?: () => any,
    text?: string,
    className?: string | undefined
}

const IconButton: FC<IIconButtonProps> = ({ icon, variant, text = "", onClick = undefined, className = undefined }) => {
    return (
        <Button variant={variant} onClick={onClick} className={className}>
            <FontAwesomeIcon icon={icon} />
            <span className="ms-1">
                {text}
            </span>
        </Button>
    );
}

export default IconButton;