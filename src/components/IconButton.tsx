import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from 'react';
import { Button } from "react-bootstrap";

interface IIconButtonProps {
    icon: IconDefinition,
    variant?: string | undefined,
    onClick?: () => any,
    text?: string
}

const IconButton: FC<IIconButtonProps> = ({ icon, variant, text = "", onClick = undefined }) => {
    return (
        <Button variant={variant} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span className="ms-1">
                {text}
            </span>
        </Button>
    );
}

export default IconButton;