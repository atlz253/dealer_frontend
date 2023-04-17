import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from 'react';
import { Button } from "react-bootstrap";
import classNames from "classnames";

interface IIconButtonProps {
    icon: IconDefinition,
    variant?: string | undefined,
    onClick?: () => any,
    text?: string,
    className?: string | undefined,
    reverse?: boolean
}

const IconButton: FC<IIconButtonProps> = ({ icon, variant, reverse, text = "", onClick = undefined, className = undefined }) => {
    const rootClasses = [className];

    if (reverse) {
        rootClasses.push("d-flex", "flex-row-reverse", "align-items-center");
    }

    return (
        <Button variant={variant} onClick={onClick} className={classNames(rootClasses)}>
            <FontAwesomeIcon icon={icon} />
            <span className={reverse ? "me-1" : "ms-1"}>
                {text}
            </span>
        </Button>
    );
}

export default IconButton;